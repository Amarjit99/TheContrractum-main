import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    Download, 
    ArrowLeft, 
    Database, 
    Cpu, 
    Cloud, 
    ShieldCheck, 
    Layers,
    Clock,
    Award,
    Navigation,
    Map,
    Mountain,
    FileCheck,
    Building2,
    Compass,
    Home,
    MapPin,
    BarChart3,
    Search,
    Users,
    UserPlus,
    HardHat,
    Settings,
    Briefcase,
    ClipboardCheck,
    ShoppingCart,
    Palette,
    Code2,
    Globe2,
    TrendingUp,
    MessageSquare,
    Network,
    Server,
    Wifi,
    Radio
} from 'lucide-react';

// Import Assets
import gsi from "../../assets/gsi.jpg";
import mrass from "../../assets/mrass.avif";
import online from "../../assets/online.jpg";
import dmHero from "../../assets/dm_hero.png";
import bpoo from "../../assets/bpoo.webp";
import telecomImg from "../../assets/telecom.jpeg";
import networkImg from "../../assets/network.png";
import cloudImg from "../../assets/cloud.webp";
import hr from "../../assets/hr.jpg";

export default function SolutionInfo() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const serviceParam = queryParams.get("service") || "gis";

    // Data Map for all services
    const servicesData = {
        gis: {
            title: "GIS Solutions",
            subtitle: "Geospatial & Spatial Intelligence",
            bgImage: gsi,
            themeColor: "emerald",
            backLink: "/solutions/business/gis",
            description: "Advanced geospatial data capture, processing, and spatial analytics enabling enterprise-grade mapping and strategic site planning.",
            capabilities: [
                {
                    icon: Navigation,
                    title: "Geofencing & Tracking",
                    description: "High-accuracy real-time location boundary management and asset tracking across global grids.",
                    features: ["Dynamic Polygon Geofencing", "Asset Location Feeds", "Automated Trigger Rules"]
                },
                {
                    icon: Layers,
                    title: "Utility Rights of Way Mapping",
                    description: "Detailed easement, corridor boundary, and parcel mapping for telecom, gas, and power lines.",
                    features: ["Encroachment Audits", "Easement Vectorization", "Vegetation Management Plans"]
                },
                {
                    icon: Map,
                    title: "LiDAR Data Processing",
                    description: "Transform raw 3D point cloud collections into precise elevation models and vector assets.",
                    features: ["DEM/DSM Generation", "Powerline Classification", "Feature Extraction (Buildings/Roads)"]
                },
                {
                    icon: Database,
                    title: "GIS Data Capture & Conversion",
                    description: "Converting physical maps, CAD drawings, and legacy records into accurate geo-databases.",
                    features: ["Database Schema Setup", "Topology Error Cleaning", "Attribute Standardization"]
                },
                {
                    icon: Building2,
                    title: "Municipal & Property GIS",
                    description: "Helping city planners and local governments manage zoning, utilities, taxation, and property portfolios.",
                    features: ["Tax Parcel Upgrades", "Zoning Classification Maps", "Public Utility Assets Registry"]
                },
                {
                    icon: BarChart3,
                    title: "Pole Loading & Structuring",
                    description: "Comprehensive stress assessments for utility and telecom poles using spatial measurements.",
                    features: ["Pole Stress Simulation", "O-Calc Analysis Support", "Asset Fitment Validations"]
                }
            ],
            techStacks: [
                { category: "GIS Software", techs: ["ArcGIS Pro", "QGIS", "Global Mapper", "FME Desktop"] },
                { category: "Web GIS & DB", techs: ["PostGIS", "Leaflet.js", "OpenLayers", "ArcGIS Enterprise"] },
                { category: "Processing", techs: ["LAStools", "Terrasolid", "O-Calc Pro", "AutoCAD Map 3D"] }
            ],
            whyUs: [
                { icon: MapPin, title: "High Positional Accuracy", desc: "We adhere strictly to sub-meter and sub-foot accuracy standards required by utilities." },
                { icon: Layers, title: "Enterprise Scalability", desc: "Delivering massive datasets (millions of parcels or points) with perfect topology and structure." }
            ]
        },
        mras: {
            title: "Market Research & Analysis",
            subtitle: "Strategic Data-Driven Insights",
            bgImage: mrass,
            themeColor: "blue",
            backLink: "/solutions/business/Mras",
            description: "Empowering business growth through rigorous secondary research, market intelligence, competitor mapping, and data triangulation.",
            capabilities: [
                {
                    icon: Search,
                    title: "Market Sizing & Forecasting",
                    description: "Determining TAM, SAM, and SOM using top-down and bottom-up forecasting models.",
                    features: ["5-Year Industry Forecasts", "Growth Driver Identification", "Segment-wise Penetration Studies"]
                },
                {
                    icon: BarChart3,
                    title: "Competitor Intelligence",
                    description: "Mapping rival product profiles, financial performance, marketing strategies, and distribution channels.",
                    features: ["SWOT & Porter's Five Forces", "Pricing Benchmark Matrix", "Market Share Analysis"]
                },
                {
                    icon: Users,
                    title: "Consumer Sentiment Studies",
                    description: "Gauging user expectations, buying patterns, feedback loops, and customer satisfaction levels.",
                    features: ["Brand Health Tracking", "Voice of Customer (VoC)", "Buying Behavior Modeling"]
                },
                {
                    icon: Database,
                    title: "Secondary Data Triangulation",
                    description: "Extracting facts and stats from verified public archives, whitepapers, journals, and company reports.",
                    features: ["Statistical Quality Control", "Data Discrepancy Audits", "Structured Knowledge Synthesis"]
                },
                {
                    icon: Settings,
                    title: "Industry Value Chain Mapping",
                    description: "Analysing paths from raw material sourcing up to retail endpoints, outlining margins at each tier.",
                    features: ["Distributor Margin Audits", "Bottleneck Evaluations", "Sourcing Risk Assessments"]
                },
                {
                    icon: ClipboardCheck,
                    title: "Feasibility Analysis",
                    description: "Assessing geographical or sector expansion potential for new product entries and investments.",
                    features: ["Go-To-Market (GTM) Strategy", "Regulatory Barrier Mapping", "Pre-investment Due Diligence"]
                }
            ],
            techStacks: [
                { category: "Databases & Sources", techs: ["Statista", "Mintel", "Bloomberg Terminal", "SEC Filings", "Patent Databases"] },
                { category: "Data Analysis", techs: ["SPSS", "Python (Pandas)", "R Programming", "MS Excel Advanced"] },
                { category: "Visualization", techs: ["Tableau", "Power BI", "Infogram", "Lucidchart"] }
            ],
            whyUs: [
                { icon: Clock, title: "Rapid Turnaround Times", desc: "Providing actionable intelligence summaries within short deadlines to assist executive decisions." },
                { icon: Award, title: "Triangulated Accuracy", desc: "Cross-checking facts across multiple reliable databases to guarantee zero research bias." }
            ]
        },
        ecommerce: {
            title: "E-Commerce Services",
            subtitle: "Digital Transaction Platforms",
            bgImage: online,
            themeColor: "indigo",
            backLink: "/solutions/digital/e-commerce",
            description: "Scalable e-commerce design, catalog management, payment gateway integration, and high-performance checkout structures.",
            capabilities: [
                {
                    icon: ShoppingCart,
                    title: "Storefront Architecture",
                    description: "Designing modern e-commerce storefronts using headless API structures or traditional CMS platforms.",
                    features: ["Shopify & WooCommerce Setup", "Custom React Storefronts", "Mobile-Responsive UX/UI"]
                },
                {
                    icon: Database,
                    title: "Catalog & Product Management",
                    description: "Managing SKU data, descriptions, price matrices, inventory synchronization, and rich media assets.",
                    features: ["PIM Integration", "Bulk Upload Workflows", "Dynamic Pricing Logic"]
                },
                {
                    icon: ShieldCheck,
                    title: "Payment & Security Layer",
                    description: "Securing financial transactions, card tokens, user details, and multi-currency billing gateways.",
                    features: ["Stripe / PayPal Integrations", "PCI-DSS Compliance Support", "Fraud Detection Configs"]
                },
                {
                    icon: Settings,
                    title: "Order Management Systems",
                    description: "Connecting purchases directly to inventory, warehouses, tracking services, and automated invoicing.",
                    features: ["ShipStation Connectors", "Real-Time Stock Alerts", "Refund & Return Workflows"]
                },
                {
                    icon: Users,
                    title: "Customer Portal & CRM",
                    description: "Building membership areas for tracking orders, loyalty rewards, reviews, and ticketing support.",
                    features: ["Loyalty Points Logic", "Order History Portals", "Personalized Recommendations"]
                },
                {
                    icon: BarChart3,
                    title: "Conversion Optimization",
                    description: "Deploying site speed enhancements, checkout simplification, and abandonment analytics.",
                    features: ["One-Page Checkout Designs", "Cart Recovery E-mails", "A/B Testing Deployments"]
                }
            ],
            techStacks: [
                { category: "Platforms", techs: ["Shopify Plus", "WooCommerce", "Magento", "BigCommerce"] },
                { category: "Frontend & API", techs: ["React", "Next.js", "GraphQL", "REST APIs", "Node.js"] },
                { category: "Analytics & CRM", techs: ["Google Analytics 4", "Hotjar", "Klaviyo", "Salesforce"] }
            ],
            whyUs: [
                { icon: Cpu, title: "Speed & SEO Focused", desc: "We optimize site rendering metrics to boost search visibility and reduce cart drop-off rates." },
                { icon: ShieldCheck, title: "Secure Transactions", desc: "We implement absolute data hygiene and tokenization to maintain trust." }
            ]
        },
        telecom: {
            title: "Telecommunication Solutions",
            subtitle: "Next-Gen Network Engineering",
            bgImage: telecomImg,
            themeColor: "blue",
            backLink: "/solutions/connectivity/telecom",
            description: "Designing, optimizing, and supporting complex wired/wireless telecommunication systems and 5G network backhauls.",
            capabilities: [
                {
                    icon: Radio,
                    title: "5G & LTE RF Planning",
                    description: "Calculating coverage grids, signal loss, tower capacities, and frequency channel allocations.",
                    features: ["Coverage Simulations", "Capacity Dimensioning", "Frequency Coordination"]
                },
                {
                    icon: Network,
                    title: "Fiber Optic Network Design",
                    description: "Designing FTTH and backhaul pathways, configuring fiber enclosures, splitting ratios, and path safety.",
                    features: ["GIS Fiber Route Planning", "BOM & BOQ Generations", "Fiber Splice Schematics"]
                },
                {
                    icon: Server,
                    title: "Core Infrastructure Management",
                    description: "Managing switches, routers, gateways, core telecom databases (HLR/HSS), and data centers.",
                    features: ["IP Addressing Layouts", "VLAN Segregations", "Virtual Network Functions (VNF)"]
                },
                {
                    icon: Cpu,
                    title: "Network Auditing & Optimization",
                    description: "Monitoring dropping call counts, latency spikes, load distribution, and power levels.",
                    features: ["KPI Analysis", "Drive Test Post-processing", "Antenna Tilt Optimizations"]
                },
                {
                    icon: ShieldCheck,
                    title: "Telecom Cybersecurity",
                    description: "Protecting voice, data packets, customer accounts, and signalling pathways against intrusion.",
                    features: ["Signalling Firewalls (SS7/Diameter)", "Secure Network Access Controls", "Encryption Protocols"]
                },
                {
                    icon: Settings,
                    title: "NOC Support Operations",
                    description: "24/7 network monitoring, alarm tracking, and field coordinate operations for quick resolution.",
                    features: ["Severity 1 Outage Handling", "SLA Performance Reports", "Automated Ticketing Pipelines"]
                }
            ],
            techStacks: [
                { category: "Planning Software", techs: ["Atoll RF Planning", "Planet", "GIS Telecom Suite", "AutoCAD Utility"] },
                { category: "Hardware Standard", techs: ["Cisco Core", "Juniper Networks", "Huawei RF", "Ericsson Systems"] },
                { category: "Monitoring Tools", techs: ["Zabbix", "Nagios", "SolarWinds", "Wireshark"] }
            ],
            whyUs: [
                { icon: Clock, title: "99.999% Service Uptime", desc: "Designing redundancy pathways and backup configurations to preserve operational continuity." },
                { icon: Award, title: "Broad Industry Scope", desc: "Expertise spanning satellite, cellular, and terrestrial fiber technologies." }
            ]
        },
        hrtech: {
            title: "Human Resources Solutions",
            subtitle: "Human Capital Optimization",
            bgImage: hr,
            themeColor: "cyan",
            backLink: "/solutions/digital/hrtech",
            description: "Comprehensive staff administration, workforce management, diverse recruitment, and payroll processing systems.",
            capabilities: [
                {
                    icon: UserPlus,
                    title: "Strategic Talent Acquisition",
                    description: "Finding, vetting, and interviewing skilled professionals for key roles across multiple industries.",
                    features: ["Executive Search Workflows", "Technical Aptitude Vetting", "Background Checks Support"]
                },
                {
                    icon: Users,
                    title: "Contract & Manpower Staffing",
                    description: "Providing temp and contract personnel to handle peak loads or specialized short-term tasks.",
                    features: ["Temporary Contract Staff", "Blue-Collar Resource Pools", "Flexible Workforce Adjustments"]
                },
                {
                    icon: Settings,
                    title: "Workforce & Admin Services",
                    description: "Managing complete onboarding, employee folders, benefits administration, and daily support.",
                    features: ["Onboarding Automations", "Attendance & Shift Tracking", "Employee Helpdesk Setup"]
                },
                {
                    icon: ClipboardCheck,
                    title: "Payroll & Compliance Audits",
                    description: "Calculating salary slips, processing deductions, tax compliance, and local labor regulations.",
                    features: ["Statutory Compliance Checks", "Tax Deductions Handling", "PF/ESI Administration"]
                },
                {
                    icon: Briefcase,
                    title: "HR Software Setup & Integration",
                    description: "Configuring and deploying advanced Applicant Tracking Systems (ATS) and Human Resource Information Systems (HRIS).",
                    features: ["ATS Workflow Optimizations", "HRIS Database Integrations", "Self-Service Employee Portals"]
                },
                {
                    icon: ShieldCheck,
                    title: "Performance Management Setup",
                    description: "Implementing transparent evaluation frameworks, KPIs tracking, and reward schemes.",
                    features: ["OKRs & KPIs Tracking", "360-Degree Feedback Loops", "Training Program Planners"]
                }
            ],
            techStacks: [
                { category: "HRIS Systems", techs: ["Workday", "BambooHR", "Zoho People", "SAP SuccessFactors"] },
                { category: "ATS Software", techs: ["Greenhouse", "Lever", "Zoho Recruit", "Taleo"] },
                { category: "Compliance & Pay", techs: ["ADP Workforce", "Razorpay Payroll", "Excel Advanced Templates"] }
            ],
            whyUs: [
                { icon: Users, title: "Vast Resume Database", desc: "Access to thousands of verified profiles across IT, engineering, sales, and administrative domains." },
                { icon: Award, title: "100% Legal Adherence", desc: "Absolute compliance with state and central labor laws, mitigating operational and legal risks." }
            ]
        },
        bpo: {
            title: "Business Process Outsourcing",
            subtitle: "Global Operational Support",
            bgImage: bpoo,
            themeColor: "rose",
            backLink: "/solutions/digital/bpo",
            description: "Delivering high-performance customer support, transaction handling, back-office operations, and technical helpdesks.",
            capabilities: [
                {
                    icon: MessageSquare,
                    title: "Inbound Customer Support",
                    description: "Resolving customer queries, order issues, product questions, and account problems.",
                    features: ["24/7 Multi-channel Support", "SLA-Driven Resolutions", "Voice, Email & Chat Queues"]
                },
                {
                    icon: Settings,
                    title: "Outbound Telesales & Leads",
                    description: "Connecting with potential customers to qualify leads, schedule calls, and follow up.",
                    features: ["Target Market Outreach", "Lead Qualification Checks", "Customer Retention Calls"]
                },
                {
                    icon: Database,
                    title: "Data Entry & Document Handling",
                    description: "Entering, cleaning, and managing high volumes of data with maximum accuracy.",
                    features: ["Invoice Digitization", "Customer Record Updates", "CRM Data Sanitization"]
                },
                {
                    icon: ShieldCheck,
                    title: "Transaction Back-Office",
                    description: "Processing payments, validating claims, checking documents, and issuing refunds.",
                    features: ["Claims Verification", "Loan Document Audits", "Chargeback Dispute Handling"]
                },
                {
                    icon: Briefcase,
                    title: "Technical Helpdesk Support",
                    description: "Providing Tier 1 and Tier 2 technical troubleshooting for applications and devices.",
                    features: ["Software Installation Guides", "Hardware Issue Diagnostics", "Incident Ticket Escalation"]
                },
                {
                    icon: ClipboardCheck,
                    title: "Quality Assurance & Audits",
                    description: "Monitoring recorded calls and messages to ensure agent quality and protocol adherence.",
                    features: ["Customer Sentiment Score (CSAT)", "First Contact Resolution Tracking", "Agent Feedback Sessions"]
                }
            ],
            techStacks: [
                { category: "CRM Software", techs: ["Salesforce Service Cloud", "Zendesk", "Zoho Desk", "Freshdesk"] },
                { category: "Telephony & VoIP", techs: ["RingCentral", "Dialpad", "Twilio Flex", "Avaya"] },
                { category: "Collaboration", techs: ["Slack", "Microsoft Teams", "Jira Service Management"] }
            ],
            whyUs: [
                { icon: Clock, title: "24/7/365 Service Hours", desc: "Continuous coverage across timezones, keeping your customers supported day and night." },
                { icon: ShieldCheck, title: "Strict Data Safety", desc: "Stringent security controls, clean desk rules, and ISO-certified processes to protect data." }
            ]
        },
        cloud: {
            title: "Cloud Solutions",
            subtitle: "Enterprise Infrastructure & Scalability",
            bgImage: cloudImg,
            themeColor: "blue",
            backLink: "/solutions/connectivity/cloud",
            description: "Deploying secure, resilient, and optimized cloud hosting, serverless computing, and microservice architectures.",
            capabilities: [
                {
                    icon: Cloud,
                    title: "Multi-Cloud Strategy",
                    description: "Designing hybrid environments across AWS, Microsoft Azure, and Google Cloud Platform.",
                    features: ["Load Balancing Configurations", "Cross-region Redundancies", "Private Cloud Setups"]
                },
                {
                    icon: Cpu,
                    title: "Serverless Deployments",
                    description: "Building scalable backend services using AWS Lambda, Azure Functions, or Cloudflare Workers.",
                    features: ["API Gateway Routing", "Event-Driven Logic", "Optimizing Lambda Cold-starts"]
                },
                {
                    icon: Layers,
                    title: "Container Orchestration",
                    description: "Structuring applications into Docker containers and orchestrating them through Kubernetes.",
                    features: ["Helm Charts Configuration", "Autoscaling Rules Setup", "Container Security Auditing"]
                },
                {
                    icon: ShieldCheck,
                    title: "DevOps & CI/CD Pipelines",
                    description: "Automating builds, testing scripts, and software deployments for fast, low-risk releases.",
                    features: ["GitHub Actions Configurations", "Jenkins & GitLab CI Setup", "Infrastructure as Code (IaC)"]
                },
                {
                    icon: Database,
                    title: "Cloud Database Clusters",
                    description: "Configuring high-availability databases with replication, automatic backups, and sharding.",
                    features: ["PostgreSQL/MongoDB Scaling", "Redis Caching Layers", "Data Backup Schedules"]
                },
                {
                    icon: Settings,
                    title: "Cloud Cost Optimizations",
                    description: "Auditing resource usage to prune idle instances, configure sizing, and reduce cloud bills.",
                    features: ["Savings Plans Management", "Reserved Instances Selection", "Autoscaling Optimizations"]
                }
            ],
            techStacks: [
                { category: "Cloud Providers", techs: ["Amazon Web Services", "Microsoft Azure", "Google Cloud Platform"] },
                { category: "DevOps & IaC", techs: ["Terraform", "Docker", "Kubernetes", "GitHub Actions", "Ansible"] },
                { category: "Databases & Cache", techs: ["Amazon RDS", "DynamoDB", "MongoDB Atlas", "Redis Enterprise"] }
            ],
            whyUs: [
                { icon: Clock, title: "Zero Downtime Migrations", desc: "Transitioning live platforms to the cloud without interrupting ongoing customer sales or usage." },
                { icon: ShieldCheck, title: "Secure Infrastructure", desc: "Configuring strict IAM profiles, VPC layouts, and encryption keys to secure your workloads." }
            ]
        },
        network: {
            title: "Network Infrastructure",
            subtitle: "Secure & Resilient Networks",
            bgImage: networkImg,
            themeColor: "cyan",
            backLink: "/solutions/connectivity/network-infra",
            description: "Designing, building, and securing routing systems, SD-WAN, switches, and server room equipment.",
            capabilities: [
                {
                    icon: Network,
                    title: "Network Core Engineering",
                    description: "Architecting corporate networks with secure subnets, redundant pathways, and fast speeds.",
                    features: ["Core Switch Configuration", "Spanning Tree Protocol (STP)", "Dynamic Routing (OSPF/BGP)"]
                },
                {
                    icon: Server,
                    title: "SD-WAN Implementation",
                    description: "Unifying branch connections under a centralized cloud control layer for flexible bandwidth use.",
                    features: ["Traffic Steering Policies", "Direct Internet Breakouts", "Branch Office Connectors"]
                },
                {
                    icon: ShieldCheck,
                    title: "Firewalls & Access Controls",
                    description: "Installing Next-Gen firewalls, intrusion detection layers, and web content filters.",
                    features: ["Palo Alto / Cisco ASA Setup", "Site-to-Site VPN Tunnels", "Zero Trust Access Controls"]
                },
                {
                    icon: Wifi,
                    title: "Enterprise Wireless Setup",
                    description: "Designing high-density Wi-Fi configurations, mapping signal levels, and securing guest portals.",
                    features: ["Heatmap Coverage Surveys", "WPA3 Enterprise Access", "Controller-Managed APs"]
                },
                {
                    icon: Cpu,
                    title: "Load Balancing Configurations",
                    description: "Splitting incoming network request loads across multiple servers to prevent slowdowns.",
                    features: ["F5 BIG-IP Installations", "HAProxy Configurations", "Health Check Configurations"]
                },
                {
                    icon: Settings,
                    title: "Infrastructure Auditing",
                    description: "Tracing routing loops, diagnosing packet loss, identifying bottlenecks, and mapping cables.",
                    features: ["Structured Cabling Audits", "Bandwidth Usage Overviews", "Asset Inventory Audits"]
                }
            ],
            techStacks: [
                { category: "Hardware Vendor", techs: ["Cisco Catalyst", "Juniper EX Series", "Aruba Wireless", "Fortinet"] },
                { category: "Protocols", techs: ["BGP", "OSPF", "IPSec VPN", "IEEE 802.1X"] },
                { category: "Monitoring & Mgmt", techs: ["PRTG Network Monitor", "Cisco DNA Center", "NetFlow Analyzers"] }
            ],
            whyUs: [
                { icon: ShieldCheck, title: "Security-First Focus", desc: "Configuring layers of firewall zones, filters, and access profiles to neutralize network entry threats." },
                { icon: Award, title: "Certified Network Staff", desc: "Engineers holding Cisco CCNA/CCNP and Juniper JNCIA credentials managing layouts." }
            ]
        },
        "digital-marketing": {
            title: "Digital Marketing",
            subtitle: "Strategic Brand Growth & SEO",
            bgImage: dmHero,
            themeColor: "blue",
            backLink: "/solutions/digital/digital-marketing",
            description: "Executing search engine optimization (SEO), performance marketing, dynamic social campaigns, and analytics reporting.",
            capabilities: [
                {
                    icon: Search,
                    title: "Technical SEO Audits",
                    description: "Optimizing indexing speeds, core web vitals, metadata, schema codes, and crawling pathways.",
                    features: ["Sitemap & Robots.txt Audits", "Structured Schema Setup", "Page Speed Optimizations"]
                },
                {
                    icon: TrendingUp,
                    title: "Performance & PPC Ads",
                    description: "Creating and managing targeted search, display, and social media advertising campaigns.",
                    features: ["Google Ads Strategy", "Meta Ads Management", "Retargeting Setup"]
                },
                {
                    icon: Palette,
                    title: "Content Strategy & Creation",
                    description: "Writing high-quality blog posts, guides, and visual content optimized for search queries.",
                    features: ["Keyword Gap Analysis", "SEO Copywriting", "Infographics Design"]
                },
                {
                    icon: Globe2,
                    title: "Social Media Campaigns",
                    description: "Running monthly schedules on LinkedIn, Twitter, and Instagram to grow organic reach.",
                    features: ["Monthly Calendar Planning", "Brand Identity Guides", "Interactive Polls & Q&As"]
                },
                {
                    icon: Database,
                    title: "Analytics & ROI Reporting",
                    description: "Tracking click conversions, user behaviors, cost-per-lead metric figures, and traffic sources.",
                    features: ["Google Tag Manager Setup", "Custom GA4 Reports", "Data Studio Dashboards"]
                },
                {
                    icon: Settings,
                    title: "Email Marketing Automation",
                    description: "Building automated drip sequences to nurture leads, recover carts, and share newsletters.",
                    features: ["Drip Campaign Workflows", "A/B Subject Line Tests", "List Quality Optimization"]
                }
            ],
            techStacks: [
                { category: "SEO Tools", techs: ["SEMrush", "Ahrefs", "Google Search Console", "Screaming Frog"] },
                { category: "Ad Networks", techs: ["Google Ads Manager", "Meta Business Suite", "LinkedIn Campaign Manager"] },
                { category: "Automation", techs: ["Mailchimp", "Klaviyo", "HubSpot CRM", "Zapier"] }
            ],
            whyUs: [
                { icon: Award, title: "Data-Driven Approach", desc: "No guesswork. Every campaign is backed by search volumes, click metrics, and conversion rates." },
                { icon: Clock, title: "Transparent Reporting", desc: "Monthly performance reports highlighting clicks, cost metrics, and return on ad spend." }
            ]
        }
    };

    const service = servicesData[serviceParam] || servicesData.gis;
    const Icon = service.capabilities[0].icon;

    // Resolve color themes for Tailwind CSS classes
    const colors = {
        emerald: {
            text: "text-emerald-500",
            bg: "bg-emerald-500",
            hoverText: "hover:text-emerald-400",
            hoverBg: "hover:bg-emerald-700",
            shadow: "hover:shadow-emerald-500/25",
            accentBg: "bg-emerald-50",
            accentBorder: "border-emerald-100",
            accentText: "text-emerald-700",
            pillBg: "bg-emerald-500/20",
            pillText: "text-emerald-400",
            pillBorder: "border-emerald-500/30",
            iconBg: "bg-emerald-50",
            iconText: "text-emerald-600",
            glowBg: "bg-emerald-600",
            ctaBtn: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/40"
        },
        blue: {
            text: "text-blue-500",
            bg: "bg-blue-500",
            hoverText: "hover:text-blue-400",
            hoverBg: "hover:bg-blue-700",
            shadow: "hover:shadow-blue-500/25",
            accentBg: "bg-blue-50",
            accentBorder: "border-blue-100",
            accentText: "text-blue-700",
            pillBg: "bg-blue-500/20",
            pillText: "text-blue-400",
            pillBorder: "border-blue-500/30",
            iconBg: "bg-blue-50",
            iconText: "text-blue-600",
            glowBg: "bg-blue-600",
            ctaBtn: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/40"
        },
        cyan: {
            text: "text-cyan-500",
            bg: "bg-cyan-500",
            hoverText: "hover:text-cyan-400",
            hoverBg: "hover:bg-cyan-700",
            shadow: "hover:shadow-cyan-500/25",
            accentBg: "bg-cyan-50",
            accentBorder: "border-cyan-100",
            accentText: "text-cyan-700",
            pillBg: "bg-cyan-500/20",
            pillText: "text-cyan-400",
            pillBorder: "border-cyan-500/30",
            iconBg: "bg-cyan-50",
            iconText: "text-cyan-600",
            glowBg: "bg-cyan-600",
            ctaBtn: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/40"
        },
        indigo: {
            text: "text-indigo-500",
            bg: "bg-indigo-500",
            hoverText: "hover:text-indigo-400",
            hoverBg: "hover:bg-indigo-700",
            shadow: "hover:shadow-indigo-500/25",
            accentBg: "bg-indigo-50",
            accentBorder: "border-indigo-100",
            accentText: "text-indigo-700",
            pillBg: "bg-indigo-500/20",
            pillText: "text-indigo-400",
            pillBorder: "border-indigo-500/30",
            iconBg: "bg-indigo-50",
            iconText: "text-indigo-600",
            glowBg: "bg-indigo-600",
            ctaBtn: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/40"
        },
        rose: {
            text: "text-rose-500",
            bg: "bg-rose-500",
            hoverText: "hover:text-rose-400",
            hoverBg: "hover:bg-rose-700",
            shadow: "hover:shadow-rose-500/25",
            accentBg: "bg-rose-50",
            accentBorder: "border-rose-100",
            accentText: "text-rose-700",
            pillBg: "bg-rose-500/20",
            pillText: "text-rose-400",
            pillBorder: "border-rose-500/30",
            iconBg: "bg-rose-50",
            iconText: "text-rose-600",
            glowBg: "bg-rose-600",
            ctaBtn: "bg-rose-600 hover:bg-rose-500 shadow-rose-500/40"
        }
    };

    const theme = colors[service.themeColor] || colors.blue;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header / Hero Section */}
            <div className="relative h-[450px] flex items-center" style={{ backgroundImage: `url(${service.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-3xl">
                        <Link 
                            to={service.backLink}
                            className={`inline-flex items-center gap-2 ${theme.pillText} ${theme.hoverText} font-bold mb-6 transition-all group`}
                        >
                            <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
                            Back to {service.title}
                        </Link>
                        <span className={`block ${theme.pillText} text-sm font-bold uppercase tracking-widest mb-3`}>
                            Deep Dive & Capabilities
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            {service.title} <span className={theme.text}>Capability Overview</span>
                        </h1>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl font-medium">
                            {service.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Capabilities Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="text-center mb-16">
                    <span className={`inline-block px-4 py-2 rounded-full ${theme.accentBg} ${theme.accentText} text-sm font-bold uppercase tracking-wider mb-4`}>
                        Service Deep-Dive
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Our Technical Solutions & Expertise</h2>
                    <div className={`w-24 h-1.5 ${theme.bg} mx-auto rounded-full`}></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {service.capabilities.map((cap, index) => {
                        const CapIcon = cap.icon;
                        return (
                            <div key={index} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                                <div>
                                    <div className={`w-14 h-14 ${theme.accentBg} rounded-2xl flex items-center justify-center ${theme.iconText} mb-6 group-hover:${theme.bg} group-hover:text-white transition-all duration-300`}>
                                        <CapIcon size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                        {cap.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed mb-6 font-medium text-sm sm:text-base">
                                        {cap.description}
                                    </p>
                                </div>
                                <ul className="space-y-2 border-t border-slate-100 pt-6">
                                    {cap.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
                                            <span className={`w-1.5 h-1.5 ${theme.bg} rounded-full shrink-0`}></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tech Stack Matrix Section */}
            <div className="bg-slate-950 text-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className={`inline-block px-4 py-2 rounded-full bg-slate-900 ${theme.pillText} text-sm font-bold uppercase tracking-wider mb-4 border border-slate-800`}>
                            Technology Ecosystem
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">Our Tech Stack & Industry Standard Tools</h2>
                        <p className="text-gray-400 max-w-xl mx-auto font-medium">
                            We design and support layouts using reliable, scalable, and industry-standard tools.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        {service.techStacks.map((stack, index) => (
                            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                                <h3 className={`text-lg font-black ${theme.text} mb-4 uppercase tracking-widest`}>{stack.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {stack.techs.map((tech, tIdx) => (
                                        <span 
                                            key={tIdx} 
                                            className="px-3.5 py-1.5 bg-slate-800 text-gray-300 text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Partner With Us Section */}
            <div className="bg-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className={`inline-block px-4 py-2 rounded-full ${theme.accentBg} ${theme.accentText} text-sm font-bold uppercase tracking-wider mb-4`}>
                            Operational Excellence
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Why Partner With Us?</h2>
                        <div className={`w-24 h-1.5 ${theme.bg} mx-auto rounded-full`}></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <div className={`w-12 h-12 ${theme.accentBg} rounded-xl flex items-center justify-center ${theme.iconText} mb-6`}>
                                <Clock size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-3">On-Time Delivery & SLA</h3>
                            <p className="text-slate-600 font-medium">
                                We adhere strictly to project timelines and Service Level Agreements (SLAs) with zero compromises on quality.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <div className={`w-12 h-12 ${theme.accentBg} rounded-xl flex items-center justify-center ${theme.iconText} mb-6`}>
                                <Cpu size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-3">Certified Resource Access</h3>
                            <p className="text-slate-600 font-medium">
                                Direct integration with certified experts holding specialized credentials in their respective fields.
                            </p>
                        </div>
                        {service.whyUs.map((w, index) => {
                            const WIcon = w.icon;
                            return (
                                <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                                    <div className={`w-12 h-12 ${theme.accentBg} rounded-xl flex items-center justify-center ${theme.iconText} mb-6`}>
                                        <WIcon size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-3">{w.title}</h3>
                                    <p className="text-slate-600 font-medium">{w.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className={`absolute top-1/2 left-1/4 w-96 h-96 ${theme.glowBg} rounded-full blur-[120px]`}></div>
                    <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-slate-600 rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl sm:text-5xl font-black mb-6">
                        Ready to Learn More or Download the Brochure?
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto font-medium">
                        Provide your professional details to access our exhaustive capability sheets, case studies, and services lists.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            to={`/solutions/download?service=${serviceParam}`}
                            className={`${theme.ctaBtn} text-white font-black px-12 py-5 rounded-2xl transition-all shadow-xl text-lg flex items-center justify-center gap-2 transform hover:-translate-y-1 active:scale-[0.98]`}
                        >
                            <Download size={20} />
                            Brochure Download
                        </Link>
                        <Link
                            to="/contact/quote"
                            className="bg-white/10 hover:bg-white/20 text-white font-black px-12 py-5 rounded-2xl transition-all border border-white/20 backdrop-blur-sm text-lg transform hover:-translate-y-1 active:scale-[0.98]"
                        >
                            Request a Quote
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
