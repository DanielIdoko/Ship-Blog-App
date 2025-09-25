"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useGoBack(): () => void{
    const router = useRouter();

    const handleBackClick = useCallback(() => {
        router.back();
    }, [router])

    return handleBackClick;
}
