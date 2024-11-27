import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { HideInputs, PaymentConfig, Recipient } from "@/lib/types";
import { CrossmintProvider } from "@crossmint/client-sdk-react-ui";
import dynamic from "next/dynamic";

interface LivePreviewProps {
  clientApiKey: string;
  collectionId: string;
  paymentConfig: PaymentConfig;
  hideInputs: HideInputs;
  recipient: Recipient;
}

const CrossmintEmbeddedCheckout = dynamic(
  () =>
    import("@crossmint/client-sdk-react-ui").then(
      (mod) => mod.CrossmintEmbeddedCheckout_Alpha
    ),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export const LivePreview = ({
  clientApiKey,
  collectionId,
  paymentConfig,
  hideInputs,
  recipient,
}: LivePreviewProps) => (
  <Card>
    <CardContent className="pt-6">
      <CrossmintProvider apiKey={clientApiKey}>
        <div className="max-w-[450px] w-full mx-auto">
          <CrossmintEmbeddedCheckout
            lineItems={{
              collectionLocator: `crossmint:${collectionId}`,
              callData: {
                totalPrice: "0.001",
                quantity: 1,
              },
            }}
            payment={{
              ...paymentConfig,
              ...(hideInputs.email && recipient.email
                ? { receiptEmail: recipient.email }
                : {}),
            }}
            {...(hideInputs.destination && recipient.walletAddress
              ? { recipient: { walletAddress: recipient.walletAddress } }
              : {})}
            {...(Object.values(hideInputs).some((v) => v)
              ? {
                  appearance: {
                    rules: {
                      ...(hideInputs.email
                        ? { ReceiptEmailInput: { display: "hidden" } }
                        : {}),
                      ...(hideInputs.destination
                        ? { DestinationInput: { display: "hidden" } }
                        : {}),
                    },
                  },
                }
              : {})}
          />
        </div>
      </CrossmintProvider>
    </CardContent>
  </Card>
);
