import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputOTPProps extends React.InputHTMLAttributes<HTMLInputElement> {
  length?: number;
  onComplete?: (value: string) => void;
}

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  ({ className, length = 6, onComplete, ...props }, ref) => {
    const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(""));
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
      // Only allow digits
      if (value && !/^\d+$/.test(value)) return;

      const newOtp = [...otp];
      // Take only the first character if pasting multiple
      newOtp[index] = value.slice(0, 1);
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Call onComplete when all digits are entered
      if (newOtp.every((digit) => digit !== "") && onComplete) {
        onComplete(newOtp.join(""));
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text/plain").slice(0, length);

      if (!/^\d+$/.test(pastedData)) return;

      const newOtp = pastedData.split("").concat(new Array(length).fill("")).slice(0, length);
      setOtp(newOtp);

      // Focus the next empty input or the last one
      const nextIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();

      // Call onComplete if all digits are filled
      if (newOtp.every((digit) => digit !== "") && onComplete) {
        onComplete(newOtp.join(""));
      }
    };

    return (
      <div className="flex gap-2 justify-center items-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
              if (index === 0 && ref) {
                if (typeof ref === "function") {
                  ref(el);
                } else {
                  ref.current = el;
                }
              }
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-md border border-input bg-background text-center text-lg font-semibold text-foreground transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-primary",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
        ))}
      </div>
    );
  }
);

InputOTP.displayName = "InputOTP";

export { InputOTP };
