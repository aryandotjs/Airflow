"use client";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Spin from "./buttons/spinningwheel";

export default function AuthGuard({
    children,
}: {
    children: React.ReactNode,
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            const token = localStorage.getItem("token");

            if (!token) {
                router.replace("/login");
                return;
            }

            try {
                await api.get("/api/v1/user/me");
                setLoading(false);
            } catch (error) {
                localStorage.removeItem("token");
                router.replace("/login");
            }
        }

        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Spin></Spin>
            </div>
        );
    }

    return children;
}