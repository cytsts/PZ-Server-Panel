import React, { useState } from 'react';
import { Save, Globe, Skull, Box, Clock, Droplets, Zap, Swords, TrendingUp } from 'lucide-react';

export function WorldSettings({ config, onSave }: { config: any, onSave: (newConfig: any) => void }) {
  const [formData, setFormData] = useState(config.world || {
    zombieCount: 4,
    lootRarity: 3,
    dayLength: 2,
    waterShutoff: 2,
    elecShutoff: 2,
    xpMultiplier: 1.0,
    pvp: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: any = value;
    if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      parsedValue = parseFloat(value);
    } else {
      parsedValue = parseInt(value, 10);
    }

    setFormData((prev: any) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...config, world: formData });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 tracking-tight flex items-center gap-2">
          <Globe className="w-6 h-6 text-emerald-500" />
          Configurações do Mundo
        </h2>
        <p className="text-sm text-zinc-400 mt-1">Ajuste as regras de sobrevivência, zumbis e ambiente.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-8">
          
          {/* Dificuldade e Zumbis */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2">
              <Skull className="w-5 h-5 text-red-400" />
              Ameaça Zumbi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Quantidade de Zumbis</label>
                <select
                  name="zombieCount"
                  value={formData.zombieCount}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none"
                >
                  <option value={1}>Insano</option>
                  <option value={2}>Muito Alto</option>
                  <option value={3}>Alto</option>
                  <option value={4}>Normal</option>
                  <option value={5}>Baixo</option>
                  <option value={6}>Nenhum</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sobrevivência e Ambiente */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2">
              <Box className="w-5 h-5 text-amber-400" />
              Sobrevivência e Ambiente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <Box className="w-4 h-4 text-zinc-500" />
                  Raridade de Loot
                </label>
                <select
                  name="lootRarity"
                  value={formData.lootRarity}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none"
                >
                  <option value={1}>Extremamente Raro</option>
                  <option value={2}>Raro</option>
                  <option value={3}>Normal</option>
                  <option value={4}>Comum</option>
                  <option value={5}>Abundante</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-500" />
                  Duração do Dia (Horas reais)
                </label>
                <select
                  name="dayLength"
                  value={formData.dayLength}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none"
                >
                  <option value={1}>1 Hora</option>
                  <option value={2}>2 Horas</option>
                  <option value={3}>3 Horas</option>
                  <option value={4}>4 Horas</option>
                  <option value={24}>Tempo Real (24h)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  Corte de Água
                </label>
                <select
                  name="waterShutoff"
                  value={formData.waterShutoff}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none"
                >
                  <option value={1}>Imediato</option>
                  <option value={2}>0-30 Dias</option>
                  <option value={3}>0-2 Meses</option>
                  <option value={4}>0-6 Meses</option>
                  <option value={5}>0-1 Ano</option>
                  <option value={6}>2-6 Meses</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Corte de Energia
                </label>
                <select
                  name="elecShutoff"
                  value={formData.elecShutoff}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none"
                >
                  <option value={1}>Imediato</option>
                  <option value={2}>0-30 Dias</option>
                  <option value={3}>0-2 Meses</option>
                  <option value={4}>0-6 Meses</option>
                  <option value={5}>0-1 Ano</option>
                  <option value={6}>2-6 Meses</option>
                </select>
              </div>
            </div>
          </div>

          {/* Jogadores */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2">
              <Swords className="w-5 h-5 text-purple-400" />
              Jogadores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-zinc-500" />
                  Multiplicador de XP
                </label>
                <input
                  type="number"
                  name="xpMultiplier"
                  value={formData.xpMultiplier}
                  onChange={handleChange}
                  step="0.1"
                  min="0.1"
                  max="100"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="flex items-center h-full pt-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="pvp"
                      checked={formData.pvp}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${formData.pvp ? 'bg-emerald-500' : 'bg-zinc-700'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.pvp ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">
                    Habilitar PvP (Player vs Player)
                  </span>
                </label>
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Save className="w-4 h-4" />
            Salvar Configurações do Mundo
          </button>
        </div>
      </form>
    </div>
  );
}
