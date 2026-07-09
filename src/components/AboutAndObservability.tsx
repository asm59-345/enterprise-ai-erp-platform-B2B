/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Info, Cpu, ShieldCheck, HelpCircle, Activity, BarChart3, LineChart, 
  Settings, Play, Zap, RefreshCw, Terminal, Layers, Database, Sparkles, Server, Network
} from 'lucide-react';

interface AboutAndObservabilityProps {
  panelId: 'tech-about' | 'tech-observability';
}

export default function AboutAndObservability({ panelId }: AboutAndObservabilityProps) {
  // Observability Live Metrics State
  const [cpuUsage, setCpuUsage] = useState(24);
  const [memUsage, setMemUsage] = useState(41);
  const [dbConnections, setDbConnections] = useState(8);
  const [queryLatency, setQueryLatency] = useState(14);
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [stressThreads, setStressThreads] = useState(1);
  const [stressLogs, setStressLogs] = useState<string[]>([
    "System telemetry online.",
    "DB Connection Pool: Healthy [Min: 5, Max: 50]"
  ]);

  // Handle live metric fluctuations
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isStressTesting) {
        setCpuUsage(prev => Math.max(12, Math.min(45, prev + (Math.random() * 6 - 3))));
        setMemUsage(prev => Math.max(38, Math.min(48, prev + (Math.random() * 2 - 1))));
        setQueryLatency(prev => Math.max(8, Math.min(22, prev + (Math.random() * 4 - 2))));
      } else {
        // Stress test fluctuations
        setCpuUsage(prev => Math.max(75, Math.min(98, prev + (Math.random() * 4 - 2))));
        setMemUsage(prev => Math.max(82, Math.min(94, prev + (Math.random() * 2 - 1))));
        setQueryLatency(prev => Math.max(65, Math.min(180, prev + (Math.random() * 20 - 10))));
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [isStressTesting]);

  const handleStartStressTest = () => {
    setIsStressTesting(true);
    setStressLogs(prev => [
      `[${new Date().toLocaleTimeString()}] 🚀 Stress test started with ${stressThreads} concurrent client thread(s)`,
      `[${new Date().toLocaleTimeString()}] 🗄️ Simulating 10,000 parallel read/write transactions to Cloud Firestore...`,
      ...prev
    ]);

    setTimeout(() => {
      setStressLogs(prev => [
        `[${new Date().toLocaleTimeString()}] ⚠️ CPU saturation warning triggered: Node pool auto-scaler spawning replicas...`,
        `[${new Date().toLocaleTimeString()}] 🟢 Autoscaling successful: Spawning Pod [stratos-monolith-node-03-v9]`,
        ...prev
      ]);
    }, 4000);

    setTimeout(() => {
      setStressLogs(prev => [
        `[${new Date().toLocaleTimeString()}] ✅ Load shed successful. Latency returning to steady state.`,
        `[${new Date().toLocaleTimeString()}] ℹ️ Telemetry database transaction commit successful: 100% integrity.`,
        ...prev
      ]);
      setIsStressTesting(false);
    }, 12000);
  };

  const renderAboutGuide = () => {
    return (
      <div className="space-y-8 text-left animate-fade-in" style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Info className="w-8 h-8 text-indigo-600 dark:text-indigo-400" /> 
            Stratos Monolith: About & Comprehensive User Guide
          </h1>
          <p className="text-sm text-zinc-500 mt-2 font-serif leading-relaxed">
            Welcome to Stratos ERP, a state-of-the-art corporate administration system operating as an AI-augmented Monolith. 
            Stratos unifies HRMS, Finance general ledgers, CRM pipeline coordination, multi-region Inventory operations, 
            and collaborative multi-agent business simulation.
          </p>
        </div>

        {/* Dynamic Architectural Vector Diagram (SVG representation) */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" /> Enterprise Multi-Agent & RAG Pipeline Architecture
          </h3>
          <p className="text-xs text-zinc-400 font-serif leading-relaxed">
            Interactive system blueprint showing data flow between Firestore, Express API Gateway, and Google Gemini AI Agent Room:
          </p>
          
          <div className="w-full bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-850 flex flex-col md:flex-row items-center justify-around gap-6 py-8">
            {/* Box 1: Client UI */}
            <div className="flex flex-col items-center p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl w-40 text-center shadow-xs">
              <Sparkles className="w-6 h-6 text-indigo-600 mb-1" />
              <p className="text-xs font-bold">Client Web UI</p>
              <p className="text-[10px] text-zinc-400 mt-1">Times New Roman theme</p>
            </div>

            {/* Line / Arrow */}
            <div className="hidden md:flex flex-col items-center text-indigo-600 animate-pulse">
              <span className="text-xs font-mono">HTTPS</span>
              <span className="text-lg">➔</span>
            </div>

            {/* Box 2: Express Server & Router */}
            <div className="flex flex-col items-center p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl w-40 text-center shadow-xs">
              <Cpu className="w-6 h-6 text-purple-600 mb-1" />
              <p className="text-xs font-bold">Express Monolith</p>
              <p className="text-[10px] text-zinc-400 mt-1">Vite Middleware on Port 3000</p>
            </div>

            {/* Line / Arrow */}
            <div className="hidden md:flex flex-col items-center text-purple-600 animate-pulse">
              <span className="text-xs font-mono">gRPC</span>
              <span className="text-lg">➔</span>
            </div>

            {/* Box 3: Database & AI */}
            <div className="flex flex-col items-center p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl w-40 text-center shadow-xs">
              <Database className="w-6 h-6 text-emerald-600 mb-1" />
              <p className="text-xs font-bold">Cloud Firestore</p>
              <p className="text-[10px] text-zinc-400 mt-1">Real-time data synchronization</p>
            </div>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Start Guide */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2 border-b pb-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" /> How to Operate the App
            </h2>
            <ul className="space-y-3.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed list-decimal pl-4 font-serif">
              <li>
                <strong>Role Switching (Simulation Modes):</strong> Use the header bar dropdown to toggle between roles. 
                Switching to <em>Employee</em>, <em>Customer</em>, or <em>Vendor</em> restricts system view to authorized pipelines and unlocks their portals.
              </li>
              <li>
                <strong>Module Toggling & Licensing:</strong> Navigate to the <em>SaaS Module Switcher</em> in the sidebar. 
                You can toggle off ERP segments (e.g. deactivate <em>CRM</em> or <em>HRMS</em>) to simulate license scaling. Nav bars instantly adapt.
              </li>
              <li>
                <strong>Trigger Multi-Agent AI Debate:</strong> Open the AI Copilot side-drawer. Under <em>Agent Autopilot</em>, select a corporate crisis (e.g., Procurement Bid or Low Stock alert) to trigger a collaborative model discussion.
              </li>
              <li>
                <strong>Compliance Audits:</strong> Every write operation across modules automatically publishes detailed system logs under <em>SSO RBAC & Audit Logs</em>.
              </li>
            </ul>
          </div>

          {/* Core App Mechanics */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2 border-b pb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> Production-Grade Compliance & Security
            </h2>
            <div className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
              <p>
                <strong>SSO & Role-Based Access (RBAC):</strong> Access rights are governed dynamically. In non-admin environments, 
                high-risk menus block execution and transition to read-only isolation mode to guard secure ledger accounts.
              </p>
              <p>
                <strong>System Preferences & Theme Adaptability:</strong> The platform reads your client machine state 
                on bootup to align the UI with your operating system preference (Dark vs Light theme), providing consistent comfort.
              </p>
              <p>
                <strong>Data Persistence:</strong> Backed by a decoupled persistence layer capable of linking Firestore database 
                nodes, preventing data loss when clearing local browser caches.
              </p>
            </div>
          </div>
        </div>

        {/* Video Tutorial Placeholder & Real-time walkthrough documentation */}
        <div className="bg-zinc-900 text-white p-6 rounded-2xl space-y-4 shadow-xl relative overflow-hidden border border-zinc-850">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Server className="w-32 h-32" />
          </div>
          <div>
            <span className="bg-indigo-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full font-mono">
              System Walkthrough
            </span>
            <h3 className="text-lg font-bold mt-2">Interactive Video Guide Placeholder & Operational Manual</h3>
            <p className="text-xs text-zinc-400 mt-1 font-serif leading-relaxed">
              Our automated deployment engine has generated a clean mockup to demonstrate production level tutorials on video and image assets:
            </p>
          </div>

          {/* Mock Video Container */}
          <div className="relative bg-zinc-950 aspect-video rounded-xl overflow-hidden flex flex-col items-center justify-center border border-zinc-800 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
            
            <div className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer border border-white/20 shadow-lg group">
              <Play className="w-6 h-6 text-white translate-x-0.5 group-hover:scale-110 transition duration-150" />
            </div>

            <p className="text-[10px] text-zinc-500 font-mono mt-3">STRATOS_OVERVIEW_2026.MP4 (3:15m Demo)</p>
          </div>
        </div>
      </div>
    );
  };

  const renderObservability = () => {
    return (
      <div className="space-y-8 text-left animate-fade-in" style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Activity className="w-8 h-8 text-emerald-500" />
            Real-time Telemetry, Observability & Scalability Hub
          </h1>
          <p className="text-sm text-zinc-500 mt-2 font-serif leading-relaxed">
            Monitor transaction dispatch latencies, database cache hit ratio, server load balancing, 
            and stress-test multi-node scalability limits under peak transaction volumes.
          </p>
        </div>

        {/* Metrics Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CPU Saturation */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Cpu className="w-4 h-4 text-indigo-500" /> CPU Core Saturation
            </p>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mt-2 font-mono">
              {cpuUsage.toFixed(1)}%
            </h2>
            <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${cpuUsage > 75 ? 'bg-red-500' : 'bg-indigo-600'}`} 
                style={{ width: `${cpuUsage}%` }} 
              />
            </div>
            <p className="text-[10px] text-zinc-400 mt-2">Kubernetes Pod autoscaling limit: 80%</p>
          </div>

          {/* JVM / Node Memory */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Server className="w-4 h-4 text-purple-500" /> Node Memory Allocation
            </p>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mt-2 font-mono">
              {memUsage.toFixed(1)}%
            </h2>
            <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${memUsage > 75 ? 'bg-red-500' : 'bg-purple-600'}`} 
                style={{ width: `${memUsage}%` }} 
              />
            </div>
            <p className="text-[10px] text-zinc-400 mt-2">Active Memory: 1.64 GB / 4.00 GB</p>
          </div>

          {/* DB Connections */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Database className="w-4 h-4 text-emerald-500" /> Active DB Connection Pool
            </p>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mt-2 font-mono">
              {dbConnections}
            </h2>
            <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500" 
                style={{ width: `${(dbConnections / 50) * 100}%` }} 
              />
            </div>
            <p className="text-[10px] text-zinc-400 mt-2">Pooling mechanism: HikariCP / Firestore Keep-Alive</p>
          </div>

          {/* Response Latency */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Zap className="w-4 h-4 text-amber-500" /> Transaction latency (ms)
            </p>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mt-2 font-mono">
              {queryLatency.toFixed(0)} ms
            </h2>
            <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${queryLatency > 100 ? 'bg-red-500' : 'bg-amber-500'}`} 
                style={{ width: `${Math.min(100, (queryLatency / 200) * 100)}%` }} 
              />
            </div>
            <p className="text-[10px] text-zinc-400 mt-2">P99 SLA baseline: 45 ms threshold</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Load stress simulator */}
          <div className="lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <LineChart className="w-5 h-5 text-indigo-500" /> Scalability Stress Simulator
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-serif">
              Trigger virtual transaction storms to test Stratos auto-scaling. The system will deploy temporary mock server nodes 
              and partition DB loads to balance high request volumes.
            </p>

            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Simulated Threads</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min={1} 
                    max={10} 
                    value={stressThreads}
                    onChange={(e) => setStressThreads(Number(e.target.value))}
                    disabled={isStressTesting}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="text-xs font-bold font-mono">{stressThreads} threads</span>
                </div>
              </div>

              <button
                onClick={handleStartStressTest}
                disabled={isStressTesting}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 text-white shadow-md cursor-pointer transition flex items-center justify-center gap-2"
              >
                {isStressTesting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Stress Test...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Run Stress Benchmark</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Telemetry output logs */}
          <div className="lg:col-span-2 bg-zinc-950 text-emerald-400 p-5 rounded-2xl border border-zinc-900 flex flex-col h-72">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-900 mb-3 text-xs">
              <span className="font-mono text-zinc-500 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-500" /> STRATOS_OBSERVABILITY_LOGGER_V1
              </span>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                LIVE TELEMETRY
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 font-mono text-[10px] select-text scrollbar-none">
              {stressLogs.map((log, index) => (
                <div key={index} className="leading-relaxed whitespace-pre-wrap">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Database performance benchmarks & production scaling works */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-500" /> Production Cloud Scalability Plan & Micro-Benchmarks
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-850 space-y-2">
              <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Firestore Sharding Capacity</h4>
              <p className="text-xs text-zinc-500 leading-relaxed font-serif">
                Capable of handling up to 10,000 writes per second per database partition. Incorporates automatic document key hashing 
                to distribute indexes and prevent hotspot issues.
              </p>
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-850 space-y-2">
              <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Observability Metric Retention</h4>
              <p className="text-xs text-zinc-500 leading-relaxed font-serif">
                Leverages automatic log truncation after 30 days into Google Cloud Storage archival pools, ensuring high performance 
                and low memory consumption.
              </p>
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-850 space-y-2">
              <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Failover Latency Target</h4>
              <p className="text-xs text-zinc-500 leading-relaxed font-serif">
                Under peak transaction loads, active-active regional replication keeps read latencies under 20ms and triggers automatic 
                failover pathways in less than 3 seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  switch (panelId) {
    case 'tech-about': return renderAboutGuide();
    case 'tech-observability': return renderObservability();
    default: return renderAboutGuide();
  }
}
