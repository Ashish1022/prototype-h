"use client"

import { registerSchema } from "@/modules/auth/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"]
});

export const SignUpView = () => {

    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        mode: "all",
        defaultValues: {
            email: "",
            username: "",
            password: ""
        }
    });

    const username = form.watch("username");
    const usernameErrors = form.formState.errors.username;

    const showPreview = username && !usernameErrors;

    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const register = useMutation(trpc.auth.register.mutationOptions({
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
            router.push("/")
        }
    }));

    const onSubmit = (data: z.infer<typeof registerSchema>) => {
        register.mutate(data);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="bg-[#f4f4f0] h-screen w-full lg:col-span-3 overflow-y-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 p-4 lg:p-16">
                        <div className="flex items-center justify-between mb-8">
                            <Link href={"/"}>
                                <span className={cn("text-2xl font-semibold", poppins.className)}>funroad</span>
                            </Link>
                            <Button
                                asChild
                                className="text-base border-none underline"
                                variant="ghost"
                                size="sm"
                            >
                                <Link href={"/login"} prefetch>
                                    Signin
                                </Link>
                            </Button>
                        </div>
                        <h1 className="text-4xl font-medium">
                            Join over 1,204 creator earning money on funroad.
                        </h1>
                        <FormField
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className=""
                                        />
                                    </FormControl>
                                    <FormDescription className={cn("hidden", showPreview && "block")}>
                                        Your store will be available at&nbsp;
                                        <strong>{username}</strong>.shop.com
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className=""
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                            />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 cursor-pointer">
                                                {showPassword ? <EyeOff className="text-black/80" /> : <Eye className="text-black/80" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            size="lg"
                            variant="elevated"
                            className="bg-black text-white hover:bg-pink-400 hover:text-primary"
                            disabled={register.isPending}
                        >
                            Create account
                        </Button>
                    </form>
                </Form>
            </div>
            <div
                className="h-screen w-full lg:col-span-2 hidden lg:block"
                style={{
                    backgroundImage: "url('/auth-background.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />
        </div >
    )
}