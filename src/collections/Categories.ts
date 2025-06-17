import { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";

export const Categories: CollectionConfig = {
    slug: "categories",
    defaultPopulate: {
        name: true
    },
    indexes: [
        {
            fields: ['tenantSlug', 'slug'],
            unique: true
        },
        {
            fields: ['tenantSlug', 'featured'],
        }
    ],
    access: {
        create: ({ req }) => {
            if (isSuperAdmin(req.user)) return true
            const tenant = req.user?.tenants?.[0]?.tenant as Tenant
            return Boolean(tenant?.subscription?.subscriptionDetailsSubmitted)
        }
    },
    admin: {
        useAsTitle: 'name',
        description: "Manage product categories. You must verify your account before creating categories.",
        preview: (doc) => {
            if (doc?.slug) {
                return `[store_slug].${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${doc.slug}`;
            }
            return null;
        },
        livePreview: {
            url: ({ data, req }) => {
                const tenant = req.user?.tenants?.[0].tenant as Tenant
                return `${tenant.slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`
            },
        },
    },
    hooks: {
        beforeChange: [
            ({ data, req, operation }) => {
                if (operation === 'create' || operation === 'update') {
                    const tenant = req.user?.tenants?.[0].tenant as Tenant
                    if (tenant?.slug) {
                        data.tenantSlug = tenant.slug;
                    }
                }
                return data;
            }
        ]
    },
    fields: [
        {
            name: "tenantSlug",
            type: "text",
            required: true,
            index: true,
            admin: {
                hidden: true
            },
            hooks: {
                beforeValidate: [
                    ({ value, req }) => {
                        if (!value) {
                            const tenant = req.user?.tenants?.[0]?.tenant as Tenant;
                            return tenant?.slug || '';
                        }
                        return value;
                    }
                ]
            }
        },
        {
            type: "text",
            name: "name",
            required: true,
            maxLength: 100,
            admin: {
                description: "The display name of your category"
            },
            validate: (value?: string | null) => {
                if (!value || value.length < 2) {
                    return 'Category name must be at least 2 characters long';
                }
                return true;
            }
        },
        {
            name: "slug",
            type: "text",
            required: true,
            index: true,
            admin: {
                description: "This is the URL path of the category (e.g. [store_slug].zerohub.site/[slug]).",
                position: "sidebar"
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.name) {
                            return data.name
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/^-+|-+$/g, '')
                        }
                        return value
                    }
                ]
            }
        },
        {
            name: "description",
            type: "textarea",
            maxLength: 500,
            admin: {
                description: "Brief description of this category (optional)"
            }
        },
        {
            name: "status",
            type: "select",
            options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "Draft", value: "draft" }
            ],
            defaultValue: "active",
            required: true,
            index: true,
            admin: {
                description: "Active categories are visible to customers",
                position: "sidebar"
            }
        },
        {
            name: "featured",
            type: "checkbox",
            defaultValue: false,
            admin: {
                description: "Display this category prominently on the homepage"
            }
        },
        {
            name: "parent",
            type: "relationship",
            relationTo: "categories",
            hasMany: false,
            filterOptions: ({ data }) => ({
                id: { not_equals: data?.id },
            }),
            admin: {
                description: "Select a parent category to create a subcategory",
                position: "sidebar"
            },
        },
        {
            name: "subcategories",
            type: "join",
            collection: "categories",
            on: "parent",
            hasMany: true,
            admin: {
                description: "Subcategories under this category",
            }
        },
        {
            name: "thumbnail",
            type: "upload",
            relationTo: "media",
            required: true,
            admin: {
                description: "Small image for category cards (recommended: 300x300px)"
            }
        },
        {
            name: "seo",
            type: "group",
            label: "SEO Settings",
            admin: {
                description: "Search engine optimization settings"
            },
            fields: [
                {
                    name: "title",
                    type: "text",
                    maxLength: 60,
                    admin: {
                        description: "SEO title (recommended: 50-60 characters)"
                    }
                },
                {
                    name: "description",
                    type: "textarea",
                    maxLength: 160,
                    admin: {
                        description: "Meta description (recommended: 150-160 characters)"
                    }
                },
                {
                    name: "keywords",
                    type: "text",
                    admin: {
                        description: "Comma-separated keywords for this category"
                    }
                },
                {
                    name: "ogImage",
                    type: "upload",
                    relationTo: "media",
                    admin: {
                        description: "Image for social media sharing (recommended: 1200x630px)"
                    }
                }
            ]
        },
        {
            name: "stats",
            type: "group",
            label: "Statistics",
            admin: {
                description: "Category statistics and analytics",
                readOnly: true
            },
            fields: [
                {
                    name: "productCount",
                    type: "number",
                    virtual: true,
                    admin: {
                        readOnly: true,
                        description: "Number of products in this category"
                    },
                    access: {
                        read: () => true,
                    },
                    hooks: {
                        afterRead: [
                            async ({ data, req }) => {
                                const productCount = await req.payload.find({
                                    collection: "products",
                                    where: {
                                        category: { in: data?.id },
                                    },
                                    limit: 0
                                });

                                return productCount.totalDocs;
                            }
                        ]
                    }
                },
                {
                    name: "viewCount",
                    type: "number",
                    defaultValue: 0,
                    admin: {
                        readOnly: true,
                        description: "Number of times this category page has been viewed"
                    }
                },
                {
                    name: "lastViewed",
                    type: "date",
                    admin: {
                        readOnly: true,
                        description: "Last time this category page was viewed"
                    }
                }
            ]
        },
    ]
}