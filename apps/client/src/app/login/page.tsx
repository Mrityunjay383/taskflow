"use client";

import { useState } from "react";
import { login } from "@/lib/auth.api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await login({ email, password });

            if (res.data.success) {
                router.push("/dashboard");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="space-y-3 w-80">
                <input
                    className="border p-2 w-full"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border p-2 w-full"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-black text-white p-2 w-full" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}
