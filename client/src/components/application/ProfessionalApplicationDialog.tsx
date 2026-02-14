'use client';

import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, ChevronLeft, ChevronRight, Loader2, Check, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { InputOTP } from '@/components/ui/input-otp';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useApplication } from '@/contexts/ApplicationContext';
import { useToast } from '@/hooks/use-toast';
import { trackGuardianApplication } from '@/lib/analytics';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

const applicationSchema = z.object({
  // Step 1: Personal
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
  email: z.string().email('Enter a valid email address'),
  city: z.string().min(1, 'Please select your city'),
  area: z.string().min(2, 'Please enter your area'),
  // Step 2: Professional
  role: z.string().min(1, 'Please select a role'),
  experience: z.string().min(1, 'Please select your experience level'),
  hasOwnTransport: z.boolean(),
  resume: z.string().optional(),
  resumeName: z.string().optional(),
  // Step 3: Availability
  availableDays: z.array(z.string()).min(1, 'Select at least one day'),
  preferredSlots: z.array(z.string()).min(1, 'Select at least one time slot'),
  canStartImmediately: z.boolean(),
  // Step 4: About
  whyJoin: z.string().min(20, 'Please write at least 20 characters'),
  animalExperience: z.string().min(10, 'Please describe your experience with animals'),
  agreeToTerms: z.literal(true, { errorMap: () => ({ message: 'You must agree to proceed' }) }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['6 AM - 9 AM', '9 AM - 12 PM', '12 PM - 3 PM', '3 PM - 6 PM', '6 PM - 9 PM'];

export default function ProfessionalApplicationDialog() {
  const { isApplicationOpen, closeApplication } = useApplication();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP States
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      city: 'Mumbai',
      area: '',
      role: '',
      experience: '',
      hasOwnTransport: false,
      resume: '',
      resumeName: '',
      availableDays: [],
      preferredSlots: [],
      canStartImmediately: false,
      whyJoin: '',
      animalExperience: '',
      agreeToTerms: false as unknown as true,
    },
  });

  // Check reCAPTCHA readiness
  useEffect(() => {
    const check = () => {
      if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).recaptchaVerifier) {
        setRecaptchaReady(true);
      }
    };
    check();
    const interval = setInterval(check, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSendOTP = useCallback(async () => {
    const phone = form.getValues('phone');
    if (!/^\d{10}$/.test(phone)) {
      form.setError('phone', { message: 'Enter a valid 10-digit phone number' });
      return;
    }

    setOtpSending(true);
    try {
      const auth = getAuth();
      const verifier = (window as unknown as Record<string, unknown>).recaptchaVerifier as RecaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, `+91${phone}`, verifier);
      setConfirmationResult(result);
      setOtpSent(true);
      toast({ title: 'OTP Sent', description: `OTP sent to +91${phone}` });
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      if (firebaseError.code === 'auth/too-many-requests') {
        toast({ title: 'Too many attempts', description: 'Please try again later.', variant: 'destructive' });
      } else {
        toast({ title: 'OTP Error', description: firebaseError.message || 'Failed to send OTP', variant: 'destructive' });
      }
    } finally {
      setOtpSending(false);
    }
  }, [form, toast]);

  const handleVerifyOTP = useCallback(async () => {
    if (!confirmationResult || otp.length !== 6) return;

    setOtpVerifying(true);
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const idToken = await userCredential.user.getIdToken();

      // Verify with backend
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';
      await fetch(`${apiUrl}/leads/verify-phone-and-save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idToken,
          phone: form.getValues('phone'),
          fullName: form.getValues('fullName'),
          email: form.getValues('email'),
        }),
      });

      setPhoneVerified(true);
      toast({ title: 'Phone Verified', description: 'Your phone number has been verified.' });
    } catch {
      toast({ title: 'Verification Failed', description: 'Invalid OTP. Please try again.', variant: 'destructive' });
    } finally {
      setOtpVerifying(false);
    }
  }, [confirmationResult, otp, form, toast]);

  const handleResumeUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Max 5MB allowed', variant: 'destructive' });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      form.setValue('resume', reader.result as string);
      form.setValue('resumeName', file.name);
    };
    reader.readAsDataURL(file);
  }, [form, toast]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof ApplicationFormValues)[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = ['fullName', 'phone', 'email', 'city', 'area'];
        break;
      case 2:
        fieldsToValidate = ['role', 'experience'];
        break;
      case 3:
        fieldsToValidate = ['availableDays', 'preferredSlots'];
        break;
    }

    const valid = await form.trigger(fieldsToValidate);
    if (!valid) return;

    if (step === 1 && !phoneVerified) {
      toast({ title: 'Phone verification required', description: 'Please verify your phone number.', variant: 'destructive' });
      return;
    }

    setStep((s) => Math.min(s + 1, 4));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (values: ApplicationFormValues) => {
    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';
      const res = await fetch(`${apiUrl}/applications/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Submission failed');
      }

      trackGuardianApplication('complete');
      toast({ title: 'Application Submitted!', description: 'We\'ll review and get back to you within 48 hours.' });
      form.reset();
      setStep(1);
      setPhoneVerified(false);
      setOtpSent(false);
      setOtp('');
      closeApplication();
    } catch (err) {
      toast({
        title: 'Submission Failed',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressValue = (step / 4) * 100;

  return (
    <Dialog open={isApplicationOpen} onOpenChange={(open) => !open && closeApplication()}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b space-y-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Join Platypus</h2>
              <p className="text-sm text-gray-500">
                Step {step} of 4 —{' '}
                {step === 1 ? 'Personal Details' : step === 2 ? 'Professional Info' : step === 3 ? 'Availability' : 'About You'}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={closeApplication}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progressValue} className="h-1.5" />
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Step 1: Personal */}
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <div className="flex gap-2">
                          <div className="flex items-center px-3 bg-gray-100 rounded-md text-sm text-gray-600">+91</div>
                          <FormControl>
                            <Input placeholder="10-digit number" maxLength={10} {...field} disabled={phoneVerified} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!phoneVerified && !otpSent && (
                    <Button type="button" variant="outline" onClick={handleSendOTP} disabled={otpSending || !recaptchaReady}>
                      {otpSending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : 'Send OTP'}
                    </Button>
                  )}

                  {otpSent && !phoneVerified && (
                    <div className="space-y-3">
                      <FormLabel>Enter OTP</FormLabel>
                      <InputOTP
                        length={6}
                        onComplete={(value) => {
                          setOtp(value);
                        }}
                        disabled={otpVerifying}
                      />
                      <Button type="button" onClick={handleVerifyOTP} disabled={otpVerifying || otp.length < 6}>
                        {otpVerifying ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Verifying...</> : 'Verify OTP'}
                      </Button>
                    </div>
                  )}

                  {phoneVerified && (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <Check className="w-4 h-4" /> Phone verified
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Mumbai">Mumbai</SelectItem>
                            <SelectItem value="Navi Mumbai">Navi Mumbai</SelectItem>
                            <SelectItem value="Thane">Thane</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area / Locality *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Bandra West" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Step 2: Professional */}
              {step === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role You&apos;re Applying For *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dog-walker">Dog Walker (Guardian)</SelectItem>
                            <SelectItem value="dog-groomer">Dog Groomer</SelectItem>
                            <SelectItem value="dog-trainer">Dog Trainer</SelectItem>
                            <SelectItem value="pet-sitter">Pet Sitter</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience with Pets *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">No professional experience (pet owner)</SelectItem>
                            <SelectItem value="less-1">Less than 1 year</SelectItem>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5+">5+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasOwnTransport"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal">I have my own transport (bike/scooter)</FormLabel>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Resume (optional, max 5MB)</FormLabel>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors text-sm">
                        <Upload className="w-4 h-4" />
                        {form.watch('resumeName') || 'Upload Resume'}
                        <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Availability */}
              {step === 3 && (
                <>
                  <FormField
                    control={form.control}
                    name="availableDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Days *</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {days.map((day) => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => {
                                const current = field.value;
                                field.onChange(
                                  current.includes(day) ? current.filter((d) => d !== day) : [...current, day]
                                );
                              }}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                field.value.includes(day)
                                  ? 'bg-[#0088FF] text-white border-[#0088FF]'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#0088FF]'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredSlots"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time Slots *</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => {
                                const current = field.value;
                                field.onChange(
                                  current.includes(slot) ? current.filter((s) => s !== slot) : [...current, slot]
                                );
                              }}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                field.value.includes(slot)
                                  ? 'bg-[#0088FF] text-white border-[#0088FF]'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#0088FF]'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="canStartImmediately"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal">I can start immediately</FormLabel>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Step 4: About You */}
              {step === 4 && (
                <>
                  <FormField
                    control={form.control}
                    name="whyJoin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why do you want to join Platypus? *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us what excites you about this role..." rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="animalExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe your experience with animals *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Do you have pets? Have you cared for dogs before?" rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex items-start gap-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal text-sm leading-snug">
                          I confirm the information provided is accurate and I agree to Platypus&apos;s terms of service and background verification process. *
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </form>
          </Form>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 pt-4 border-t flex justify-between flex-shrink-0">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button type="button" onClick={nextStep}>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application <Check className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          )}
        </div>
        {step === 4 && (
          <p className="text-[10px] text-center text-muted-foreground/70 pb-3">
            Protected by reCAPTCHA. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy</a> · <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">Terms</a>
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
