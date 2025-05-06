import { cookies as getCookies } from 'next/headers'

export const generateAuthCookie = async ({ value, prefix }: { value: string, prefix: string }) => {
    const cookies = await getCookies();
    cookies.set({
        name: `${prefix}-token`,
        value: value,
        httpOnly: true,
        path: "/",
    });
}