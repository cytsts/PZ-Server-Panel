import React, { useState } from 'react';
import { Plus, Trash2, Save, ExternalLink, Download, Loader2 } from 'lucide-react';

export function Mods({ config, onSave }: { config: any, onSave: (newConfig: any) => void }) {
  const [mods, setMods] = useState<{ workshopId: string, modId: string }[]>(config.mods || []);
  const [newWorkshopId, setNewWorkshopId] = useState('');
  const [newModId, setNewModId] = useState('');
  const [installing, setInstalling] = useState(false);

  const handleAddMod = () => {
    if (newWorkshopId && newModId) {
      setMods([...mods, { workshopId: newWorkshopId, modId: newModId }]);
      setNewWorkshopId('');
      setNewModId('');
    }
  };

  const handleRemoveMod = (index: number) => {
    const newMods = [...mods];
    newMods.splice(index, 1);
    setMods(newMods);
  };

  const handleSave = () => {
    onSave({ ...config, mods });
  };

  const handleInstallMods = async () => {
    setInstalling(true);
    try {
      const res = await fetch('/api/server/install-mods', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      } else {
        alert(data.error || 'Erro ao instalar mods.');
      }
    } catch (error) {
      console.error('Failed to install mods', error);
      alert('Erro ao instalar mods.');
    } finally {
      setInstalling(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Gerenciador de Mods</h2>
        <p className="text-sm text-zinc-400 mt-1">Adicione mods da Steam Workshop ao seu servidor.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5 space-y-2">
            <label className="text-sm font-medium text-zinc-300">Workshop ID</label>
            <input
              type="text"
              value={newWorkshopId}
              onChange={(e) => setNewWorkshopId(e.target.value)}
              placeholder="Ex: 2616986064"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-mono text-sm"
            />
          </div>
          <div className="md:col-span-5 space-y-2">
            <label className="text-sm font-medium text-zinc-300">Mod ID</label>
            <input
              type="text"
              value={newModId}
              onChange={(e) => setNewModId(e.target.value)}
              placeholder="Ex: TsarLib"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-mono text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <button
              onClick={handleAddMod}
              disabled={!newWorkshopId || !newModId}
              className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-100 px-4 py-2.5 rounded-xl font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>
        </div>

        <div className="mt-8 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800">
                <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Workshop ID</th>
                <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Mod ID</th>
                <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mods.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-zinc-500 text-sm">
                    Nenhum mod adicionado.
                  </td>
                </tr>
              ) : (
                mods.map((mod, index) => (
                  <tr key={index} className="hover:bg-zinc-800/20 transition-colors group">
                    <td className="px-6 py-4">
                      <a
                        href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.workshopId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-mono text-sm flex items-center gap-1.5 transition-colors"
                      >
                        {mod.workshopId}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-zinc-300">
                      {mod.modId}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleRemoveMod(index)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-400/10"
                        title="Remover Mod"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-4 gap-4">
          <button
            onClick={handleInstallMods}
            disabled={installing || mods.length === 0}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            {installing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {installing ? 'Instalando...' : 'Instalar Mods'}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Save className="w-4 h-4" />
            Salvar Mods
          </button>
        </div>
      </div>
    </div>
  );
}
