import React, { useState } from 'react';
import { Save } from 'lucide-react';

export function Settings({ config, onSave }: { config: any, onSave: (newConfig: any) => void }) {
  const [formData, setFormData] = useState(config);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Configurações do Servidor</h2>
        <p className="text-sm text-zinc-400 mt-1">Ajuste as propriedades principais do seu servidor.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Nome do Servidor</label>
              <input
                type="text"
                name="serverName"
                value={formData.serverName}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                placeholder="Meu Servidor PZ"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Senha do Servidor</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                placeholder="Deixe em branco para público"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Máximo de Jogadores</label>
              <input
                type="number"
                name="maxPlayers"
                value={formData.maxPlayers}
                onChange={handleChange}
                min="1"
                max="100"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Porta UDP</label>
              <input
                type="number"
                name="port"
                value={formData.port}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Versão do Jogo</label>
              <select
                name="version"
                value={formData.version}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none"
              >
                <option value="latest">Latest (Stable)</option>
                <option value="b41multiplayer">Build 41 Multiplayer</option>
                <option value="unstable">Unstable Beta</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Save className="w-4 h-4" />
            Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
}
