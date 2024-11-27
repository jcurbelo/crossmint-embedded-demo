import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Errors, HideInputs, Recipient } from "@/lib/types";

interface RecipientFieldsProps {
  recipient: Recipient;
  errors: Errors;
  hideInputs: HideInputs;
  onRecipientChange: (field: "email" | "walletAddress", value: string) => void;
  onHideInputToggle: (field: keyof HideInputs, value: boolean) => void;
}

export const RecipientFields = ({
  recipient,
  errors,
  hideInputs,
  onRecipientChange,
  onHideInputToggle,
}: RecipientFieldsProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Recipient Configuration</h3>
    <div className="grid gap-4">
      {/* Email Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="email-input">Email Input</Label>
          <Switch
            id="hide-email"
            checked={!hideInputs.email}
            onCheckedChange={(checked) => onHideInputToggle("email", !checked)}
          />
        </div>
        <Input
          id="email-input"
          type="email"
          placeholder="Email address"
          value={recipient.email}
          onChange={(e) => onRecipientChange("email", e.target.value)}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Wallet Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="wallet-input">Wallet Input</Label>
          <Switch
            id="hide-destination"
            checked={!hideInputs.destination}
            onCheckedChange={(checked) =>
              onHideInputToggle("destination", !checked)
            }
          />
        </div>
        <Input
          id="wallet-input"
          type="text"
          placeholder="Wallet address"
          value={recipient.walletAddress}
          onChange={(e) => onRecipientChange("walletAddress", e.target.value)}
          className={errors.walletAddress ? "border-red-500" : ""}
        />
        {errors.walletAddress && (
          <p className="mt-1 text-sm text-red-500">{errors.walletAddress}</p>
        )}
      </div>
    </div>
  </div>
);
