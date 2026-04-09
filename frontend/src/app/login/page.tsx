"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin, useRegister } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApiClientError } from "@/lib/api-client";

type Tab = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    loginMutation.mutate(
      { username: email, password },
      {
        onSuccess: () => router.push("/dashboard"),
        onError: (err) => {
          setError(err instanceof ApiClientError ? err.detail : "Login failed");
        },
      },
    );
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    registerMutation.mutate(
      { email, username, password },
      {
        onSuccess: () => {
          setTab("login");
          setError("");
        },
        onError: (err) => {
          setError(
            err instanceof ApiClientError ? err.detail : "Registration failed",
          );
        },
      },
    );
  }

  const isLoading =
    (tab === "login" && loginMutation.isPending) ||
    (tab === "register" && registerMutation.isPending);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F0FDFA]">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-xl font-bold text-white">
              E
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A]">ElderGuard</h1>
            <p className="mt-1 text-sm text-[#64748B]">
              Patient Monitoring Dashboard
            </p>
          </div>

          <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => {
                setTab("login");
                setError("");
              }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                tab === "login"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("register");
                setError("");
              }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                tab === "register"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={tab === "login" ? handleLogin : handleRegister}
            className="space-y-4"
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0F172A]">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@elderguard.health"
                required
              />
            </div>

            {tab === "register" && (
              <div>
                <label className="mb-1 block text-sm font-medium text-[#0F172A]">
                  Username
                </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Dr. Smith"
                  required
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-[#0F172A]">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isLoading
                ? tab === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : tab === "login"
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
