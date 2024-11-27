import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PaymentConfig, PaymentToggleType } from "@/lib/types";

interface PaymentMethodsProps {
  paymentConfig: PaymentConfig;
  onToggle: (type: PaymentToggleType, value: boolean) => void;
}

export const PaymentMethods = ({
  paymentConfig,
  onToggle,
}: PaymentMethodsProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Payment Methods</h3>
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="crypto-enabled">Crypto Payments</Label>
        <Switch
          id="crypto-enabled"
          checked={paymentConfig.crypto.enabled}
          onCheckedChange={(checked) => onToggle("crypto", checked)}
        />
      </div>

      {Object.entries(paymentConfig.fiat.allowedMethods).map(
        ([method, enabled]) => (
          <div key={method} className="flex items-center justify-between">
            <Label htmlFor={`${method}-enabled`}>
              {method.charAt(0).toUpperCase() +
                method.slice(1).replace(/([A-Z])/g, " $1")}
            </Label>
            <Switch
              id={`${method}-enabled`}
              checked={enabled}
              onCheckedChange={(checked) =>
                onToggle(method as PaymentToggleType, checked)
              }
            />
          </div>
        )
      )}
    </div>
  </div>
);
