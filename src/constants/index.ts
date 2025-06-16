import { BarChart, BookOpen, Calendar, Code, Database, DollarSign, FileText, Github, Globe, Headphones, HelpCircle, LineChart, Linkedin, Lock, Mail, MapPin, MessageSquare, Paintbrush, Phone, Server, Settings, Shield, Sparkles, Twitter, Users, Zap } from "lucide-react";

export const DEFAULT_LIMIT = 8

export const featureItems = [
    {
        icon: Shield,
        label: "Security",
        description: "Enterprise-grade protection",
        href: "/features/security",
    },
    {
        icon: BarChart,
        label: "Analytics",
        description: "Insights and reporting",
        href: "/features/analytics",
    },
    {
        icon: Sparkles,
        label: "AI Capabilities",
        description: "Smart automation features",
        href: "/features/ai",
    },
    {
        icon: Zap,
        label: "Performance",
        description: "Optimized for speed",
        href: "/features/performance",
    },
]

export const resourceItems = [
    {
        icon: BookOpen,
        label: "Documentation",
        description: "Detailed guides and references",
        href: "/docs",
    },
    {
        icon: Paintbrush,
        label: "Templates",
        description: "Rich templates for your business.",
        href: "/templates",
    },
    // {
    //     icon: Newspaper,
    //     label: "Blog",
    //     description: "Latest news and updates",
    //     href: "/blog",
    // },
    {
        icon: Code,
        label: "API Reference",
        description: "Developer documentation",
        href: "/api",
    },
    {
        icon: HelpCircle,
        label: "Help Center",
        description: "FAQs and support",
        href: "/contact",
    },
]

export const FOOTER_SECTIONS = [
    {
        title: "Product",
        links: [
            { href: "/features", label: "Features" },
            { href: "/pricing", label: "Pricing" },
            { href: "/integrations", label: "Integrations" },
            { href: "/changelog", label: "Changelog" },
        ],
    },
    {
        title: "Resources",
        links: [
            { href: "/docs", label: "Documentation" },
            { href: "/guides", label: "Guides" },
            { href: "/api", label: "API Reference" },
            { href: "/blog", label: "Blog" },
        ],
    },
    {
        title: "Company",
        links: [
            { href: "/about", label: "About" },
            { href: "/career", label: "Careers" },
            { href: "/contact", label: "Contact" },
            { href: "/legal", label: "Legal" },
        ],
    },
] as const;

export const CONTACT_INFO = [
    {
        icon: Mail,
        href: "mailto:hello@zerohub.com",
        label: "hello@zerohub.com",
    },
    {
        icon: Phone,
        href: "tel:+15555555555",
        label: "+1 (555) 555-5555",
    },
    {
        icon: MapPin,
        href: "https://maps.google.com",
        label: "San Francisco, CA",
    },
] as const;

export const SOCIAL_LINKS = [
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
] as const;

export const LEGAL_LINKS = [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/cookies", label: "Cookies" },
    { href: "/sitemap", label: "Sitemap" },
] as const;

export const plans = [
    {
        id: 'starter',
        name: "Starter",
        description: "Perfect for small teams and startups",
        monthlyPrice: 1.5,
        yearlyPrice: 15,
        features: ["Up to 5 team members", "10GB storage", "Basic analytics", "Email support"],
        popular: false,
        cta: "Get Started",
        color: "from-blue-500 to-cyan-400",
    },
    {
        id: 'pro',
        name: "Pro",
        description: "Ideal for growing businesses",
        monthlyPrice: 6,
        yearlyPrice: 60,
        features: [
            "Up to 20 team members",
            "50GB storage",
            "Advanced analytics",
            "Priority support",
            "Custom integrations",
            "API access",
        ],
        popular: true,
        cta: "Start Free Trial",
        color: "from-purple-500 to-blue-500",
    },
    {
        id: 'enterprise',
        name: "Enterprise",
        description: "For large organizations",
        monthlyPrice: 18,
        yearlyPrice: 180,
        features: [
            "Unlimited team members",
            "500GB storage",
            "Enterprise analytics",
            "24/7 dedicated support",
            "Advanced security",
            "Custom development",
            "SLA guarantee",
        ],
        popular: false,
        cta: "Contact Sales",
        color: "from-pink-500 to-purple-500",
    },
]

