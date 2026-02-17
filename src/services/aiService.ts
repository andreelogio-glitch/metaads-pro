import { ProductInfo, AdCopy, SalesPageContent, BonusContent } from "../types";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const COPIES_PT: AdCopy = {
  headline: "🚀 Escala Imediata para o seu Negócio Digital",
  primaryText: "Descubra como nossa solução está transformando o mercado de afiliados e produtores. Resultados reais, estratégia validada. Clique no botão abaixo e comece hoje mesmo a escalar suas vendas com automação e inteligência.",
  description: "Oferta por tempo limitado. Garanta seu acesso agora!",
  cta: "Saiba Mais"
};

const COPIES_EN: AdCopy = {
  headline: "🚀 Immediate Scaling for Your Digital Business",
  primaryText: "Discover how our solution is transforming the affiliate and producer market. Real results, validated strategy. Click the button below and start scaling your sales with automation and intelligence today.",
  description: "Limited time offer. Get your access now!",
  cta: "Learn More"
};

const COPIES_ES: AdCopy = {
  headline: "🚀 Escalamiento Inmediato para su Negocio Digital",
  primaryText: "Descubra cómo nuestra solución está transformando el mercado de afiliados y productores. Resultados reales, estrategia validada. Haga clic en el botón de abajo y comience a escalar sus ventas hoy mismo.",
  description: "Oferta por tiempo limitado. ¡Obtenga su acceso ahora!",
  cta: "Saber Más"
};

// Base templates for generated content are now managed dynamically within AIService methods.

