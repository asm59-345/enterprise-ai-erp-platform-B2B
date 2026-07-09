/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  HelpCircle, Search, MessageSquare, ChevronDown, Sparkles, BookOpen, 
  HelpCircle as QuestionIcon, CornerDownRight, CheckCircle2, FileText, Send 
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'System Mechanics',
    question: 'How do I toggle and switch between simulated roles?',
    answer: 'In the top header bar, click on the current role dropdown (e.g. Super Admin). Switch to "Employee", "Customer", or "Vendor" to immediately enter specialized dashboard portals tailored specifically to those roles with dynamic restriction pathways.'
  },
  {
    id: 'faq-2',
    category: 'SaaS Licensing',
    question: 'What is the "SaaS Module Switcher" in the sidebar?',
    answer: 'Stratos includes a simulated modular billing setup. By clicking the toggle switch next to any core module (e.g., HRMS, CRM, Finance) in the sidebar, you can deactivate the module instantly. The top navigation bars, portals, and dashboard statistics automatically adapt to show license compliance.'
  },
  {
    id: 'faq-3',
    category: 'AI Autopilot & Debate',
    question: 'How does the Multi-Agent AI Debate simulator operate?',
    answer: 'Under the AI Copilot side-drawer, navigate to the "Agent Autopilot" view. Select a scenario (such as stock shortfalls or budget bottlenecks) and click "Launch Multi-Agent Debate". This boots multiple simulated corporate executives who debate the scenario and generate unified recommendations.'
  },
  {
    id: 'faq-4',
    category: 'Observability & Telemetry',
    question: 'How do I use the Scalability Stress Simulator?',
    answer: 'Navigate to the "Observability Hub" panel in the "Technical Center" section of the sidebar. You can slide the simulated client threads selector and click "Run Stress Benchmark" to trigger simulated transactions, monitor active databases, and see how the platform automatically scales under heavy request loads.'
  },
  {
    id: 'faq-5',
    category: 'Database Integrity',
    question: 'How is data persistence guaranteed across sessions?',
    answer: 'Stratos utilizes a decoupled data storage adapter. When configured via the .env example variables, write actions (e.g. logging audit compliance) are committed to Cloud Firestore in real-time. In non-cloud sandbox mode, it seamlessly persists state using browser local storage backups so no work is lost on refresh.'
  }
];

