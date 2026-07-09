/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Employee, CRMLead, CRMAccount, Transaction, Budget, StockItem, Supplier, RFQ, ProductionOrder, Project, Task, AuditLog, ERPModule, SubscriptionPlan, AIAgent } from './types';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "EMP-001",
    name: "Sarah Jenkins",
    email: "sarah.j@enterprise.ai",
    department: "Executive",
    role: "Chief Executive Officer",
    status: "Active",
    joiningDate: "2021-01-15",
    salary: 240000,
    shift: "Day (9 AM - 5 PM)",
    leaveBalance: 24,
    attendance: { present: 180, absent: 2, late: 1 },
    performanceRating: 4.9,
  },
  {
    id: "EMP-002",
    name: "Michael Chen",
    email: "m.chen@enterprise.ai",
    department: "Engineering",
    role: "VP of Engineering",
    status: "Active",
    joiningDate: "2021-06-01",
    salary: 195000,
    shift: "Day (9 AM - 5 PM)",
    leaveBalance: 18,
    attendance: { present: 175, absent: 5, late: 3 },
    performanceRating: 4.8,
  },
  {
    id: "EMP-003",
    name: "Elena Rostova",
    email: "e.rostova@enterprise.ai",
    department: "Finance",
    role: "Chief Financial Officer",
    status: "Active",
    joiningDate: "2022-03-10",
    salary: 210000,
    shift: "Day (9 AM - 5 PM)",
    leaveBalance: 20,
    attendance: { present: 168, absent: 4, late: 0 },
    performanceRating: 4.7,
  },
  {
    id: "EMP-004",
    name: "David Kojo",
    email: "d.kojo@enterprise.ai",
    department: "Sales",
    role: "Global Sales Director",
    status: "Active",
    joiningDate: "2022-08-22",
    salary: 150000,
    shift: "Day (9 AM - 5 PM)",
    leaveBalance: 15,
    attendance: { present: 160, absent: 8, late: 5 },
    performanceRating: 4.6,
  },
  {
    id: "EMP-005",
    name: "Amina Al-Mansoor",
    email: "a.almansoor@enterprise.ai",
    department: "Human Resources",
    role: "HR Director",
    status: "Active",
    joiningDate: "2021-11-04",
    salary: 135000,
    shift: "Day (9 AM - 5 PM)",
    leaveBalance: 22,
    attendance: { present: 178, absent: 1, late: 1 },
    performanceRating: 4.8,
  },
  {
    id: "EMP-006",
    name: "Lucas Dupont",
    email: "l.dupont@enterprise.ai",
    department: "Operations",
    role: "Supply Chain Manager",
    status: "Active",
    joiningDate: "2023-01-20",
    salary: 115000,
    shift: "Day (9 AM - 5 PM)",
    leaveBalance: 14,
    attendance: { present: 145, absent: 3, late: 2 },
    performanceRating: 4.5,
  }
];

export const INITIAL_LEADS: CRMLead[] = [
  {
    id: "LD-2401",
    name: "Robert Downey",
    company: "Stark Industries",
    email: "rdowney@stark.com",
    phone: "+1 (555) 301-4432",
    value: 750000,
    stage: "Proposal",
    source: "Enterprise Conference",
    owner: "David Kojo",
    notes: "Very interested in AI-automated procurement integration.",
    updatedAt: "2026-07-08",
  },
  {
    id: "LD-2402",
    name: "Bruce Wayne",
    company: "Wayne Enterprises",
    email: "bwayne@wayne.com",
    phone: "+1 (555) 902-8877",
    value: 1200000,
    stage: "Negotiation",
    source: "Direct Inbound",
    owner: "David Kojo",
    notes: "Requires complete localized machine QC intelligence.",
    updatedAt: "2026-07-09",
  },
  {
    id: "LD-2403",
    name: "Selena Kyle",
    company: "Gotham Logistics",
    email: "skyle@gothamlog.com",
    phone: "+1 (555) 723-1122",
    value: 280000,
    stage: "Contacted",
    source: "Webinar",
    owner: "Sarah Jenkins",
    notes: "Looking to deploy smart warehousing barcode indexing.",
    updatedAt: "2026-07-05",
  },
  {
    id: "LD-2404",
    name: "Peter Parker",
    company: "Daily Bugle",
    email: "pparker@bugle.org",
    phone: "+1 (555) 124-9988",
    value: 45000,
    stage: "Lead",
    source: "Ad Campaign",
    owner: "David Kojo",
    notes: "SaaS Starter plan for newsdesk workflow tracking.",
    updatedAt: "2026-07-02",
  },
  {
    id: "LD-2405",
    name: "Diana Prince",
    company: "Themyscira Exports",
    email: "diana@themyscira.gov",
    phone: "+1 (555) 880-0077",
    value: 950000,
    stage: "Won",
    source: "Referral",
    owner: "Sarah Jenkins",
    notes: "Deal closed! Proceeding with onboarding.",
    updatedAt: "2026-07-07",
  }
];

