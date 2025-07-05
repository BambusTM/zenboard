"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {api} from "@/trpc/react";
import {useRouter} from "next/navigation";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {LoginFormSchema, type LoginFormType, RegisterFormSchema, type RegisterFormType} from "@/lib/schemas/authSchema";

export default function AuthPage() {
    const router = useRouter();

    // Forms
    const loginForm = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const registerForm = useForm<RegisterFormType>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    // tRPC mutations
    const registerMutation = api.auth.register.useMutation({
        onSuccess: (user) => {
            console.log("Success:", user);
            localStorage.setItem("user", JSON.stringify(user));
            router.push("/board/create");
        },
        onError: (error) => {
            console.log("Error:", error);
            registerForm.setError("root", { message: error.message });
        },
    });

    const loginMutation = api.auth.login.useMutation({
        onSuccess: (user) => {
            console.log("Success:", user);
            localStorage.setItem("user", JSON.stringify(user));
            router.push("/profile");
        },
        onError: (error) => {
            console.log("Error:", error);
            loginForm.setError("root", { message: error.message });
        },
    });

    // Form handlers
    const handleLogin = (data: LoginFormType) => {
        loginMutation.mutate({
            email: data.email,
            password: data.password,
        });
    };

    const handleRegister = (data: RegisterFormType) => {
        registerMutation.mutate({
            email: data.email,
            password: data.password,
        });
    };

    return (
        <main className="bg-tertiary flex min-h-screen items-center justify-center p-6">
            <div className="flex w-full flex-col items-center gap-4">
                <Card
                    className="text-natural w-full bg-neutral-800 p-0 shadow-lg sm:min-h-[500px] sm:w-[400px] sm:rounded-lg sm:p-8 md:w-[500px] lg:w-[600px]">
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="flex gap-4 bg-neutral-800">
                            <TabsTrigger
                                value="login"
                                className="data-[state=active]:border data-[state=active]:border-neutral-500 data-[state=active]:bg-neutral-700 data-[state=active]:p-4"
                            >
                                Login
                            </TabsTrigger>
                            <TabsTrigger
                                value="register"
                                className="data-[state=active]:border data-[state=active]:border-neutral-500 data-[state=active]:bg-neutral-700 data-[state=active]:p-4"
                            >
                                Register
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="login" className="mt-6 mb-4">
                            <h2 className="mb-4 text-xl font-semibold">Login</h2>
                            <Form {...loginForm}>
                                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="flex flex-col gap-4">
                                    <FormField
                                        control={loginForm.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={loginForm.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="mt-2"
                                        disabled={loginMutation.isPending}
                                    >
                                        {loginMutation.isPending ? "Logging in..." : "Login"}
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>

                        <TabsContent value="register" className="mt-6 mb-4">
                            <h2 className="mb-4 text-xl font-semibold">Register</h2>
                            <Form {...registerForm}>
                                <form onSubmit={registerForm.handleSubmit(handleRegister)}
                                      className="flex flex-col gap-4">
                                    <FormField
                                        control={registerForm.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={registerForm.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={registerForm.control}
                                        name="confirmPassword"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="mt-2"
                                        disabled={registerMutation.isPending}
                                    >
                                        {registerMutation.isPending ? "Registering..." : "Register"}
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </main>
    );
}
