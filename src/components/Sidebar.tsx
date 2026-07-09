/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Users, TrendingUp, DollarSign, Package, FileText, Cpu, Calendar, 
  PieChart, Briefcase, HeartHandshake, Truck, CreditCard, KeyRound, 
  Settings, MessageSquare, ChevronRight, LayoutGrid, Info, Activity,
  HelpCircle, LogOut
} from 'lucide-react';
import { ERPModule } from '../types';

interface SidebarProps {
  modules: ERPModule[];
  activePanel: string;
  onPanelChange: (panelId: string) => void;
  onOpenCopilot: () => void;
  onLogout?: () => void;
}

export default function Sidebar({
  modules,
  activePanel,
  onPanelChange,
  onOpenCopilot,
  onLogout
}: SidebarProps) {

  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Users': return <Users className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'DollarSign': return <DollarSign className={className} />;
      case 'Package': return <Package className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Calendar': return <Calendar className={className} />;
      case 'PieChart': return <PieChart className={className} />;
      default: return <LayoutGrid className={className} />;
    }
  };

  return (
    <aside className="w-64 border-r flex flex-col h-screen bg-zinc-950 border-zinc-900 text-zinc-400 select-none shrink-0 transition-colors duration-200">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-zinc-900">
        <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black shadow-lg shadow-indigo-500/20">
          Ξ
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm tracking-tight">Enterprise ERP</span>
          <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest font-mono">
            AI Monolith SaaS
          </span>
        </div>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Core Modules Category */}
        <div className="space-y-1">
          <p className="px-2 text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-600">
            Core ERP Modules
          </p>
          <div className="space-y-0.5 mt-2">
            {modules.map((mod) => {
              const isActive = activePanel === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => onPanelChange(mod.id)}
                  disabled={!mod.enabled}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition duration-150 ${
                    !mod.enabled 
                      ? 'opacity-40 cursor-not-allowed' 
                      : isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                  id={`btn-nav-${mod.id}`}
                >
                  <div className="flex items-center gap-2.5">
                    {renderIcon(mod.icon, `w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`)}
                    <span className="truncate">{mod.name}</span>
                  </div>
                  {!mod.enabled && (
                    <span className="text-[8px] font-bold bg-zinc-900 text-zinc-500 px-1 py-0.2 rounded border border-zinc-800 uppercase font-mono">
                      OFF
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portals Category */}
        <div className="space-y-1">
          <p className="px-2 text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-600">
            Specialized Portals
          </p>
          <div className="space-y-0.5 mt-2">
            <button
              onClick={() => onPanelChange('portal-employee')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activePanel === 'portal-employee' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              id="btn-nav-portal-employee"
            >
              <Briefcase className="w-4 h-4" />
              <span>Employee Portal</span>
            </button>
            <button
              onClick={() => onPanelChange('portal-customer')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activePanel === 'portal-customer' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              id="btn-nav-portal-customer"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Customer Self-Service</span>
            </button>
            <button
              onClick={() => onPanelChange('portal-vendor')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activePanel === 'portal-vendor' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              id="btn-nav-portal-vendor"
            >
              <Truck className="w-4 h-4" />
              <span>Vendor Supplier Portal</span>
            </button>
          </div>
        </div>

        {/* Settings Category */}
        <div className="space-y-1">
          <p className="px-2 text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-600">
            SaaS Subscription & SSO
          </p>
          <div className="space-y-0.5 mt-2">
            <button
              onClick={() => onPanelChange('settings-sub')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activePanel === 'settings-sub' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              id="btn-nav-settings-sub"
            >
              <CreditCard className="w-4 h-4" />
              <span>SaaS Module Switcher</span>
            </button>
            <button
              onClick={() => onPanelChange('settings-identity')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activePanel === 'settings-identity' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              id="btn-nav-settings-identity"
            >
              <KeyRound className="w-4 h-4" />
              <span>SSO RBAC & Audit Logs</span>
            </button>
          </div>
        </div>

        {/* Technical Center Category */}
        <div className="space-y-1">
          <p className="px-2 text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-600">
            Technical Center
          </p>
          <div className="space-y-0.5 mt-2">
            <button
              onClick={() => onPanelChange('tech-about')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activePanel === 'tech-about' ? 'bg-indigo-600 text-white animate-pulse' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              id="btn-nav-tech-about"
            >
              <Info className="w-4 h-4" />
              <span>About & Walkthrough</span>
            </button>
            <button
              onClick={() => onPanelChange('tech-observability')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activePanel === 'tech-observability' ? 'bg-indigo-600 text-white animate-pulse' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              id="btn-nav-tech-observability"
            >
              <Activity className="w-4 h-4" />
              <span>Observability Hub</span>
            </button>
            <button
              onClick={() => onPanelChange('tech-qa')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activePanel === 'tech-qa' ? 'bg-indigo-600 text-white animate-pulse' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              id="btn-nav-tech-qa"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Interactive Q&A Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* Persistent AI Trigger Button & Logout */}
      <div className="p-4 border-t border-zinc-900 bg-zinc-950 space-y-2">
        <button
          onClick={onOpenCopilot}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition cursor-pointer"
          id="btn-trigger-ai-copilot"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Launch AI Copilot</span>
        </button>

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-red-400 hover:bg-red-950/10 border border-zinc-800 hover:border-red-900/30 active:scale-[0.98] transition cursor-pointer"
            id="btn-trigger-logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Secure Sign Out</span>
          </button>
        )}
      </div>
    </aside>
  );
}
