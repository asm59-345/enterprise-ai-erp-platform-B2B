/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  joiningDate: string;
  salary: number;
  shift: string;
  leaveBalance: number;
  avatar?: string;
  attendance: {
    present: number;
    absent: number;
    late: number;
  };
  performanceRating?: number;
}

export interface CRMLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number;
  stage: 'Lead' | 'Contacted' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  source: string;
  owner: string;
  notes?: string;
  updatedAt: string;
}

export interface CRMAccount {
  id: string;
  name: string;
  industry: string;
  revenue: number;
  employees: number;
  contactsCount: number;
  owner: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'Revenue' | 'Expense';
  category: string;
  amount: number;
  status: 'Cleared' | 'Pending';
  reference?: string;
}

export interface Budget {
  department: string;
  allocated: number;
  spent: number;
  year: number;
}

export interface StockItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  warehouse: string;
  reorderLevel: number;
  price: number;
  supplier: string;
  forecastedDemand?: number;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  rating: number;
  performanceScore: number;
  activeContracts: number;
}

export interface RFQ {
  id: string;
  title: string;
  department: string;
  deadline: string;
  status: 'Draft' | 'Published' | 'Bids Received' | 'Closed';
  estimatedBudget: number;
  bidsCount: number;
  items: { name: string; qty: number }[];
}

export interface ProductionOrder {
  id: string;
  productName: string;
  qty: number;
  scheduledStart: string;
  scheduledEnd: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'QC Failed';
  machineId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed';
  progress: number;
  tasksCount: number;
  dueDate: string;
  owner: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  assignee: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  ip: string;
  status: 'Success' | 'Failed' | 'Warning';
}

export interface ERPModule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'Core' | 'Portal' | 'System';
  icon: string;
}

export interface SubscriptionPlan {
  name: string;
  price: number;
  userLimit: number;
  storageLimitGB: number;
  aiTokenQuota: number;
  features: string[];
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  systemInstruction: string;
  avatarColor: string;
  status: 'Idle' | 'Thinking' | 'Active';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  agentId?: string;
  agentName?: string;
  text: string;
  timestamp: string;
  isLoading?: boolean;
}
