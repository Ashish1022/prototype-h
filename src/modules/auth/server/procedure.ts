import { headers as getHeaders } from 'next/headers';

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from 'zod';

export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders();

        const session = await ctx.db.auth({ headers });
        return session;
    }),
    login: baseProcedure
        .input(
            z.object({})
        )
        .query(async ({ ctx, input }) => { })
})