export const INITIAL_ACCOUNTS: CRMAccount[] = [
  {
    id: "ACC-501",
    name: "Stark Industries",
    industry: "Defense & Tech",
    revenue: 450000000,
    employees: 12500,
    contactsCount: 4,
    owner: "David Kojo",
  },
  {
    id: "ACC-502",
    name: "Wayne Enterprises",
    industry: "Heavy Industry",
    revenue: 890000000,
    employees: 34000,
    contactsCount: 3,
    owner: "David Kojo",
  },
  {
    id: "ACC-503",
    name: "Themyscira Exports",
    industry: "Artifact Logistics",
    revenue: 55000000,
    employees: 850,
    contactsCount: 2,
    owner: "Sarah Jenkins",
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "TX-901",
    date: "2026-07-08",
    description: "Wayne Enterprises Q2 Subscription Payment",
    type: "Revenue",
    category: "SaaS Subscription",
    amount: 125000,
    status: "Cleared",
    reference: "REF-88921",
  },
  {
    id: "TX-902",
    date: "2026-07-07",
    description: "Google Cloud Platform Monthly Invoicing",
    type: "Expense",
    category: "Infrastructure",
    amount: -18500,
    status: "Cleared",
    reference: "REF-00122",
  },
  {
    id: "TX-903",
    date: "2026-07-06",
    description: "Office Lease - Paris Supply Branch",
    type: "Expense",
    category: "Facilities",
    amount: -12000,
    status: "Cleared",
    reference: "REF-44211",
  },
  {
    id: "TX-904",
    date: "2026-07-06",
    description: "Stark Industries Custom RAG Implementation",
    type: "Revenue",
    category: "Professional Services",
    amount: 85000,
    status: "Cleared",
    reference: "REF-31122",
  },
  {
    id: "TX-905",
    date: "2026-07-05",
    description: "Microsoft Teams Enterprise Licensing",
    type: "Expense",
    category: "Software Licenses",
    amount: -4500,
    status: "Pending",
    reference: "REF-99811",
  }
];

export const INITIAL_BUDGETS: Budget[] = [
  { department: "Executive", allocated: 500000, spent: 220000, year: 2026 },
  { department: "Engineering", allocated: 2500000, spent: 1100000, year: 2026 },
  { department: "Finance", allocated: 300000, spent: 140000, year: 2026 },
  { department: "Sales", allocated: 800000, spent: 390000, year: 2026 },
  { department: "Human Resources", allocated: 250000, spent: 98000, year: 2026 },
  { department: "Operations", allocated: 1500000, spent: 750000, year: 2026 }
];

export const INITIAL_STOCK: StockItem[] = [
  {
    id: "STK-101",
    sku: "AI-PROC-PRO-X",
    name: "Neural Tensor Compute Unit v3",
    category: "Processors",
    quantity: 450,
    warehouse: "Central Hub - Sector A",
    reorderLevel: 100,
    price: 1200,
    supplier: "Silicon Foundries Ltd",
    forecastedDemand: 580,
  },
  {
    id: "STK-102",
    sku: "RAM-ECC-128G",
    name: "128GB ECC DDR5 Server RAM",
    category: "Memory",
    quantity: 85,
    warehouse: "Central Hub - Sector B",
    reorderLevel: 150,
    price: 350,
    supplier: "Crucial Tech Corp",
    forecastedDemand: 220,
  },
  {
    id: "STK-103",
    sku: "SSD-NVME-4T",
    name: "4TB NVMe PCIe 5.0 Enterprise SSD",
    category: "Storage",
    quantity: 210,
    warehouse: "Central Hub - Sector B",
    reorderLevel: 50,
    price: 450,
    supplier: "Solid State Solutions",
    forecastedDemand: 180,
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: "SUP-001",
    name: "Silicon Foundries Ltd",
    email: "bids@siliconfoundries.com",
    rating: 4.8,
    performanceScore: 97,
    activeContracts: 2,
  },
  {
    id: "SUP-002",
    name: "Crucial Tech Corp",
    email: "enterprise@crucialtech.com",
    rating: 4.5,
    performanceScore: 92,
    activeContracts: 1,
  },
  {
    id: "SUP-003",
    name: "Solid State Solutions",
    email: "orders@solidstatesol.com",
    rating: 4.2,
    performanceScore: 88,
    activeContracts: 3,
  }
];

