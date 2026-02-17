import { LayoutDashboard, Rocket, Settings, CreditCard, HelpCircle, BarChart2 } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'wizard', icon: Rocket, label: 'Novo Lançamento' },
    { id: 'stats', icon: BarChart2, label: 'Performance' },
    { id: 'billing', icon: CreditCard, label: 'Faturamento' },
    { id: 'settings', icon: Settings, label: 'Integrações' },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6 fixed left-0 top-0 flex flex-col border-r border-slate-800">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <h1 className="font-bold text-xl tracking-tight">MetaAds <span className="text-indigo-400">Auto</span></h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors w-full">
          <HelpCircle size={20} />
          <span className="font-medium">Suporte</span>
        </button>
      </div>
    </div>
  );
}
