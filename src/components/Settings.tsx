/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CreditCard, KeyRound, Check, HelpCircle, Shield, FileText, 
  UserCheck, Terminal, Trash, RefreshCw, Key, AlertCircle, Sparkles
} from 'lucide-react';
import { ERPModule, SubscriptionPlan, AuditLog } from '../types';

interface SettingsProps {
  panelId: 'settings-sub' | 'settings-identity';
  modules: ERPModule[];
  onToggleModule: (moduleId: string) => void;
  plans: SubscriptionPlan[];
  activePlan: string;
  onPlanChange: (planName: string) => void;
  auditLogs: AuditLog[];
  onAddAuditLog: (log: AuditLog) => void;
}

export default function Settings({
  panelId,
  modules,
  onToggleModule,
  plans,
  activePlan,
  onPlanChange,
  auditLogs,
  onAddAuditLog
}: SettingsProps) {

  // ----------------------------------------------------
  // IDENTITY & SECURITY STATES
  // ----------------------------------------------------
  const [apiKeyName, setApiKeyName] = useState("stark-dev-sandbox");
  const [apiKeys, setApiKeys] = useState([
    { name: "production-ledger-sync", key: "ak_live_7721ab9d88fc40a1bc", created: "2026-07-01", status: "Active" },
    { name: "stark-procurement-webhook", key: "ak_live_0012bcddaa24151bbf", created: "2026-07-08", status: "Active" }
  ]);
  const [isAnnual, setIsAnnual] = useState(false);

  const handleGenerateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyName) return;
    const key = `ak_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    setApiKeys([...apiKeys, {
      name: apiKeyName,
      key,
      created: new Date().toISOString().split('T')[0],
      status: "Active"
    }]);
    
    // Log audit
    onAddAuditLog({
      id: `AUD-${Math.floor(9000 + Math.random() * 1000)}`,
      timestamp: new Date().toISOString().split('.')[0],
      user: "Super Admin",
      role: "Platform Owner",
      action: `Created API Gateway Key: ${apiKeyName}`,
      module: "Identity",
      ip: "192.168.1.12",
      status: "Success"
    });

    setApiKeyName("");
  };

  const handleDeleteApiKey = (name: string) => {
    setApiKeys(apiKeys.filter(k => k.name !== name));
    
    onAddAuditLog({
      id: `AUD-${Math.floor(9000 + Math.random() * 1000)}`,
      timestamp: new Date().toISOString().split('.')[0],
      user: "Super Admin",
      role: "Platform Owner",
      action: `Revoked API Gateway Key: ${name}`,
      module: "Identity",
      ip: "192.168.1.12",
      status: "Warning"
    });
  };

  // ----------------------------------------------------
  // RENDERING SECTIONS
  // ----------------------------------------------------

  const renderSaaSModuleSwitcher = () => {
    return (
      <div className="space-y-6 text-left">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-500" /> SaaS Subscription & Modular Switcher
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Configure active pricing modules, toggle core monolith services, and review resource quotas in real time.</p>
        </div>

        {/* Subscription Tier Picker */}
        <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b pb-3.5">
            <div>
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Select SaaS Tier Organization Plan</h3>
              <p className="text-[10px] text-zinc-400">Current tier is outlined below. Change plan to scale tokens, users, and server vaults.</p>
            </div>
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-1 rounded-lg border">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition ${!isAnnual ? 'bg-indigo-600 text-white shadow' : 'text-zinc-500'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition ${isAnnual ? 'bg-indigo-600 text-white shadow' : 'text-zinc-500'}`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {plans.map((plan) => {
              const isSelected = activePlan === plan.name;
              const displayPrice = isAnnual ? Math.round(plan.price * 0.8) : plan.price;
              return (
                <div
                  key={plan.name}
                  onClick={() => onPlanChange(plan.name)}
                  className={`border rounded-xl p-4 transition-all duration-200 cursor-pointer relative ${
                    isSelected 
                      ? 'border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50/5 dark:bg-indigo-950/5' 
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute -top-2.5 right-4 bg-indigo-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      Active Plan
                    </span>
                  )}
                  <h4 className="text-xs font-black text-zinc-800 dark:text-zinc-200">{plan.name} Tier</h4>
                  <div className="mt-2.5 flex items-baseline">
                    <span className="text-xl font-black text-zinc-900 dark:text-white">${displayPrice}</span>
                    <span className="text-[10px] text-zinc-400 font-medium ml-1">/month</span>
                  </div>
                  <div className="mt-3.5 space-y-1.5 text-[10px] text-zinc-500 border-t pt-3 border-zinc-100 dark:border-zinc-800/60">
                    <p>🧑‍🤝‍🧑 Limit: <span className="font-bold text-zinc-700 dark:text-zinc-300">{plan.userLimit} Seats</span></p>
                    <p>💾 Vault: <span className="font-bold text-zinc-700 dark:text-zinc-300">{plan.storageLimitGB} GB Storage</span></p>
                    <p>🤖 AI Token: <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">{(plan.aiTokenQuota/1000000).toFixed(0)}M Cap</span></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module Switcher Grid */}
        <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-5 space-y-3">
          <div>
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Active ERP Monolith Module Selector</h3>
            <p className="text-[10px] text-zinc-400">Toggle core ERP services on/off. Disabled modules are immediately locked in side navigation to optimize client memory and subscription overhead.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className={`p-3.5 border rounded-xl flex items-center justify-between transition duration-200 bg-zinc-50/50 dark:bg-zinc-950/20 ${
                  mod.enabled ? 'border-zinc-200 dark:border-zinc-800' : 'border-zinc-100 dark:border-zinc-850/40 opacity-70'
                }`}
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-1.5">
                    <h4 className={`text-xs font-bold ${mod.enabled ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-400'}`}>
                      {mod.name}
                    </h4>
                    <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded font-mono ${
                      mod.enabled ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-450'
                    }`}>
                      {mod.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">{mod.description}</p>
                </div>
                <div>
                  <button
                    onClick={() => onToggleModule(mod.id)}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      mod.enabled ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-800'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        mod.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSSOIdentity = () => {
    return (
      <div className="space-y-6 text-left">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-indigo-500" /> SSO Identity, RBAC & Audit Logs
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Configure organizational OAuth2 pipelines, manage Super Admin API Gateway Client credentials, and inspect security audit logs.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* API Gateway Client Key Generator */}
          <div className="lg:col-span-1 bg-white dark:bg-zinc-900 border rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-indigo-500" /> Client API Keys
            </h3>
            <p className="text-[10px] text-zinc-400">Generate authorization credentials to bind third-party inventory or finance triggers to the ERP Gateway endpoints.</p>

            <form onSubmit={handleGenerateApiKey} className="space-y-3">
              <div className="space-y-0.5">
                <label className="text-[9px] font-bold text-zinc-400 uppercase">Key Descriptive Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. stark-finance-sync"
                  value={apiKeyName}
                  onChange={(e) => setApiKeyName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow cursor-pointer transition flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" /> Generate Key
              </button>
            </form>

            <div className="space-y-2 border-t pt-4 border-zinc-100 dark:border-zinc-800/60">
              <p className="text-[9px] font-bold text-zinc-450 uppercase">Active Client Keys:</p>
              {apiKeys.length === 0 ? (
                <p className="text-[10px] text-zinc-400 italic">No custom API client keys configured.</p>
              ) : (
                <div className="space-y-1.5">
                  {apiKeys.map((key) => (
                    <div key={key.name} className="p-2.5 border rounded-lg bg-zinc-50 dark:bg-zinc-950 text-[10px] flex justify-between items-start">
                      <div className="space-y-0.5">
                        <p className="font-bold text-zinc-700 dark:text-zinc-350">{key.name}</p>
                        <p className="font-mono text-zinc-450 text-[9px] select-all">{key.key.substring(0, 15)}...</p>
                        <p className="text-[8px] text-zinc-400">Created: {key.created}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteApiKey(key.name)}
                        className="text-red-500 hover:text-red-600 transition"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* System Security Audit Logs */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-500" /> Security Audit Log Stream
            </h3>
            <p className="text-[10px] text-zinc-400">Continuous tamper-resistant stream logging Super Admin triggers, OAuth logins, and policy adjustments.</p>

            <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-2.5 border rounded-xl bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] flex justify-between items-start">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">{log.user}</span>
                      <span className="text-[9px] px-1 py-0.1 bg-zinc-200 dark:bg-zinc-850 rounded text-zinc-500 font-mono">
                        {log.role}
                      </span>
                    </div>
                    <p className="text-zinc-650 dark:text-zinc-350">{log.action}</p>
                    <p className="text-[8px] text-zinc-400 font-mono">Timestamp: {log.timestamp} | IP: {log.ip}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                      log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                    }`}>
                      {log.status}
                    </span>
                    <p className="text-[8px] font-mono text-zinc-400 mt-1.5">Gateway: {log.module}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  switch (panelId) {
    case 'settings-sub': return renderSaaSModuleSwitcher();
    case 'settings-identity': return renderSSOIdentity();
    default: return renderSaaSModuleSwitcher();
  }
}