export const AIService = {
  async generateCopy(info: ProductInfo): Promise<AdCopy> {
    await delay(1500); // Simulate API call
    const isEn = info.language === 'en-US';
    const isEs = info.language === 'es-ES';

    if (isEn) return {
      ...COPIES_EN,
      headline: `🔥 Scale ${info.name} Now!`,
      primaryText: `Looking to dominate the ${info.niche} market? Our solution for ${info.name} is exactly what you need. Stop wasting time and start seeing results today.`
    };
    if (isEs) return {
      ...COPIES_ES,
      headline: `🔥 ¡Escala ${info.name} Ahora!`,
      primaryText: `¿Quieres dominar el mercado de ${info.niche}? Nuestra solución para ${info.name} es exactamente lo que necesitas. Deja de perder tiempo y empieza a ver resultados hoy.`
    };
    
    return {
      ...COPIES_PT,
      headline: `🔥 Escala o ${info.name} Agora!`,
      primaryText: `Quer dominar o mercado de ${info.niche}? Nossa solução para ${info.name} é exatamente o que você precisa. Pare de perder tempo e comece a ver resultados hoje.`
    };
  },

  async generateSalesPage(info: ProductInfo): Promise<SalesPageContent> {
    await delay(1200);
    const isEn = info.language === 'en-US';
    const isEs = info.language === 'es-ES';

    const translations = {
      pt: {
        headline: `Como o ${info.name} vai Mudar seu Jogo no nicho de ${info.niche}`,
        subheadline: "A estratégia definitiva para quem busca escala e ROI positivo.",
        benefits: [
          "✅ Método validado com resultados comprovados",
          "✅ Suporte dedicado para sua jornada",
          "✅ Acesso vitalício a todas as atualizações",
          "✅ Bônus exclusivos de lançamento"
        ],
        offer: "Oferta Especial: 12x de R$ 97,00"
      },
      en: {
        headline: `How ${info.name} Will Change Your Game in ${info.niche}`,
        subheadline: "The ultimate strategy for those seeking scale and positive ROI.",
        benefits: [
          "✅ Validated method with proven results",
          "✅ Dedicated support for your journey",
          "✅ Lifetime access to all updates",
          "✅ Exclusive launch bonuses"
        ],
        offer: "Special Offer: Only $497.00"
      },
      es: {
        headline: `Cómo ${info.name} Cambiará Tu Juego en ${info.niche}`,
        subheadline: "La estrategia definitiva para quienes buscan escala y ROI positivo.",
        benefits: [
          "✅ Método validado con resultados probados",
          "✅ Soporte dedicado para tu viaje",
          "✅ Acceso de por vida a todas las actualizaciones",
          "✅ Bonos exclusivos de lanzamiento"
        ],
        offer: "Oferta Especial: Solo €497,00"
      }
    };

    const trans = isEn ? translations.en : (isEs ? translations.es : translations.pt);

    return {
      ...trans,
      socialProof: isEn ? [
        "⭐️⭐️⭐️⭐️⭐️ 'Best investment ever!' - John D.",
        "⭐️⭐️⭐️⭐️⭐️ 'Scaling like never before.' - Sarah M."
      ] : (isEs ? [
        "⭐️⭐️⭐️⭐️⭐️ '¡La mejor inversión!' - Juan D.",
        "⭐️⭐️⭐️⭐️⭐️ 'Escalando como nunca antes.' - Maria M."
      ] : [
        "⭐️⭐️⭐️⭐️⭐️ 'Melhor investimento da vida!' - João D.",
        "⭐️⭐️⭐️⭐️⭐️ 'Escalando como nunca imaginei.' - Maria M."
      ]),
      faq: isEn ? [
        { question: "Is it secure?", answer: "Yes, 100% secure payment and data protection." },
        { question: "How long to see results?", answer: "Most users see results in the first 48 hours." }
      ] : [
        { question: "É seguro?", answer: "Sim, pagamento 100% seguro e proteção de dados." },
        { question: "Quanto tempo para ver resultados?", answer: "A maioria dos usuários vê resultados nas primeiras 48 horas." }
      ]
    };
  },

  async generateBonuses(info: ProductInfo): Promise<BonusContent[]> {
    await delay(1000);
    const isEn = info.language === 'en-US';
    const isEs = info.language === 'es-ES';

    const bonusData = {
      pt: [
        { title: "🎁 Pack de Criativos Premium", description: `10 Templates de Canva para ${info.niche}`, value: "R$ 197" },
        { title: "📚 Guia de Escala Acelerada", description: "Ebook detalhado de tráfego pago", value: "R$ 97" },
        { title: "👥 Comunidade VIP", description: "Networking com grandes players", value: "R$ 497" },
        { title: "🤖 Script de Vendas IA", description: "Scripts prontos para WhatsApp e Direct", value: "R$ 297" },
        { title: "🎨 Checklist de Landing Page", description: "Otimize sua conversão em 10 minutos", value: "R$ 147" }
      ],
      en: [
        { title: "🎁 Premium Ad Templates", description: `10 Canva Templates for ${info.niche}`, value: "$97" },
        { title: "📚 Fast Scaling Guide", description: "Detailed paid traffic ebook", value: "$47" },
        { title: "👥 VIP Community", description: "Networking with high-level players", value: "$197" },
        { title: "🤖 AI Sales Scripts", description: "Ready-to-use WhatsApp & Direct scripts", value: "$147" },
        { title: "🎨 Landing Page Checklist", description: "Optimize your conversion in 10 mins", value: "$67" }
      ],
      es: [
        { title: "🎁 Plantillas de Anuncios Premium", description: `10 Plantillas de Canva para ${info.niche}`, value: "€97" },
        { title: "📚 Guía de Escala Acelerada", description: "Ebook detallado de tráfico pago", value: "€47" },
        { title: "👥 Comunidad VIP", description: "Networking con grandes jugadores", value: "€197" },
        { title: "🤖 Scripts de Ventas IA", description: "Scripts listos para WhatsApp y Direct", value: "€147" },
        { title: "🎨 Checklist de Landing Page", description: "Optimiza tu conversión en 10 min", value: "€67" }
      ]
    };

    return isEn ? bonusData.en : (isEs ? bonusData.es : bonusData.pt);
  },

  async suggestBudget(info: ProductInfo): Promise<number> {
    await delay(800);
    const base = info.niche.length > 5 ? 50 : 25;
    return base + Math.floor(Math.random() * 50);
  }
};
