"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { CrossmintProvider } from "@crossmint/client-sdk-react-ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const clientApiKey = process.env.NEXT_PUBLIC_CLIENT_API_KEY as string;
const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID as string;

const CrossmintEmbeddedCheckout = dynamic(
  () =>
    import("@crossmint/client-sdk-react-ui").then(
      (mod) => mod.CrossmintEmbeddedCheckout_Alpha
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-64 bg-gray-50 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    ),
  }
);

type PaymentToggleType = "crypto" | "card" | "googlePay" | "applePay";

export default function Home() {
  const [paymentConfig, setPaymentConfig] = useState({
    crypto: {
      enabled: true,
    },
    fiat: {
      enabled: true,
      allowedMethods: {
        card: true,
        googlePay: true,
        applePay: true,
      },
    },
  });

  const handleToggle = (type: PaymentToggleType, value: boolean) => {
    setPaymentConfig((prev) => {
      const newConfig = { ...prev };

      switch (type) {
        case "crypto":
          newConfig.crypto.enabled = value;
          break;
        case "card":
        case "googlePay":
        case "applePay":
          newConfig.fiat.allowedMethods[type] = value;
          break;
      }

      return newConfig;
    });
  };

  if (!clientApiKey || !collectionId) {
    return <div>Missing environment variables</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-50 gap-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Payment Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="crypto-enabled">Crypto Payments</Label>
              <Switch
                id="crypto-enabled"
                checked={paymentConfig.crypto.enabled}
                onCheckedChange={(checked) => handleToggle("crypto", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="card-enabled">Card Payments</Label>
              <Switch
                id="card-enabled"
                checked={paymentConfig.fiat.allowedMethods.card}
                onCheckedChange={(checked) => handleToggle("card", checked)}
                disabled={!paymentConfig.fiat.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="google-pay-enabled">Google Pay</Label>
              <Switch
                id="google-pay-enabled"
                checked={paymentConfig.fiat.allowedMethods.googlePay}
                onCheckedChange={(checked) =>
                  handleToggle("googlePay", checked)
                }
                disabled={!paymentConfig.fiat.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="apple-pay-enabled">Apple Pay</Label>
              <Switch
                id="apple-pay-enabled"
                checked={paymentConfig.fiat.allowedMethods.applePay}
                onCheckedChange={(checked) => handleToggle("applePay", checked)}
                disabled={!paymentConfig.fiat.enabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <CrossmintProvider apiKey={clientApiKey}>
        <div className="max-w-[450px] w-full">
          <CrossmintEmbeddedCheckout
            lineItems={{
              collectionLocator: `crossmint:${collectionId}`,
              callData: {
                totalPrice: "0.001",
                quantity: 1,
              },
            }}
            payment={paymentConfig}
          />
        </div>
      </CrossmintProvider>
    </div>
  );
}
