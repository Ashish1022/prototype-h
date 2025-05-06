import { createTRPCRouter } from '../init';

import { authRouter } from '@/modules/auth/server/procedure';
import { categoriesRouter } from '@/modules/categories/server/procedure';
import { productsRouter } from '@/modules/products/server/procedure';
import { tagsRouter } from '@/modules/tags/server/procedure';

export const appRouter = createTRPCRouter({
    categories: categoriesRouter,
    auth: authRouter,
    products: productsRouter,
    tags:tagsRouter,
});

export type AppRouter = typeof appRouter;