"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BehaviorChip, { YES_NO_OPTIONS, TERNARY_OPTIONS } from "./BehaviorChip";

interface DogCardProps {
  index: number;
  totalDogs: number;
  breeds: readonly string[];
  onRemove: () => void;
}

const DogCard: React.FC<DogCardProps> = ({ index, totalDogs, breeds, onRemove }) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const breedValue = watch(`dogs.${index}.breed`);

  type DogErrors = Record<string, { message?: string } | undefined>;
  const dogErrs: DogErrors = ((errors.dogs as Array<DogErrors> | undefined)?.[index] || {}) as DogErrors;
  const fieldError = (key: string): string | undefined => dogErrs?.[key]?.message;

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">Dog {index + 1}</h4>
        {totalDogs > 1 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-destructive hover:text-destructive"
            aria-label={`Remove Dog ${index + 1}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div>
        <Label htmlFor={`dogs.${index}.name`}>Dog's Name *</Label>
        <Controller
          name={`dogs.${index}.name`}
          control={control}
          render={({ field }) => (
            <Input id={`dogs.${index}.name`} placeholder="e.g., Simba" {...field} className="mt-1" />
          )}
        />
        {fieldError("name") && <p className="text-sm text-destructive mt-1">{fieldError("name")}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`dogs.${index}.breed`}>Breed *</Label>
          <Controller
            name={`dogs.${index}.breed`}
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id={`dogs.${index}.breed`} className="mt-1">
                  <SelectValue placeholder="Select breed" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {breeds.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {fieldError("breed") && <p className="text-sm text-destructive mt-1">{fieldError("breed")}</p>}
        </div>
        <div>
          <Label htmlFor={`dogs.${index}.age`}>Age (years) *</Label>
          <Controller
            name={`dogs.${index}.age`}
            control={control}
            render={({ field }) => (
              <Input
                id={`dogs.${index}.age`}
                type="number"
                min="0"
                max="30"
                placeholder="3"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                className="mt-1"
              />
            )}
          />
          {fieldError("age") && <p className="text-sm text-destructive mt-1">{fieldError("age")}</p>}
        </div>
      </div>

      {breedValue === "Other" && (
        <div>
          <Label htmlFor={`dogs.${index}.breedOther`}>Specify breed *</Label>
          <Controller
            name={`dogs.${index}.breedOther`}
            control={control}
            render={({ field }) => (
              <Input
                id={`dogs.${index}.breedOther`}
                placeholder="Enter breed"
                {...field}
                className="mt-1"
              />
            )}
          />
          {fieldError("breedOther") && (
            <p className="text-sm text-destructive mt-1">{fieldError("breedOther")}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Gender *</Label>
          <Controller
            name={`dogs.${index}.gender`}
            control={control}
            render={({ field }) => (
              <BehaviorChip
                value={field.value}
                onChange={field.onChange}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                ariaLabel="Gender"
                className="mt-1"
              />
            )}
          />
          {fieldError("gender") && <p className="text-sm text-destructive mt-1">{fieldError("gender")}</p>}
        </div>
        <div>
          <Label htmlFor={`dogs.${index}.weightKg`}>Weight (kg)</Label>
          <Controller
            name={`dogs.${index}.weightKg`}
            control={control}
            render={({ field }) => (
              <Input
                id={`dogs.${index}.weightKg`}
                type="number"
                min="0"
                max="100"
                placeholder="e.g., 18"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                className="mt-1"
              />
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Friendly with strangers? *</Label>
        <Controller
          name={`dogs.${index}.friendlyWithStrangers`}
          control={control}
          render={({ field }) => (
            <BehaviorChip
              value={field.value}
              onChange={field.onChange}
              options={TERNARY_OPTIONS}
              ariaLabel="Friendly with strangers"
            />
          )}
        />
        {fieldError("friendlyWithStrangers") && (
          <p className="text-sm text-destructive">{fieldError("friendlyWithStrangers")}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        {[
          { name: "aggressive", label: "Shows aggression? *" },
          { name: "leashTrained", label: "Leash trained? *" },
          { name: "vaccinated", label: "Vaccinated? *" },
        ].map((q) => (
          <div key={q.name} className="space-y-2">
            <Label>{q.label}</Label>
            <Controller
              name={`dogs.${index}.${q.name}` as `dogs.${number}.aggressive`}
              control={control}
              render={({ field }) => (
                <BehaviorChip
                  value={field.value as string | undefined}
                  onChange={field.onChange}
                  options={YES_NO_OPTIONS}
                  ariaLabel={q.label}
                />
              )}
            />
            {fieldError(q.name) && <p className="text-sm text-destructive">{fieldError(q.name)}</p>}
          </div>
        ))}
      </div>

      <div>
        <Label htmlFor={`dogs.${index}.medicalConditions`}>Medical conditions / allergies</Label>
        <Controller
          name={`dogs.${index}.medicalConditions`}
          control={control}
          render={({ field }) => (
            <Textarea
              id={`dogs.${index}.medicalConditions`}
              placeholder="e.g., hip dysplasia, food allergy"
              rows={3}
              {...field}
              className="mt-1"
            />
          )}
        />
      </div>
    </div>
  );
};

export default DogCard;
