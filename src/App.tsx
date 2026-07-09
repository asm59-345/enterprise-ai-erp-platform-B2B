/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Send, X, Bot, Sparkles, Terminal, 
  HelpCircle, ArrowRight, ShieldAlert, Cpu, Check, Layers, AlertCircle
} from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ERPModules from './components/ERPModules';
import Portals from './components/Portals';
import Settings from './components/Settings';
import AboutAndObservability from './components/AboutAndObservability';
import Auth from './components/Auth';
import QAPanel from './components/QAPanel';
import { syncAuditLogToCloud } from './lib/firebase';
import { 
  INITIAL_EMPLOYEES, INITIAL_LEADS, INITIAL_ACCOUNTS, INITIAL_TRANSACTIONS, 
  INITIAL_BUDGETS, INITIAL_STOCK, INITIAL_SUPPLIERS, INITIAL_RFQS, 
  INITIAL_PRODUCTION, INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_AUDIT_LOGS, 
  DEFAULT_MODULES, SUBSCRIPTION_PLANS, AI_AGENTS 
} from './data';
import { 
  Employee, CRMLead, CRMAccount, Transaction, Budget, StockItem, 
  Supplier, RFQ, ProductionOrder, Project, Task, AuditLog, ERPModule, 
  ChatMessage, AIAgent 
} from './types';

