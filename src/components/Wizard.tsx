import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Globe, 
  Target, 
  Layout, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  Sparkles,
  Rocket,
  Link as LinkIcon
} from 'lucide-react';
import { ProductInfo, AdCopy, SalesPageContent, CampaignLanguage, BonusContent } from '../types';
import { AIService } from '../services/aiService';

export function Wizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<ProductInfo>({
    name: '',
    url: '',
    niche: '',
    language: 'pt-BR',
    targetAudience: ''
  });
  const [includeBonus, setIncludeBonus] = useState(true);
  const [copy, setCopy] = useState<AdCopy | null>(null);
  const [salesPage, setSalesPage] = useState<SalesPageContent | null>(null);
  const [bonuses, setBonuses] = useState<BonusContent[]>([]);
  const [budget, setBudget] = useState<number>(0);

  const totalSteps = 4;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const [generatedCopy, generatedSales, suggestedBudget, generatedBonuses] = await Promise.all([
        AIService.generateCopy(info),
        AIService.generateSalesPage(info),
        AIService.suggestBudget(info),
        AIService.generateBonuses(info)
      ]);
      setCopy(generatedCopy);
      setSalesPage(generatedSales);
      setBudget(suggestedBudget);
      setBonuses(generatedBonuses);
      nextStep();
    } finally {
      setLoading(false);
    }
  };

  const publishCampaign = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Progress Header */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Novo Lançamento Automático</h2>
          <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 uppercase tracking-wider">Passo {step} de {totalSteps}</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-indigo-600' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Target className="text-indigo-500" /> Sobre o seu Produto
              </h3>
              <p className="text-slate-500">Forneça os detalhes básicos para nossa IA começar o trabalho.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nome do Produto</label>
                <input
                  type="text"
                  placeholder="Ex: Fórmula de Emagrecimento 2.0"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  value={info.name}
                  onChange={e => setInfo({ ...info, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Link do Produto (Afiliado ou Site)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="https://suapagina.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    value={info.url}
                    onChange={e => setInfo({ ...info, url: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nicho / Categoria</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none"
                  value={info.niche}
                  onChange={e => setInfo({ ...info, niche: e.target.value })}
                >
                  <option value="">Selecione um nicho...</option>
                  <option value="saude">Saúde & Bem-estar</option>
                  <option value="marketing">Marketing Digital</option>
                  <option value="financas">Finanças & Investimentos</option>
                  <option value="idiomas">Aprendizado de Idiomas</option>
                  <option value="pets">Pets & Animais</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Idioma da Campanha</label>
                <div className="flex gap-3">
                  {(['pt-BR', 'en-US', 'es-ES'] as CampaignLanguage[]).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setInfo({ ...info, language: lang })}
                      className={`flex-1 py-3 rounded-xl border transition-all font-medium ${
                        info.language === lang 
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700 ring-2 ring-indigo-500' 
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {lang === 'pt-BR' && 'Português'}
                      {lang === 'en-US' && 'English'}
                      {lang === 'es-ES' && 'Español'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
              <input 
                type="checkbox" 
                id="bonus"
                checked={includeBonus}
                onChange={e => setIncludeBonus(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded"
              />
              <label htmlFor="bonus" className="text-sm font-bold text-slate-700 cursor-pointer">Gerar Bônus de Alta Conversão (VSL, E-mails, Criativos Extras)</label>
            </div>

            <div className="flex justify-end pt-4">
              <button
                disabled={!info.name || !info.niche || loading}
                onClick={handleGenerate}
                className="group flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-indigo-500/20 active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="group-hover:rotate-12 transition-transform" />}
                {loading ? 'Gerando Ativos de Conversão...' : 'Gerar Campanha com IA'}
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && copy && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ad Preview Mock */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="text-indigo-500" /> Pré-visualização do Anúncio (Meta)
                </h3>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Seu Perfil de Anúncios</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">Patrocinado · <Globe size={10} /></div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 space-y-2">
                    <p className="text-sm text-slate-800 line-clamp-3">{copy.primaryText}</p>
                    <div className="aspect-[1.91/1] bg-slate-100 rounded-lg flex items-center justify-center border border-slate-100 group relative overflow-hidden">
                       <img 
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                        alt="Creative Preview" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm border border-slate-100">Criativo IA #1</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="space-y-1">
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{info.url.replace('https://', '')}</div>
                        <div className="text-sm font-bold text-slate-900">{copy.headline}</div>
                        <div className="text-xs text-slate-600">{copy.description}</div>
                      </div>
                      <button className="bg-slate-200 px-3 py-1.5 rounded-md text-xs font-bold text-slate-800 uppercase tracking-wide">
                        {copy.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sales Page Preview Mock */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layout className="text-indigo-500" /> Estrutura da Página de Vendas
                </h3>
                <div className="bg-slate-50 border border-indigo-100 p-6 rounded-2xl space-y-4 max-h-[500px] overflow-y-auto">
                   <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-widest">Página de Alta Conversão Gerada</div>
                   <h4 className="text-xl font-black text-slate-900 leading-tight italic uppercase">{salesPage?.headline}</h4>
                   <p className="text-slate-600 font-medium">{salesPage?.subheadline}</p>
                   <div className="space-y-2 py-4">
                      {salesPage?.benefits.map((benefit, i) => (
                        <div key={i} className="flex gap-2 text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                          {benefit}
                        </div>
                      ))}
                   </div>
                   <div className="p-4 bg-indigo-600 rounded-2xl text-center shadow-lg shadow-indigo-500/20">
                      <div className="text-indigo-100 text-xs font-bold uppercase mb-1">Oferta Irrecusável</div>
                      <div className="text-2xl font-black text-white">{salesPage?.offer}</div>
                   </div>

                   {salesPage?.socialProof && (
                     <div className="space-y-2 pt-2">
                       <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Depoimentos</h5>
                       {salesPage.socialProof.map((proof, i) => (
                         <div key={i} className="text-xs text-slate-600 bg-white/50 p-2 rounded-lg border border-slate-100 italic">
                           {proof}
                         </div>
                       ))}
                     </div>
                   )}
                   <div className="pt-4 border-t border-slate-200">
                      <button 
                        onClick={() => {
                          const content = `HEADLINE: ${salesPage?.headline}\nSUBHEADLINE: ${salesPage?.subheadline}\nBENEFICIOS: ${salesPage?.benefits.join(', ')}\nOFERTA: ${salesPage?.offer}`;
                          navigator.clipboard.writeText(content);
                          alert('Estrutura da Página de Vendas copiada!');
                        }}
                        className="w-full py-2 bg-white border border-indigo-200 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
                      >
                        <Layout size={14} /> Copiar Estrutura da Página
                      </button>
                   </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-8 border-t border-slate-100">
              <button 
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft size={20} /> Voltar e Editar
              </button>
              <button 
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/10 active:scale-95"
              >
                Avançar para Orçamento <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 bg-white p-10 rounded-3xl border border-slate-200 shadow-xl"
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-3xl font-black text-slate-900">Sugestão de Orçamento IA</h3>
              <p className="text-slate-500 max-w-md mx-auto">Analisamos o nicho <span className="font-bold text-indigo-600 uppercase">"{info.niche}"</span> e o público-alvo para recomendar o melhor ROI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
               {[
                 { label: 'Econômico', value: budget * 0.7, color: 'slate' },
                 { label: 'Recomendado', value: budget, color: 'indigo', active: true },
                 { label: 'Agressivo', value: budget * 1.5, color: 'slate' }
               ].map((opt) => (
                 <button 
                  key={opt.label}
                  onClick={() => setBudget(opt.value)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left group ${
                    opt.active || budget === opt.value
                      ? 'border-indigo-500 bg-indigo-50/50 ring-4 ring-indigo-500/10' 
                      : 'border-slate-100 bg-white hover:border-slate-300'
                  }`}
                 >
                   <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${opt.active || budget === opt.value ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {opt.label}
                   </div>
                   <div className="text-2xl font-black text-slate-900">
                    R$ {opt.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    <span className="text-xs font-normal text-slate-500 ml-1">/dia</span>
                   </div>
                   <div className="mt-4 flex flex-col gap-2">
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-indigo-500 transition-all duration-1000`} style={{ width: opt.label === 'Econômico' ? '30%' : opt.label === 'Recomendado' ? '65%' : '100%' }} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">Estimativa de Alcance: {(opt.value * 120).toLocaleString()} pessoas</span>
                   </div>
                 </button>
               ))}
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
               <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <Zap className="text-yellow-500" size={16} /> {includeBonus ? 'Bônus Exclusivos Gerados' : 'Bônus Padrão'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {includeBonus && bonuses.length > 0 ? (
                   bonuses.map((bonus, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase">Grátis</div>
                      <div className="text-sm font-bold text-slate-900 mb-1">{bonus.title}</div>
                      <div className="text-[10px] text-slate-500 mb-2 line-clamp-2">{bonus.description}</div>
                      <div className="text-[10px] font-bold text-indigo-600 line-through opacity-50">Valor: {bonus.value}</div>
                    </div>
                  ))
                 ) : (
                   <div className="col-span-3 text-center py-4 text-slate-400 text-sm font-medium italic">
                     Nenhum bônus adicional selecionado.
                   </div>
                 )}
               </div>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={prevStep} className="font-semibold text-slate-600">Voltar</button>
              <button 
                onClick={nextStep}
                className="flex items-center gap-2 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
              >
                Revisar e Publicar
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-slate-900">Tudo Pronto! 🚀</h3>
                  <p className="text-slate-500">Sua campanha foi configurada com sucesso e está pronta para rodar.</p>
                </div>
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-sm border border-green-200">
                  Pronto para Ativar
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Produto</div>
                  <div className="text-lg font-bold text-slate-900">{info.name}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Orçamento Diário</div>
                  <div className="text-lg font-bold text-slate-900">R$ {budget.toLocaleString('pt-BR')}</div>
                </div>
              </div>

              <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Conta de Anúncios Integrada</div>
                    <div className="text-sm text-indigo-600 font-medium">Conta Business Manager #99281-X</div>
                  </div>
                </div>
                <div className="text-green-600 flex items-center gap-1 font-bold text-sm">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Conectado
                </div>
              </div>

              <button 
                onClick={publishCampaign}
                disabled={loading}
                className="w-full group flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-2xl font-black text-xl hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-2xl shadow-indigo-500/30 active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Zap className="fill-current" />}
                {loading ? 'PUBLICANDO NO META ADS...' : `PUBLICAR CAMPANHA: ${info.name.toUpperCase()}`}
              </button>

              <p className="text-center text-xs text-slate-400 font-medium">
                Ao clicar em publicar, você autoriza a criação da campanha no seu gerenciador de anúncios do Facebook/Instagram.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
