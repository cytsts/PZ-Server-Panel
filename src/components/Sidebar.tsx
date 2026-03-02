import React from 'react';
import { LayoutDashboard, Settings, Package, TerminalSquare, Play, Square } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  serverStatus: string;
  onStart: () => void;
  onStop: () => void;
}

export function Sidebar({ currentTab, setCurrentTab, serverStatus, onStart, onStop }: SidebarProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'mods', label: 'Mods', icon: Package },
    { id: 'deploy', label: 'Deploy', icon: TerminalSquare },
  ];

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full text-zinc-300">
      <div className="p-6">
        <h1 className="text-xl font-bold text-emerald-500 tracking-tight flex items-center gap-2">
          <span className="bg-emerald-500/10 p-1.5 rounded-md">
            <Package className="w-5 h-5" />
          </span>
          PZ Panel
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'hover:bg-zinc-800/50 hover:text-zinc-100'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800/50 shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</span>
            <span className={clsx(
              "flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full",
              serverStatus === 'running' ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
            )}>
              <span className={clsx("w-1.5 h-1.5 rounded-full", serverStatus === 'running' ? "bg-emerald-400" : "bg-red-400")} />
              {serverStatus === 'running' ? 'Online' : 'Offline'}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onStart}
              disabled={serverStatus === 'running'}
              className="flex items-center justify-center gap-1.5 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-medium transition-colors"
            >
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              Start
            </button>
            <button
              onClick={onStop}
              disabled={serverStatus === 'stopped'}
              className="flex items-center justify-center gap-1.5 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-medium transition-colors"
            >
              <Square className="w-3.5 h-3.5 text-red-400" />
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
