import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Trash2, X, Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { trackTrialBooking } from "@/lib/analytics";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputOTP } from "@/components/ui/input-otp";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useKeyboardHeight } from "@/hooks/use-keyboard-height";
import AddressAutocomplete, { SelectedAddress } from "@/components/AddressAutocomplete";
import { useBooking } from "@/contexts/BookingContext";
// Removed react-google-recaptcha-v3 to prevent conflicts with Firebase Enterprise reCAPTCHA
import { auth } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";

// Add this import for TypeScript declaration
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    recaptchaWidgetId?: number;
  }
}

// Common dog breeds for India
const DOG_BREEDS = [
  "Labrador Retriever",
  "Golden Retriever",
  "German Shepherd",
  "Beagle",
  "Pug",
  "Shih Tzu",
  "Pomeranian",
  "Indian Spitz",
  "Indian Pariah Dog",
  "Siberian Husky",
  "Rottweiler",
  "Dachshund",
  "Cavalier King Charles Spaniel",
  "Boxer",
  "French Bulldog",
  "Great Dane",
  "Rajapalayam",
  "Chippiparai",
  "Kombai",
  "Jonangi",
  "Haofa (Tangkhul Hui)",
  "Bakharwal Dog",
  "Kanni",
  "Rampur Greyhound",
  "Gull Terrier",
  "Other"
];

const TIME_SLOTS = [
  { value: "morning", label: "Morning (6 AM - 10 AM)" },
  { value: "evening", label: "Evening (6 PM - 10 PM)" }
];

const DogSchema = z.object({
  name: z.string().min(1, "Dog name is required"),
  breed: z.string().min(1, "Breed is required"),
  breedOther: z.string().optional(),
  age: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : Number(v)), 
    z.number({ invalid_type_error: "Enter a valid age" })
      .min(0, "Age can't be negative")
      .max(30, "Please enter a valid age")
  ),
  specialNotes: z.string().optional(),
}).refine((data) => {
  if (data.breed === "Other") {
    return data.breedOther && data.breedOther.trim().length > 0;
  }
  return true;
}, {
  message: "Please specify the breed",
  path: ["breedOther"],
});

const TrialBookingSchema = z.object({
  // Step 1: Pet Parent Details
  fullName: z.string().min(2, "Name is too short"),
  mobile: z.string().regex(/^\d{10}$/g, "Enter 10-digit mobile number"),
  whatsappEnabled: z.boolean().default(true),
  email: z.string().optional(),
  
  // Step 2: Dog Details
  dogs: z.array(DogSchema).min(1, "Please add at least one dog"),
  
  // Step 3: Walk Preferences & Safety
  preferredDate: z.date({ required_error: "Please select a date" }),
  timeSlot: z.string().min(1, "Please select a time slot"),
  location: z.string().min(1, "Please enter your location"),
  vaccinationsUpToDate: z.boolean().refine((v) => v === true, {
    message: "Vaccination confirmation is required",
  }),
  superviseHandover: z.boolean().refine((v) => v === true, {
    message: "Please agree to supervise the first handover",
  }),
});

export type TrialBookingFormValues = z.infer<typeof TrialBookingSchema>;

const STORAGE_KEY = "trialBookingDraft";

const defaultValues: TrialBookingFormValues = {
  fullName: "",
  mobile: "",
  whatsappEnabled: true,
  email: "",
  dogs: [{ name: "", breed: "", breedOther: "", age: undefined as any, specialNotes: "" }],
  preferredDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
  timeSlot: "",
  location: "Mumbai", // Smart default
  vaccinationsUpToDate: false,
  superviseHandover: false,
};

