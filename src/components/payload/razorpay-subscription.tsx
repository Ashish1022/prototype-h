import { Tenant } from '@/payload-types';
import { caller } from '@/trpc/server';
import { Button, Link } from '@payloadcms/ui';

export const dynamic = "force-dynamic"

export const SubscriptionVerifyButton = async () => {

    const session = await caller.auth.session();
    const tenant = session.user?.tenants?.[0].tenant as Tenant
    if (tenant.subscription?.subscriptionDetailsSubmitted) {
        return (
            <Button disabled>
                Subscription purchased
            </Button>
        )
    }

    return (
        <Link href='/subscription'>
            <Button>
                Complete subscription
            </Button>
        </Link>
    )
}