export const INITIAL_RFQS: RFQ[] = [
  {
    id: "RFQ-2026-001",
    title: "Server Components Restock (Q3 Expansion)",
    department: "Engineering",
    deadline: "2026-07-20",
    status: "Bids Received",
    estimatedBudget: 450000,
    bidsCount: 4,
    items: [
      { name: "Neural Tensor Compute Unit v3", qty: 250 },
      { name: "128GB ECC DDR5 Server RAM", qty: 500 }
    ]
  },
  {
    id: "RFQ-2026-002",
    title: "Executive Laptops Refresh Cycle",
    department: "Executive",
    deadline: "2026-07-30",
    status: "Published",
    estimatedBudget: 65000,
    bidsCount: 1,
    items: [
      { name: "Executive AI Ultrabook Pro 14", qty: 25 }
    ]
  }
];

export const INITIAL_PRODUCTION: ProductionOrder[] = [
  {
    id: "MFG-8001",
    productName: "AI Edge Server Node - Model S",
    qty: 50,
    scheduledStart: "2026-07-10",
    scheduledEnd: "2026-07-15",
    status: "Scheduled",
    machineId: "LINE-A3",
  },
  {
    id: "MFG-8002",
    productName: "Neural Processing Module - Edge Mini",
    qty: 200,
    scheduledStart: "2026-07-08",
    scheduledEnd: "2026-07-12",
    status: "In Progress",
    machineId: "LINE-B2",
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "PRJ-301",
    name: "AI Procurement Pipeline Automation",
    description: "Automate supply chain forecasting and auto-generate vendor RFQs with Gemini.",
    status: "Active",
    progress: 68,
    tasksCount: 12,
    dueDate: "2026-08-15",
    owner: "Elena Rostova",
  },
  {
    id: "PRJ-302",
    name: "Next-Gen Enterprise CRM Dashboard",
    description: "Revamp the CRM leads portal with visual sales tracking metrics and AI pipeline predictions.",
    status: "Active",
    progress: 42,
    tasksCount: 18,
    dueDate: "2026-09-01",
    owner: "David Kojo",
  },
  {
    id: "PRJ-303",
    name: "ISO 27001 Security Audit Readiness",
    description: "Address compliance gaps, export dynamic audit logs, and harden multi-tenant endpoints.",
    status: "Planning",
    progress: 5,
    tasksCount: 8,
    dueDate: "2026-11-30",
    owner: "Sarah Jenkins",
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "TSK-4001",
    projectId: "PRJ-301",
    title: "Implement Gemini prompt templates for contract parsing",
    assignee: "Michael Chen",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-07-15",
  },
  {
    id: "TSK-4002",
    projectId: "PRJ-301",
    title: "Refactor database stock forecasting storage schema",
    assignee: "Michael Chen",
    status: "Todo",
    priority: "Medium",
    dueDate: "2026-07-22",
  },
  {
    id: "TSK-4003",
    projectId: "PRJ-301",
    title: "Define RFQ approval workflow rule matrices",
    assignee: "Elena Rostova",
    status: "Done",
    priority: "High",
    dueDate: "2026-07-05",
  },
  {
    id: "TSK-4004",
    projectId: "PRJ-302",
    title: "Build multi-tier sales visual funnel component",
    assignee: "Michael Chen",
    status: "Review",
    priority: "Medium",
    dueDate: "2026-07-12",
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "AUD-9901",
    timestamp: "2026-07-09T09:12:44",
    user: "Elena Rostova",
    role: "Finance Manager",
    action: "Approved Expense Claim EXP-1149",
    module: "Finance",
    ip: "192.168.1.45",
    status: "Success",
  },
  {
    id: "AUD-9902",
    timestamp: "2026-07-09T08:55:10",
    user: "Sarah Jenkins",
    role: "Super Admin",
    action: "Configured API Gateway Key for Stark Corp",
    module: "Identity",
    ip: "192.168.1.12",
    status: "Success",
  },
  {
    id: "AUD-9903",
    timestamp: "2026-07-09T08:42:01",
    user: "m.chen@enterprise.ai",
    role: "VP of Engineering",
    action: "Unregistered Developer Sandbox SSH Access Attempt",
    module: "Identity",
    ip: "84.22.124.9",
    status: "Warning",
  },
  {
    id: "AUD-9904",
    timestamp: "2026-07-08T17:15:33",
    user: "David Kojo",
    role: "Sales Manager",
    action: "Updated Opportunity Stage: Wayne Enterprises -> Negotiation",
    module: "CRM",
    ip: "192.168.1.90",
    status: "Success",
  }
];

