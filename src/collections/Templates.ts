import { isSuperAdmin } from "@/lib/access";
import { CollectionConfig } from "payload";

export const Templates: CollectionConfig = {
    slug: "templates",
    admin: {
        useAsTitle: "name",
        hidden: ({ user }) => !isSuperAdmin(user),
        description: "Manage website templates available for tenants",
    },
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        read: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            unique: true,
            admin: {
                description: "Template name that will be displayed to users"
            },
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            index: true,
            admin: {
                description: "URL-friendly identifier for the template",
                position: "sidebar"
            },
        },
        {
            name: "description",
            type: "textarea",
            required: true,
            admin: {
                description: "Brief description of the template features and design"
            }
        },
        {
            name: "category",
            type: "select",
            required: true,
            index: true,
            options: [
                { value: "agriculture", label: "Agriculture Supplies" },
                { value: "books", label: "Books & Literature" },
                { value: "electronics_and_furniture", label: "Electronics & Furniture" },
                { value: "fashion_and_lifestyle", label: "Fashion & Lifestyle" },
                { value: "gifting", label: "Gifts & Hampers" },
                { value: "grocery", label: "Grocery & Daily Essentials" },
                { value: "baby_products", label: "Baby Products" },
                { value: "office_supplies", label: "Office Supplies" },
                { value: "religious_products", label: "Religious Items" },
                { value: "pet_products", label: "Pet Supplies" },
                { value: "sports_products", label: "Sports & Fitness Gear" },
                { value: "arts_and_collectibles", label: "Arts & Collectibles" },
                { value: "sexual_wellness_products", label: "Sexual Wellness" },
                { value: "drop_shipping", label: "Dropshipping Store" },
                { value: "crypto_machinery", label: "Crypto Mining Equipment" },
                { value: "tobacco", label: "Tobacco Products" },
                { value: "weapons_and_ammunitions", label: "Weapons & Ammunition" },
                { value: "stamps_and_coin_stores", label: "Stamps & Coins" },
                { value: "automobile_parts_and_equipments", label: "Auto Parts & Accessories" },
                { value: "garden_supply_stores", label: "Garden & Outdoor Supplies" },
                { value: "household_appliance_stores", label: "Home Appliances" },
                { value: "non_durable_goods", label: "Non-Durable Consumer Goods" },
                { value: "pawn_shops", label: "Pawn & Thrift Stores" },
                { value: "wig_and_toupee_shops", label: "Wigs & Hair Accessories" },
                { value: "camera_and_photographic_stores", label: "Camera & Photography" },
                { value: "leather_goods_and_luggage", label: "Leather Goods & Bags" },
                { value: "men_and_boys_clothing_stores", label: "Men’s & Boys’ Clothing" },
                { value: "tent_stores", label: "Tents & Outdoor Gear" },
                { value: "shoe_stores", label: "Footwear & Shoes" },
                { value: "petroleum_and_petroleum_products", label: "Fuel & Petroleum Products" },
                { value: "automotive_tire_stores", label: "Tires & Auto Care" },
                { value: "chemical_and_allied_products", label: "Chemical Supplies" },
                { value: "family_clothing_stores", label: "Family Clothing & Apparel" },
                { value: "fabric_and_sewing_stores", label: "Fabrics & Sewing Supplies" },
                { value: "art_supply_stores", label: "Art Supplies" },
                { value: "clocks_and_silverware_stores", label: "Clocks & Silverware" },
                { value: "cosmetic_stores", label: "Beauty & Cosmetics" },
                { value: "home_furnishing_stores", label: "Home Furnishings" },
                { value: "antique_stores", label: "Antiques & Vintage Items" },
                { value: "women_clothing", label: "Women’s Clothing" },
                { value: "women_accessory_stores", label: "Women’s Accessories" },
            ],
            admin: {
                description: "Template category for organization and filtering"
            }
        },
        {
            name: "preview",
            type: "group",
            admin: {
                description: "Template preview assets"
            },
            fields: [
                {
                    name: "thumbnail",
                    relationTo: "media",
                    type: "upload",
                    admin: {
                        description: "Main thumbnail image (recommended: 400x300px)"
                    }
                },
                {
                    name: "screenshots",
                    relationTo: "media",
                    type: "upload",
                    hasMany: true,
                    admin: {
                        description: "Additional screenshot images showing different pages"
                    }
                },
                {
                    name: "videoUrl",
                    relationTo: "media",
                    type: "upload",
                    hasMany: false,
                }
            ]
        },
        {
            name: "pricing",
            type: "group",
            admin: {
                description: "Template pricing information"
            },
            fields: [
                {
                    name: "price",
                    type: "number",
                    required: true,
                    min: 0,
                    admin: {
                        description: "Template price in INR (use 0 for free templates)",
                        step: 0.01
                    }
                },
                {
                    name: "originalPrice",
                    type: "number",
                    min: 0,
                    admin: {
                        description: "Original price before discount (optional)",
                        step: 0.01
                    }
                },
                {
                    name: "isFree",
                    type: "checkbox",
                    defaultValue: false,
                    admin: {
                        description: "Mark as free template (overrides price)"
                    }
                },
            ]
        },
        {
            name: "technical",
            type: "group",
            admin: {
                description: "Technical specifications and requirements"
            },
            fields: [
                {
                    name: "features",
                    type: "select",
                    hasMany: true,
                    options: [
                        { label: 'Responsive Design', value: 'responsive' },
                        { label: 'Dark Mode', value: 'dark-mode' },
                        { label: 'Search Functionality', value: 'search' },
                        { label: 'User Authentication', value: 'auth' },
                        { label: 'Payment Integration', value: 'payment' },
                        { label: 'Blog System', value: 'blog' },
                        { label: 'Contact Forms', value: 'forms' },
                        { label: 'Social Media Integration', value: 'social' },
                        { label: 'Analytics Integration', value: 'analytics' },
                        { label: 'SEO Optimization', value: 'seo' },
                        { label: 'Multi-language', value: 'i18n' },
                        { label: 'Admin Dashboard', value: 'admin' },
                        { label: 'API Integration', value: 'api' },
                        { label: 'Shopping Cart', value: 'cart' },
                        { label: 'Wishlist', value: 'wishlist' },
                        { label: 'Product Reviews', value: 'reviews' },
                        { label: 'Newsletter Signup', value: 'newsletter' },
                        { label: 'Live Chat', value: 'livechat' }
                    ],
                    admin: {
                        description: "Features included in the template"
                    }
                },
            ]
        },
        {
            name: "status",
            type: "select",
            required: true,
            index: true,
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
                { label: 'Discontinued', value: 'discontinued' },
                { label: 'Coming Soon', value: 'coming-soon' }
            ],
            defaultValue: 'draft',
            admin: {
                description: "Current status of the template",
                position: "sidebar"
            }
        },
        {
            name: "popularity",
            type: "number",
            defaultValue: 0,
            min: 0,
            admin: {
                description: "Popularity score (higher = more popular)",
                position: "sidebar"
            }
        },
        {
            name: "analytics",
            type: "group",
            admin: {
                description: "Template analytics and performance metrics"
            },
            access: {
                read: ({ req }) => isSuperAdmin(req.user),
                update: () => false
            },
            fields: [
                {
                    name: "totalPurchases",
                    type: "number",
                    defaultValue: 0,
                    admin: {
                        readOnly: true,
                        description: "Total number of purchases"
                    }
                },
                {
                    name: "totalViews",
                    type: "number",
                    defaultValue: 0,
                    admin: {
                        readOnly: true,
                        description: "Total number of page views"
                    }
                },
                {
                    name: "activeTenants",
                    type: "number",
                    defaultValue: 0,
                    admin: {
                        readOnly: true,
                        description: "Number of tenants currently using this template"
                    }
                },
            ]
        },
    ],
    hooks: {
        beforeChange: [
            async ({ data }) => {
                if (data.pricing && data.pricing.price === 0) {
                    data.pricing.isFree = true;
                }

                return data;
            }
        ],
    }
}