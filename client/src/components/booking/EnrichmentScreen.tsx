"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { humanError } from "@/lib/humanError";
import { cn } from "@/lib/utils";
import BehaviorChip from "./BehaviorChip";
import { EnrichmentSchema, type EnrichmentFormValues } from "@/lib/schemas/trialBooking";

const SERVICES: { value: EnrichmentFormValues["serviceInterests"][number]; label: string }[] = [
  { value: "grooming", label: "Grooming" },
  { value: "sitting", label: "Pet Sitting / Boarding" },
  { value: "training", label: "Dog Training" },
  { value: "vet", label: "Vet / Healthcare" },
  { value: "smart_collar", label: "Smart Collar (Coming Soon)" },
];

interface EnrichmentScreenProps {
  leadId: string;
  pincode: string;
  isInArea: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const EnrichmentScreen: React.FC<EnrichmentScreenProps> = ({
  leadId,
  pincode,
  isInArea,
  onComplete,
  onSkip,
}) => {
  const form = useForm<EnrichmentFormValues>({
    resolver: zodResolver(EnrichmentSchema),
    defaultValues: {
      serviceInterests: [],
      triggers: "",
      walkerNotes: "",
      commitmentType: undefined,
      notifyOnLaunch: !isInArea,
    },
  });
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;
  const services = watch("serviceInterests");

  async function onSubmit(values: EnrichmentFormValues) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/leads/${leadId}/enrichment`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Save failed");
      }
      toast({ title: "Thanks", description: "We've got everything we need." });
      onComplete();
    } catch (err) {
      toast({
        title: "Couldn't save",
        description: humanError(err, { fallback: "Please try again." }),
        variant: "destructive",
      });
    }
  }

  function toggleService(v: EnrichmentFormValues["serviceInterests"][number]) {
    const cur = new Set(services);
    if (cur.has(v)) cur.delete(v);
    else cur.add(v);
    setValue("serviceInterests", Array.from(cur));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 py-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Almost done. A few quick optional bits.</h3>
        <p className="text-sm text-muted-foreground">
          Helps us prep the right Guardian for you. Skip anything you&apos;d rather not answer.
        </p>
      </div>

      <div
        className={cn(
          "rounded-lg p-4 border",
          isInArea ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200",
        )}
      >
        {isInArea ? (
          <>
            <p className="font-semibold text-foreground">Launch offer (Mumbai only)</p>
            <p className="text-sm text-muted-foreground mt-1">
              Get 5 walks for ₹499 when we launch in your area. Platypus-trained Guardians, live tracking, premium care.
            </p>
          </>
        ) : (
          <>
            <p className="font-semibold text-foreground">We&apos;ll launch in your area soon</p>
            <p className="text-sm text-muted-foreground mt-1">
              Pincode {pincode || "outside Mumbai"} is outside our current launch zone. We&apos;ve added you to the notify list.
            </p>
          </>
        )}
      </div>

      <Controller
        name="notifyOnLaunch"
        control={control}
        render={({ field }) => (
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={field.value}
              disabled={!isInArea}
              onCheckedChange={field.onChange}
            />
            <Label className="leading-snug">Notify me when service goes live in my area</Label>
          </div>
        )}
      />

      <div className="space-y-2">
        <Label>Other services you&apos;d be interested in</Label>
        <div className="grid grid-cols-2 gap-2">
          {SERVICES.map((s) => {
            const active = services.includes(s.value);
            return (
              <button
                key={s.value}
                type="button"
                aria-pressed={active}
                onClick={() => toggleService(s.value)}
                className={cn(
                  "min-h-11 px-3 py-2 text-sm rounded-md border text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-input hover:bg-muted",
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label htmlFor="triggers">Anything that triggers your dog?</Label>
        <Controller
          name="triggers"
          control={control}
          render={({ field }) => (
            <Textarea
              id="triggers"
              placeholder="e.g., crackers, other dogs, vehicles"
              rows={2}
              {...field}
              className="mt-1"
            />
          )}
        />
      </div>

      <div>
        <Label htmlFor="walkerNotes">Anything specific you want the walker to know?</Label>
        <Controller
          name="walkerNotes"
          control={control}
          render={({ field }) => (
            <Textarea
              id="walkerNotes"
              placeholder="e.g., she pulls hard on leash, prefers quiet routes"
              rows={2}
              {...field}
              className="mt-1"
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <Label>You&apos;re looking for</Label>
        <Controller
          name="commitmentType"
          control={control}
          render={({ field }) => (
            <BehaviorChip
              value={field.value}
              onChange={field.onChange}
              options={[
                { value: "monthly", label: "Monthly subscription" },
                { value: "trial", label: "Trial first" },
                { value: "on_demand", label: "Occasional / on-demand" },
              ]}
              ariaLabel="Commitment type"
            />
          )}
        />
      </div>

      <div className="flex justify-between gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onSkip}>
          Skip, we&apos;re done
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#247AFD] hover:bg-[#247AFD]/90 text-white font-semibold"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {isSubmitting ? "Saving..." : "Save and finish"}
        </Button>
      </div>
    </form>
  );
};

export default EnrichmentScreen;