const TrialBookingDialog: React.FC = () => {
  const { isTrialBookingOpen, closeTrialBooking } = useBooking();
  const [step, setStep] = React.useState(1);
  const [countdown, setCountdown] = React.useState(0);
  const { keyboardHeight, isKeyboardVisible } = useKeyboardHeight();

  // Firebase Phone Auth states
  const [phoneVerified, setPhoneVerified] = React.useState(false);
  const [otpSent, setOtpSent] = React.useState(false);
  const [otpSending, setOtpSending] = React.useState(false);
  const [otpVerifying, setOtpVerifying] = React.useState(false);
  const [recaptchaReady, setRecaptchaReady] = React.useState(false);
  const [confirmationResult, setConfirmationResult] = React.useState<ConfirmationResult | null>(null);
  const [userInteracted, setUserInteracted] = React.useState(false); // Track if user manually changed phone
  const [rateLimitError, setRateLimitError] = React.useState(false); // Track rate limit errors
  const [lastPhoneNumber, setLastPhoneNumber] = React.useState<string>(''); // Track the last phone number we sent OTP to
  // Note: recaptchaContainerRef removed - using global reCAPTCHA from FirebaseRecaptcha component

  const form = useForm<TrialBookingFormValues>({
    resolver: zodResolver(TrialBookingSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    formState: { isSubmitting, errors },
  } = form;

  const { fields: dogFields, append: appendDog, remove: removeDog } = useFieldArray({
    control,
    name: "dogs",
  });

  // Auto-save to localStorage
  const formValues = watch();
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [formValues]);

  // Restore from localStorage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Convert date string back to Date object
        if (parsed.preferredDate) {
          parsed.preferredDate = new Date(parsed.preferredDate);
        }
        
        // Migration: Convert old single dog format to new array format
        if (parsed.dogName && !parsed.dogs) {
          parsed.dogs = [{
            name: parsed.dogName || "",
            breed: parsed.dogBreed || "",
            breedOther: parsed.dogBreedOther || "",
            age: parsed.dogAge,
            specialNotes: parsed.specialNotes || "",
          }];
          // Remove old fields
          delete parsed.dogName;
          delete parsed.dogBreed;
          delete parsed.dogBreedOther;
          delete parsed.dogAge;
          delete parsed.specialNotes;
        }
        
        form.reset(parsed);
      }
    } catch (error) {
      // Silent fail - form data restoration is not critical
    }
  }, [form]);

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await trigger(["fullName", "mobile"]);
      if (!isValid) return;

      // Check phone verification
      if (!phoneVerified) {
        toast({
          title: "Phone Verification Required",
          description: "Please verify your phone number to continue",
          variant: "destructive",
        });
        return;
      }

      setStep(step + 1);
    } else if (step === 2) {
      const isValid = await trigger("dogs");
      if (isValid) {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const addDog = () => {
    appendDog({ name: "", breed: "", breedOther: "", age: undefined as any, specialNotes: "" });
  };

  // Watch phone number for reCAPTCHA initialization
  const phoneValue = watch('mobile');

  // Check for global reCAPTCHA verifier and mark as ready
  // reCAPTCHA is initialized globally on page load, so we just need to check if it exists
  React.useEffect(() => {
    if (window.recaptchaVerifier) {
      console.log('✅ Using global reCAPTCHA verifier for phone OTP');
      setRecaptchaReady(true);
    } else {
      console.log('⏳ Waiting for global reCAPTCHA to initialize...');
      // Poll for reCAPTCHA to be ready (it should load within 1-2 seconds of page load)
      const checkInterval = setInterval(() => {
        if (window.recaptchaVerifier) {
          console.log('✅ Global reCAPTCHA ready for use');
          setRecaptchaReady(true);
          clearInterval(checkInterval);
        }
      }, 100);

      // Stop checking after 10 seconds
      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.recaptchaVerifier) {
          console.error('❌ Global reCAPTCHA failed to initialize');
        }
      }, 10000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    }
  }, []);

  // Reset states when dialog closes (but don't clear global reCAPTCHA)
  React.useEffect(() => {
    if (!isTrialBookingOpen) {
      setRecaptchaReady(false);
      setOtpSent(false);
      setPhoneVerified(false);
      setConfirmationResult(null);
      setLastPhoneNumber('');
      // Note: We don't clear window.recaptchaVerifier as it's global and reused
    }
  }, [isTrialBookingOpen]);

  // Firebase Phone Auth Functions
  const handleSendOTP = async () => {
    if (!phoneValue || phoneValue.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    if (!window.recaptchaVerifier) {
      toast({
        title: "reCAPTCHA Not Ready",
        description: "Please wait for reCAPTCHA to load or solve the challenge",
        variant: "destructive",
      });
      return;
    }

    try {
      setOtpSending(true);
      setLastPhoneNumber(phoneValue); // Track the phone number we're attempting
      const formattedPhone = `+91${phoneValue}`;

      console.log('📤 Attempting to send OTP...');
      console.log('  Phone:', formattedPhone);
      console.log('  reCAPTCHA Verifier:', window.recaptchaVerifier);
      console.log('  reCAPTCHA Type:', window.recaptchaVerifier.type);
      console.log('  Widget ID:', window.recaptchaWidgetId);

      const result = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);

      console.log('✅ OTP sent successfully');
      setConfirmationResult(result);
      setOtpSent(true);

      toast({
        title: "OTP Sent!",
        description: "Please check your phone for the 6-digit code",
      });
    } catch (error: any) {
      console.error('❌ OTP send error:', error);

      // Check if it's a rate limit error
      if (error.code === 'auth/too-many-requests') {
        setRateLimitError(true);
        toast({
          title: "Too Many Requests",
          description: "Please wait a few minutes before trying again. Firebase has temporarily blocked OTP requests from this device.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to Send OTP",
          description: error.message || "Please try again",
          variant: "destructive",
        });
      }

      // Note: We don't reset the global reCAPTCHA on error
      // It remains available for retry attempts
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    if (!confirmationResult) {
      toast({
        title: "Error",
        description: "Please request a new OTP",
        variant: "destructive",
      });
      return;
    }

    try {
      setOtpVerifying(true);

      // Confirm the OTP with Firebase
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Get Firebase ID token
      const idToken = await user.getIdToken();

      // Send to backend for verification and partial lead save
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/leads/verify-phone-and-save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idToken,
          phone: phoneValue,
          fullName: watch('fullName'),
          email: watch('email'),
          whatsappEnabled: watch('whatsappEnabled'),
          formData: form.getValues()
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPhoneVerified(true);
        toast({
          title: "Phone Verified!",
          description: "Your contact information has been saved",
        });
      } else {
        throw new Error(data.message || "Verification failed");
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast({
        title: "Verification Failed",
        description: error.code === 'auth/invalid-verification-code'
          ? "Invalid OTP code. Please try again"
          : error.message || "Please check your OTP and try again",
        variant: "destructive",
      });
    } finally {
      setOtpVerifying(false);
    }
  };

  // Reset OTP states when phone number changes
  React.useEffect(() => {
    // Reset OTP states when user changes to a different phone number
    if (phoneValue && phoneValue !== lastPhoneNumber && phoneValue.length >= 1) {
      console.log(`📱 Phone number changed from ${lastPhoneNumber} to ${phoneValue}, resetting states...`);

      setOtpSent(false);
      setPhoneVerified(false);
      setRateLimitError(false);
      setConfirmationResult(null);
      // Note: We don't clear recaptchaReady or window.recaptchaVerifier
      // because it's global and should remain initialized
    }
  }, [phoneValue, lastPhoneNumber, isTrialBookingOpen]);

  // Auto-send OTP when phone number is complete and reCAPTCHA is ready
  React.useEffect(() => {
    if (
      phoneValue?.length === 10 &&
      recaptchaReady &&
      !phoneVerified &&
      !otpSent &&
      !otpSending &&
      !rateLimitError &&
      phoneValue !== lastPhoneNumber // Only auto-send for new numbers
    ) {
      console.log('📲 Phone number complete and reCAPTCHA ready - auto-sending OTP');
      handleSendOTP();
    }
  }, [phoneValue, recaptchaReady, phoneVerified, otpSent, otpSending, rateLimitError, lastPhoneNumber]);

async function onSubmit(values: TrialBookingFormValues) {
  try {
    // reCAPTCHA v3 removed to prevent conflicts with Firebase Enterprise reCAPTCHA
    // Backend rate limiting still provides spam protection
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings/save-send-booking-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Booking failed");
    }

    // Track conversion
    trackTrialBooking(values.address || 'website');

    // Success toast
    toast({
      title: "✅ Booking Successful",
      description: "Your trial booking has been submitted successfully!",
    });

    // Reset form and localStorage
    form.reset(defaultValues);
    localStorage.removeItem(STORAGE_KEY);

    // Reset OTP states
    setPhoneVerified(false);
    setOtpSent(false);
    setOtpSending(false);
    setOtpVerifying(false);
    setStep(1);

    closeTrialBooking();
  } catch (err: any) {
    // Error already shown to user via toast
    toast({
      title: "❌ Booking Failed",
      description: err.message || "Something went wrong. Please try again.",
      variant: "destructive",
    });
  }
}



  const progressValue = (step / 3) * 100;
  
  // Calculate dynamic height based on keyboard visibility
  const dialogHeight = isKeyboardVisible 
    ? `calc(100vh - ${keyboardHeight + 40}px)` 
    : '85vh';

  return (
    <Dialog open={isTrialBookingOpen} onOpenChange={closeTrialBooking}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden sm:top-[50%] top-[20%] sm:translate-y-[-50%] translate-y-[-20%]">
        <div
          className="flex flex-col"
          style={{
            height: dialogHeight,
            maxHeight: dialogHeight,
            transition: 'height 0.3s ease-in-out'
          }}
        >
          {/* Close button with a subtle blurry background */}
<button
  type="button"
  onClick={closeTrialBooking}
  aria-label="Close"
  className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full flex items-center justify-center
             bg-white/40 backdrop-blur-[2px] shadow-sm hover:scale-105 transition-transform duration-150
             ring-1 ring-black/10"
>
  <X className="w-4 h-4 text-black" />
</button>

          {/* Header */}
          <div className="shrink-0 bg-background px-6 py-4 border-b">
            <DialogHeader className="p-0">
              <DialogTitle>
                Book Your Dog's Trial Walk in 30 Seconds
              </DialogTitle>
              <DialogDescription>
                Fill out the details below, and our team will confirm your booking via WhatsApp.
              </DialogDescription>
            </DialogHeader>
            
            {/* Progress Bar */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Step {step} of 3</span>
                <span>{Math.round(progressValue)}% complete</span>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <Form {...form}>
              <div className="space-y-6">
                
                {/* Step 1: Pet Parent Details */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Pet Parent Details</h3>
                    </div>

                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Sneha Pandey" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number *</FormLabel>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                              +91
                            </span>
                            <FormControl>
                              <Input
                                className="rounded-l-none"
                                inputMode="numeric"
                                maxLength={10}
                                placeholder="10-digit number"
                                {...field}
                                disabled={phoneVerified}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />

                          {/* Send OTP Button - shows when phone is complete and global reCAPTCHA is ready */}
                          {!phoneVerified && !otpSent && field.value?.length === 10 && recaptchaReady && !otpSending && (
                            <div className="mt-3">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleSendOTP}
                                className="text-xs"
                              >
                                Send OTP
                              </Button>
                            </div>
                          )}

                          {/* OTP Sending Status */}
                          {otpSending && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending OTP...</span>
                            </div>
                          )}

                          {/* Phone Verified Status */}
                          {phoneVerified && (
                            <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                              <Check className="h-4 w-4" />
                              <span>Phone verified</span>
                            </div>
                          )}
                        </FormItem>
                      )}
                    />

                    {/* OTP Input */}
                    {otpSent && !phoneVerified && (
                      <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                        <div className="space-y-2">
                          <FormLabel>Enter Verification Code</FormLabel>
                          <FormDescription>
                            Enter the 6-digit code sent to your phone
                          </FormDescription>
                          <InputOTP
                            length={6}
                            onComplete={handleVerifyOTP}
                            disabled={otpVerifying}
                          />
                          {otpVerifying && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Verifying...</span>
                            </div>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          onClick={handleSendOTP}
                          disabled={otpSending}
                          className="px-0 h-auto text-primary"
                        >
                          {otpSending ? "Sending..." : "Resend OTP"}
                        </Button>
                      </div>
                    )}

                    <FormField
                      control={form.control}
                      name="whatsappEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              This number is WhatsApp-enabled
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address <span className="text-muted-foreground">(Optional)</span></FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            For confirmations and updates
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 2: Dog Details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Dog Details</h3>
                      {dogFields.length > 1 && (
                        <span className="text-sm text-muted-foreground">
                          {dogFields.length} dog{dogFields.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    {dogFields.map((field, index) => (
                      <div key={field.id} className="space-y-4 p-4 border rounded-lg bg-muted/20">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">
                            Dog {index + 1}
                          </h4>
                          {dogFields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDog(index)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <FormField
                          control={form.control}
                          name={`dogs.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dog's Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Simba" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`dogs.${index}.breed`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dog's Breed *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select breed" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-h-64">
                                  {DOG_BREEDS.map((breed) => (
                                    <SelectItem key={breed} value={breed}>
                                      {breed}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {watch(`dogs.${index}.breed`) === "Other" && (
                          <FormField
                            control={form.control}
                            name={`dogs.${index}.breedOther`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Please specify breed *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter breed name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormField
                          control={form.control}
                          name={`dogs.${index}.age`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dog's Age (in years) *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  max="30" 
                                  placeholder="e.g., 3" 
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`dogs.${index}.specialNotes`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Special Needs or Health Notes</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="e.g., Paralysis, anxiety, senior dog, leash pulling"
                                  rows={3}
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Any important information about your dog's health or behavior
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addDog}
                      className="w-full flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Another Dog
                    </Button>
                  </div>
                )}

                {/* Step 3: Walk Preferences & Safety */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Walk Preferences & Safety</h3>
                    </div>

                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Preferred Walk Date *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Defaults to next available slot
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeSlot"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Time Slot *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time slot" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TIME_SLOTS.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value}>
                                  {slot.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location / Area *</FormLabel>
                          <FormControl>
                            <AddressAutocomplete
                              value={field.value}
                              onSelect={(address: SelectedAddress) => {
                                field.onChange(address.addressLine || `${address.area}, ${address.city}`.replace(/^, |, $/, ''));
                              }}
                              placeholder="Search your address"
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4 border-t pt-4">
                      <h4 className="font-medium text-foreground">Safety Confirmation</h4>
                      
                      <FormField
                        control={form.control}
                        name="vaccinationsUpToDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I confirm my dog's vaccinations are up-to-date *
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="superviseHandover"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I agree to supervise the first trial walk handover *
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
                        <strong>Trust & Safety:</strong> Platypus Guardians follow strict hygiene, safety, and backup protocols to ensure uninterrupted service.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Form>
          </div>

          {/* Footer Navigation */}
          <div className="shrink-0 bg-muted/50 px-6 py-4 border-t">
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={step === 1 && !phoneVerified}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#397CEF] hover:bg-[#397CEF]/90 text-white font-semibold px-8"
                  >
                    {isSubmitting ? "Booking..." : "Book My Trial Walk Now"}
                  </Button>
                </form>
              )}
            </div>

            {step === 3 && (
              <div className="text-center mt-3 space-y-1">
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  🔒 Your details are 100% safe with us
                </div>
                <p className="text-[10px] text-muted-foreground/70">
                  Protected by reCAPTCHA. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy</a> · <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">Terms</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrialBookingDialog;