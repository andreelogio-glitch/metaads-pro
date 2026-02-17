import { useState } from 'react';
import { 
  Rocket, 
  TrendingUp, 
  Settings, 
  LayoutDashboard, 
  Zap, 
  Search, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart3, 
  AlertCircle,
  Pause,
  Plus,
  Target,
  Sparkles,
  Award
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

// Mock Data
const performanceData = [
  { name: 'Seg', sales: 4000, roi: 2.4 },
  { name: 'Ter', sales: 3000, roi: 1.8 },
  { name: 'Qua', sales: 5000, roi: 3.2 },
  { name: 'Qui', sales: 2780, roi: 2.1 },
  { name: 'Sex', sales: 6890, roi: 4.5 },
  { name: 'Sáb', sales: 8390, roi: 5.2 },
  { name: 'Dom', sales: 7490, roi: 4.8 },
];

const marketTrends = [
  { id: 1, name: 'Smartwatch Ultra Pro', potential: 98, trend: 'up', niche: 'Eletrônicos', competition: 'Baixa' },
  { id: 2, name: 'Sérum Anti-Idade Gold', potential: 85, trend: 'up', niche: 'Beleza', competition: 'Média' },
  { id: 3, name: 'Luminária Galáxia 3D', potential: 72, trend: 'down', niche: 'Decoração', competition: 'Alta' },
  { id: 4, name: 'Kit Cozinha Inteligente', potential: 92, trend: 'up', niche: 'Casa', competition: 'Baixa' },
];

// --- COMPONENTES ---

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-3xl border border-slate-200 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

interface SidebarItemProps {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
        : 'text-slate-500 hover:bg-slate-100'
    }`}
  >
    <Icon size={20} />
    <span className="text-sm">{label}</span>
  </button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAutoScaling, setIsAutoScaling] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col fixed h-full z-10">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
            <Zap size={24} fill="currentColor" />
          </div>
          <h1 className="text-xl font-black italic tracking-tighter">METADS PRO</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={Search} label="Pesquisa IA" active={activeTab === 'research'} onClick={() => setActiveTab('research')} />
          <SidebarItem icon={Rocket} label="Novo Lançamento" active={activeTab === 'launch'} onClick={() => setActiveTab('launch')} />
          <SidebarItem icon={ShieldCheck} label="Automação" active={activeTab === 'automation'} onClick={() => setActiveTab('automation')} />
          <SidebarItem icon={Settings} label="Integrações" active={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="bg-indigo-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs mb-1">
              <Sparkles size={14} /> AI ENGINE V4.2
            </div>
            <div className="text-[10px] text-indigo-500 font-medium">Analisando 1.2M de pontos de dados/hora</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'research' && <ResearchView />}
        {activeTab === 'launch' && <LaunchWizard />}
        {activeTab === 'automation' && <AutomationView isAutoScaling={isAutoScaling} setIsAutoScaling={setIsAutoScaling} />}
        {activeTab === 'integrations' && <IntegrationsView />}
      </main>
    </div>
  );
};

// --- VIEWS ---

const DashboardView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Performance Global</h2>
        <p className="text-slate-500 font-medium font-medium">Sua IA está otimizando 12 campanhas ativas.</p>
      </div>
      <div className="flex gap-3">
        <div className="bg-white border px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          API Meta Ads: Online
        </div>
      </div>
    </div>

    {/* Top Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: 'Faturamento', value: 'R$ 42.890', change: '+12%', up: true, icon: BarChart3 },
        { label: 'ROI Médio', value: '4.8x', change: '+0.5', up: true, icon: TrendingUp },
        { label: 'CPL (Lead)', value: 'R$ 2,45', change: '-8%', up: true, icon: Target },
        { label: 'Escala Ativa', value: 'R$ 1.200/dia', change: 'Estável', up: null, icon: Zap },
      ].map((s, i) => (
        <Card key={i}>
          <div className="flex justify-between mb-4">
            <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center border border-slate-100">
              <s.icon size={20} />
            </div>
            {s.up !== null && (
              <span className={`text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${s.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {s.change}
              </span>
            )}
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</div>
          <div className="text-2xl font-black mt-1">{s.value}</div>
        </Card>
      ))}
    </div>

    {/* Chart */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Projeção de Escala (Próximos 7 Dias)</h3>
          <select className="bg-slate-50 border-none text-xs font-bold rounded-lg px-3 py-1 outline-none">
            <option>Faturamento vs ROI</option>
          </select>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
              />
              <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Sparkles className="text-indigo-600" size={18} /> Insights da IA</h3>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
            <div className="text-xs font-bold text-green-600 mb-1 flex items-center gap-1"><Award size={12}/> OPORTUNIDADE DE ESCALA</div>
            <p className="text-sm font-bold text-green-800">Aumentar verba em 20% no produto 'Smartwatch Ultra' - ROI está 5.2x.</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="text-xs font-bold text-amber-600 mb-1 flex items-center gap-1"><AlertCircle size={12}/> OTIMIZAÇÃO NECESSÁRIA</div>
            <p className="text-sm font-bold text-amber-800">CTR da Copy 'V2' caiu 15%. Sugerimos trocar o Headline para o modelo 'Desconto'.</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <div className="text-xs font-bold text-indigo-600 mb-1 flex items-center gap-1"><Zap size={12}/> NOVO PRODUTO</div>
            <p className="text-sm font-bold text-indigo-800">Nicho de 'Beleza Masculina' teve aumento de 40% nas buscas hoje.</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const ResearchView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div>
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">Pesquisa IA & Mercado</h2>
      <p className="text-slate-500 font-medium">Encontre o próximo vencedor antes da concorrência.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {marketTrends.map((product) => (
        <Card key={product.id} className="relative overflow-hidden group">
          <div className={`absolute top-0 right-0 p-4 ${product.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {product.trend === 'up' ? <TrendingUp size={24} /> : <ArrowDownRight size={24} />}
          </div>
          <div className="text-xs font-bold text-indigo-600 uppercase mb-2">{product.niche}</div>
          <h4 className="text-lg font-black mb-1">{product.name}</h4>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{width: `${product.potential}%`}}></div>
            </div>
            <span className="text-xs font-bold">{product.potential}% Potential</span>
          </div>
          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>Competição: {product.competition}</span>
          </div>
          <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold group-hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
            Lançar com IA <Plus size={16} />
          </button>
        </Card>
      ))}
    </div>
  </div>
);

interface AutomationViewProps {
  isAutoScaling: boolean;
  setIsAutoScaling: (val: boolean) => void;
}

const AutomationView: React.FC<AutomationViewProps> = ({ isAutoScaling, setIsAutoScaling }) => (
  <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
    <div className="text-center">
      <h2 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">Piloto Automático</h2>
      <p className="text-slate-500 font-medium italic uppercase">Configure as regras de escala e proteção de orçamento.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className={`border-2 transition-all ${isAutoScaling ? 'border-indigo-500 shadow-indigo-100' : 'border-slate-200'}`}>
        <div className="flex justify-between items-center mb-6">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <button 
            onClick={() => setIsAutoScaling(!isAutoScaling)}
            className={`w-14 h-8 rounded-full transition-colors relative flex items-center ${isAutoScaling ? 'bg-indigo-600' : 'bg-slate-300'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform mx-1 ${isAutoScaling ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
        </div>
        <h3 className="text-xl font-black mb-2 uppercase italic tracking-tighter italic uppercase tracking-tighter italic uppercase tracking-tighter italic uppercase tracking-tighter">Escala Vertical IA</h3>
        <p className="text-sm text-slate-500 mb-6">Aumenta o orçamento em 15% a cada 24h se o ROI estiver 30% acima da meta e o CPA estiver estável.</p>
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">STATUS</span>
            <span className={isAutoScaling ? 'text-green-600' : 'text-slate-400'}>{isAutoScaling ? 'ATIVO' : 'DESATIVADO'}</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">ULTIMA AÇÃO</span>
            <span>Hoje, 09:42 (+ R$ 120,00)</span>
          </div>
        </div>
      </Card>

      <Card className="border-2 border-red-100">
        <div className="flex justify-between items-center mb-6">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
            <Pause size={24} />
          </div>
          <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-black">SEMPRE ATIVO</div>
        </div>
        <h3 className="text-xl font-black mb-2 uppercase italic tracking-tighter">Stop-Loss Automático</h3>
        <p className="text-sm text-slate-500 mb-6">Pausa anúncios que gastarem 1.5x o CPA desejado sem conversão ou que tiverem CTR abaixo de 0.8%.</p>
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">ESTRATÉGIA</span>
            <span>PROTEÇÃO MÁXIMA</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400"> ECONOMIA HOJE</span>
            <span className="text-green-600">R$ 450,00 salvos</span>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const LaunchWizard = () => (
  <div className="max-w-3xl mx-auto text-center py-20 italic uppercase">
    <Rocket size={48} className="mx-auto text-indigo-200 mb-6 animate-bounce" />
    <h2 className="text-2xl font-black mb-2">Interface de Lançamento</h2>
    <p className="text-slate-500 mb-8">O assistente de criação está configurando sua próxima campanha vencedora baseada nos bônus e idiomas selecionados.</p>
    <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:scale-105 transition-all">
      INICIAR CONFIGURAÇÃO RÁPIDA
    </button>
  </div>
);

const IntegrationsView = () => (
  <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in">
    <div>
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">Conectores de Dados</h2>
      <p className="text-slate-500 font-medium italic uppercase tracking-widest text-xs mt-2">API Graph Meta Ads v19.0</p>
    </div>
    <Card className="space-y-6 italic uppercase tracking-tighter italic uppercase tracking-tighter">
      <div className="space-y-2 italic uppercase tracking-tighter italic uppercase tracking-tighter">
        <label className="text-xs font-bold text-slate-400">Token de Usuário do Sistema</label>
        <input type="password" placeholder="EAABw..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
      </div>
      <div className="space-y-2 italic uppercase tracking-tighter">
        <label className="text-xs font-bold text-slate-400">ID do Pixel Principal</label>
        <input type="text" placeholder="1234567890" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
      </div>
      <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all">
        VERIFICAR E SALVAR CONEXÃO
      </button>
    </Card>
  </div>
);

export default App;
