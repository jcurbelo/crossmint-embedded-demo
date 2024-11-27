"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentMethods } from "@/components/PaymentMethods";
import { RecipientFields } from "@/components/RecipientFields";
import { CodePreview } from "@/components/CodePreview";
import { LivePreview } from "@/components/LivePreview";
import { usePaymentConfig } from "@/hooks/usePaymentConfig";
import { useRecipientConfig } from "@/hooks/useRecipientConfig";
import { generateCheckoutCode } from "@/lib/codeGenerator";

const clientApiKey = process.env.NEXT_PUBLIC_CLIENT_API_KEY as string;
const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID as string;

export default function Home() {
  const { paymentConfig, handlePaymentToggle } = usePaymentConfig();

  const {
    recipient,
    errors,
    hideInputs,
    handleRecipientChange,
    handleHideInputToggle,
  } = useRecipientConfig();

  if (!clientApiKey || !collectionId) {
    return <div>Missing environment variables</div>;
  }

  const code = generateCheckoutCode({ paymentConfig, hideInputs, recipient });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-50 gap-6">
      <div className="grid gap-6 mt-6 w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6">
              <PaymentMethods
                paymentConfig={paymentConfig}
                onToggle={handlePaymentToggle}
              />
              <RecipientFields
                recipient={recipient}
                errors={errors}
                hideInputs={hideInputs}
                onRecipientChange={handleRecipientChange}
                onHideInputToggle={handleHideInputToggle}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="live">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="live">Live Preview</TabsTrigger>
            <TabsTrigger value="code">Generated Code</TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            <LivePreview
              clientApiKey={clientApiKey}
              collectionId={collectionId}
              paymentConfig={paymentConfig}
              hideInputs={hideInputs}
              recipient={recipient}
            />
          </TabsContent>

          <TabsContent value="code">
            <CodePreview code={code} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