export const DEFAULT_MODULES: ERPModule[] = [
  { id: "hrms", name: "HRMS & Workforce", description: "Manage employees, attendances, shift schedules, and screen resumes.", enabled: true, category: "Core", icon: "Users" },
  { id: "crm", name: "CRM & Sales", description: "Accelerate deals via pipeline funnels, client profiles, and AI sales letters.", enabled: true, category: "Core", icon: "TrendingUp" },
  { id: "finance", name: "Finance & Ledger", description: "Track double-entry ledgers, expense audits, taxes, and scan invoices.", enabled: true, category: "Core", icon: "DollarSign" },
  { id: "inventory", name: "Inventory & Warehousing", description: "Track stock, configure reorder triggers, and predict inventory demand.", enabled: true, category: "Core", icon: "Package" },
  { id: "procurement", name: "Smart Procurement", description: "Publish supplier RFQs, manage vendor bids, and outline supply terms.", enabled: true, category: "Core", icon: "FileText" },
  { id: "manufacturing", name: "Manufacturing & QC", description: "Monitor production queues, track BOM recipes, and check machine lifecycles.", enabled: true, category: "Core", icon: "Cpu" },
  { id: "projects", name: "Agile Project Board", description: "Run team sprints, manage Gantt timelines, and check daily timesheets.", enabled: true, category: "Core", icon: "Calendar" },
  { id: "analytics", name: "Executive Analytics", description: "Explore instant financial P&Ls, regional maps, and AI forecasting tips.", enabled: true, category: "Core", icon: "PieChart" }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    name: "Starter",
    price: 299,
    userLimit: 15,
    storageLimitGB: 50,
    aiTokenQuota: 1000000,
    features: ["Organization Hierarchy", "Basic Attendance Logging", "Financial Balance Tracker", "Shared File Vault"],
  },
  {
    name: "Professional",
    price: 899,
    userLimit: 100,
    storageLimitGB: 500,
    aiTokenQuota: 10000000,
    features: ["Organization Onboarding", "Full HRMS & CRM pipelines", "Interactive Inventory Warehouses", "Project Board Timeline", "Single-Agent AI Copilot Chat"],
  },
  {
    name: "Business",
    price: 2499,
    userLimit: 500,
    storageLimitGB: 2048,
    aiTokenQuota: 50000000,
    features: ["Global Multi-Branch Department Trees", "Complete Manufacturing MRP Planner", "Advanced Supplier Procurement portals", "Multi-Agent Collaboration Engine", "Invoice & CV Screeners (OCR)"],
  },
  {
    name: "Enterprise",
    price: 5999,
    userLimit: 9999,
    storageLimitGB: 10240,
    aiTokenQuota: 250000000,
    features: ["Unlimited Organization Workspaces", "Custom SSO & Identity policies", "Real-Time Multi-Agent Autopilot workflow", "Executive KPI builder & Predictor", "Unlimited API Gateway Access & Custom SDKs"],
  }
];

export const AI_AGENTS: AIAgent[] = [
  {
    id: "copilot",
    name: "Enterprise Copilot",
    role: "Universal Coordinator",
    systemInstruction: "You are the Enterprise Universal Copilot. Orchestrate other agents (HR, Finance, Sales, Analytics, Inventory) and coordinate workflows across ERP modules.",
    avatarColor: "bg-blue-600 text-white",
    status: "Idle"
  },
  {
    id: "hr-agent",
    name: "Amara (HR Agent)",
    role: "HR specialist",
    systemInstruction: "You are Amara, the Elite HR Specialist. Focus on employee issues, shift management, CV screening, onboarding workflow formulation, and leave logs.",
    avatarColor: "bg-teal-600 text-white",
    status: "Idle"
  },
  {
    id: "finance-agent",
    name: "Finley (Finance Agent)",
    role: "Financial auditor",
    systemInstruction: "You are Finley, the Finance Auditor. Analyze balance ledger items, calculate tax parameters, auditing expenses, and forecast cash flow structures.",
    avatarColor: "bg-emerald-600 text-white",
    status: "Idle"
  },
  {
    id: "sales-agent",
    name: "Sienna (Sales Agent)",
    role: "CRM Optimizer",
    systemInstruction: "You are Sienna, the CRM Sales Optimizer. Design winning lead responses, predict negotiation strategies, evaluate pipeline metrics, and compose personalized B2B outreach.",
    avatarColor: "bg-purple-600 text-white",
    status: "Idle"
  },
  {
    id: "inventory-agent",
    name: "Ian (Inventory Agent)",
    role: "Stock Coordinator",
    systemInstruction: "You are Ian, the Stock Coordinator. Resolve procurement blockages, design smart warehousing categories, predict stock outages, and configure supplier contract structures.",
    avatarColor: "bg-amber-600 text-white",
    status: "Idle"
  }
];
