import { HideInputs, recipientSchema } from "@/lib/types";
import { useState } from "react";
import { z } from "zod";

export const useRecipientConfig = () => {
    const [recipient, setRecipient] = useState({
        email: "",
        walletAddress: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        walletAddress: "",
    });

    const [hideInputs, setHideInputs] = useState({
        email: false,
        destination: false,
    });

    const validateField = (field: "email" | "walletAddress", value: string) => {
        try {
            recipientSchema.shape[field].parse(value);
            setErrors(prev => ({ ...prev, [field]: "" }));
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
            }
            return false;
        }
    };

    const handleRecipientChange = (field: "email" | "walletAddress", value: string) => {
        setRecipient(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const handleHideInputToggle = (field: keyof HideInputs, value: boolean) => {
        setHideInputs(prev => ({ ...prev, [field]: value }));
    };

    return {
        recipient,
        errors,
        hideInputs,
        handleRecipientChange,
        handleHideInputToggle,
    };
};
