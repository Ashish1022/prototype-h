import { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

export const TenantTemplates: CollectionConfig = {
    slug: "tenant-templates",
    admin: {
        useAsTitle: 'displayName',
        hidden: ({ user }) => !isSuperAdmin(user),
        description: "Template configurations for each tenant with customizations"
    },
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        read: () => true,
        update: () => true,
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    fields: [
        {
            name: "displayName",
            type: "text",
            admin: {
                readOnly: true,
                description: "A descriptive name for this tenant template configuration (e.g., 'Acme Corp - Landing Page Template')"
            }
        },
        {
            name: "template",
            relationTo: "templates",
            type: "relationship",
            required: true,
            index: true,
            admin: {
                description: "The base template being used",
            },
        },
        {
            name: "customizations",
            type: "group",
            admin: {
                description: "Tenant-specific customizations for this template"
            },
            fields: [
                {
                    name: "colors",
                    type: "group",
                    admin: {
                        description: "Color scheme customizations"
                    },
                    fields: [
                        {
                            name: "primaryColor",
                            type: "text",
                            admin: {
                                description: "Primary brand color (hex code)"
                            },
                            validate: (value?: string | null) => {
                                if (value && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
                                    return 'Please enter a valid hex color code (e.g., #FF5733)';
                                }
                                return true;
                            }
                        },
                        {
                            name: "secondaryColor",
                            type: "text",
                            admin: {
                                description: "Secondary brand color (hex code)"
                            },
                            validate: (value?: string | null) => {
                                if (value && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
                                    return 'Please enter a valid hex color code (e.g., #FF5733)';
                                }
                                return true;
                            }
                        },
                        {
                            name: "backgroundColor",
                            type: "text",
                            admin: {
                                description: "Background color (hex code)"
                            },
                            validate: (value?: string | null) => {
                                if (value && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
                                    return 'Please enter a valid hex color code (e.g., #FF5733)';
                                }
                                return true;
                            }
                        },
                        {
                            name: "textColor",
                            type: "text",
                            admin: {
                                description: "Primary text color (hex code)"
                            },
                            validate: (value?: string | null) => {
                                if (value && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
                                    return 'Please enter a valid hex color code (e.g., #FF5733)';
                                }
                                return true;
                            }
                        }
                    ]
                },
                {
                    name: "fonts",
                    type: "group",
                    admin: {
                        description: "Typography customizations"
                    },
                    fields: [
                        {
                            name: "primaryFont",
                            type: "select",
                            options: [
                                { label: 'Roboto', value: 'Roboto' },
                                { label: 'Open Sans', value: 'Open Sans' },
                                { label: 'Lato', value: 'Lato' },
                                { label: 'Montserrat', value: 'Montserrat' },
                                { label: 'Poppins', value: 'Poppins' },
                                { label: 'Inter', value: 'Inter' },
                            ],
                            admin: {
                                description: "Primary font family for headings"
                            }
                        },
                        {
                            name: "bodyFont",
                            type: "select",
                            options: [
                                { label: 'Roboto', value: 'Roboto' },
                                { label: 'Open Sans', value: 'Open Sans' },
                                { label: 'Lato', value: 'Lato' },
                                { label: 'Source Sans Pro', value: 'Source Sans Pro' },
                                { label: 'Inter', value: 'Inter' },
                            ],
                            admin: {
                                description: "Font family for body text"
                            }
                        }
                    ]
                },
                {
                    name: "layout",
                    type: "group",
                    admin: {
                        description: "Layout and structure customizations"
                    },
                    fields: [
                        {
                            name: "headerStyle",
                            type: "select",
                            options: [
                                { label: 'Default', value: 'default' },
                                { label: 'Centered', value: 'centered' },
                                { label: 'Left Aligned', value: 'left' },
                                { label: 'Minimal', value: 'minimal' }
                            ],
                            admin: {
                                description: "Header layout style"
                            }
                        },
                        {
                            name: "footerStyle",
                            type: "select",
                            options: [
                                { label: 'Default', value: 'default' },
                                { label: 'Minimal', value: 'minimal' },
                                { label: 'Extended', value: 'extended' }
                            ],
                            admin: {
                                description: "Footer layout style"
                            }
                        },
                    ]
                },
            ]
        },
    ]
}