export default function QAPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [userQuestion, setUserQuestion] = useState('');
  const [customQA, setCustomQA] = useState<Array<{ q: string; a: string; time: string }>>([]);
  const [isAnswering, setIsAnswering] = useState(false);

  const categories = ['All', 'System Mechanics', 'SaaS Licensing', 'AI Autopilot & Debate', 'Observability & Telemetry', 'Database Integrity'];

  const filteredFAQs = FAQ_DATA.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    const queryText = userQuestion;
    setUserQuestion('');
    setIsAnswering(true);

    // Simulate smart FAQ search / response based on query keywords
    setTimeout(() => {
      let smartAnswer = "Thank you for asking. Our Stratos ERP AI engine is analyzing your request. Based on system parameters, we recommend reviewing our 'How to Operate the App' subsection inside the 'About & Walkthrough' panel, which contains step-by-step guides for custom setups.";
      
      const lowerQuery = queryText.toLowerCase();
      if (lowerQuery.includes('role') || lowerQuery.includes('switch') || lowerQuery.includes('portal')) {
        smartAnswer = "To switch roles, go to the top-right header and toggle the current role dropdown. This adjusts rendering views, enabling localized portals for Employee, Customer, and Vendor environments with strict security controls.";
      } else if (lowerQuery.includes('firebase') || lowerQuery.includes('database') || lowerQuery.includes('auth')) {
        smartAnswer = "Stratos ERP has full support for Google Firestore databases and Firebase authentication. Simply fill in the VITE_FIREBASE_ env vars in your configuration to instantly stream audit logs and authenticate users to the cloud database.";
      } else if (lowerQuery.includes('stress') || lowerQuery.includes('scale') || lowerQuery.includes('observe') || lowerQuery.includes('telemetry')) {
        smartAnswer = "You can benchmark scalability under the 'Observability Hub' section. Adjust threads to trigger multi-node stress simulation, scaling CPU cores and logging transactional telemetry in the real-time terminal window.";
      } else if (lowerQuery.includes('theme') || lowerQuery.includes('dark') || lowerQuery.includes('light')) {
        smartAnswer = "The app supports explicit Light and Dark overrides alongside automatic System Preference tracking. Switch theme mode settings using the buttons located inside the top right Settings gear menu or on the login/signup screen.";
      } else if (lowerQuery.includes('times') || lowerQuery.includes('font') || lowerQuery.includes('roman')) {
        smartAnswer = "By corporate compliance guidelines, Stratos ERP utilizes the elegant and highly legible 'Times New Roman' serif display face throughout all portals and telemetry trackers to maximize clean minimalist styling.";
      }

      setCustomQA(prev => [
        {
          q: queryText,
          a: smartAnswer,
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);
      setIsAnswering(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 text-left animate-fade-in" style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <HelpCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          Interactive System Q&A and FAQ Hub
        </h1>
        <p className="text-sm text-zinc-500 mt-2 font-serif leading-relaxed">
          Search existing platform knowledge bases, ask custom queries to our dynamic AI support engine, 
          and review onboarding guides for the Stratos ERP Suite.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: FAQ directory */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters & Search Row */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search across FAQs (e.g. roles, licenses, telemetry...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition font-serif"
                id="faq-search-input"
              />
            </div>

            {/* Horizontal Scrollable Categories */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-150 ${
                    activeCategory === cat 
                      ? 'bg-indigo-600 text-white shadow-xs' 
                      : 'bg-zinc-100 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-900'
                  }`}
                  id={`btn-faq-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Collapsible FAQ List */}
          <div className="space-y-3">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => {
                const isOpen = expandedId === faq.id;
                return (
                  <div 
                    key={faq.id} 
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setExpandedId(isOpen ? null : faq.id)}
                      className="w-full flex justify-between items-center p-5 text-left font-bold text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-950/40 cursor-pointer"
                      id={`btn-faq-item-${faq.id}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
                        {faq.question}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="p-5 pt-0 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-850/60 leading-relaxed font-serif space-y-3 bg-zinc-50/50 dark:bg-zinc-950/20">
                        <p>{faq.answer}</p>
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                          <span className="bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded">
                            {faq.category}
                          </span>
                          <span>•</span>
                          <span>verified setup instructions</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 font-serif">
                No FAQs match your search criteria. Try a different query or ask our AI engine below.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Ask Panel */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-200">Interactive Support Assistant</h2>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed font-serif">
              Can't find your answer? Type a custom system query below. Our dynamic response engine will lookup code parameters 
              and guide you instantly.
            </p>

            <form onSubmit={handleAskQuestion} className="space-y-3">
              <textarea
                rows={3}
                required
                placeholder="Ask about role portals, themes, Firestore compliance, stress benchmarks, or Times New Roman fonts..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-serif transition"
                id="support-textarea"
              />

              <button
                type="submit"
                disabled={isAnswering}
                className="w-full py-2 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 text-white transition cursor-pointer flex items-center justify-center gap-1.5"
                id="btn-submit-support"
              >
                {isAnswering ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Searching Knowledge Base...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Query</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Live custom QA Session Log */}
          {customQA.length > 0 && (
            <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-4 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-mono">
                Recent Answers
              </h3>

              <div className="space-y-4 max-h-72 overflow-y-auto scrollbar-none pr-1">
                {customQA.map((item, idx) => (
                  <div key={idx} className="space-y-2 text-xs border-b border-zinc-200/50 dark:border-zinc-800/60 pb-3 last:border-b-0 last:pb-0">
                    <div className="flex gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
                      <QuestionIcon className="w-3.5 h-3.5 text-zinc-400 mt-0.5" />
                      <span>{item.q}</span>
                    </div>
                    <div className="flex gap-2 text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-100 dark:border-zinc-850">
                      <CornerDownRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{item.a}</span>
                    </div>
                    <p className="text-[9px] text-zinc-400 font-mono text-right">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
