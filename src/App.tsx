import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';
import { Mods } from './components/Mods';
import { Deploy } from './components/Deploy';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/config');
      const data = await res.json();
      setConfig(data);
    } catch (error) {
      console.error('Failed to fetch config', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfig = async (newConfig: any) => {
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });
      const data = await res.json();
      setConfig(data);
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Failed to save config', error);
      alert('Erro ao salvar configurações.');
    }
  };

  const handleStart = async () => {
    try {
      const res = await fetch('/api/server/start', { method: 'POST' });
      const data = await res.json();
      setConfig((prev: any) => ({ ...prev, status: data.status }));
    } catch (error) {
      console.error('Failed to start server', error);
    }
  };

  const handleStop = async () => {
    try {
      const res = await fetch('/api/server/stop', { method: 'POST' });
      const data = await res.json();
      setConfig((prev: any) => ({ ...prev, status: data.status }));
    } catch (error) {
      console.error('Failed to stop server', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans overflow-hidden selection:bg-emerald-500/30">
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        serverStatus={config?.status || 'stopped'}
        onStart={handleStart}
        onStop={handleStop}
      />
      
      <main className="flex-1 overflow-y-auto">
        {currentTab === 'dashboard' && <Dashboard config={config} />}
        {currentTab === 'settings' && <Settings config={config} onSave={handleSaveConfig} />}
        {currentTab === 'mods' && <Mods config={config} onSave={handleSaveConfig} />}
        {currentTab === 'deploy' && <Deploy />}
      </main>
    </div>
  );
}

