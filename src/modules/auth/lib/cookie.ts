import { cookies as getCookies } from 'next/headers'

export const generateAuthCookie = async ({ value, prefix }: { value: string, prefix: string }) => {
    const cookies = await getCookies();
    cookies.set({
        name: `${prefix}-token`,
        value: value,
        httpOnly: true,
        path: "/",
        ...(process.env.NODE_ENV !== "development" && {
            sameSite: "none",
            domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
            secure: true,
        })
    });
};