export const FEATURES = [
    { icon: Globe, title: "Global Reach", color: "bg-blue-500" },
    { icon: Lock, title: "Enterprise Security", color: "bg-green-500" },
    { icon: LineChart, title: "Advanced Analytics", color: "bg-purple-500" },
    { icon: Code, title: "API Integration", color: "bg-yellow-500" },
    { icon: Settings, title: "Full Customization", color: "bg-red-500" },
    { icon: Zap, title: "Lightning Fast", color: "bg-indigo-500" }
];

export const TECH_STACKS = {
    left: ['React', 'Node.js', 'GraphQL', 'AWS'],
    right: ['Analytics', 'Security', 'APIs', 'Mobile']
};

export const CORNER_NODES = [
    { Icon: Server, color: "text-blue-400", bgColor: "bg-blue-500/30", position: "top-12 sm:top-5 left-4 sm:left-12", delay: 1 },
    { Icon: Database, color: "text-green-400", bgColor: "bg-green-500/30", position: "bottom-28 sm:bottom-11 left-4 sm:left-12", delay: 1.3 },
    { Icon: Shield, color: "text-red-400", bgColor: "bg-red-500/30", position: "top-12 sm:top-5 right-4 sm:right-12", delay: 1.6, isRight: true },
    { Icon: LineChart, color: "text-purple-400", bgColor: "bg-purple-500/30", position: "bottom-28 sm:bottom-11 right-4 sm:right-12", delay: 1.9, isRight: true }
];

export const contactMethods = [
    {
        icon: Mail,
        title: "Email Support",
        description: "Get help via email",
        value: "support@saasapp.com",
        action: "Send Email",
    },
    {
        icon: Phone,
        title: "Phone Support",
        description: "Speak with our team",
        value: "+1 (555) 123-4567",
        action: "Call Now",
    },
    {
        icon: MessageSquare,
        title: "Live Chat",
        description: "Chat with us instantly",
        value: "Available 24/7",
        action: "Start Chat",
    },
]

export const supportOptions = [
    {
        icon: Headphones,
        title: "Technical Support",
        description: "Get help with technical issues and implementation",
        availability: "24/7",
    },
    {
        icon: FileText,
        title: "Sales Inquiries",
        description: "Learn about pricing, plans, and custom solutions",
        availability: "Mon-Fri 9AM-6PM PST",
    },
    {
        icon: MessageSquare,
        title: "General Questions",
        description: "Ask about features, integrations, or anything else",
        availability: "24/7",
    },
]

export const stats = [
    { label: "Years in Business", value: "2+", icon: Calendar },
    { label: "Happy Customers", value: "10+", icon: Users },
    { label: "Countries Served", value: "12+", icon: Globe },
    { label: "Uptime Guarantee", value: "99.9%", icon: Shield },
]

export const team = [
    {
        name: "Ashish Jadhav",
        role: "Founder & CEO",
        bio: "Former VP of Engineering at TechCorp with 15+ years in enterprise software.",
        image: "/placeholder.png",
        social: {
            linkedin: "https://www.linkedin.com/in/ashish-jadhav-zero/",
            twitter: "https://x.com/ashishhh2210",
            github: "https://github.com/Ashish1022",
            email: "ashishjadhav9900@gmail.com",
        },
    },
]

