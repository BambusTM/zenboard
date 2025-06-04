"use client";

import React, { type FormEvent, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/context/ToastProvider";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setToast } = useToast();

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setToast({
        title: "Error",
        description: "Passwords do not match",
      });
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    alert(`Logging in ${email}`);
  };

  return (
    <main className="bg-tertiary flex min-h-screen items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4 w-full">
        <Card className="bg-neutral-800 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] sm:min-h-[500px] sm:rounded-lg sm:p-8 p-0 shadow-lg text-natural">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="bg-neutral-800 flex gap-4">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-neutral-700 data-[state=active]:border data-[state=active]:border-neutral-500 data-[state=active]:p-4"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-neutral-700 data-[state=active]:border data-[state=active]:border-neutral-500 data-[state=active]:p-4"
              >
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6 mb-4">
              <h2 className="text-xl font-semibold mb-4">Register</h2>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="mt-2">
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-6 mb-4">
              <h2 className="text-xl font-semibold mb-4">Register</h2>
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="register-confirm">Confirm Password</Label>
                  <Input
                    id="register-confirm"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="mt-2">
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  );
}
