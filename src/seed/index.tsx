import { payload } from "@/lib/payload";

const seed = async () => {
    // const adminTenant = await payload.create({
    //     collection: "tenants",
    //     data: {
    //         name: "admin",
    //         slug: "admin",
    //         phone: "+917400106790",
    //         store: 'admin',
    //     }
    // });

    // await payload.create({
    //     collection: "users",
    //     data: {
    //         email: "ashishjadhav9900@gmail.com",
    //         password: "Ashish@1022",
    //         roles: ["super-admin"],
    //         username: "admin",
    //         phone: "+917400106790",
    //         tenants: [
    //             {
    //                 tenant: adminTenant.id,
    //             }
    //         ]
    //     }
    // });

    const tenant = await payload.create({
        collection: "tenants",
        data: {
            name: "Snax Store",
            slug: "snax",
            phone: "+919892698926",
            store: 'Snax',
        }
    });

    await payload.create({
        collection: "users",
        data: {
            email: "ashish.zaerocart@gmail.com",
            password: "ashish",
            roles: ["user"],
            username: "snax",
            phone: "+919892698926",
            tenants: [
                {
                    tenant: tenant.id,
                }
            ],
        }
    });

    // const template = await payload.create({
    //     collection: "templates",
    //     data: {
    //         name: 'Default Template',
    //         slug: "default",
    //         description: "A sleek minimalistic design for ecommerce store.",
    //         category: 'garden_supply_stores',
    //         pricing: {
    //             price: 0,
    //             isFree: true,
    //         },
    //         technical: {
    //             features: ['cart', 'responsive', 'reviews', 'search', 'wishlist', 'seo']
    //         },
    //         status: 'active',
    //         popularity: 0,
    //         analytics: {
    //             totalPurchases: 0,
    //             totalViews: 0,
    //             activeTenants: 0,
    //         }
    //     }
    // })

    // await payload.create({
    //     collection: "tenant-templates",
    //     data: {
    //         displayName: template.name,
    //         template: template.id,
    //     }
    // });

    // await payload.update({
    //     collection: "tenants",
    //     where: {
    //         id: {
    //             equals: tenant.id
    //         }
    //     },
    //     data: {
    //         activeTemplate: template.id
    //     }
    // })
}

await seed();
process.exit(0);