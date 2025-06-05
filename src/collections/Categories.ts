import { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";

export const Categories: CollectionConfig = {
    slug: "categories",
    access: {
        create: ({ req }) => {
            if (isSuperAdmin(req.user)) return true
            const tenant = req.user?.tenants?.[0].tenant as Tenant
            return Boolean(tenant?.subscription?.subscriptionDetailsSubmitted)
        }
    },
    admin: {
        useAsTitle: 'name',
        description: "Manage product categories. You must verify your account before creating categories.",
        group: 'Store Management',
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
    fields: [
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
            unique: true,
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
            name: "sortOrder",
            type: "number",
            defaultValue: 0,
            admin: {
                description: "Lower numbers appear first in category lists",
                position: "sidebar"
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
            name: "images",
            type: "group",
            label: "Images",
            admin: {
                description: "Category images for better visual presentation"
            },
            fields: [
                {
                    name: "thumbnail",
                    type: "upload",
                    relationTo: "media",
                    admin: {
                        description: "Small image for category cards (recommended: 300x300px)"
                    }
                },
                {
                    name: "banner",
                    type: "upload",
                    relationTo: "media",
                    admin: {
                        description: "Banner image for category pages (recommended: 1200x400px)"
                    }
                },
            ]
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
                                if (!data?.id) return 0;

                                try {
                                    const productCount = await req.payload.find({
                                        collection: "products",
                                        where: {
                                            categories: { in: [data.id] },
                                        },
                                        limit: 0
                                    });

                                    return productCount.totalDocs;
                                } catch {
                                    return 0;
                                }
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