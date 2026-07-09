/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Clock, Calendar, FileText, CheckSquare, Plus, Check, ShieldAlert,
  Send, HelpCircle, ArrowUpRight, Upload, Building, Tag, Briefcase, FileSignature
} from 'lucide-react';
import { Employee, RFQ } from '../types';

interface PortalsProps {
  portalId: 'portal-employee' | 'portal-customer' | 'portal-vendor';
  employees: Employee[];
  rfqs: RFQ[];
  onAddRfqBid: (rfqId: string) => void;
}

export default function Portals({
  portalId,
  employees,
  rfqs,
  onAddRfqBid
}: PortalsProps) {

  // ----------------------------------------------------
  // EMPLOYEE PORTAL STATES
  // ----------------------------------------------------
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [leaveType, setLeaveType] = useState("Annual Leave");
  const [leaveDays, setLeaveDays] = useState(3);
  const [leaveSuccess, setLeaveSuccess] = useState(false);
  const [empAttendanceCount, setEmpAttendanceCount] = useState(165);
  const [empTasks, setEmpTasks] = useState([
    { id: 1, text: "Verify inventory sync with Finley (Finance AI)", done: false },
    { id: 2, text: "Sign ISO 27001 readiness review checklist", done: true },
    { id: 3, text: "Update Stark opportunity pipeline note fields", done: false }
  ]);

  const handleCheckIn = () => {
    if (!isCheckedIn) {
      setEmpAttendanceCount(prev => prev + 1);
    }
    setIsCheckedIn(!isCheckedIn);
  };

  const handleLeaveRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaveSuccess(true);
    setTimeout(() => setLeaveSuccess(false), 4000);
  };

  const toggleTask = (id: number) => {
    setEmpTasks(empTasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // ----------------------------------------------------
  // CUSTOMER PORTAL STATES
  // ----------------------------------------------------
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketModule, setTicketModule] = useState("Finance & billing");
  const [ticketMsg, setTicketMsg] = useState("");
  const [ticketStatus, setTicketStatus] = useState<any>(null);
  const [customerTickets, setCustomerTickets] = useState([
    { id: "TCK-4401", subject: "Custom RAG indexing lag on large contracts", module: "AI Systems", status: "In Progress" },
    { id: "TCK-4402", subject: "Invoice balance double-entry clearing lag", module: "Finance & billing", status: "Resolved" }
  ]);

  const handleDispatchTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMsg) return;
    const newTick = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject,
      module: ticketModule,
      status: "Submitted (Awaiting Dispatch)"
    };
    setCustomerTickets([newTick, ...customerTickets]);
    setTicketSubject("");
    setTicketMsg("");
    setTicketStatus("Ticket logged successfully! AI agent assigned.");
    setTimeout(() => setTicketStatus(null), 4000);
  };

  // ----------------------------------------------------
  // VENDOR PORTAL STATES
  // ----------------------------------------------------
  const [vendorName, setVendorName] = useState("");
  const [vendorRfq, setVendorRfq] = useState("RFQ-2026-001");
  const [vendorBidAmount, setVendorBidAmount] = useState(415000);
  const [vendorBidNotes, setVendorBidNotes] = useState("");
  const [vendorStatus, setVendorStatus] = useState<any>(null);

  const handlePostVendorBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName || !vendorBidAmount) return;
    onAddRfqBid(vendorRfq);
    setVendorStatus(`Bid of $${vendorBidAmount.toLocaleString()} submitted successfully on ${vendorRfq}!`);
    setVendorName("");
    setVendorBidNotes("");
    setTimeout(() => setVendorStatus(null), 4000);
  };

  // ----------------------------------------------------
  // RENDER PORTALS
  // ----------------------------------------------------

  const renderEmployeePortal = () => {
    return (
      <div className="space-y-6 text-left">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-teal-500" /> Employee Self-Service Dashboard
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Check-in daily shifts, review leaves and pay matrices, and audit task checklists.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Check In & Attendance */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-500" /> Shift & Attendance Logging
            </h3>
            <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl">
              <p className="text-xs text-zinc-500">Total days present this quarter</p>
              <h4 className="text-3xl font-black text-zinc-900 dark:text-white mt-1">{empAttendanceCount} days</h4>
              <p className="text-[10px] text-zinc-400 mt-1 font-mono">Assigned shift: Day (9 AM - 5 PM)</p>
            </div>
            <button
              onClick={handleCheckIn}
              className={`w-full py-2 px-4 rounded-xl text-xs font-semibold shadow transition cursor-pointer ${
                isCheckedIn 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {isCheckedIn ? "Check Out of Current Shift" : "Check In to Current Shift"}
            </button>
          </div>

          {/* Leave Request Form */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 mb-3">
              <Calendar className="w-4 h-4 text-indigo-500" /> Request Leave Allocation
            </h3>
            <form onSubmit={handleLeaveRequest} className="space-y-3">
              <div className="space-y-0.5">
                <label className="text-[9px] font-bold text-zinc-400 uppercase">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-350 focus:outline-none"
                >
                  <option value="Annual Leave">Annual Leave (18 Days Left)</option>
                  <option value="Sickness Leave">Sickness Leave (7 Days Left)</option>
                  <option value="Unpaid Sabbatical">Unpaid Sabbatical</option>
                </select>
              </div>
              <div className="space-y-0.5">
                <label className="text-[9px] font-bold text-zinc-400 uppercase">Duration (Days)</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={leaveDays}
                  onChange={(e) => setLeaveDays(Number(e.target.value))}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow cursor-pointer transition"
              >
                Submit Leave Application
              </button>
            </form>
            {leaveSuccess && (
              <p className="text-[10px] text-emerald-600 font-bold mt-2 text-center flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5" /> Request logged! Pending HR approval.
              </p>
            )}
          </div>

          {/* Payslips & Documents */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-purple-500" /> Payslips & HR Documents
            </h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center p-2 rounded bg-zinc-50 dark:bg-zinc-950 border">
                <div>
                  <p className="font-bold">Payslip - June 2026</p>
                  <p className="text-[9px] text-zinc-400">Deposited 2026-06-30</p>
                </div>
                <button className="text-[10px] text-indigo-600 font-bold hover:underline cursor-pointer">
                  Download
                </button>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-zinc-50 dark:bg-zinc-950 border">
                <div>
                  <p className="font-bold">Payslip - May 2026</p>
                  <p className="text-[9px] text-zinc-400">Deposited 2026-05-31</p>
                </div>
                <button className="text-[10px] text-indigo-600 font-bold hover:underline cursor-pointer">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Task Checklist */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm">
          <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 mb-3">
            <CheckSquare className="w-4 h-4 text-amber-500" /> My Sprint Task Checklist
          </h3>
          <div className="space-y-2">
            {empTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTask(t.id)}
                className={`flex items-center gap-3 p-3 rounded-lg border text-xs cursor-pointer transition ${
                  t.done ? 'bg-zinc-50/50 dark:bg-zinc-950/20 opacity-75 border-transparent' : 'bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                }`}
              >
                <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center ${
                  t.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-300 dark:border-zinc-700'
                }`}>
                  {t.done && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className={`font-medium ${t.done ? 'line-through text-zinc-400' : 'text-zinc-700 dark:text-zinc-200'}`}>
                  {t.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCustomerPortal = () => {
    return (
      <div className="space-y-6 text-left">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" /> Customer Self-Service Portal
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Submit high-priority support tickets, verify billed subscriptions, and check knowledge bases.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Support Ticket Submission Form */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 mb-3">
              <Send className="w-4 h-4 text-indigo-500" /> Submit High-Priority Support Request
            </h3>
            <form onSubmit={handleDispatchTicket} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase">Support Topic</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ledger clearing issue"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                  />
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase">Related Module</label>
                  <select
                    value={ticketModule}
                    onChange={(e) => setTicketModule(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-350 focus:outline-none"
                  >
                    <option value="Finance & billing">Finance & billing</option>
                    <option value="Inventory warehousing">Inventory warehousing</option>
                    <option value="SSO & RBAC permissions">SSO & RBAC permissions</option>
                    <option value="AI Systems">AI Systems</option>
                  </select>
                </div>
              </div>

              <div className="space-y-0.5">
                <label className="text-[9px] font-bold text-zinc-400 uppercase">Description of Issue</label>
                <textarea
                  required
                  placeholder="Detail the issue..."
                  value={ticketMsg}
                  onChange={(e) => setTicketMsg(e.target.value)}
                  className="w-full h-24 p-2 text-xs rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow cursor-pointer transition"
              >
                Dispatch Support Request
              </button>
            </form>
            {ticketStatus && (
              <p className="text-[10px] text-emerald-600 font-bold mt-2 text-center flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5" /> {ticketStatus}
              </p>
            )}
          </div>

          {/* Active Support Tickets */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-teal-500" /> Active Support Pipelines
            </h3>
            <div className="space-y-2">
              {customerTickets.map((t) => (
                <div key={t.id} className="p-3 border rounded-xl bg-zinc-50 dark:bg-zinc-950">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-bold text-zinc-400 font-mono">{t.id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                      t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-indigo-500/10 text-indigo-600'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">{t.subject}</h4>
                  <p className="text-[9px] text-indigo-600 dark:text-indigo-400 mt-1 uppercase tracking-wider font-mono">{t.module}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVendorPortal = () => {
    return (
      <div className="space-y-6 text-left">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Building className="w-5 h-5 text-indigo-500" /> Vendor Supplier Portal
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Submit bidding quotes on corporate published RFQs and dispatch delivery schedules.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* RFQ Bid Submission form */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 mb-3">
              <FileSignature className="w-4 h-4 text-indigo-500" /> Submit Quote Bid Proposal
            </h3>
            <form onSubmit={handlePostVendorBid} className="space-y-3.5">
              <div className="space-y-0.5">
                <label className="text-[9px] font-bold text-zinc-400 uppercase">Vendor Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Silicon Foundries Ltd"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase">Select Target RFQ</label>
                  <select
                    value={vendorRfq}
                    onChange={(e) => setVendorRfq(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-350 focus:outline-none"
                  >
                    {rfqs.map(r => (
                      <option key={r.id} value={r.id}>{r.id}: {r.title}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase">Bidding Quote Amount ($)</label>
                  <input
                    type="number"
                    required
                    value={vendorBidAmount}
                    onChange={(e) => setVendorBidAmount(Number(e.target.value))}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-0.5">
                <label className="text-[9px] font-bold text-zinc-400 uppercase">SLA & Scope Terms / Notes</label>
                <textarea
                  placeholder="Detail lead times, freight costs, and warranties..."
                  value={vendorBidNotes}
                  onChange={(e) => setVendorBidNotes(e.target.value)}
                  className="w-full h-20 p-2 text-xs rounded-lg border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow cursor-pointer transition"
              >
                Publish Bid Proposal
              </button>
            </form>
            {vendorStatus && (
              <p className="text-[10px] text-emerald-600 font-bold mt-2 text-center flex items-center justify-center gap-1 border border-emerald-500/10 bg-emerald-500/5 p-2 rounded-lg">
                <Check className="w-3.5 h-3.5" /> {vendorStatus}
              </p>
            )}
          </div>

          {/* Active published RFQs to Bid On */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-indigo-500" /> Bidding Channels (Corporate RFQs)
            </h3>
            <div className="space-y-3">
              {rfqs.map((rfq) => (
                <div key={rfq.id} className="p-3.5 border rounded-xl bg-zinc-50 dark:bg-zinc-950 space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-mono font-bold text-zinc-400">{rfq.id}</span>
                    <span className="font-mono text-zinc-500">Deadline: {rfq.deadline}</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-relaxed">{rfq.title}</h4>
                  <div className="flex justify-between items-center text-[11px] pt-2 border-t text-zinc-500">
                    <span>Est. Budget: <span className="font-bold text-zinc-750 dark:text-zinc-300">${rfq.estimatedBudget.toLocaleString()}</span></span>
                    <span className="px-1.5 py-0.2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded text-[9px] font-black uppercase">
                      {rfq.bidsCount} Bids Submitted
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  switch (portalId) {
    case 'portal-employee': return renderEmployeePortal();
    case 'portal-customer': return renderCustomerPortal();
    case 'portal-vendor': return renderVendorPortal();
    default: return renderEmployeePortal();
  }
}
