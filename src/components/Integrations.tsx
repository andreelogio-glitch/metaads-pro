import { useState } from 'react';
import { Share2, Lock, CheckCircle2, AlertCircle, ExternalLink, Key } from 'lucide-react';

export function Integrations() {
  const [metaToken, setMetaToken] = useState('');
  const [pixelId, setPixelId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API connection
    await new Promise(r => setTimeout(r, 1500));
    setIsSaving(false);
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Configurações & Integrações</h2>
        <p className="text-slate-500 font-medium">Conecte suas contas para automatizar o processo de publicação.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Meta Ads Integration */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <Share2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Meta Business Suite</h3>
              <p className="text-xs text-slate-500 font-medium">Integração oficial via API Graph</p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Key size={14} className="text-slate-400" /> Token de Acesso (System User)
              </label>
              <input
                type="password"
                placeholder="EAABw..."
                value={metaToken}
                onChange={e => setMetaToken(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
              />
              <p className="text-[10px] text-slate-400">Obtenha seu token no Gerenciador de Negócios do Facebook.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">ID do Pixel (Padrão)</label>
              <input
                type="text"
                placeholder="1234567890"
                value={pixelId}
                onChange={e => setPixelId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                status === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {isSaving ? 'Conectando...' : status === 'success' ? <><CheckCircle2 size={18} /> Conectado!</> : 'Salvar e Validar Conta'}
            </button>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
             <AlertCircle className="text-blue-500 shrink-0" size={18} />
             <div className="text-xs text-blue-700 leading-relaxed font-medium">
               Para garantir o funcionamento, certifique-se que o Token possui as permissões <strong>ads_management</strong> e <strong>ads_read</strong>.
             </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400">
              <Lock size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Segurança de Dados</h3>
          </div>
          
          <div className="space-y-4 flex-1">
            {[
              "Criptografia de ponta a ponta (AES-256)",
              "Conexão direta com a API do Meta",
              "Não armazenamos suas senhas",
              "Logs de auditoria de campanhas"
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <CheckCircle2 size={16} className="text-green-500" /> {item}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <a 
              href="https://developers.facebook.com/docs/marketing-apis/" 
              target="_blank" 
              className="flex items-center justify-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              Documentação Meta API <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
