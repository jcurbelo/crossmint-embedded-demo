import { isAddress } from "viem";
import { z } from "zod";


export const recipientSchema = z.object({
    email: z.string().email().optional(),
    walletAddress: z
        .string()
        .refine((val) => isAddress(val), {
            message: "Invalid Ethereum address",
        })
        .optional(),
});


export type PaymentConfig = {
    crypto: {
        enabled: boolean,
    },
    fiat: {
        enabled: boolean,
        allowedMethods: {
            card: boolean,
            googlePay: boolean,
            applePay: boolean,
        },
    },
}

export type PaymentToggleType = "crypto" | "card" | "googlePay" | "applePay";


export type HideInputs = {
    email: boolean;
    destination: boolean;
}

export type Recipient = {
    email: string;
    walletAddress: string;
}

export type Errors = {
    email: string;
    walletAddress: string;
}