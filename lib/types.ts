import { z } from "zod";

export const isValidEthereumAddress = (address: string): boolean => {
    try {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    } catch {
        return false;
    }
}

export const recipientSchema = z.object({
    email: z.string().email().optional(),
    walletAddress: z
        .string()
        .refine((val) => isValidEthereumAddress(val), {
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