import { BarChart2, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, MoreHorizontal, Play, Pause, Trash2, Target } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'Gasto Total', value: 'R$ 12.450,00', change: '+12%', positive: true, icon: DollarSign },
    { label: 'Conversões', value: '1.240', change: '+18%', positive: true, icon: Target },
    { label: 'ROI Médio', value: '3.5x', change: '-5%', positive: false, icon: TrendingUp },
    { label: 'CPL Médio', value: 'R$ 4,20', change: '-10%', positive: true, icon: Users },
  ];

  const campaigns = [
    { id: 1, name: 'Fórmula Emagrecimento 2.0', status: 'Ativo', budget: 'R$ 150/dia', clicks: 1240, ctr: '2.4%', spend: 'R$ 1.200' },
    { id: 2, name: 'Lançamento Crypto X', status: 'Ativo', budget: 'R$ 300/dia', clicks: 850, ctr: '1.8%', spend: 'R$ 2.450' },
    { id: 3, name: 'Curso de Inglês Fluente', status: 'Pausado', budget: 'R$ 50/dia', clicks: 120, ctr: '0.9%', spend: 'R$ 150' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Visão Geral</h2>
          <p className="text-slate-500 font-medium">Bem-vindo de volta, aqui estão seus resultados de hoje.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all">Exportar Dados</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">Últimos 7 Dias</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.positive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                  {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </div>
              </div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-black text-slate-900">Suas Campanhas Ativas</h3>
          <BarChart2 className="text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Campanha</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Orçamento</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Cliques</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Gasto</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{camp.name}</div>
                    <div className="text-xs text-slate-400">Criado há 3 dias</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      camp.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${camp.status === 'Ativo' ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
                      {camp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{camp.budget}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{camp.clicks}</div>
                    <div className="text-[10px] text-slate-400">CTR: {camp.ctr}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{camp.spend}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors">
                        {camp.status === 'Ativo' ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
