import { PaymentToggleType } from "@/lib/types";
import { useState } from "react";

export const usePaymentConfig = () => {
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

    const handlePaymentToggle = (type: PaymentToggleType, value: boolean) => {
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

    return { paymentConfig, handlePaymentToggle };
};