export default function App() {
  // ----------------------------------------------------
  // GLOBAL ERP SYSTEM STATES
  // ----------------------------------------------------
  const [currentRole, setCurrentRole] = useState<string>('Super Admin');
  const [activePanel, setActivePanel] = useState<string>('tech-about'); // Default to about for direct user guidance
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('erp-themeMode');
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    }
    return 'system';
  });
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('erp-session-user') || null;
    }
    return null;
  });
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  
  // Datasets Shared State
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [leads, setLeads] = useState<CRMLead[]>(INITIAL_LEADS);
  const [accounts, setAccounts] = useState<CRMAccount[]>(INITIAL_ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [budgets, setBudgets] = useState<Budget[]>(INITIAL_BUDGETS);
  const [stockItems, setStockItems] = useState<StockItem[]>(INITIAL_STOCK);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [rfqs, setRfqs] = useState<RFQ[]>(INITIAL_RFQS);
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>(INITIAL_PRODUCTION);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  
  // SaaS configuration
  const [modules, setModules] = useState<ERPModule[]>(DEFAULT_MODULES);
  const [activePlan, setActivePlan] = useState<string>('Professional');

  // ----------------------------------------------------
  // COPILOT CHAT & MULTI-AGENT STATE
  // ----------------------------------------------------
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'agent',
      agentId: 'copilot',
      agentName: 'Universal Copilot',
      text: 'Welcome to the Enterprise AI ERP. I can coordinate with Amara (HR Specialist), Finley (Finance Auditor), Sienna (Sales Lead), and Ian (Inventory Coordinator) to automate business workflows. Ask me anything or trigger a multi-agent scenario!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [activeAgentId, setActiveAgentId] = useState<string>('copilot');
  const [isCopilotLoading, setIsCopilotLoading] = useState<boolean>(false);
  const [selectedScenario, setSelectedScenario] = useState<string>('none');
  const [scenarioDetails, setScenarioDetails] = useState<string>('');
  const [isScenarioLoading, setIsScenarioLoading] = useState<boolean>(false);
  const [scenarioResultMarkdown, setScenarioResultMarkdown] = useState<string>('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync Theme Mode with document root and handle OS preferences dynamically
  useEffect(() => {
    localStorage.setItem('erp-themeMode', themeMode);
    
    const applyTheme = (dark: boolean) => {
      setDarkMode(dark);
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    if (themeMode === 'system') {
      if (typeof window !== 'undefined' && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        applyTheme(mediaQuery.matches);

        const listener = (e: MediaQueryListEvent) => {
          applyTheme(e.matches);
        };
        mediaQuery.addEventListener('change', listener);
        return () => mediaQuery.removeEventListener('change', listener);
      }
      applyTheme(false);
    } else {
      applyTheme(themeMode === 'dark');
    }
  }, [themeMode]);

  // Scroll to bottom of chat on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isCopilotLoading]);

  // Command Palette Keyboard shortcut (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ----------------------------------------------------
  // ERP DATA ACTION CALLBACKS
  // ----------------------------------------------------
  
  const handleAddEmployee = (emp: Employee) => {
    setEmployees([emp, ...employees]);
    // Append to audit logs
    handleAppendAuditLog({
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().split('.')[0],
      user: "Super Admin",
      role: currentRole,
      action: `Onboarded employee candidate: ${emp.name}`,
      module: "HRMS",
      ip: "192.168.1.12",
      status: "Success"
    });
  };

  const handleAddLead = (lead: CRMLead) => {
    setLeads([lead, ...leads]);
    handleAppendAuditLog({
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().split('.')[0],
      user: "Sales Lead",
      role: currentRole,
      action: `Logged CRM Lead Opportunity: ${lead.company} ($${lead.value.toLocaleString()})`,
      module: "CRM",
      ip: "192.168.1.12",
      status: "Success"
    });
  };

  const handleAddTransaction = (tx: Transaction) => {
    setTransactions([tx, ...transactions]);
    
    // Adjust budget if expense
    if (tx.type === 'Expense') {
      const amountToDeduct = Math.abs(tx.amount);
      setBudgets(budgets.map(b => 
        b.department === 'Finance' ? { ...b, spent: b.spent + amountToDeduct } : b
      ));
    }

    handleAppendAuditLog({
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().split('.')[0],
      user: "Finance Auditor",
      role: currentRole,
      action: `Recorded General Ledger double-entry: ${tx.description} ($${tx.amount.toLocaleString()})`,
      module: "Finance",
      ip: "192.168.1.12",
      status: "Success"
    });
  };

  const handleAddStock = (item: StockItem) => {
    setStockItems([item, ...stockItems]);
    handleAppendAuditLog({
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().split('.')[0],
      user: "Inventory Lead",
      role: currentRole,
      action: `Registered central storage SKU tracking: ${item.sku} - ${item.name}`,
      module: "Inventory",
      ip: "192.168.1.12",
      status: "Success"
    });
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: any) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    
    // Dynamically adjust project progress bar
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const projId = task.projectId;
      const projTasks = tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t).filter(t => t.projectId === projId);
      const doneCount = projTasks.filter(t => t.status === 'Done').length;
      const progressPercent = Math.round((doneCount / projTasks.length) * 100);
      setProjects(projects.map(p => p.id === projId ? { ...p, progress: progressPercent } : p));
    }
  };

  const handleAddTask = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    
    // Recalculate progress for project
    const projId = task.projectId;
    const projTasks = updatedTasks.filter(t => t.projectId === projId);
    const doneCount = projTasks.filter(t => t.status === 'Done').length;
    const progressPercent = Math.round((doneCount / projTasks.length) * 100);
    setProjects(projects.map(p => p.id === projId ? { ...p, progress: progressPercent, tasksCount: projTasks.length } : p));
  };

  const handleAppendAuditLog = (log: AuditLog) => {
    setAuditLogs([log, ...auditLogs]);
    syncAuditLogToCloud(log);
  };

  const handleToggleModule = (moduleId: string) => {
    const updated = modules.map(m => m.id === moduleId ? { ...m, enabled: !m.enabled } : m);
    setModules(updated);

    // If disabled, transition active panel to an enabled module
    const targetModule = updated.find(m => m.id === moduleId);
    if (targetModule && !targetModule.enabled && activePanel === moduleId) {
      const firstEnabled = updated.find(m => m.enabled);
      if (firstEnabled) {
        setActivePanel(firstEnabled.id);
      }
    }
  };

  const handlePlanChange = (planName: string) => {
    setActivePlan(planName);
    handleAppendAuditLog({
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().split('.')[0],
      user: "Super Admin",
      role: currentRole,
      action: `Upgraded modular SaaS subscription plan to: ${planName}`,
      module: "Identity",
      ip: "192.168.1.12",
      status: "Success"
    });
  };

  const handleAddRfqBid = (rfqId: string) => {
    setRfqs(rfqs.map(r => r.id === rfqId ? { ...r, bidsCount: r.bidsCount + 1, status: 'Bids Received' } : r));
    handleAppendAuditLog({
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().split('.')[0],
      user: "Vendor Portal",
      role: "External Bidder",
      action: `Submitted digital SLA proposal quote for ${rfqId}`,
      module: "Procurement",
      ip: "184.22.9.220",
      status: "Success"
    });
  };

  // ----------------------------------------------------
  // COPILOT AI CHAT INTERACTION HANDLERS
  // ----------------------------------------------------

  const handleSendCopilotMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isCopilotLoading) return;

    const userMsgText = chatInput;
    const currentAgent = AI_AGENTS.find(a => a.id === activeAgentId) || AI_AGENTS[0];
    
    // Update local list
    const newUserMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, newUserMsg]);
    setChatInput('');
    setIsCopilotLoading(true);

    try {
      // Map current application context variables so Gemini has precise situational awareness
      const erpContextString = `
      [SITUATIONAL CONTEXT VARIABLES]
      - Active ERP User Simulation Role: ${currentRole}
      - Currently Active Module View: ${activePanel}
      - SaaS Subscription Plan: ${activePlan}
      - Core Monolith Enabled Modules: ${modules.filter(m => m.enabled).map(m => m.name).join(', ')}
      - Current Employee Count: ${employees.length}
      - Current Stock SKU Alerts count: ${stockItems.filter(s => s.quantity <= s.reorderLevel).length}
      - Total Cleared General Ledger transactions: ${transactions.length}
      - Top RFQ: ${rfqs[0]?.title} (${rfqs[0]?.id}) with ${rfqs[0]?.bidsCount} bids.
      - Active Gantt Projects: ${projects.map(p => `${p.name} (${p.progress}% done)`).join(', ')}
      `;

      const finalSystemInstruction = `${currentAgent.systemInstruction}\n\nHere is the current state context of the ERP:\n${erpContextString}\nProvide a crisp, actionable business response. Keep your tone highly professional. Avoid placeholders.`;

      // Compile simplified prompt history for server API mapping
      const historyContext = chatHistory.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsgText,
          history: historyContext,
          systemInstruction: finalSystemInstruction
        })
      });

      if (!res.ok) {
        throw new Error("Failed to receive feedback from backend Copilot endpoint");
      }

      const data = await res.json();
      
      const newAgentReply: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'agent',
        agentId: currentAgent.id,
        agentName: currentAgent.name,
        text: data.text || "I apologize, my neural processing units experienced a ledger timeout. Please repeat the instruction.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, newAgentReply]);

      // Record successful AI event to audit logs
      handleAppendAuditLog({
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString().split('.')[0],
        user: currentRole,
        role: currentRole,
        action: `Queried AI Agent: ${currentAgent.name} ("${userMsgText.substring(0, 30)}...")`,
        module: "AI Systems",
        ip: "192.168.1.12",
        status: "Success"
      });

    } catch (err: any) {
      console.error(err);
      setChatHistory(prev => [...prev, {
        id: `msg-error-${Date.now()}`,
        sender: 'system',
        text: `Network failure or missing API keys: ${err.message || "Please make sure GEMINI_API_KEY is configured."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsCopilotLoading(false);
    }
  };

  // Trigger Collaborative Multi-Agent Workflow Scenario
  const handleTriggerScenario = async () => {
    if (selectedScenario === 'none') return;
    setIsScenarioLoading(true);
    setScenarioResultMarkdown('');

    try {
      const res = await fetch('/api/ai/agent-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflowType: selectedScenario,
          details: scenarioDetails || "Triggered manually via Copilot dashboard."
        })
      });

      if (!res.ok) {
        throw new Error("Collaborative workflow gateway timeout");
      }

      const data = await res.json();
      setScenarioResultMarkdown(data.result || "No resolution generated by agents.");
      
      // Inject workflow trigger log as system notification in chat history
      setChatHistory(prev => [...prev, {
        id: `scenario-trig-${Date.now()}`,
        sender: 'system',
        text: `Collaborative multi-agent debate finished for scenario: ${selectedScenario.replace('_', ' ').toUpperCase()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      // Add to audit logs
      handleAppendAuditLog({
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString().split('.')[0],
        user: "Super Admin",
        role: currentRole,
        action: `Executed collaborative Multi-Agent Workflow: ${selectedScenario}`,
        module: "AI Systems",
        ip: "192.168.1.12",
        status: "Success"
      });

    } catch (err: any) {
      console.error(err);
      setScenarioResultMarkdown(`**Workflow Execution Error**: Could not connect to collaborative model gateway. ${err.message}`);
    } finally {
      setIsScenarioLoading(false);
    }
  };

  // Clear chat logs
  const handleClearChatLogs = () => {
    setChatHistory([
      {
        id: 'welcome-msg-reset',
        sender: 'agent',
        agentId: 'copilot',
        agentName: 'Universal Copilot',
        text: 'Chat logs reset. State logs persist in compliance audit registry. What system queries can I execute today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Quick Action triggers from sidebar/header search
  const handleExecuteQuickAction = (actionId: string) => {
    setIsCommandPaletteOpen(false);
    
    if (actionId.startsWith('nav-')) {
      setActivePanel(actionId.replace('nav-', ''));
    } else if (actionId === 'open-copilot') {
      setIsCopilotOpen(true);
    } else if (actionId === 'trigger-audit') {
      handleAppendAuditLog({
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString().split('.')[0],
        user: "Super Admin",
        role: currentRole,
        action: "Executed instant system sanity audit over database schemas",
        module: "Identity",
        ip: "192.168.1.12",
        status: "Success"
      });
      setActivePanel('settings-identity');
    }
  };

  // ----------------------------------------------------
  // RENDER DYNAMIC LAYOUT AREA
  // ----------------------------------------------------

  const renderActiveWorkspace = () => {
    // 1. Core ERP Modules
    const isCoreModule = modules.some(m => m.id === activePanel);
    if (isCoreModule) {
      return (
        <ERPModules
          activeModule={activePanel}
          employees={employees}
          onAddEmployee={handleAddEmployee}
          leads={leads}
          onAddLead={handleAddLead}
          accounts={accounts}
          transactions={transactions}
          onAddTransaction={handleAddTransaction}
          budgets={budgets}
          stockItems={stockItems}
          onAddStock={handleAddStock}
          suppliers={suppliers}
          rfqs={rfqs}
          productionOrders={productionOrders}
          projects={projects}
          tasks={tasks}
          onUpdateTaskStatus={handleUpdateTaskStatus}
          onAddTask={handleAddTask}
        />
      );
    }

    // 2. Portals
    if (activePanel.startsWith('portal-')) {
      return (
        <Portals
          portalId={activePanel as any}
          employees={employees}
          rfqs={rfqs}
          onAddRfqBid={handleAddRfqBid}
        />
      );
    }

    // 3. Settings
    if (activePanel.startsWith('settings-')) {
      return (
        <Settings
          panelId={activePanel as any}
          modules={modules}
          onToggleModule={handleToggleModule}
          plans={SUBSCRIPTION_PLANS}
          activePlan={activePlan}
          onPlanChange={handlePlanChange}
          auditLogs={auditLogs}
          onAddAuditLog={handleAppendAuditLog}
        />
      );
    }

    // 4. Technical Center
    if (activePanel === 'tech-qa') {
      return <QAPanel />;
    }

    if (activePanel.startsWith('tech-')) {
      return (
        <AboutAndObservability
          panelId={activePanel as any}
        />
      );
    }

    // Fallback
    return <div className="text-center p-12 text-zinc-400">Module view loading...</div>;
  };

  if (!authenticatedUser) {
    return (
      <Auth 
        onAuthSuccess={(email) => {
          setAuthenticatedUser(email);
          localStorage.setItem('erp-session-user', email);
        }}
        themeMode={themeMode}
        onThemeModeChange={(mode) => setThemeMode(mode)}
      />
    );
  }

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 overflow-hidden transition-colors duration-200">
      
      {/* 1a. DESKTOP SIDE NAVIGATION BAR */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar
          modules={modules}
          activePanel={activePanel}
          onPanelChange={(id) => setActivePanel(id)}
          onOpenCopilot={() => setIsCopilotOpen(true)}
          onLogout={() => {
            setAuthenticatedUser(null);
            localStorage.removeItem('erp-session-user');
          }}
        />
      </div>

      {/* 1b. MOBILE SIDE NAVIGATION DRAWER */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay click-away background */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300" 
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-50 max-w-xs w-full h-full bg-zinc-950 shadow-2xl flex flex-col animate-slide-in">
            {/* Close Mobile Menu overlay helper */}
            <div className="absolute top-4 right-4 z-50">
              <button 
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Sidebar
              modules={modules}
              activePanel={activePanel}
              onPanelChange={(id) => {
                setActivePanel(id);
                setIsMobileSidebarOpen(false);
              }}
              onOpenCopilot={() => {
                setIsCopilotOpen(true);
                setIsMobileSidebarOpen(false);
              }}
              onLogout={() => {
                setAuthenticatedUser(null);
                localStorage.removeItem('erp-session-user');
                setIsMobileSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* 2. MAIN APPLICATION LAYER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* HEADER BAR */}
        <Header
          currentRole={currentRole}
          onRoleChange={(role) => {
            setCurrentRole(role);
            // Dynamic redirection for roles to correspond to customized default views
            if (role === 'Employee') {
              setActivePanel('portal-employee');
            } else if (role === 'Customer') {
              setActivePanel('portal-customer');
            } else if (role === 'Vendor') {
              setActivePanel('portal-vendor');
            } else if (role === 'HR Manager') {
              setActivePanel('hrms');
            } else if (role === 'Finance Manager') {
              setActivePanel('finance');
            } else {
              setActivePanel('analytics');
            }
          }}
          themeMode={themeMode}
          onThemeModeChange={(mode) => setThemeMode(mode)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* WORKSPACE PREVIEW FRAME */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          
          {/* Module Locked Warning Banner if selected role isn't matching admin access */}
          {currentRole !== 'Super Admin' && 
           activePanel.startsWith('settings-') && (
            <div className="mb-6 p-4 border border-amber-500/20 bg-amber-500/5 rounded-xl flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400">Read-Only Permission Isolation Mode</h4>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                  You are viewing SaaS Platform Config with simulation role **{currentRole}**. Write logs and license adjustments require elevated **Super Admin** authorization.
                </p>
              </div>
            </div>
          )}

          {renderActiveWorkspace()}
        </main>
      </div>

      {/* 3. COLLAPSIBLE AI COPILOT SIDE DRAWER PANEL */}
      {isCopilotOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in" id="panel-ai-copilot-backdrop">
          <div className="w-full max-w-lg md:max-w-2xl bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl h-full flex flex-col overflow-hidden animate-slide-in">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-500" />
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    Enterprise Multi-Agent Room <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-zinc-400">Active Agent: {AI_AGENTS.find(a => a.id === activeAgentId)?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChatLogs}
                  className="px-2 py-1 text-[9px] font-bold uppercase text-zinc-400 hover:text-red-500 border border-transparent hover:border-red-500/20 hover:bg-red-500/5 rounded transition cursor-pointer"
                >
                  Clear Logs
                </button>
                <button
                  onClick={() => setIsCopilotOpen(false)}
                  className="p-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                  id="btn-close-copilot"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Agent Select Pills */}
            <div className="px-4 py-2 border-b bg-zinc-50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800 flex gap-1.5 overflow-x-auto scrollbar-none">
              {AI_AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgentId(agent.id)}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg shrink-0 transition flex items-center gap-1 cursor-pointer border ${
                    activeAgentId === agent.id
                      ? 'bg-indigo-600 text-white border-transparent'
                      : 'bg-white dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${agent.avatarColor}`} />
                  <span>{agent.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Main Drawer Tabs Container */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Left Column (only on md+ screen): Scenario Autopilot Orchestrator */}
              <div className="hidden md:flex md:w-72 border-r bg-zinc-50/50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800 p-4 flex-col gap-4 overflow-y-auto">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-indigo-500" /> Agent Autopilot
                  </h4>
                  <p className="text-[10px] text-zinc-400">Trigger simulated multi-agent debate timelines with real-time strategic resolutions.</p>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase">Select Scenario Trigger</label>
                    <select
                      value={selectedScenario}
                      onChange={(e) => {
                        setSelectedScenario(e.target.value);
                        if (e.target.value === 'procurement_approval') {
                          setScenarioDetails("Verify Restock components bids for Server Components Restock (Q3 Expansion). Estimated budget is $450,000.");
                        } else if (e.target.value === 'stock_low_restock') {
                          setScenarioDetails("Safety stock warning triggered on Neural Tensor Compute Unit v3 (STK-101) falling to 85 units.");
                        } else {
                          setScenarioDetails("");
                        }
                      }}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-350 focus:outline-none"
                    >
                      <option value="none">-- Select Scenario --</option>
                      <option value="procurement_approval">Procurement Bid Debate</option>
                      <option value="stock_low_restock">Low Stock Outage debate</option>
                    </select>
                  </div>

                  {selectedScenario !== 'none' && (
                    <>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase">Debate Context / Variables</label>
                        <textarea
                          value={scenarioDetails}
                          onChange={(e) => setScenarioDetails(e.target.value)}
                          placeholder="Context details..."
                          className="w-full text-xs h-20 p-2 rounded-lg border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                        />
                      </div>

                      <button
                        onClick={handleTriggerScenario}
                        disabled={isScenarioLoading}
                        className="w-full py-2 px-3 rounded-xl text-[11px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md cursor-pointer transition flex items-center justify-center gap-1.5"
                      >
                        {isScenarioLoading ? (
                          <>
                            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-3.5 h-3.5 mr-1" />
                            <span>Debating...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Orchestrate Debate</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>

                {scenarioResultMarkdown && (
                  <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 rounded-xl max-h-56 overflow-y-auto space-y-1.5 text-left">
                    <p className="text-[9px] font-black text-zinc-450 uppercase">Debate Resolution Output:</p>
                    <div className="text-[10px] text-zinc-750 dark:text-zinc-350 leading-relaxed font-mono whitespace-pre-wrap select-text">
                      {scenarioResultMarkdown}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Chat Screen Panel */}
              <div className="flex-1 flex flex-col bg-white dark:bg-zinc-900">
                
                {/* Chat Feed Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-left">
                  {chatHistory.map((msg) => {
                    const isUser = msg.sender === 'user';
                    const isSys = msg.sender === 'system';
                    
                    if (isSys) {
                      return (
                        <div key={msg.id} className="p-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl text-[10px] text-zinc-500 font-mono text-center">
                          {msg.text}
                        </div>
                      );
                    }

                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                      >
                        {!isUser && (
                          <div className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                            AI_AGENTS.find(a => a.id === msg.agentId)?.avatarColor || 'bg-indigo-600 text-white'
                          }`}>
                            {msg.agentName?.substring(0, 1) || '🤖'}
                          </div>
                        )}
                        <div className="space-y-1">
                          <div className={`text-[10px] font-bold text-zinc-450 ${isUser ? 'text-right' : 'text-left'}`}>
                            {isUser ? 'You' : msg.agentName} <span className="font-normal font-mono text-[9px] text-zinc-400 ml-1.5">{msg.timestamp}</span>
                          </div>
                          <div className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap select-text ${
                            isUser 
                              ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm' 
                              : 'bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 rounded-tl-none'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {isCopilotLoading && (
                    <div className="flex gap-2.5 max-w-[80%] mr-auto">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0 animate-pulse">
                        ⌛
                      </div>
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-zinc-400">Agent processing...</div>
                        <div className="p-3 bg-zinc-100 dark:bg-zinc-950/50 rounded-2xl rounded-tl-none border dark:border-zinc-800 flex items-center gap-1.5 text-xs text-zinc-400">
                          <span className="animate-ping rounded-full bg-indigo-500 w-1.5 h-1.5" />
                          <span className="font-mono">Syncing double-entry caches...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Chat Feed Footer Quick Prompts */}
                <div className="px-4 py-2 border-t bg-zinc-50/50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800 flex gap-1.5 overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setChatInput("Identify any stock items below reorder level and outline a purchase plan")}
                    className="px-2 py-1 text-[9px] bg-white dark:bg-zinc-900 hover:bg-zinc-100 border text-zinc-600 dark:text-zinc-400 rounded-md cursor-pointer transition shrink-0"
                  >
                    🔍 Check safety stock
                  </button>
                  <button
                    onClick={() => setChatInput("Draft a CRM introduction proposal email for Robert Downey at Stark Industries")}
                    className="px-2 py-1 text-[9px] bg-white dark:bg-zinc-900 hover:bg-zinc-100 border text-zinc-600 dark:text-zinc-400 rounded-md cursor-pointer transition shrink-0"
                  >
                    📧 Draft proposal email
                  </button>
                  <button
                    onClick={() => setChatInput("Audit our current budget spent vs allocated across departments")}
                    className="px-2 py-1 text-[9px] bg-white dark:bg-zinc-900 hover:bg-zinc-100 border text-zinc-600 dark:text-zinc-400 rounded-md cursor-pointer transition shrink-0"
                  >
                    📊 Audit budget allocations
                  </button>
                </div>

                {/* Input Text box Form */}
                <form onSubmit={handleSendCopilotMessage} className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-2">
                  <input
                    type="text"
                    required
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={`Ask ${AI_AGENTS.find(a => a.id === activeAgentId)?.name}...`}
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    id="input-copilot-chat"
                  />
                  <button
                    type="submit"
                    disabled={isCopilotLoading || !chatInput.trim()}
                    className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow cursor-pointer transition flex items-center justify-center shrink-0 disabled:opacity-40"
                    id="btn-send-copilot-chat"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. COMMAND PALETTE MODAL (⌘K) */}
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/40 backdrop-blur-xs pt-[15vh] px-4" id="modal-command-palette-backdrop">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[50vh] animate-slide-in">
            <div className="px-4 py-3 border-b flex items-center gap-2">
              <Bot className="w-4 h-4 text-indigo-500" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search modules..."
                className="flex-1 text-xs bg-transparent border-none text-zinc-800 dark:text-zinc-100 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsCommandPaletteOpen(false);
                  }
                }}
              />
              <span className="text-[10px] text-zinc-400 border px-1.5 py-0.2 rounded font-mono">ESC</span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 text-left">
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider px-3 py-1.5">ERP Quick Navigation</p>
              
              <div className="space-y-0.5">
                <button
                  onClick={() => handleExecuteQuickAction('nav-hrms')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 flex justify-between items-center"
                >
                  <span>Onboard Workforce (HRMS Module)</span>
                  <span className="text-[9px] text-zinc-400 font-mono">/hrms</span>
                </button>
                <button
                  onClick={() => handleExecuteQuickAction('nav-crm')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 flex justify-between items-center"
                >
                  <span>Sales Pitch & Client Deals (CRM)</span>
                  <span className="text-[9px] text-zinc-400 font-mono">/crm</span>
                </button>
                <button
                  onClick={() => handleExecuteQuickAction('nav-finance')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 flex justify-between items-center"
                >
                  <span>Double-Entry ledger & Taxes (Finance)</span>
                  <span className="text-[9px] text-zinc-400 font-mono">/finance</span>
                </button>
                <button
                  onClick={() => handleExecuteQuickAction('nav-inventory')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 flex justify-between items-center"
                >
                  <span>Safety thresholds (Inventory)</span>
                  <span className="text-[9px] text-zinc-400 font-mono">/inventory</span>
                </button>
                <button
                  onClick={() => handleExecuteQuickAction('nav-analytics')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 flex justify-between items-center"
                >
                  <span>Executive dashboards & Maps</span>
                  <span className="text-[9px] text-zinc-400 font-mono">/analytics</span>
                </button>
              </div>

              <div className="border-t my-2 border-zinc-100 dark:border-zinc-800/60" />
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider px-3 py-1.5">Direct AI System Commands</p>

              <div className="space-y-0.5">
                <button
                  onClick={() => handleExecuteQuickAction('open-copilot')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Copilot Multi-Agent room Chat</span>
                </button>
                <button
                  onClick={() => handleExecuteQuickAction('trigger-audit')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Verify Compliance Log and DB schemas</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
