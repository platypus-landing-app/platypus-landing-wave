import { z } from "zod";

export const PINCODE_REGEX = /^\d{6}$/;
export const MUMBAI_CITIES = ["Mumbai", "Navi Mumbai", "Thane"] as const;
export type ServiceCity = typeof MUMBAI_CITIES[number] | string;

export const AddressSchema = z.object({
  houseFlat: z.string().min(1, "Flat / building / house no. is required"),
  addressLine: z.string().min(1, "Address is required"),
  landmark: z.string().optional(),
  area: z.string().optional(),
  city: z.string().min(1, "City is required"),
  pincode: z.string().regex(PINCODE_REGEX, "Enter a valid 6-digit pincode"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});
export type Address = z.infer<typeof AddressSchema>;

export const TernarySchema = z.enum(["yes", "no", "sometimes"]);
export const YesNoSchema = z.enum(["yes", "no"]);

export const DogSchema = z.object({
  name: z.string().min(1, "Dog name is required"),
  breed: z.string().min(1, "Breed is required"),
  breedOther: z.string().optional(),
  age: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : Number(v)),
    z.number({ invalid_type_error: "Enter a valid age" })
      .min(0, "Age can't be negative")
      .max(30, "Please enter a valid age")
  ),
  gender: z.enum(["male", "female"], { required_error: "Select a gender" }),
  weightKg: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : Number(v)),
    z.number().min(0).max(100).optional()
  ),
  friendlyWithStrangers: TernarySchema,
  aggressive: YesNoSchema,
  leashTrained: YesNoSchema,
  vaccinated: YesNoSchema.refine((v) => v === "yes", {
    message: "Vaccinations must be up to date for a trial walk",
  }),
  medicalConditions: z.string().optional(),

  // legacy — temporary shim
  specialNotes: z.string().optional(),
}).refine((data) => {
  if (data.breed === "Other") {
    return data.breedOther && data.breedOther.trim().length > 0;
  }
  return true;
}, { message: "Please specify the breed", path: ["breedOther"] });
export type Dog = z.infer<typeof DogSchema>;

export const TIME_SLOT_VALUES = ["morning", "afternoon", "evening", "night"] as const;
export const TIME_SLOTS = [
  { value: "morning",   label: "Morning (6 AM to 10 AM)" },
  { value: "afternoon", label: "Afternoon (12 PM to 3 PM)" },
  { value: "evening",   label: "Evening (4 PM to 7 PM)" },
  { value: "night",     label: "Night (7 PM to 10 PM)" },
] as const;

export const TrialBookingSchema = z.object({
  // Section 1
  fullName: z.string().min(2, "Name is too short"),
  mobile: z.string().regex(/^\d{10}$/g, "Enter a 10-digit mobile number"),
  whatsappEnabled: z.boolean().default(true),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  address: AddressSchema,

  // Section 2
  dogs: z.array(DogSchema).min(1, "Please add at least one dog"),

  // Section 3
  preferredDate: z.date({ required_error: "Please select a date" }),
  walksPerDay: z.enum(["1", "2", "3", "custom"]),
  walksPerDayCustom: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : Number(v)),
    z.number().min(4).max(10).optional()
  ),
  timeSlots: z.array(z.enum(TIME_SLOT_VALUES)).min(1, "Pick at least one time slot"),
  durationMinutes: z.enum(["30", "60"]),
  currentSituation: z.enum(["no_walker", "unsatisfied", "exploring"]),
  superviseHandover: z.boolean().refine((v) => v === true, {
    message: "Please agree to supervise the first handover",
  }),

  // Section 8
  contactConsent: z.boolean().refine((v) => v === true, {
    message: "Consent to contact is required to submit",
  }),
  accuracyConfirmed: z.boolean().refine((v) => v === true, {
    message: "Please confirm details are accurate",
  }),

  // legacy — temporary shim
  location: z.string().optional(),
  vaccinationsUpToDate: z.boolean().optional(),
  timeSlot: z.string().optional(),
}).refine((data) => {
  if (data.walksPerDay === "custom") return data.walksPerDayCustom !== undefined;
  return true;
}, { message: "Enter a custom walks-per-day value", path: ["walksPerDayCustom"] });
export type TrialBookingFormValues = z.infer<typeof TrialBookingSchema>;

export const EnrichmentSchema = z.object({
  serviceInterests: z.array(
    z.enum(["grooming", "sitting", "training", "vet", "smart_collar"])
  ).default([]),
  triggers: z.string().optional(),
  walkerNotes: z.string().optional(),
  commitmentType: z.enum(["monthly", "trial", "on_demand"]).optional(),
  notifyOnLaunch: z.boolean().default(false),
});
export type EnrichmentFormValues = z.infer<typeof EnrichmentSchema>;

export function makeDefaultTrialBookingValues(): TrialBookingFormValues {
  return {
    fullName: "",
    mobile: "",
    whatsappEnabled: true,
    email: "",
    address: {
      houseFlat: "",
      addressLine: "",
      landmark: "",
      area: "",
      city: "Mumbai",
      pincode: "",
      lat: undefined,
      lng: undefined,
    },
    dogs: [{
      name: "", breed: "", breedOther: "", age: undefined as any,
      gender: undefined as any, weightKg: undefined,
      friendlyWithStrangers: undefined as any, aggressive: undefined as any,
      leashTrained: undefined as any, vaccinated: undefined as any,
      medicalConditions: "",
    }],
    // Computed at call-time so the suggested date is always tomorrow,
    // even after long tab-restores.
    preferredDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    walksPerDay: "1",
    walksPerDayCustom: undefined,
    timeSlots: [],
    durationMinutes: "30",
    currentSituation: "no_walker",
    superviseHandover: false,
    contactConsent: false,
    accuracyConfirmed: false,
    location: "Mumbai",
    vaccinationsUpToDate: false,
    timeSlot: "",
  };
}

/** @deprecated Use makeDefaultTrialBookingValues() instead — frozen module-load date causes stale defaults. */
export const defaultTrialBookingValues: TrialBookingFormValues = makeDefaultTrialBookingValues();
