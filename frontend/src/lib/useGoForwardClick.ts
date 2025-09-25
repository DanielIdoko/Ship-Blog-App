"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useGoForwardClick(): () => void{
    const router = useRouter();

    const handleForwardClick = useCallback(() => {
        router.forward();
    }, [router])

    return handleForwardClick;
}
