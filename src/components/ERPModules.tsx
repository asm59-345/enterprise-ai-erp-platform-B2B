/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, TrendingUp, DollarSign, Package, FileText, Cpu, Calendar, 
  PieChart, Plus, Search, FileUp, Sparkles, AlertTriangle, CheckCircle, 
  ArrowRight, ShieldCheck, Mail, RefreshCw, BarChart2, Layers
} from 'lucide-react';
import { 
  Employee, CRMLead, CRMAccount, Transaction, Budget, StockItem, 
  Supplier, RFQ, ProductionOrder, Project, Task 
} from '../types';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

interface ERPModulesProps {
  activeModule: string;
  employees: Employee[];
  onAddEmployee: (emp: Employee) => void;
  leads: CRMLead[];
  onAddLead: (lead: CRMLead) => void;
  accounts: CRMAccount[];
  transactions: Transaction[];
  onAddTransaction: (tx: Transaction) => void;
  budgets: Budget[];
  stockItems: StockItem[];
  onAddStock: (item: StockItem) => void;
  suppliers: Supplier[];
  rfqs: RFQ[];
  productionOrders: ProductionOrder[];
  projects: Project[];
  tasks: Task[];
  onUpdateTaskStatus: (taskId: string, newStatus: any) => void;
  onAddTask: (task: Task) => void;
}

