import React, { useState } from 'react';
import { Save, Globe, Skull, Box, Cloud, Heart, Thermometer, Droplets, Zap, Clock, Shield, Activity, Crosshair, UserPlus } from 'lucide-react';
import { clsx } from 'clsx';

const SelectField = ({ label, name, value, options, onChange, icon: Icon }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-zinc-500" />}
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export function WorldSettings({ config, onSave }: { config: any, onSave: (newConfig: any) => void }) {
  const [activeTab, setActiveTab] = useState('environment');
  const [formData, setFormData] = useState(config.world || {
    dayLength: 2, waterShutoff: 2, elecShutoff: 2, temperature: 3, rain: 3,
    lootFood: 3, lootWeapon: 3, lootMedical: 3, lootSurvival: 3, lootMechanics: 3, lootLiterature: 3, lootOther: 3,
    zombieCount: 4, zombieSpeed: 2, zombieStrength: 2, zombieToughness: 2, zombieTransmission: 1, zombieCognition: 3,
    xpMultiplier: 1.0, statsDecrease: 3, injurySeverity: 2, characterFreePoints: 0, pvp: false
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

  const tabs = [
    { id: 'environment', label: 'Ambiente', icon: Cloud },
    { id: 'loot', label: 'Loot', icon: Box },
    { id: 'zombies', label: 'Zumbis', icon: Skull },
    { id: 'survival', label: 'Sobrevivência', icon: Heart },
  ];

  const lootOptions = [
    { value: 1, label: 'Extremamente Raro' },
    { value: 2, label: 'Raro' },
    { value: 3, label: 'Normal' },
    { value: 4, label: 'Comum' },
    { value: 5, label: 'Abundante' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 tracking-tight flex items-center gap-2">
          <Globe className="w-6 h-6 text-emerald-500" />
          Configurações do Mundo (Sandbox)
        </h2>
        <p className="text-sm text-zinc-400 mt-1">Ajuste as regras de sobrevivência, zumbis, loot e ambiente.</p>
      </div>

      <div className="flex space-x-2 border-b border-zinc-800 pb-px">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2",
                activeTab === tab.id 
                  ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" 
                  : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 min-h-[400px]">
          
          {activeTab === 'environment' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4 border-b border-zinc-800 pb-2">Tempo e Clima</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField label="Duração do Dia" name="dayLength" value={formData.dayLength} onChange={handleChange} icon={Clock}
                  options={[ {value: 1, label: '1 Hora'}, {value: 2, label: '2 Horas'}, {value: 3, label: '3 Horas'}, {value: 4, label: '4 Horas'}, {value: 24, label: 'Tempo Real (24h)'} ]} />
                <SelectField label="Temperatura" name="temperature" value={formData.temperature} onChange={handleChange} icon={Thermometer}
                  options={[ {value: 1, label: 'Muito Frio'}, {value: 2, label: 'Frio'}, {value: 3, label: 'Normal'}, {value: 4, label: 'Quente'}, {value: 5, label: 'Muito Quente'} ]} />
                <SelectField label="Chuva" name="rain" value={formData.rain} onChange={handleChange} icon={Cloud}
                  options={[ {value: 1, label: 'Muito Seco'}, {value: 2, label: 'Seco'}, {value: 3, label: 'Normal'}, {value: 4, label: 'Chuvoso'}, {value: 5, label: 'Muito Chuvoso'} ]} />
              </div>

              <h3 className="text-lg font-semibold text-zinc-100 mt-8 mb-4 border-b border-zinc-800 pb-2">Serviços Básicos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField label="Corte de Água" name="waterShutoff" value={formData.waterShutoff} onChange={handleChange} icon={Droplets}
                  options={[ {value: 1, label: 'Imediato'}, {value: 2, label: '0-30 Dias'}, {value: 3, label: '0-2 Meses'}, {value: 4, label: '0-6 Meses'}, {value: 5, label: '0-1 Ano'}, {value: 6, label: '2-6 Meses'} ]} />
                <SelectField label="Corte de Energia" name="elecShutoff" value={formData.elecShutoff} onChange={handleChange} icon={Zap}
                  options={[ {value: 1, label: 'Imediato'}, {value: 2, label: '0-30 Dias'}, {value: 3, label: '0-2 Meses'}, {value: 4, label: '0-6 Meses'}, {value: 5, label: '0-1 Ano'}, {value: 6, label: '2-6 Meses'} ]} />
              </div>
            </div>
          )}

          {activeTab === 'loot' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4 border-b border-zinc-800 pb-2">Raridade de Itens</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SelectField label="Comida" name="lootFood" value={formData.lootFood} onChange={handleChange} options={lootOptions} />
                <SelectField label="Armas (Corpo a Corpo)" name="lootWeapon" value={formData.lootWeapon} onChange={handleChange} options={lootOptions} />
                <SelectField label="Médico" name="lootMedical" value={formData.lootMedical} onChange={handleChange} options={lootOptions} />
                <SelectField label="Sobrevivência" name="lootSurvival" value={formData.lootSurvival} onChange={handleChange} options={lootOptions} />
                <SelectField label="Mecânica" name="lootMechanics" value={formData.lootMechanics} onChange={handleChange} options={lootOptions} />
                <SelectField label="Literatura" name="lootLiterature" value={formData.lootLiterature} onChange={handleChange} options={lootOptions} />
                <SelectField label="Outros" name="lootOther" value={formData.lootOther} onChange={handleChange} options={lootOptions} />
              </div>
            </div>
          )}

          {activeTab === 'zombies' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4 border-b border-zinc-800 pb-2">Lore dos Zumbis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField label="Quantidade" name="zombieCount" value={formData.zombieCount} onChange={handleChange} icon={Skull}
                  options={[ {value: 1, label: 'Insano'}, {value: 2, label: 'Muito Alto'}, {value: 3, label: 'Alto'}, {value: 4, label: 'Normal'}, {value: 5, label: 'Baixo'}, {value: 6, label: 'Nenhum'} ]} />
                <SelectField label="Velocidade" name="zombieSpeed" value={formData.zombieSpeed} onChange={handleChange}
                  options={[ {value: 1, label: 'Corredores (Sprinters)'}, {value: 2, label: 'Rápidos (Fast Shamblers)'}, {value: 3, label: 'Lentos (Shamblers)'} ]} />
                <SelectField label="Força" name="zombieStrength" value={formData.zombieStrength} onChange={handleChange}
                  options={[ {value: 1, label: 'Super-humanos'}, {value: 2, label: 'Normal'}, {value: 3, label: 'Fracos'} ]} />
                <SelectField label="Resistência" name="zombieToughness" value={formData.zombieToughness} onChange={handleChange}
                  options={[ {value: 1, label: 'Resistentes'}, {value: 2, label: 'Normal'}, {value: 3, label: 'Frágeis'} ]} />
                <SelectField label="Transmissão" name="zombieTransmission" value={formData.zombieTransmission} onChange={handleChange}
                  options={[ {value: 1, label: 'Sangue + Saliva'}, {value: 2, label: 'Apenas Saliva'}, {value: 3, label: 'Todos estão infectados'}, {value: 4, label: 'Nenhuma'} ]} />
                <SelectField label="Cognição" name="zombieCognition" value={formData.zombieCognition} onChange={handleChange}
                  options={[ {value: 1, label: 'Navegação + Portas'}, {value: 2, label: 'Navegação'}, {value: 3, label: 'Básica'} ]} />
              </div>
            </div>
          )}

          {activeTab === 'survival' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4 border-b border-zinc-800 pb-2">Jogador e Combate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-zinc-500" />
                    Pontos Iniciais (Traços)
                  </label>
                  <input
                    type="number"
                    name="characterFreePoints"
                    value={formData.characterFreePoints}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  />
                  <p className="text-xs text-zinc-500">Pontos extras para gastar na criação do personagem.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-zinc-500" />
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
                <SelectField label="Decaimento de Status (Fome/Sede)" name="statsDecrease" value={formData.statsDecrease} onChange={handleChange}
                  options={[ {value: 1, label: 'Muito Rápido'}, {value: 2, label: 'Rápido'}, {value: 3, label: 'Normal'}, {value: 4, label: 'Lento'}, {value: 5, label: 'Muito Lento'} ]} />
                <SelectField label="Gravidade de Ferimentos" name="injurySeverity" value={formData.injurySeverity} onChange={handleChange} icon={Shield}
                  options={[ {value: 1, label: 'Baixa'}, {value: 2, label: 'Normal'}, {value: 3, label: 'Alta'} ]} />
                
                <div className="flex items-center h-full pt-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input type="checkbox" name="pvp" checked={formData.pvp} onChange={handleChange} className="sr-only" />
                      <div className={clsx("w-11 h-6 rounded-full transition-colors", formData.pvp ? 'bg-emerald-500' : 'bg-zinc-700')}></div>
                      <div className={clsx("absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform", formData.pvp ? 'translate-x-5' : 'translate-x-0')}></div>
                    </div>
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors flex items-center gap-2">
                      <Crosshair className="w-4 h-4 text-red-400" />
                      Habilitar PvP (Player vs Player)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

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
