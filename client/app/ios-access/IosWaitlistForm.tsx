"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Schema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Enter a valid email"),
});
type FormValues = z.infer<typeof Schema>;

const STORAGE_KEY = "iosWaitlistDraft";

const IosWaitlistForm: React.FC = () => {
    const [submitted, setSubmitted] = React.useState(false);
    const [serverError, setServerError] = React.useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(Schema),
        defaultValues: { name: "", email: "" },
        mode: "onChange",
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        reset,
    } = form;

    const values = watch();
    React.useEffect(() => {
        const t = setTimeout(() => {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
            } catch {
                // localStorage may be unavailable (Safari private mode)
            }
        }, 500);
        return () => clearTimeout(t);
    }, [values]);

    React.useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed && typeof parsed === "object") {
                    reset(parsed);
                }
            }
        } catch {
            // ignore
        }
    }, [reset]);

    async function onSubmit(data: FormValues) {
        setServerError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/leads/ios-waitlist`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok || !json?.success) {
                throw new Error(json?.message || "Something went wrong. Please try again.");
            }
            setSubmitted(true);
            try {
                localStorage.removeItem(STORAGE_KEY);
            } catch {
                // ignore
            }
        } catch (err: unknown) {
            setServerError(err instanceof Error ? err.message : "Please try again.");
        }
    }

    if (submitted) {
        return (
            <div className="rounded-lg border border-input bg-background p-6 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">You&apos;re on the list.</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Watch your inbox. We&apos;ll send the App Store link the moment iOS is back.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border border-input bg-background p-6 space-y-4">
            <div className="space-y-1.5">
                <Label htmlFor="ios-name">Name</Label>
                <Input
                    id="ios-name"
                    autoComplete="name"
                    placeholder="e.g., Sneha Pandey"
                    {...register("name")}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
                <Label htmlFor="ios-email">Email</Label>
                <Input
                    id="ios-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...register("email")}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            {serverError && (
                <p className="text-sm text-destructive" role="alert">
                    {serverError}
                </p>
            )}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#247AFD] hover:bg-[#1A5BC4] text-white font-semibold"
            >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Adding you..." : "Notify me on iPhone"}
            </Button>
        </form>
    );
};

export default IosWaitlistForm;