export default function ERPModules({
  activeModule,
  employees,
  onAddEmployee,
  leads,
  onAddLead,
  accounts,
  transactions,
  onAddTransaction,
  budgets,
  stockItems,
  onAddStock,
  suppliers,
  rfqs,
  productionOrders,
  projects,
  tasks,
  onUpdateTaskStatus,
  onAddTask
}: ERPModulesProps) {

  // ----------------------------------------------------
  // LOCAL STATES FOR INTERACTIVE FORMS & AI CHANNELS
  // ----------------------------------------------------
  
  // HR States
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [jobRole, setJobRole] = useState("Software Engineer");
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [isHrScreening, setIsHrScreening] = useState(false);
  const [hrError, setHrError] = useState("");
  const [newEmp, setNewEmp] = useState({
    name: "", email: "", department: "Engineering", role: "", salary: 85000, shift: "Day (9 AM - 5 PM)"
  });

  // CRM States
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [leadPurpose, setLeadPurpose] = useState("Introduction Proposal");
  const [leadRecipient, setLeadRecipient] = useState("Robert Downey");
  const [leadCompany, setLeadCompany] = useState("Stark Industries");
  const [leadContext, setLeadContext] = useState("Discussing customized LLM RAG pipelines for aerospace safety logistics");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [crmError, setCrmError] = useState("");
  const [newLead, setNewLead] = useState({
    name: "", company: "", email: "", phone: "", value: 100000, stage: 'Lead' as any, source: "Web Inbound"
  });

  // Finance States
  const [showAddTxModal, setShowAddTxModal] = useState(false);
  const [invoiceText, setInvoiceText] = useState("");
  const [invoiceAnalysis, setInvoiceAnalysis] = useState<any>(null);
  const [isParsingInvoice, setIsParsingInvoice] = useState(false);
  const [financeError, setFinanceError] = useState("");
  const [newTx, setNewTx] = useState({
    description: "", type: "Expense" as any, category: "Software Licenses", amount: 0, status: "Pending" as any
  });

  // Inventory States
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [newStock, setNewStock] = useState({
    name: "", sku: "", category: "Hardware", quantity: 100, warehouse: "Central Hub", reorderLevel: 20, price: 150, supplier: "Silicon Foundries Ltd"
  });

  // Project Board States
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "", projectId: "PRJ-301", assignee: "Sarah Jenkins", priority: "Medium" as any, dueDate: "2026-07-25"
  });

  // ----------------------------------------------------
  // SUBMIT HANDLERS (PERSIST TO REACT PARENT STATE)
  // ----------------------------------------------------
  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.email || !newEmp.role) return;
    const emp: Employee = {
      id: `EMP-00${employees.length + 1}`,
      name: newEmp.name,
      email: newEmp.email,
      department: newEmp.department,
      role: newEmp.role,
      status: 'Active',
      joiningDate: new Date().toISOString().split('T')[0],
      salary: Number(newEmp.salary),
      shift: newEmp.shift,
      leaveBalance: 15,
      attendance: { present: 1, absent: 0, late: 0 },
      performanceRating: 5.0
    };
    onAddEmployee(emp);
    setShowAddEmpModal(false);
    setNewEmp({ name: "", email: "", department: "Engineering", role: "", salary: 85000, shift: "Day (9 AM - 5 PM)" });
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.company || !newLead.email) return;
    const lead: CRMLead = {
      id: `LD-240${leads.length + 1}`,
      name: newLead.name,
      company: newLead.company,
      email: newLead.email,
      phone: newLead.phone,
      value: Number(newLead.value),
      stage: newLead.stage,
      source: newLead.source,
      owner: "David Kojo",
      updatedAt: new Date().toISOString().split('T')[0]
    };
    onAddLead(lead);
    setShowAddLeadModal(false);
    setNewLead({ name: "", company: "", email: "", phone: "", value: 100000, stage: 'Lead', source: "Web Inbound" });
  };

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.description || !newTx.amount) return;
    const tx: Transaction = {
      id: `TX-90${transactions.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      description: newTx.description,
      type: newTx.type,
      category: newTx.category,
      amount: newTx.type === 'Expense' ? -Math.abs(Number(newTx.amount)) : Math.abs(Number(newTx.amount)),
      status: newTx.status,
      reference: `REF-00${transactions.length + 100}`
    };
    onAddTransaction(tx);
    setShowAddTxModal(false);
    setNewTx({ description: "", type: "Expense", category: "Software Licenses", amount: 0, status: "Pending" });
  };

  const handleCreateStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStock.name || !newStock.sku) return;
    const item: StockItem = {
      id: `STK-10${stockItems.length + 1}`,
      sku: newStock.sku,
      name: newStock.name,
      category: newStock.category,
      quantity: Number(newStock.quantity),
      warehouse: newStock.warehouse,
      reorderLevel: Number(newStock.reorderLevel),
      price: Number(newStock.price),
      supplier: newStock.supplier,
      forecastedDemand: Math.round(Number(newStock.quantity) * 1.2)
    };
    onAddStock(item);
    setShowAddStockModal(false);
    setNewStock({ name: "", sku: "", category: "Hardware", quantity: 100, warehouse: "Central Hub", reorderLevel: 20, price: 150, supplier: "Silicon Foundries Ltd" });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    const task: Task = {
      id: `TSK-400${tasks.length + 1}`,
      projectId: newTask.projectId,
      title: newTask.title,
      assignee: newTask.assignee,
      status: 'Todo',
      priority: newTask.priority,
      dueDate: newTask.dueDate
    };
    onAddTask(task);
    setShowAddTaskModal(false);
    setNewTask({ title: "", projectId: "PRJ-301", assignee: "Sarah Jenkins", priority: "Medium", dueDate: "2026-07-25" });
  };

  // ----------------------------------------------------
  // SERVER-SIDE AI INTEGRATION CALLS
  // ----------------------------------------------------
  const handleHrScreening = async () => {
    if (!resumeText.trim()) {
      setHrError("Please paste a resume text to analyze.");
      return;
    }
    setIsHrScreening(true);
    setHrError("");
    setResumeAnalysis(null);

    try {
      const response = await fetch('/api/ai/parse-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobRole })
      });
      if (!response.ok) throw new Error("Failed to contact the HR AI screening daemon.");
      const data = await response.json();
      setResumeAnalysis(data);
    } catch (err: any) {
      setHrError(err.message || "An error occurred during resume auditing.");
    } finally {
      setIsHrScreening(false);
    }
  };

  const handleCrmGenerateEmail = async () => {
    setIsGeneratingEmail(true);
    setCrmError("");
    setGeneratedEmail("");

    try {
      const response = await fetch('/api/ai/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purpose: leadPurpose,
          recipientName: leadRecipient,
          companyName: leadCompany,
          context: leadContext
        })
      });
      if (!response.ok) throw new Error("Failed to contact CRM email drafting assistant.");
      const data = await response.json();
      setGeneratedEmail(data.email);
    } catch (err: any) {
      setCrmError(err.message || "An error occurred while drafting the outreach.");
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const handleFinanceAudit = async () => {
    if (!invoiceText.trim()) {
      setFinanceError("Please paste some invoice contents to audit.");
      return;
    }
    setIsParsingInvoice(true);
    setFinanceError("");
    setInvoiceAnalysis(null);

    try {
      const response = await fetch('/api/ai/parse-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceText })
      });
      if (!response.ok) throw new Error("Failed to reach Finley (AI Finance Auditor).");
      const data = await response.json();
      setInvoiceAnalysis(data);
    } catch (err: any) {
      setFinanceError(err.message || "An error occurred while auditing the invoice.");
    } finally {
      setIsParsingInvoice(false);
    }
  };

  // ----------------------------------------------------
  // MODULE RENDER SELECTIONS
  // ----------------------------------------------------

  // 1. HRMS MODULE
  const renderHRMS = () => {
    const totalStaff = employees.length;
    const onLeave = employees.filter(e => e.status === 'On Leave').length;
    const avgRating = (employees.reduce((acc, e) => acc + (e.performanceRating || 0), 0) / totalStaff).toFixed(1);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-500" /> HRMS & Workforce
            </h2>
            <p className="text-xs text-zinc-500 mt-1">Manage personnel, review performance, scheduler shifts, and analyze applicants with AI.</p>
          </div>
          <button
            onClick={() => setShowAddEmpModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow transition cursor-pointer"
            id="btn-add-employee"
          >
            <Plus className="w-3.5 h-3.5" /> Onboard Employee
          </button>
        </div>

        {/* HR Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-lg text-teal-600 dark:text-teal-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">Total Workforce</p>
              <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-100">{totalStaff} Employees</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-amber-600 dark:text-amber-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">Active / On Leave</p>
              <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-100">{totalStaff - onLeave} / {onLeave}</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">Average Performance</p>
              <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-100">{avgRating}★ rating</h3>
            </div>
          </div>
        </div>

        {/* Recruiter CV Screening Module */}
        <div className="bg-gradient-to-br from-teal-500/5 to-emerald-500/5 border border-teal-500/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-teal-600 rounded text-white font-black text-[10px]">AI</div>
              <div>
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-1">
                  Amara Resume Screening Agent
                </h3>
                <p className="text-[10px] text-zinc-500">Analyze raw resume files/texts and receive objective match scores, recommendations, and structured traits.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-zinc-500">Target Role:</label>
              <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="text-xs px-2 py-1 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
              >
                <option value="VP of Engineering">VP of Engineering</option>
                <option value="Senior DevOps Engineer">Senior DevOps Engineer</option>
                <option value="Staff AI/LLM Architect">Staff AI/LLM Architect</option>
                <option value="Supply Chain Lead">Supply Chain Lead</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste candidate bio, skills, education, and experience text here to screen..."
                className="w-full h-44 p-3 rounded-xl border text-xs font-mono bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setResumeText("John Connor\nExperience: 5 years leading human-machine defense networks. Built high-efficiency cybernetic tracking layers and coordinated server infrastructure routing blocks. Experts in: C++, Kubernetes, Network Protocols, Secure Vault systems, Python.")}
                  className="text-[10px] text-zinc-400 hover:text-zinc-600 transition"
                >
                  ⚡ Load Demo Candidate Text
                </button>
                <button
                  onClick={handleHrScreening}
                  disabled={isHrScreening}
                  className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white cursor-pointer"
                  id="btn-run-hr-screening"
                >
                  {isHrScreening ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>{isHrScreening ? "Amara is Auditing..." : "Run AI Resume Audit"}</span>
                </button>
              </div>
              {hrError && <p className="text-xs text-red-500 mt-1">{hrError}</p>}
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 min-h-44 flex flex-col justify-between">
              {resumeAnalysis ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                    <div>
                      <h4 className="text-xs font-black text-zinc-800 dark:text-zinc-100">{resumeAnalysis.candidateName}</h4>
                      <p className="text-[10px] text-zinc-400">Parsed Experience: {resumeAnalysis.experienceYears} Years</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        resumeAnalysis.decision === 'Shortlist' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        resumeAnalysis.decision === 'Review' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}>
                        Decision: {resumeAnalysis.decision}
                      </span>
                      <div className="text-[10px] text-zinc-400 mt-1">Match Score: <span className="font-bold text-teal-500">{resumeAnalysis.matchScore}%</span></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500">Executive Summary:</p>
                    <p className="text-[10px] text-zinc-600 dark:text-zinc-300 italic mt-0.5">{resumeAnalysis.summary}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500">Matching Candidate Skills:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {resumeAnalysis.skills?.map((s: string) => (
                        <span key={s} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-zinc-150 dark:border-zinc-850/40">
                    <p className="text-[10px] font-bold text-zinc-500">Amara's Technical Verdict:</p>
                    <ul className="list-disc pl-4 space-y-0.5 text-[9px] text-zinc-600 dark:text-zinc-400 mt-1">
                      {resumeAnalysis.reasons?.map((r: string, idx: number) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center flex-1 py-8">
                  <ShieldCheck className="w-8 h-8 text-teal-400 animate-pulse mb-2" />
                  <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Ready for Applicant Screening</p>
                  <p className="text-[10px] text-zinc-400 max-w-64 mt-1">Paste a resume and select target role. Amara will perform real-time extraction and generate an AI score.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Employee Directory List */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Active Employee Directory</h3>
            <span className="text-[10px] text-zinc-400">Showing {employees.length} entries</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-800">
                  <th className="p-3">Staff ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Salary</th>
                  <th className="p-3">Shift Schedule</th>
                  <th className="p-3">Leave Balance</th>
                  <th className="p-3 text-center">Perf Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 text-zinc-700 dark:text-zinc-300">
                    <td className="p-3 font-mono font-bold text-zinc-500">{emp.id}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-semibold">{emp.name}</p>
                        <p className="text-[10px] text-zinc-400">{emp.email}</p>
                      </div>
                    </td>
                    <td className="p-3">{emp.department}</td>
                    <td className="p-3 font-medium text-indigo-600 dark:text-indigo-400">{emp.role}</td>
                    <td className="p-3 font-mono">${emp.salary.toLocaleString()}/yr</td>
                    <td className="p-3 text-[11px] text-zinc-500">{emp.shift}</td>
                    <td className="p-3 font-mono text-center">{emp.leaveBalance} days</td>
                    <td className="p-3 text-center">
                      <span className="px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold font-mono text-[10px]">
                        {emp.performanceRating || "N/A"}★
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Employee Add Modal */}
        {showAddEmpModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4">Onboard New Employee</h3>
              <form onSubmit={handleCreateEmployee} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newEmp.name}
                    onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={newEmp.email}
                    onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Department</label>
                    <select
                      value={newEmp.department}
                      onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    >
                      <option value="Executive">Executive</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Finance">Finance</option>
                      <option value="Sales">Sales</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Base Salary ($)</label>
                    <input
                      type="number"
                      required
                      value={newEmp.salary}
                      onChange={(e) => setNewEmp({ ...newEmp, salary: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400">Assigned Role</label>
                  <input
                    type="text"
                    required
                    value={newEmp.role}
                    onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                    placeholder="e.g. Lead Devops Scientist"
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddEmpModal(false)}
                    className="px-4 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 cursor-pointer"
                  >
                    Add Onboard
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 2. CRM MODULE
  const renderCRM = () => {
    const totalSales = leads.reduce((sum, l) => sum + (l.stage === 'Won' ? l.value : 0), 0);
    const pipelineSum = leads.reduce((sum, l) => sum + l.value, 0);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" /> CRM & Sales Pipeline
            </h2>
            <p className="text-xs text-zinc-500 mt-1">Accelerate business deals, manage opportunities, and draft personalized executive emails with Sienna.</p>
          </div>
          <button
            onClick={() => setShowAddLeadModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow transition cursor-pointer"
            id="btn-add-lead"
          >
            <Plus className="w-3.5 h-3.5" /> Register Lead
          </button>
        </div>

        {/* Sales Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-600 dark:text-purple-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">Won Revenue</p>
              <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-100">${totalSales.toLocaleString()}</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-600 dark:text-indigo-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">Pipeline Deal Sum</p>
              <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-100">${pipelineSum.toLocaleString()}</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-lg text-teal-600 dark:text-teal-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">Accounts Managed</p>
              <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-100">{accounts.length} Active</h3>
            </div>
          </div>
        </div>

        {/* Sienna Sales Assistant Email Generator */}
        <div className="bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-purple-600 rounded text-white font-black text-[10px]">AI</div>
            <div>
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-1">
                Sienna CRM Sales Optimizer
              </h3>
              <p className="text-[10px] text-zinc-500">Draft high-converting personalized B2B outreach and deal proposals in seconds with server-side AI.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-zinc-450 uppercase">Recipient Name</label>
                  <input
                    type="text"
                    value={leadRecipient}
                    onChange={(e) => setLeadRecipient(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                  />
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-zinc-450 uppercase">Company</label>
                  <input
                    type="text"
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-0.5">
                <label className="text-[9px] font-bold text-zinc-450 uppercase">Email Purpose</label>
                <select
                  value={leadPurpose}
                  onChange={(e) => setLeadPurpose(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850 text-zinc-700 dark:text-zinc-300 focus:outline-none"
                >
                  <option value="Cold Outreach Pitch">Cold Outreach Pitch</option>
                  <option value="Post-Webinar Proposal">Post-Webinar Proposal</option>
                  <option value="Agile Contract Negotiation Terms">Agile Contract Negotiation Terms</option>
                  <option value="Demo Follow-up Schedule">Demo Follow-up Schedule</option>
                </select>
              </div>

              <div className="space-y-0.5">
                <label className="text-[9px] font-bold text-zinc-450 uppercase">Context / Key Variables</label>
                <textarea
                  value={leadContext}
                  onChange={(e) => setLeadContext(e.target.value)}
                  className="w-full h-20 p-2 text-xs rounded-lg border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleCrmGenerateEmail}
                  disabled={isGeneratingEmail}
                  className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white cursor-pointer"
                  id="btn-crm-generate-email"
                >
                  {isGeneratingEmail ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                  <span>{isGeneratingEmail ? "Sienna drafting..." : "Draft Outreach Email"}</span>
                </button>
              </div>
              {crmError && <p className="text-xs text-red-500">{crmError}</p>}
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 min-h-44 flex flex-col justify-between">
              {generatedEmail ? (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 font-mono tracking-wider">SIENNA'S DRAFT OUTBOX:</span>
                    <div className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap mt-2 select-all p-3 border rounded-lg bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 max-h-48 overflow-y-auto">
                      {generatedEmail}
                    </div>
                  </div>
                  <span className="text-[9px] text-zinc-400 mt-2 block italic">💡 Feel free to copy or edit this outbox draft before dispatching.</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center flex-1 py-8">
                  <Mail className="w-8 h-8 text-purple-400 animate-pulse mb-2" />
                  <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Awaiting Draft Details</p>
                  <p className="text-[10px] text-zinc-400 max-w-64 mt-1">Configure context and company variables on the left. Sienna will generate a real-time optimized pitch email.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Sales Opportunities Funnel</h3>
            <span className="text-[10px] text-zinc-400">Total pipeline opportunities: {leads.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-800">
                  <th className="p-3">Deal ID</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Estimated Value</th>
                  <th className="p-3">Funnel Stage</th>
                  <th className="p-3">Source Channel</th>
                  <th className="p-3 text-right">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 text-zinc-700 dark:text-zinc-300">
                    <td className="p-3 font-mono font-bold text-zinc-500">{l.id}</td>
                    <td className="p-3 font-semibold">{l.name}</td>
                    <td className="p-3 font-medium text-zinc-800 dark:text-zinc-200">{l.company}</td>
                    <td className="p-3 font-mono font-semibold text-emerald-600">${l.value.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        l.stage === 'Won' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        l.stage === 'Negotiation' ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' :
                        l.stage === 'Proposal' ? 'bg-purple-500/10 text-purple-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-550'
                      }`}>
                        {l.stage}
                      </span>
                    </td>
                    <td className="p-3 text-zinc-500">{l.source}</td>
                    <td className="p-3 text-right text-zinc-400 font-mono">{l.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Modal */}
        {showAddLeadModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4">Register Sales Opportunity</h3>
              <form onSubmit={handleCreateLead} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400">Client Name</label>
                  <input
                    type="text"
                    required
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400">Company Name</label>
                  <input
                    type="text"
                    required
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Client Email</label>
                    <input
                      type="email"
                      required
                      value={newLead.email}
                      onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Deal Value ($)</label>
                    <input
                      type="number"
                      required
                      value={newLead.value}
                      onChange={(e) => setNewLead({ ...newLead, value: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Funnel Stage</label>
                    <select
                      value={newLead.stage}
                      onChange={(e) => setNewLead({ ...newLead, stage: e.target.value as any })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-100"
                    >
                      <option value="Lead">Lead</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Negotiation">Negotiation</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Lead Source</label>
                    <input
                      type="text"
                      value={newLead.source}
                      onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddLeadModal(false)}
                    className="px-4 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 cursor-pointer"
                  >
                    Register Deal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 3. FINANCE MODULE
  const renderFinance = () => {
    const revenueSum = transactions.filter(t => t.type === 'Revenue').reduce((sum, t) => sum + t.amount, 0);
    const expenseSum = Math.abs(transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0));
    const netProfit = revenueSum - expenseSum;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" /> Finance & General Ledger
            </h2>
            <p className="text-xs text-zinc-500 mt-1">Audit double-entry ledger listings, calculate cash flows, and scan supplier invoices for compliance with Finley.</p>
          </div>
          <button
            onClick={() => setShowAddTxModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow transition cursor-pointer"
            id="btn-add-transaction"
          >
            <Plus className="w-3.5 h-3.5" /> Post Ledger Item
          </button>
        </div>

        {/* Finance Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">Gross Revenues</p>
              <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-100">${revenueSum.toLocaleString()}</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-lg text-red-600 dark:text-red-400">
              <ArrowRight className="w-6 h-6 rotate-45" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">Total Expenditures</p>
              <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-100">${expenseSum.toLocaleString()}</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-600 dark:text-indigo-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">Net Corporate Profit</p>
              <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-100">${netProfit.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        {/* Finley AI Invoice Scanning */}
        <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-emerald-600 rounded text-white font-black text-[10px]">AI</div>
            <div>
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-1">
                Finley Smart Invoice Compliance Auditor
              </h3>
              <p className="text-[10px] text-zinc-500">Paste standard raw text invoices. Finley will extract subtotal, taxes, item matrices, and flag budget compliance risks.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <textarea
                value={invoiceText}
                onChange={(e) => setInvoiceText(e.target.value)}
                placeholder="Paste supplier invoice metadata or raw billing text here..."
                className="w-full h-44 p-3 rounded-xl border text-xs font-mono bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setInvoiceText("Silicon Foundries Ltd\nInvoice No: SF-88122\nDate: 2026-07-09\n100x Neural Tensor Units v3 @ $1,200 each. Total: $120,000\nSubtotal: $120,000\nTax: $6,000\nTotal Bill: $126,000\nPayment Terms: Net 30.")}
                  className="text-[10px] text-zinc-400 hover:text-zinc-600 transition"
                >
                  ⚡ Load Demo Invoice Text
                </button>
                <button
                  onClick={handleFinanceAudit}
                  disabled={isParsingInvoice}
                  className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white cursor-pointer"
                  id="btn-run-finance-audit"
                >
                  {isParsingInvoice ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>{isParsingInvoice ? "Finley is Auditing..." : "Post & Run Compliance Audit"}</span>
                </button>
              </div>
              {financeError && <p className="text-xs text-red-500 mt-1">{financeError}</p>}
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 min-h-44 flex flex-col justify-between">
              {invoiceAnalysis ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                    <div>
                      <h4 className="text-xs font-black text-zinc-800 dark:text-zinc-100">{invoiceAnalysis.vendorName}</h4>
                      <p className="text-[10px] text-zinc-400">Inv: {invoiceAnalysis.invoiceNumber} | {invoiceAnalysis.invoiceDate}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        invoiceAnalysis.riskFactor === 'Low' ? 'bg-emerald-500/10 text-emerald-600' :
                        invoiceAnalysis.riskFactor === 'Medium' ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'
                      }`}>
                        Risk: {invoiceAnalysis.riskFactor}
                      </span>
                      <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-1">${invoiceAnalysis.totalAmount?.toLocaleString()}</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 mb-1">Parsed Ledger Items:</p>
                    <div className="space-y-1">
                      {invoiceAnalysis.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-[10px] bg-white dark:bg-zinc-900 border rounded p-1.5">
                          <span className="font-medium text-zinc-700 dark:text-zinc-350">{item.description} (x{item.qty})</span>
                          <span className="font-mono text-zinc-500">${item.total?.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between text-[10px] text-zinc-550 border-t border-b py-1.5">
                    <span>Tax: ${invoiceAnalysis.taxAmount?.toLocaleString() || 0}</span>
                    <span>Subtotal: ${invoiceAnalysis.subtotal?.toLocaleString() || 0}</span>
                  </div>

                  <div className="pt-2">
                    <p className="text-[10px] font-bold text-zinc-550">Finley's Audit Findings:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {invoiceAnalysis.complianceFlags?.map((flag: string, idx: number) => (
                        <span key={idx} className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-250 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400 border flex items-center gap-1">
                          <AlertTriangle className="w-2.5 h-2.5 text-amber-500" /> {flag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center flex-1 py-8">
                  <ShieldCheck className="w-8 h-8 text-emerald-400 animate-pulse mb-2" />
                  <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Awaiting Invoice Submission</p>
                  <p className="text-[10px] text-zinc-400 max-w-64 mt-1">Provide invoice text on the left. Finley will perform real-time extraction and verify compliance automatically.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Double Entry Ledger Listings */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Double Entry Ledger List</h3>
            <span className="text-[10px] text-zinc-400">Clearing Status: Verified by audit</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-800">
                  <th className="p-3">Reference ID</th>
                  <th className="p-3">Posting Date</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3 text-right">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 text-zinc-700 dark:text-zinc-300">
                    <td className="p-3 font-mono font-bold text-zinc-500">{tx.reference || `REF-${tx.id}`}</td>
                    <td className="p-3 font-mono">{tx.date}</td>
                    <td className="p-3 font-semibold">{tx.description}</td>
                    <td className="p-3 font-medium text-zinc-650 dark:text-zinc-300">{tx.category}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        tx.type === 'Revenue' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className={`p-3 font-mono font-bold ${tx.type === 'Revenue' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {tx.type === 'Revenue' ? '+' : ''}${tx.amount.toLocaleString()}
                    </td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.status === 'Cleared' ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'bg-amber-500/10 text-amber-600'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction Modal */}
        {showAddTxModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4">Post Double-Entry Ledger</h3>
              <form onSubmit={handleCreateTransaction} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400">Transaction Description</label>
                  <input
                    type="text"
                    required
                    value={newTx.description}
                    onChange={(e) => setNewTx({ ...newTx, description: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Entry Type</label>
                    <select
                      value={newTx.type}
                      onChange={(e) => setNewTx({ ...newTx, type: e.target.value as any })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    >
                      <option value="Revenue">Revenue (Income)</option>
                      <option value="Expense">Expense (Payout)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Accounting Category</label>
                    <select
                      value={newTx.category}
                      onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-100"
                    >
                      <option value="SaaS Subscription">SaaS Subscription</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Facilities">Facilities</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Software Licenses">Software Licenses</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Ledger Amount ($)</label>
                    <input
                      type="number"
                      required
                      value={newTx.amount || ""}
                      onChange={(e) => setNewTx({ ...newTx, amount: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Initial Audit Status</label>
                    <select
                      value={newTx.status}
                      onChange={(e) => setNewTx({ ...newTx, status: e.target.value as any })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    >
                      <option value="Pending">Pending Audit</option>
                      <option value="Cleared">Cleared (Audit Verified)</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddTxModal(false)}
                    className="px-4 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 cursor-pointer"
                  >
                    Post Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 4. INVENTORY MODULE
  const renderInventory = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-500" /> Inventory & Stock
            </h2>
            <p className="text-xs text-zinc-500 mt-1">Audit warehouse locations, track SKU quantities, set reorder points, and read AI demand forecasts.</p>
          </div>
          <button
            onClick={() => setShowAddStockModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow transition cursor-pointer"
            id="btn-add-stock"
          >
            <Plus className="w-3.5 h-3.5" /> Register SKU Stock
          </button>
        </div>

        {/* AI Stock Warning */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 p-4 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400">AI Stock Low Threshold Alert</h4>
            <p className="text-[10px] text-amber-700 dark:text-amber-500 mt-0.5">
              Ian (Stock Coordinator) predicted high demand for 'Neural Tensor Compute Unit v3' in Q3 (Forecasted: 580 vs Current: 450). Reorder levels have been reached. Supply Chain RFQ draft has been auto-generated.
            </p>
          </div>
        </div>

        {/* Stock SKU Grid */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-800">
                  <th className="p-3">SKU Code</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Warehouse Location</th>
                  <th className="p-3">Current Qty</th>
                  <th className="p-3">Reorder Threshold</th>
                  <th className="p-3 text-center">Unit Price</th>
                  <th className="p-3 text-right">AI Q3 Forecast</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {stockItems.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 text-zinc-700 dark:text-zinc-300">
                    <td className="p-3 font-mono font-bold text-zinc-500">{item.sku}</td>
                    <td className="p-3 font-semibold">{item.name}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3 text-zinc-500">{item.warehouse}</td>
                    <td className="p-3">
                      <span className={`font-mono font-bold ${item.quantity < item.reorderLevel ? 'text-red-500' : 'text-zinc-800 dark:text-zinc-250'}`}>
                        {item.quantity} units
                      </span>
                    </td>
                    <td className="p-3 font-mono text-zinc-400">{item.reorderLevel} units</td>
                    <td className="p-3 text-center font-mono font-medium">${item.price.toLocaleString()}</td>
                    <td className="p-3 text-right">
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                        {item.forecastedDemand ? `${item.forecastedDemand} units` : "N/A"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Stock Modal */}
        {showAddStockModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4">Register SKU Product Stock</h3>
              <form onSubmit={handleCreateStock} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Product SKU Code</label>
                    <input
                      type="text"
                      required
                      value={newStock.sku}
                      onChange={(e) => setNewStock({ ...newStock, sku: e.target.value.toUpperCase() })}
                      placeholder="e.g. GPU-NVIDIA-A10"
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Warehouse Location</label>
                    <input
                      type="text"
                      required
                      value={newStock.warehouse}
                      onChange={(e) => setNewStock({ ...newStock, warehouse: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400">Product Name</label>
                  <input
                    type="text"
                    required
                    value={newStock.name}
                    onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Initial Qty</label>
                    <input
                      type="number"
                      required
                      value={newStock.quantity}
                      onChange={(e) => setNewStock({ ...newStock, quantity: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Reorder level</label>
                    <input
                      type="number"
                      required
                      value={newStock.reorderLevel}
                      onChange={(e) => setNewStock({ ...newStock, reorderLevel: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Unit Price ($)</label>
                    <input
                      type="number"
                      required
                      value={newStock.price}
                      onChange={(e) => setNewStock({ ...newStock, price: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddStockModal(false)}
                    className="px-4 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 cursor-pointer"
                  >
                    Post Stock SKU
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 5. PROCUREMENT MODULE
  const renderProcurement = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" /> Smart Procurement
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Publish team RFQs, audit vendor contract terms, and review supplier performance indexes.</p>
        </div>

        {/* Suppliers Score Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suppliers.map((sup) => (
            <div key={sup.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-850 text-zinc-500 px-1.5 py-0.5 rounded">
                  {sup.id}
                </span>
                <span className="text-xs font-bold text-amber-500">
                  {sup.rating}★ Rating
                </span>
              </div>
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{sup.name}</h4>
              <p className="text-[10px] text-zinc-400 mt-1">{sup.email}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] border-t border-zinc-100 dark:border-zinc-800 pt-2.5">
                <span className="text-zinc-500">SLA Deliverability:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{sup.performanceScore}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Active RFQs list */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Outstanding RFQs (Request For Quotes)</h3>
            <span className="text-[10px] text-zinc-400">Total RFQs: {rfqs.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-800">
                  <th className="p-3">RFQ ID</th>
                  <th className="p-3">RFQ Subject</th>
                  <th className="p-3">Issuing Department</th>
                  <th className="p-3">Bidding Deadline</th>
                  <th className="p-3">Est. Budget</th>
                  <th className="p-3">Active Bids</th>
                  <th className="p-3 text-right">RFQ Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {rfqs.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 text-zinc-700 dark:text-zinc-300">
                    <td className="p-3 font-mono font-bold text-zinc-500">{rfq.id}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-semibold">{rfq.title}</p>
                        <p className="text-[10px] text-zinc-400">
                          {rfq.items.map(it => `${it.qty}x ${it.name}`).join(', ')}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">{rfq.department}</td>
                    <td className="p-3 font-mono text-zinc-500">{rfq.deadline}</td>
                    <td className="p-3 font-mono">${rfq.estimatedBudget.toLocaleString()}</td>
                    <td className="p-3 font-mono text-center">{rfq.bidsCount} bids</td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rfq.status === 'Bids Received' ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                      }`}>
                        {rfq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 6. MANUFACTURING MODULE
  const renderManufacturing = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-red-500" /> Manufacturing & Quality Control
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Configure Bill of Materials (BOM) recipes, monitor machine assembly lines, and log QA outputs.</p>
        </div>

        {/* Machine Monitoring Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-5 rounded-xl">
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-3 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" /> Assembly Line B2 Status (Nvidia Edge Nodes)
            </h4>
            <div className="space-y-3.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Active Machine:</span>
                <span className="font-mono font-bold text-zinc-850 dark:text-zinc-200">Edge Solder v4</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Operating Temperature:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">42°C (Optimal)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Machine Speed (RPM):</span>
                <span className="font-mono text-zinc-650 dark:text-zinc-350">1,250 cycles/min</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Hourly Yield Efficiency:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">98.4%</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-5 rounded-xl">
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-3 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" /> Assembly Line A3 Status (Tensor Processors)
            </h4>
            <div className="space-y-3.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Active Machine:</span>
                <span className="font-mono font-bold text-zinc-850 dark:text-zinc-200">Robot Arm Armata v2</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Operating Temperature:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">39°C (Optimal)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Arm Rotation Frequency:</span>
                <span className="font-mono text-zinc-650 dark:text-zinc-350">620 sweeps/min</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Hourly Yield Efficiency:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">99.1%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Manufacturing active pipeline */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Active Assembly Scheduling Queue</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-800">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Target Assembly Item</th>
                  <th className="p-3 text-center">Batch Size (Qty)</th>
                  <th className="p-3">Estimated Start</th>
                  <th className="p-3">Estimated Finish</th>
                  <th className="p-3">Machine Line</th>
                  <th className="p-3 text-right">Assembly Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {productionOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 text-zinc-700 dark:text-zinc-300">
                    <td className="p-3 font-mono font-bold text-zinc-500">{ord.id}</td>
                    <td className="p-3 font-semibold">{ord.productName}</td>
                    <td className="p-3 text-center font-mono font-bold">{ord.qty} units</td>
                    <td className="p-3 font-mono text-zinc-400">{ord.scheduledStart}</td>
                    <td className="p-3 font-mono text-zinc-400">{ord.scheduledEnd}</td>
                    <td className="p-3 font-mono text-indigo-600 dark:text-indigo-400">{ord.machineId}</td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ord.status === 'In Progress' ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 animate-pulse' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 7. PROJECT MANAGEMENT MODULE
  const renderProjects = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" /> Sprint Kanban Board
            </h2>
            <p className="text-xs text-zinc-500 mt-1">Manage team sprint cycles, assign developer roles, and drag-and-drop tasks directly.</p>
          </div>
          <button
            onClick={() => setShowAddTaskModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow transition cursor-pointer"
            id="btn-add-task"
          >
            <Plus className="w-3.5 h-3.5" /> Launch Task
          </button>
        </div>

        {/* Project Pipeline Selection */}
        <div className="flex gap-4 items-center">
          <label className="text-xs font-bold text-zinc-500">Active Board Project:</label>
          <div className="font-bold text-xs px-3 py-1 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
            PRJ-301: AI Procurement Pipeline Automation (Elena Rostova)
          </div>
        </div>

        {/* Kanban Board Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Todo Column */}
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Backlog Todo</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500">
                {tasks.filter(t => t.status === 'Todo').length}
              </span>
            </div>
            <div className="space-y-2">
              {tasks.filter(t => t.status === 'Todo').map(t => (
                <div key={t.id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[9px] font-bold text-zinc-400 font-mono">{t.id}</span>
                    <span className={`text-[8px] font-bold uppercase px-1 py-0.2 rounded ${
                      t.priority === 'High' ? 'bg-red-500/10 text-red-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                    }`}>{t.priority}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">{t.title}</h4>
                  <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-850/60">
                    <span className="text-[10px] text-zinc-500">{t.assignee}</span>
                    <button
                      onClick={() => onUpdateTaskStatus(t.id, 'In Progress')}
                      className="text-[10px] text-indigo-600 font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
                    >
                      Start <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">In Active Development</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                {tasks.filter(t => t.status === 'In Progress').length}
              </span>
            </div>
            <div className="space-y-2">
              {tasks.filter(t => t.status === 'In Progress').map(t => (
                <div key={t.id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[9px] font-bold text-zinc-400 font-mono">{t.id}</span>
                    <span className={`text-[8px] font-bold uppercase px-1 py-0.2 rounded ${
                      t.priority === 'High' ? 'bg-red-500/10 text-red-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                    }`}>{t.priority}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">{t.title}</h4>
                  <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-850/60">
                    <span className="text-[10px] text-zinc-500">{t.assignee}</span>
                    <button
                      onClick={() => onUpdateTaskStatus(t.id, 'Review')}
                      className="text-[10px] text-indigo-600 font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
                    >
                      Submit <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Column */}
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-purple-600 uppercase">PR Audit & Review</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600">
                {tasks.filter(t => t.status === 'Review').length}
              </span>
            </div>
            <div className="space-y-2">
              {tasks.filter(t => t.status === 'Review').map(t => (
                <div key={t.id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[9px] font-bold text-zinc-400 font-mono">{t.id}</span>
                    <span className={`text-[8px] font-bold uppercase px-1 py-0.2 rounded ${
                      t.priority === 'High' ? 'bg-red-500/10 text-red-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                    }`}>{t.priority}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">{t.title}</h4>
                  <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-850/60">
                    <span className="text-[10px] text-zinc-500">{t.assignee}</span>
                    <button
                      onClick={() => onUpdateTaskStatus(t.id, 'Done')}
                      className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
                    >
                      Approve <CheckCircle className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-emerald-600 uppercase">Completed Done</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                {tasks.filter(t => t.status === 'Done').length}
              </span>
            </div>
            <div className="space-y-2">
              {tasks.filter(t => t.status === 'Done').map(t => (
                <div key={t.id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-3 rounded-lg shadow-sm opacity-75">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[9px] font-bold text-zinc-450 font-mono">{t.id}</span>
                    <span className="text-[8px] font-bold uppercase px-1 py-0.2 rounded bg-emerald-50 text-emerald-550">Done</span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 line-through leading-relaxed">{t.title}</h4>
                  <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-850/60">
                    <span className="text-[10px] text-zinc-450">{t.assignee}</span>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                      Completed <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Modal */}
        {showAddTaskModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4">Add Task to Sprint Board</h3>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400">Task Title</label>
                  <input
                    type="text"
                    required
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="e.g. Implement CRM opportunity filter"
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Assignee</label>
                    <select
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                    >
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.name}>{emp.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400">Task Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                      className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-100"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400">Due Date</label>
                  <input
                    type="date"
                    required
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddTaskModal(false)}
                    className="px-4 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 cursor-pointer"
                  >
                    Post Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 8. EXECUTIVE ANALYTICS MODULE
  const renderAnalytics = () => {
    // Chart Mock Data
    const revenueTrendData = [
      { name: 'Jan', revenue: 450000, profit: 120000 },
      { name: 'Feb', revenue: 520000, profit: 160000 },
      { name: 'Mar', revenue: 610000, profit: 210000 },
      { name: 'Apr', revenue: 580000, profit: 190000 },
      { name: 'May', revenue: 720000, profit: 280000 },
      { name: 'Jun', revenue: 840000, profit: 340000 },
      { name: 'Jul', revenue: 950000, profit: 410000 }
    ];

    const budgetBreakdownData = budgets.map(b => ({
      name: b.department,
      allocated: b.allocated / 1000, // as thousands
      spent: b.spent / 1000
    }));

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-500" /> Executive Analytics Dashboard
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Explore real-time revenue curves, departmental budget allocation matrices, and AI predictive indicators.</p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue and Profit Trend Chart */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-emerald-500" /> Corporate Income & Profit Trend (USD)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrendData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-100 dark:stroke-zinc-800" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip formatter={(v: any) => `$${v.toLocaleString()}`} />
                  <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" strokeWidth={2} />
                  <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" name="Net Profit" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Departmental Budgets Bar Chart */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-500" /> Department Budget Allocated vs Spent (in Thousands USD)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetBreakdownData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-100 dark:stroke-zinc-800" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}k`} />
                  <Tooltip formatter={(v: any) => `$${(v*1000).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="allocated" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Allocated Budget" />
                  <Bar dataKey="spent" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Spent Capital" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Predictive Analytics Insights */}
        <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/20 p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 px-1.5 bg-indigo-600 rounded text-white font-black text-[9px] uppercase tracking-wider font-mono">
              AI Forecast
            </div>
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">
              Executive Predictive Recommendation Insights
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-white dark:bg-zinc-950 border rounded-xl">
              <p className="font-bold text-indigo-600 dark:text-indigo-400">📈 Revenue Scaling Target</p>
              <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                Stark opportunity (LD-2401) deal win chance has escalated to 85% based on contract term analyses. If won, Q3 revenue is expected to breach $1.7M, scaling SaaS profit margins by 12%.
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-950 border rounded-xl">
              <p className="font-bold text-amber-600">⚠️ Cost Optimization Warning</p>
              <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                Google Cloud Platform monthly infrastructure expenses rose by 8% due to active neural model training runs. Recommend routing lighter RAG calls to `gemini-3.1-flash-lite` to cut costs by 22%.
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-950 border rounded-xl">
              <p className="font-bold text-teal-600">👥 Team Capacity Restructuring</p>
              <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                Engineering division has logged 135 hours of timesheets across active CRM and Procurement tasks. Bandwidth is highly saturated; propose hiring a dedicated DevOps specialist.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  switch (activeModule) {
    case 'hrms': return renderHRMS();
    case 'crm': return renderCRM();
    case 'finance': return renderFinance();
    case 'inventory': return renderInventory();
    case 'procurement': return renderProcurement();
    case 'manufacturing': return renderManufacturing();
    case 'projects': return renderProjects();
    case 'analytics': return renderAnalytics();
    default: return renderAnalytics();
  }
}
