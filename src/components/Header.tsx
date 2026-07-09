/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, Shield, Layers, HelpCircle, Laptop, Menu } from 'lucide-react';

interface HeaderProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
  themeMode: 'light' | 'dark' | 'system';
  onThemeModeChange: (mode: 'light' | 'dark' | 'system') => void;
  onOpenCommandPalette: () => void;
  onToggleMobileSidebar?: () => void;
}

const ROLES = [
  { value: 'Super Admin', label: '🛡️ Super Admin (Platform Owner)', desc: 'Full core access, database & audit control' },
  { value: 'HR Manager', label: '👩‍💼 HR Manager (Workforce Lead)', desc: 'Recruiting, shifts, resume screening access' },
  { value: 'Finance Manager', label: '👨‍💻 Finance Manager (CFO)', desc: 'Ledgers, double-entry, invoice OCR audit' },
  { value: 'Employee', label: '👤 Employee (Self-Service)', desc: 'Payslips, attendance, leave requests' },
  { value: 'Customer', label: '🛒 Customer (SaaS Portal)', desc: 'Tickets, invoice download, services order' },
  { value: 'Vendor', label: '📦 Vendor (Supplier Portal)', desc: 'Active contracts, quote submission, bids' }
];

export default function Header({
  currentRole,
  onRoleChange,
  themeMode,
  onThemeModeChange,
  onOpenCommandPalette,
  onToggleMobileSidebar
}: HeaderProps) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: 1, text: "Finley (AI Finance Agent) flagged invoice INV-4412 as Low Risk.", time: "10m ago", read: false },
    { id: 2, text: "Amara (AI HR Agent) parsed resume: 'Sarah Connor' (Score: 92%).", time: "1h ago", read: false },
    { id: 3, text: "Inventory Stock for SKU 'AI-PROC-PRO-X' triggered safety alert.", time: "4h ago", read: true }
  ];

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b px-6 py-3 h-16 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      {/* Mobile Menu Toggle */}
      {onToggleMobileSidebar && (
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 -ml-2 mr-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition cursor-pointer"
          aria-label="Open sidebar menu"
          id="btn-mobile-menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Search / Command palette trigger */}
      <div className="flex items-center w-96">
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center w-full gap-2 px-3 py-1.5 text-sm text-left rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
          id="btn-global-search"
        >
          <Search className="w-4 h-4 text-zinc-400" />
          <span className="flex-1">Search or ask copilot...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Action triggers & Role selector */}
      <div className="flex items-center gap-4">
        {/* Role Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 transition"
            id="btn-role-selector"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Role: {currentRole}</span>
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl shadow-lg border p-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 z-50">
              <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
                <p className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                  Simulate ERP Role Access
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {ROLES.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => {
                      onRoleChange(role.value);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex flex-col gap-0.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                      currentRole === role.value ? 'bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-medium' : 'text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <span>{role.label}</span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal">{role.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Triple Theme Selector Options */}
        <div className="flex bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => onThemeModeChange('light')}
            className={`p-1.5 rounded-md transition cursor-pointer ${themeMode === 'light' ? 'bg-white dark:bg-zinc-800 text-indigo-600 shadow-xs' : 'text-zinc-400 hover:text-zinc-600'}`}
            title="Force Light Mode"
            id="btn-header-theme-light"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onThemeModeChange('dark')}
            className={`p-1.5 rounded-md transition cursor-pointer ${themeMode === 'dark' ? 'bg-white dark:bg-zinc-800 text-indigo-600 shadow-xs' : 'text-zinc-400 hover:text-zinc-200'}`}
            title="Force Dark Mode"
            id="btn-header-theme-dark"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onThemeModeChange('system')}
            className={`p-1.5 rounded-md transition cursor-pointer ${themeMode === 'system' ? 'bg-white dark:bg-zinc-800 text-indigo-600 shadow-xs' : 'text-zinc-400 hover:text-zinc-200'}`}
            title="System Preference"
            id="btn-header-theme-system"
          >
            <Laptop className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 relative rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:text-zinc-400 transition"
            id="btn-notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-950" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl shadow-lg border p-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 z-50">
              <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">System Notifications</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium">3 New</span>
              </div>
              <div className="p-1 space-y-1">
                {mockNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-2 rounded-lg text-xs transition border ${
                      notif.read ? 'border-transparent text-zinc-500' : 'border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-800/20 text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    <p className="font-medium leading-relaxed">{notif.text}</p>
                    <span className="text-[10px] text-zinc-400 mt-1 block">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
            {currentRole.substring(0, 2).toUpperCase()}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Ashmit AI</span>
            <span className="text-[9px] font-mono text-zinc-400">ashmit4933@gmail.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}
