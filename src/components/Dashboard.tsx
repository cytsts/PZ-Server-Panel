import React from 'react';
import { Users, Activity, HardDrive, Cpu, Clock } from 'lucide-react';

export function Dashboard({ config }: { config: any }) {
  const stats = [
    { label: 'Jogadores Online', value: '0 / ' + config.maxPlayers, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Uso de CPU', value: '12%', icon: Cpu, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Uso de RAM', value: '4.2 GB', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Armazenamento', value: '18 GB', icon: HardDrive, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Uptime', value: config.status === 'running' ? '2h 14m' : '0h 0m', icon: Clock, color: 'text-zinc-400', bg: 'bg-zinc-400/10' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Dashboard</h2>
        <p className="text-sm text-zinc-400 mt-1">Visão geral do seu servidor de Project Zomboid.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-start gap-4 hover:border-zinc-700 transition-colors">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-zinc-100 mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">Informações de Conexão</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">IP do Servidor</label>
              <div className="mt-1.5 flex items-center gap-2">
                <code className="bg-zinc-950 px-3 py-2 rounded-lg text-sm font-mono text-emerald-400 border border-zinc-800/50 flex-1">
                  127.0.0.1:{config.port}
                </code>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Senha</label>
              <div className="mt-1.5">
                <code className="bg-zinc-950 px-3 py-2 rounded-lg text-sm font-mono text-zinc-300 border border-zinc-800/50 block">
                  {config.password || 'Sem senha'}
                </code>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800/50">
            <h4 className="text-sm font-medium text-zinc-300 mb-2">Como conectar?</h4>
            <ol className="text-sm text-zinc-500 space-y-2 list-decimal list-inside">
              <li>Abra o Project Zomboid</li>
              <li>Vá em "Join" (Entrar)</li>
              <li>Adicione um novo servidor aos favoritos</li>
              <li>Insira o IP, Porta e Senha acima</li>
              <li>Clique em "Save" e depois "Join Server"</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
