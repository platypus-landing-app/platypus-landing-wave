"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddressAutocomplete, { SelectedAddress } from "@/components/AddressAutocomplete";
import { MUMBAI_CITIES } from "@/lib/schemas/trialBooking";

const AddressFields: React.FC = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const address = watch("address");

  const handleAutocompleteSelect = (sel: SelectedAddress) => {
    if (sel.addressLine) setValue("address.addressLine", sel.addressLine, { shouldValidate: true });
    if (sel.area) setValue("address.area", sel.area, { shouldValidate: true });
    if (sel.city) setValue("address.city", sel.city, { shouldValidate: true });
    if (sel.pincode) setValue("address.pincode", sel.pincode, { shouldValidate: true });
    if (sel.lat !== undefined) setValue("address.lat", sel.lat);
    if (sel.lng !== undefined) setValue("address.lng", sel.lng);
  };

  const addrErrs = (errors.address as Record<string, { message?: string }> | undefined) || {};

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="address.addressLine">Search your address *</Label>
        <Controller
          name="address.addressLine"
          control={control}
          render={({ field }) => (
            <AddressAutocomplete
              value={field.value || ""}
              onSelect={handleAutocompleteSelect}
              placeholder="Start typing your area or society..."
              className="w-full mt-1"
            />
          )}
        />
        {addrErrs.addressLine?.message && (
          <p className="text-sm text-destructive mt-1">{addrErrs.addressLine.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="address.houseFlat">Flat / Building / House no. *</Label>
        <Controller
          name="address.houseFlat"
          control={control}
          render={({ field }) => (
            <Input
              id="address.houseFlat"
              placeholder="e.g., A-1402, Lodha Park"
              {...field}
              className="mt-1"
            />
          )}
        />
        {addrErrs.houseFlat?.message && (
          <p className="text-sm text-destructive mt-1">{addrErrs.houseFlat.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="address.landmark">Landmark</Label>
        <Controller
          name="address.landmark"
          control={control}
          render={({ field }) => (
            <Input
              id="address.landmark"
              placeholder="Near Phoenix Marketcity"
              {...field}
              className="mt-1"
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="address.city">City *</Label>
          <Controller
            name="address.city"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || "Mumbai"}>
                <SelectTrigger id="address.city" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MUMBAI_CITIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {addrErrs.city?.message && (
            <p className="text-sm text-destructive mt-1">{addrErrs.city.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="address.pincode">Pincode *</Label>
          <Controller
            name="address.pincode"
            control={control}
            render={({ field }) => (
              <Input
                id="address.pincode"
                inputMode="numeric"
                maxLength={6}
                placeholder="400050"
                {...field}
                className="mt-1"
              />
            )}
          />
          {addrErrs.pincode?.message && (
            <p className="text-sm text-destructive mt-1">{addrErrs.pincode.message}</p>
          )}
        </div>
      </div>

      {address?.lat && address?.lng && (
        <p className="text-xs text-muted-foreground">
          Detected location pinned. We'll match you to the nearest Guardian.
        </p>
      )}
    </div>
  );
};

export default AddressFields;
