import React from 'react';
import { Activity, FolderGit2, Terminal, FileDown, HeartPulse } from 'lucide-react';

interface HeaderProps {
  activeTab: 'assessment' | 'repository' | 'api';
  onTabChange: (tab: 'assessment' | 'repository' | 'api') => void;
  onOpenZip: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenZip }) => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-30 no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs shadow-teal-700/20">
              <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">
                  AnemiaSense
                </span>
                <span className="text-[10px] sm:text-xs text-teal-700 bg-teal-50 border border-teal-200/60 font-medium px-1.5 py-0.5 rounded">
                  AI v1.3
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Clinical Anemia Risk Assessment &amp; Hematological Analytics
              </p>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <nav className="flex items-center gap-0.5 sm:gap-1 bg-slate-100 p-0.5 sm:p-1 rounded-lg shrink-0">
            <button
              onClick={() => onTabChange('assessment')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'assessment'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Assessment Tool</span>
              <span className="sm:hidden">Tool</span>
            </button>

            <button
              onClick={() => onTabChange('repository')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'repository'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub Files</span>
              <span className="sm:hidden">Repo</span>
            </button>

            <button
              onClick={() => onTabChange('api')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'api'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">API Tester</span>
              <span className="sm:hidden">API</span>
            </button>
          </nav>

          {/* Action: Quick Zip Download / Skill Wallet CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onOpenZip}
              className="flex items-center gap-1 sm:gap-1.5 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors shadow-xs cursor-pointer"
              title="Download all Python project files as a ready-to-push .ZIP"
            >
              <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Download Repo (.ZIP)</span>
              <span className="hidden sm:inline lg:hidden">.ZIP</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
