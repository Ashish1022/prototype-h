import { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

export const Tenants: CollectionConfig = {
    slug: "tenants",
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: "slug",
        hidden: ({ user }) => !isSuperAdmin(user),
        preview: (doc) => {
            return `https://${doc.slug}.zerohub.site`
        }
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            label: "Tenant name.",
        },
        {
            name: "slug",
            type: "text",
            index: true,
            required: true,
            unique: true,
            admin: {
                description: "This is the subdomain of the store (e.g. [slug].zerohub.site).",
                position: "sidebar"
            },
            access: {
                read: () => true,
                update: ({ req }) => isSuperAdmin(req.user)
            },
            validate: (value?: string | null) => {
                if (!value) return 'Slug is required';
                if (!/^[a-z0-9-]+$/.test(value)) {
                    return 'Slug can only contain lowercase letters, numbers, and hyphens';
                }
                if (value.length < 3) return 'Slug must be at least 3 characters';
                if (value.length > 50) return 'Slug must be less than 50 characters';
                return true;
            }
        },
        {
            name: "image",
            relationTo: "media",
            type: "upload",
            admin: {
                description: "Store logo (recommended: 200x200px PNG/JPG)"
            },
        },
        {
            name: "phone",
            required: true,
            type: "text",
            unique: true,
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            },
            admin: {
                description: "Primary contact phone number"
            },
            validate: (value?: string | null) => {
                if (!value) return 'Phone number is required';
                if (!/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
                    return 'Please enter a valid phone number';
                }
                return true;
            }
        },
        {
            name: "store",
            required: true,
            type: "text",
            admin: {
                description: "This is the name of the store (e.g. Ashish's Store)."
            },
        },
        {
            name: "activeTemplate",
            relationTo: "tenant-templates",
            type: 'relationship',
            admin: {
                description: "Currently active template configuration for this tenant.",
                position: "sidebar"
            },
        },
        {
            name: "subscription",
            type: "group",
            admin: {
                description: "Subscription and billing information"
            },
            fields: [
                {
                    name: "subscriptionId",
                    type: "text",
                    admin: {
                        description: "Payment AccountId associated with your shop."
                    },
                    access: {
                        read: ({ req }) => isSuperAdmin(req.user),
                        update: ({ req }) => isSuperAdmin(req.user)
                    }
                },
                {
                    name: "subscriptionDetailsSubmitted",
                    type: "checkbox",
                    defaultValue: false,
                    admin: {
                        description: "You cannot create products until you submit your payment details."
                    },
                    access: {
                        read: () => true,
                        update: ({ req }) => isSuperAdmin(req.user)
                    }
                },
                {
                    name: "subscriptionStatus",
                    type: "select",
                    index: true,
                    options: [
                        { label: 'Active', value: 'active' },
                        { label: 'Paused', value: 'paused' },
                        { label: 'Cancelled', value: 'cancelled' },
                        { label: 'Expired', value: 'expired' },
                        { label: 'None', value: 'none' },
                        { label: 'Trial', value: 'trial' },
                        { label: 'Suspended', value: 'suspended' }
                    ],
                    defaultValue: 'none',
                    admin: {
                        description: "You cannot create products until your subscription is active."
                    },
                    access: {
                        read: () => true,
                        update: ({ req }) => isSuperAdmin(req.user)
                    }
                },
                {
                    name: 'subscriptionStartDate',
                    type: 'date',
                    admin: {
                        description: "Tenant's subscription start date.",
                        date: {
                            pickerAppearance: 'dayAndTime'
                        }
                    },
                    access: {
                        read: () => true,
                        update: ({ req }) => isSuperAdmin(req.user)
                    }
                },
                {
                    name: 'subscriptionEndDate',
                    type: 'date',
                    admin: {
                        description: "Store will be unavailable after this date if subscription not renewed.",
                        date: {
                            pickerAppearance: 'dayAndTime'
                        }
                    },
                    access: {
                        read: () => true,
                        update: ({ req }) => isSuperAdmin(req.user)
                    }
                }
            ]
        },
        {
            name: "bankDetails",
            type: "group",
            admin: {
                description: "Banking and payout information for payment processing"
            },
            access: {
                read: ({ req }) => isSuperAdmin(req.user),
                update: ({ req }) => isSuperAdmin(req.user)
            },
            fields: [
                {
                    name: "accountHolderName",
                    type: "text",
                    required: false,
                    admin: {
                        description: "Full name as per bank account records"
                    },
                    validate: (value?: string | null) => {
                        if (value && value.trim().length < 2) {
                            return 'Account holder name must be at least 2 characters';
                        }
                        if (value && value.length > 100) {
                            return 'Account holder name must be less than 100 characters';
                        }
                        return true;
                    }
                },
                {
                    name: "accountNumber",
                    type: "text",
                    required: false,
                    admin: {
                        description: "Bank account number for payouts"
                    },
                    validate: (value?: string | null) => {
                        if (value && !/^\d{9,18}$/.test(value)) {
                            return 'Account number must be 9-18 digits';
                        }
                        return true;
                    }
                },
                {
                    name: "ifscCode",
                    type: "text",
                    required: false,
                    admin: {
                        description: "IFSC code of the bank branch (e.g. SBIN0001234)"
                    },
                    validate: (value?: string | null) => {
                        if (value && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
                            return 'Please enter a valid IFSC code (e.g. SBIN0001234)';
                        }
                        return true;
                    }
                },
                {
                    name: "bankDetailsSubmitted",
                    type: "checkbox",
                    defaultValue: false,
                    admin: {
                        description: "You cannot create products until you verify your bank details."
                    },
                    access: {
                        read: () => true,
                        update: ({ req }) => isSuperAdmin(req.user)
                    }
                },
                {
                    name: "accountType",
                    type: "select",
                    options: [
                        { label: 'Vendor', value: 'vendor' },
                        { label: 'Super Vendor', value: 'super-vendor' },
                    ],
                    defaultValue: 'vendor',
                    admin: {
                        description: "Type of bank account"
                    }
                },
                {
                    name: "razorpayLinkedAccountId",
                    type: "text",
                    admin: {
                        description: "Razorpay linked account ID for payout processing",
                        readOnly: true
                    }
                },
                {
                    name: "razorpayFundAccountId",
                    type: "text",
                    admin: {
                        description: "Razorpay fund account ID for automated payouts",
                        readOnly: true
                    }
                },
                {
                    name: "status",
                    type: "select",
                    options: [
                        { label: 'Pending Verification', value: 'pending' },
                        { label: 'Verified', value: 'verified' },
                        { label: 'Rejected', value: 'rejected' },
                        { label: 'Suspended', value: 'suspended' },
                        { label: 'Not Submitted', value: 'not_submitted' }
                    ],
                    defaultValue: 'not_submitted',
                    admin: {
                        description: "Current verification status of bank details"
                    }
                },
                {
                    name: "commissionFee",
                    type: "number",
                    defaultValue: 0,
                    min: 0,
                    max: 100,
                    admin: {
                        description: "Commission percentage fee charged on transactions (0-100%)",
                        step: 0.01
                    }
                },
                {
                    name: "flatFee",
                    type: "number",
                    defaultValue: 0,
                    min: 0,
                    admin: {
                        description: "Fixed flat fee charged per transaction (in INR)",
                        step: 0.01
                    }
                },
                {
                    name: "panCardNumber",
                    type: "text",
                    required: false,
                    admin: {
                        description: "PAN card number for tax identification (e.g. ABCDE1234F)"
                    },
                    validate: (value?: string | null) => {
                        if (value && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
                            return 'Please enter a valid PAN card number (e.g. ABCDE1234F)';
                        }
                        return true;
                    }
                },
                {
                    name: "panCardPhoto",
                    relationTo: "media",
                    type: "upload",
                    required: false,
                    admin: {
                        description: "Upload clear photo of PAN card (front side only, recommended: JPG/PNG format)"
                    }
                }
            ]
        },
        {
            name: "maxProducts",
            type: "number",
            defaultValue: 100,
            min: 0,
            admin: {
                description: "Maximum number of products allowed for this tenant",
                position: "sidebar"
            },
            access: {
                read: ({ req }) => isSuperAdmin(req.user),
                update: ({ req }) => isSuperAdmin(req.user)
            }
        },
        {
            name: "analytics",
            type: "group",
            admin: {
                description: "Usage analytics and metrics"
            },
            access: {
                read: ({ req }) => isSuperAdmin(req.user),
                update: () => false
            },
            fields: [
                {
                    name: "totalProducts",
                    type: "number",
                    defaultValue: 0,
                    admin: {
                        readOnly: true,
                        description: "Current number of products"
                    }
                },
            ]
        },
        // TODO: Add personal settings field
    ]
}