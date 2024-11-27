import { HideInputs, PaymentConfig, Recipient } from "@/lib/types";

export const generateCheckoutCode = ({
    paymentConfig,
    hideInputs,
    recipient,
}: {
    paymentConfig: PaymentConfig;
    hideInputs: HideInputs;
    recipient: Recipient;
}) => {

    const formattedPaymentConfig = JSON.stringify(paymentConfig, null, 2)
        .replace(/"([^"]+)":/g, '$1:')
        .split('\n')
        .map((line, index) => (index === 0 ? line : `        ${line}`))
        .join('\n');

    const appearanceRules = Object.values(hideInputs).some((v) => v)
        ? `\n        appearance={{
          rules: {${hideInputs.email ? '\n            ReceiptEmailInput: { display: "hidden" },' : ""}${hideInputs.destination ? '\n            DestinationInput: { display: "hidden" },' : ""
        }
          }
        }}`
        : "";

    const recipientConfig = !recipient.email && recipient.walletAddress
        ? `\n        recipient={{
          walletAddress: "${recipient.walletAddress}"
        }}`
        : "";

    const emailConfig =
        !recipient.walletAddress && recipient.email
            ? `\n        payment={{
          receiptEmail: "${recipient.email}"
        }}`
            : "";

    return `
<div className="flex flex-col items-center justify-start h-screen p-6 bg-white">
  <CrossmintProvider apiKey={clientApiKey}>
    <div className="max-w-[450px] w-full">
      <CrossmintEmbeddedCheckout
        lineItems={{
          collectionLocator: \`crossmint:\${collectionId}\`,
          callData: {
            totalPrice: "0.001",
            quantity: 1,
          },
        }}
        payment={${formattedPaymentConfig}}${emailConfig}${recipientConfig}${appearanceRules}
      />
    </div>
  </CrossmintProvider>
</div>`;
};