export const jobs = [
    {
        id: "senior-fullstack-engineer",
        title: "Senior Full-Stack Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        salary: "$120k - $160k",
        posted: "2 days ago", // Updated from second dataset
        description: "Join our core engineering team to build and scale our platform.",
        about:
            "We're looking for a Senior Full-Stack Engineer to join our Engineering team. You'll work on our core platform, building new features and improving existing ones. You'll collaborate with product managers, designers, and other engineers to deliver high-quality software.",
        responsibilities: [
            "Design, develop, and maintain our core platform features",
            "Write clean, maintainable, and efficient code",
            "Collaborate with cross-functional teams to define and implement new features",
            "Troubleshoot and fix bugs and performance issues",
            "Participate in code reviews and mentor junior engineers",
            "Contribute to technical architecture decisions",
        ],
        requirements: [
            "Experience with tRPC", // Added from second dataset
            "Experience with Node.js and RESTful APIs",
            "5+ years of experience in full-stack development",
            "Strong proficiency in React, Next.js, and TypeScript",
            "Familiarity with database design and SQL/NoSQL databases",
            "Understanding of CI/CD pipelines and DevOps practices",
            "Excellent problem-solving and communication skills",
        ],
        niceToHave: [
            "Experience with GraphQL",
            "Knowledge of AWS or other cloud platforms",
            "Contributions to open-source projects",
            "Experience with microservices architecture",
        ],
        teamSize: "15 engineers",
        manager: "Engineering Director",
        relatedPositions: ["frontend-engineer", "backend-engineer", "devops-engineer"],
    },
    {
        id: "product-designer",
        title: "Senior Product Designer",
        department: "Design",
        location: "Remote", // Updated from second dataset
        type: "Full-time",
        salary: "$110k - $150k",
        posted: "1 week ago", // Updated from second dataset
        description: "Shape the future of our product experience and design system.",
        about:
            "We're looking for a Senior Product Designer to join our Design team. You'll work on creating beautiful, intuitive user experiences for our platform. You'll collaborate with product managers, engineers, and other designers to deliver high-quality designs.",
        responsibilities: [
            "Create user-centered designs by understanding business requirements and user feedback",
            "Design flows, prototypes, and high-fidelity visuals for our platform",
            "Contribute to our design system and ensure consistency across the product",
            "Collaborate with engineers to ensure designs are implemented correctly",
            "Conduct user research and usability testing",
            "Present design concepts to stakeholders and incorporate feedback",
        ],
        requirements: [
            "4+ years of experience in product design",
            "Proficiency in Figma and other design tools",
            "Excellent communication and presentation skills",
            "Strong portfolio demonstrating your design process and solutions",
            "Experience with design systems and component libraries",
            "Understanding of accessibility standards and best practices",
        ],
        niceToHave: [
            "Experience with motion design and animations",
            "Knowledge of front-end development (HTML, CSS)",
            "Experience with user research methodologies",
            "Background in B2B SaaS products",
        ],
        teamSize: "8 designers",
        manager: "Head of Design",
        relatedPositions: ["ux-researcher", "frontend-engineer"],
    },
    {
        id: "frontend-engineer",
        title: "Frontend Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        salary: "$90k - $130k",
        posted: "5 days ago", // Updated from second dataset
        description: "Create beautiful, responsive, and accessible user interfaces.",
        about:
            "We're looking for a Frontend Engineer to join our Engineering team. You'll work on building beautiful, responsive, and accessible user interfaces for our platform. You'll collaborate with designers, product managers, and other engineers to deliver high-quality features.",
        responsibilities: [
            "Implement responsive and accessible user interfaces using React and Next.js",
            "Collaborate with designers to ensure pixel-perfect implementation",
            "Write clean, maintainable, and efficient code",
            "Optimize applications for maximum speed and scalability",
            "Participate in code reviews and contribute to our frontend architecture",
            "Stay up-to-date with emerging trends and best practices in frontend development",
        ],
        requirements: [
            "Experience with CSS/Tailwind", // Added from second dataset
            "Good problem-solving and communication skills",
            "3+ years of experience in frontend development",
            "Strong proficiency in React, HTML, CSS, and JavaScript/TypeScript",
            "Experience with responsive design and cross-browser compatibility",
            "Understanding of web accessibility standards (WCAG)",
            "Familiarity with modern frontend build tools and workflows",
        ],
        niceToHave: [
            "Experience with Next.js and server components",
            "Knowledge of state management libraries (Redux, Zustand, etc.)",
            "Experience with testing frameworks (Jest, React Testing Library)",
            "Understanding of performance optimization techniques",
        ],
        teamSize: "10 engineers",
        manager: "Frontend Engineering Manager",
        relatedPositions: ["senior-fullstack-engineer", "ux-researcher", "product-designer"],
    },
    {
        id: "devops-engineer",
        title: "DevOps Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        salary: "$110k - $150k", // Estimated based on market rates
        posted: "3 days ago",
        description: "Build and maintain our cloud infrastructure and CI/CD pipelines.",
        about:
            "We're looking for a DevOps Engineer to join our Engineering team. You'll work on building and maintaining our cloud infrastructure, CI/CD pipelines, and ensuring our platform is scalable, reliable, and secure.",
        responsibilities: [
            "Design and maintain cloud infrastructure on AWS/GCP",
            "Build and optimize CI/CD pipelines",
            "Implement monitoring and alerting systems",
            "Manage containerized applications with Kubernetes",
            "Automate infrastructure provisioning with Terraform",
            "Ensure security best practices across the platform",
        ],
        requirements: [
            "Strong experience with AWS or GCP",
            "Experience with Terraform or similar IaC tools",
            "3+ years of experience in DevOps or Infrastructure",
            "Proficiency with Kubernetes and containerization",
            "Knowledge of CI/CD pipelines and automation",
            "Understanding of monitoring and observability tools",
        ],
        niceToHave: [
            "Experience with GitOps workflows",
            "Knowledge of service mesh technologies",
            "Familiarity with security scanning and compliance",
            "Experience with multi-cloud environments",
        ],
        teamSize: "5 engineers",
        manager: "Infrastructure Manager",
        relatedPositions: ["senior-fullstack-engineer", "backend-engineer"],
    },
    {
        id: "backend-engineer",
        title: "Backend Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        salary: "$100k - $140k", // Estimated based on market rates
        posted: "3 days ago",
        description: "Build scalable APIs and services that power our platform.",
        about:
            "We're looking for a Backend Engineer to join our Engineering team. You'll work on building scalable APIs and services that power our platform, ensuring high performance and reliability.",
        responsibilities: [
            "Design and develop RESTful APIs and GraphQL services",
            "Build scalable microservices architecture",
            "Optimize database queries and performance",
            "Implement security best practices",
            "Write comprehensive tests and documentation",
            "Collaborate with frontend engineers on API design",
        ],
        requirements: [
            "Understanding of API design principles",
            "Strong proficiency in Node.js and TypeScript",
            "3+ years of experience in backend development",
            "Experience with PostgreSQL and database design",
            "Knowledge of authentication and authorization",
            "Experience with testing frameworks and methodologies",
        ],
        niceToHave: [
            "Experience with GraphQL",
            "Knowledge of Redis and caching strategies",
            "Familiarity with message queues and event-driven architecture",
            "Experience with performance monitoring and optimization",
        ],
        teamSize: "12 engineers",
        manager: "Backend Engineering Manager",
        relatedPositions: ["senior-fullstack-engineer", "devops-engineer"],
    },
    {
        id: "growth-marketing-manager",
        title: "Growth Marketing Manager",
        department: "Marketing",
        location: "Remote",
        type: "Full-time",
        salary: "$90k - $130k", // Estimated based on market rates
        posted: "2 weeks ago",
        description: "Drive user acquisition and retention through data-driven marketing.",
        about:
            "We're looking for a Growth Marketing Manager to join our Marketing team. You'll drive user acquisition and retention through data-driven marketing strategies, focusing on scaling our B2B SaaS platform.",
        responsibilities: [
            "Develop and execute growth marketing strategies",
            "Manage SEO/SEM campaigns and optimize for conversions",
            "Analyze user data and marketing metrics",
            "Create and optimize landing pages and funnels",
            "Coordinate with product and sales teams",
            "Run A/B tests and experiments to improve performance",
        ],
        requirements: [
            "3+ years of experience in growth marketing",
            "Strong experience with B2B SaaS marketing",
            "Data-driven approach to marketing decisions",
            "Proficiency in analytics tools (Google Analytics, Mixpanel, etc.)",
            "Experience with SEO/SEM and paid advertising",
            "Excellent communication and project management skills",
        ],
        niceToHave: [
            "Experience with marketing automation platforms",
            "Knowledge of conversion rate optimization",
            "Background in content marketing",
            "Familiarity with SQL and data analysis",
        ],
        teamSize: "6 marketers",
        manager: "Head of Marketing",
        relatedPositions: ["customer-success-manager", "sales-development-representative"],
    },
    {
        id: "customer-success-manager",
        title: "Customer Success Manager",
        department: "Customer Success",
        location: "Remote",
        type: "Full-time",
        salary: "$80k - $110k", // Estimated based on market rates
        posted: "1 week ago",
        description: "Ensure our customers achieve their goals using our platform.",
        about:
            "We're looking for a Customer Success Manager to join our Customer Success team. You'll ensure our customers achieve their goals using our platform, driving retention and expansion.",
        responsibilities: [
            "Build and maintain strong customer relationships",
            "Create and deliver customer training and resources",
            "Onboard new customers and ensure successful adoption",
            "Monitor customer health and proactively address issues",
            "Identify expansion opportunities within existing accounts",
            "Collaborate with product team on customer feedback",
        ],
        requirements: [
            "Data-driven approach to customer success",
            "Strong experience with B2B SaaS platforms",
            "Strong communication and presentation skills",
            "2+ years of experience in customer success or account management",
            "Excellent customer onboarding and relationship management skills",
            "Experience with CRM and customer success tools",
        ],
        niceToHave: [
            "Experience with customer health scoring",
            "Knowledge of product analytics",
            "Background in technical support",
            "Experience with enterprise customers",
        ],
        teamSize: "8 customer success managers",
        manager: "Head of Customer Success",
        relatedPositions: ["sales-development-representative", "ux-researcher"],
    },
    {
        id: "ux-researcher",
        title: "UX Researcher",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        salary: "$95k - $125k", // Estimated based on market rates
        posted: "2 weeks ago",
        description: "Conduct user research to inform product decisions.",
        about:
            "We're looking for a UX Researcher to join our Design team. You'll conduct user research to inform product decisions, helping us build better experiences for our users.",
        responsibilities: [
            "Plan and conduct user interviews and usability testing sessions",
            "Design and execute quantitative and qualitative research studies",
            "Analyze research data and present actionable insights",
            "Collaborate with product and design teams on research strategy",
            "Create user personas and journey maps",
            "Advocate for user needs throughout the product development process",
        ],
        requirements: [
            "3+ years of experience in UX research",
            "Excellent communication and presentation skills",
            "Strong experience with user interviews and usability testing",
            "Proficiency in data analysis and research methodologies",
            "Experience with research tools (UserTesting, Hotjar, etc.)",
            "Understanding of statistical analysis and research validation",
        ],
        niceToHave: [
            "Experience with quantitative research methods",
            "Knowledge of A/B testing and experimentation",
            "Background in psychology or behavioral science",
            "Experience with B2B SaaS products",
        ],
        teamSize: "3 researchers",
        manager: "Head of Design",
        relatedPositions: ["product-designer", "frontend-engineer"],
    },
    {
        id: "sales-development-representative",
        title: "Sales Development Representative",
        department: "Sales",
        location: "Remote",
        type: "Full-time",
        salary: "$60k - $80k + commission", // Estimated based on market rates
        posted: "1 week ago",
        description: "Generate and qualify leads for our sales team.",
        about:
            "We're looking for a Sales Development Representative to join our Sales team. You'll generate and qualify leads for our sales team, helping us grow our customer base.",
        responsibilities: [
            "Generate and qualify inbound and outbound leads",
            "Conduct initial discovery calls with prospects",
            "Schedule qualified meetings for Account Executives",
            "Maintain accurate records in CRM system",
            "Collaborate with marketing on lead generation campaigns",
            "Follow up on marketing qualified leads",
        ],
        requirements: [
            "Strong experience with B2B SaaS sales",
            "Goal-oriented and results-driven mindset",
            "Ability to work in a fast-paced environment",
            "1+ years of experience in sales or business development",
            "Proficiency with CRM systems (Salesforce, HubSpot, etc.)",
            "Excellent communication and interpersonal skills",
        ],
        niceToHave: [
            "Experience with sales automation tools",
            "Knowledge of lead qualification frameworks (BANT, MEDDIC)",
            "Background in technology or SaaS",
            "Experience with cold calling and email outreach",
        ],
        teamSize: "12 sales team members",
        manager: "Sales Manager",
        relatedPositions: ["customer-success-manager", "growth-marketing-manager"],
    },
];

export const benefits = [
    {
        title: "Competitive Compensation",
        description: "Salary, equity, and performance bonuses",
        icon: DollarSign,
    },
    {
        title: "Remote-First",
        description: "Work from anywhere in the world",
        icon: Globe,
    },
    {
        title: "Team Retreats",
        description: "Quarterly in-person gatherings around the world",
        icon: Users,
    },
]

export const locations = [
    {
        city: "San Francisco",
        country: "United States",
        address: "123 Market Street, San Francisco, CA 94105",
        image: "/placeholder.svg?height=200&width=300",
    },
    {
        city: "New York",
        country: "United States",
        address: "456 Broadway, New York, NY 10013",
        image: "/placeholder.svg?height=200&width=300",
    },
    {
        city: "London",
        country: "United Kingdom",
        address: "789 Oxford Street, London W1D 2HG",
        image: "/placeholder.svg?height=200&width=300",
    },
]

