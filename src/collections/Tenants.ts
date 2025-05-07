import { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
    slug: "tenants",
    admin: {
        useAsTitle: "subdomain",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            label: "Store name",
            admin: {
                description: "This is the name of the store (e.g. Ashish's Store)."
            },
        },
        {
            name: "subdomain",
            type: "text",
            index: true,
            required: true,
            unique: true,
            admin: {
                description: "This is the subdomain of the store (e.g. [slug].hub.com)."
            },
        },
        {
            name: "image",
            relationTo: "media",
            type: "upload"
        },
        {
            name: "stripeAccountId",
            type: "text",
            required: true,
            admin: {
                readOnly: true
            },
        },
        {
            name: "stripeDetailsSubmitted",
            type: "checkbox",
            admin: {
                readOnly: true,
                description: "You cannot create products until you submit your Stripe details."
            }
        }
    ]
}