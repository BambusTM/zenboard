"use client";

import {Navbar} from "@/components/Navbar";
import {ZBUseUser} from "@/components/provider/UserProvider";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateBoardFormSchema, type CreateBoardFormType} from "@/lib/schemas/boardSchema";

export default function createPage() {
    const user = ZBUseUser();
    // Forms
    const createBoardForm = useForm<CreateFormType>({
        resolver: zodResolver(CreateBoardFormSchema),
        defaultValues: {
            name: "New Board",
        },
    });

    const handleCreateBoard = (data: CreateBoardFormType) => {

    }

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar email={user?.email}/>
            <div className="flex justify-center items-center grow">
                <div className="flex flex-col items-center grow-1">
                    <h2>Create zenboard</h2>
                    <Form {...createBoardForm}>
                        <form onSubmit={createBoardForm.handleSubmit(handleCreateBoard)} className="flex flex-col gap-4">
                            <FormField
                                control={createBoardForm.control}
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
                                control={createBoardForm.control}
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
                </div>
                <div className="flex flex-col items-center">
                    <h2>Invite colaborators</h2>
                </div>
            </div>
        </main>
    );
}
