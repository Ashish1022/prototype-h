import { Tenant } from '@/payload-types';
import { caller } from '@/trpc/server';
import { Button, Link } from '@payloadcms/ui';

export const TenantBankVerifyButton = async () => {

    const session = await caller.auth.session();
    const tenant = session.user?.tenants?.[0].tenant as Tenant
    if (tenant.bankDetails?.bankDetailsSubmitted) {
        return (
            <Button disabled>
                Bank verified
            </Button>
        )
    }

    return (
        <Link href='/verify-bank'>
            <Button>
                Verify your Bank
            </Button>
        </Link>
    )
}
