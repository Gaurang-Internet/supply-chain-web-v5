
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import NewsMasthead from './components/NewsMasthead';
import FeedItem from './components/FeedItem';
import ListingSidebar from './components/ListingSidebar';
import {
  Section1Subscribe,
  TrendingAndMostRead,
  ExploreSectors,
  CompanyCoverageGrid,
  PeopleSlider
} from './components/HomeSections';
import { MOCK_ARTICLES, MOCK_COMPANIES, MOCK_PEOPLE, SECTORS } from './constants';
import { Article } from './types';
import { Zap, Layers, Building2, UserCircle, Target, TrendingUp, ChevronDown, ChevronUp, ArrowUpRight, Tag as TagIcon, Sparkles, Clock } from 'lucide-react';
console.log('App.tsx module loading...');

const GEMINI_API_KEY = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ?
  (process.env.API_KEY.includes('PLACEHOLDER') ? '' : process.env.API_KEY) : '';

// Lazy initialization of AI to prevent top-level crashes
let aiInstance: any = null;
const getAI = () => {
  if (!aiInstance && GEMINI_API_KEY) {
    try {
      aiInstance = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    } catch (e) {
      console.error('Failed to initialize AI:', e);
    }
  }
  return aiInstance;
};

type View = 'home' | 'article' | 'sector' | 'company' | 'person';

const App: React.FC = () => {
  console.log('App component rendering...');
  const [activeView, setActiveView] = useState<View>('home');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const snapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/article/')) {
        setActiveId(hash.replace('#/article/', ''));
        setActiveView('article');
      } else if (hash.startsWith('#/sector/')) {
        setActiveId(decodeURIComponent(hash.replace('#/sector/', '')));
        setActiveView('sector');
      } else if (hash.startsWith('#/company/')) {
        setActiveId(decodeURIComponent(hash.replace('#/company/', '')));
        setActiveView('company');
      } else if (hash.startsWith('#/person/')) {
        setActiveId(decodeURIComponent(hash.replace('#/person/', '')));
        setActiveView('person');
      } else {
        setActiveView('home');
        setActiveId(null);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashSync);
    handleHashSync();
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  const generateNewSignal = async (context?: string) => {
    const ai = getAI();
    if (!ai) {
      console.warn('AI not initialized - missing API key');
      return;
    }
    setIsGenerating(true);
    try {
      const prompt = `Generate a high-density supply chain intelligence news story. Topic context: ${context || 'Global Logistics'}. Focus on operational impact. VERY IMPORTANT: The body text MUST be under 60 words total and highly concise. Format as JSON Article.`;
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              dek: { type: Type.STRING },
              body: { type: Type.STRING },
              impactRating: { type: Type.STRING },
              signalScore: { type: Type.INTEGER },
              sectors: { type: Type.ARRAY, items: { type: Type.STRING } },
              entities: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { name: { type: Type.STRING }, type: { type: Type.STRING } }
                }
              },
              whyItMatters: { type: Type.STRING }
            }
          }
        }
      });

      const newArt: Article = {
        ...JSON.parse(response.text),
        id: Math.random().toString(36).substr(2, 9),
        timestamp: 'Just now',
        source: 'AI Intelligence Feed'
      };
      setArticles(prev => [newArt, ...prev]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const HomeView = () => (
    <div className="animate-in fade-in duration-500 max-w-[1400px] mx-auto px-4 md:px-8">
      <Section1Subscribe />
      <TrendingAndMostRead articles={articles} onNavigate={(id) => navigateTo(`/article/${id}`)} />
      <ExploreSectors sectors={SECTORS} articles={articles} onSectorSelect={(s) => navigateTo(`/sector/${encodeURIComponent(s)}`)} onNavigate={(id) => navigateTo(`/article/${id}`)} />
      <CompanyCoverageGrid companies={MOCK_COMPANIES} articles={articles} onCompanySelect={(c) => navigateTo(`/company/${encodeURIComponent(c)}`)} onNavigate={(id) => navigateTo(`/article/${id}`)} />
      <PeopleSlider people={MOCK_PEOPLE} articles={articles} onPersonSelect={(p) => navigateTo(`/person/${encodeURIComponent(p)}`)} onNavigate={(id) => navigateTo(`/article/${id}`)} />
    </div>
  );

  const ListingView = ({ type, id }: { type: View, id: string }) => {
    const title = id;
    const typeCaption = type === 'sector' ? 'SECTOR' : type === 'company' ? 'COMPANY' : 'PERSON';

    const filtered = articles.filter(a => {
      if (type === 'sector') {
        if (id === 'Logistics' || id === 'Logistics &') return a.sectors.includes('Logistics') || a.sectors.includes('Trade');
        return a.sectors.includes(id);
      }
      if (type === 'company' || type === 'person') return a.entities.some(e => e.name === id);
      return false;
    });

    return (
      <div className="animate-in fade-in duration-500 pt-8 pb-20 max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="mb-12 md:mb-16">
          <div className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-700 mb-2">
            {typeCaption}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight leading-[1.1]">
            {title}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            {filtered.length > 0 ? (
              <div className="space-y-2">
                {filtered.map(a => <FeedItem key={a.id} article={a} onNavigate={(id) => navigateTo(`/article/${id}`)} />)}
              </div>
            ) : (
              <div className="py-24 text-center border border-dashed border-gray-200 bg-gray-50/30 rounded-sm">
                <p className="text-gray-400 font-serif italic text-xl mb-8">No specific signals indexed for this entry.</p>
                <button onClick={() => generateNewSignal(id)} disabled={isGenerating} className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-blue-800 disabled:opacity-50 transition-all shadow-lg active:scale-95">
                  {isGenerating ? 'Analyzing Market Data...' : 'Trigger AI Signal Ingestion'}
                </button>
              </div>
            )}
          </div>
          <div className="lg:col-span-4 border-l border-gray-100 pl-0 lg:pl-12">
            <ListingSidebar articles={articles} companies={MOCK_COMPANIES} people={MOCK_PEOPLE} onNavigate={(id) => navigateTo(`/article/${id}`)} onSectorSelect={(s) => navigateTo(`/sector/${encodeURIComponent(s)}`)} onCompanySelect={(c) => navigateTo(`/company/${encodeURIComponent(c)}`)} onPersonSelect={(p) => navigateTo(`/person/${encodeURIComponent(p)}`)} />
          </div>
        </div>
      </div>
    );
  };

  const ArticleView = ({ id }: { id: string }) => {
    const mainArticle = articles.find(a => a.id === id);
    const scrollStack = articles.filter(a => a.id !== id);
    const fullStack = mainArticle ? [mainArticle, ...scrollStack] : scrollStack;

    if (!mainArticle) return <div className="py-20 text-center font-serif italic text-xl text-gray-400">Loading Intelligence...</div>;

    const SingleArticleContent: React.FC<{ article: Article, isFirst?: boolean }> = ({ article, isFirst = false }) => {
      const getDisplayDay = (ts: string) => {
        const lowerTs = ts.toLowerCase();
        if (lowerTs.includes('m') || lowerTs.includes('h') || lowerTs.includes('just now')) return 'today';
        if (lowerTs.includes('1d')) return 'yesterday';
        if (lowerTs.includes('d')) {
          const days = lowerTs.split('d')[0];
          return `${days} days ago`;
        }
        return 'today';
      };

      const analysisContent = [
        article.analysisTrigger,
        article.analysisImpact,
        article.analysisAudience
      ].filter(Boolean).join(' ');

      return (
        <div className={`w-full mobile-snap-section px-4 pt-2 pb-0 md:px-0 md:pt-0 ${!isFirst ? 'md:mt-0' : ''}`}>
          {/* Desktop Separator */}
          {!isFirst && (
            <div className="hidden md:flex items-center gap-4 py-16">
              <div className="h-[1px] flex-grow bg-gray-100"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-300">NEXT</span>
              <div className="h-[1px] flex-grow bg-gray-100"></div>
            </div>
          )}

          <div className="flex flex-col w-full h-full md:h-auto bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-[0_4px_30px_rgba(0,0,0,0.06)] md:shadow-none border border-gray-100 md:border-0 overflow-hidden">
            {/* Scrollable Story Content Area */}
            <div className="flex-grow overflow-y-auto p-4 md:p-0 no-scrollbar">
              <div className="flex flex-col min-h-full">
                <div className="flex-grow space-y-2 md:space-y-8">
                  <h1 className="text-[18px] md:text-[48px] font-serif font-bold text-gray-900 leading-[1.2] md:leading-[1.1] tracking-tight">
                    {article.headline}
                  </h1>

                  {article.imageUrl && (
                    <div className="aspect-video md:aspect-[21/9] w-full overflow-hidden bg-gray-50 border border-gray-100 rounded-sm shadow-sm">
                      <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="prose prose-sm md:prose-lg lg:prose-xl max-w-none text-gray-800 font-serif">
                    {article.body.split('\n\n').map((p, i) => (
                      <p key={i} className="text-[14px] md:text-[22px] leading-snug md:leading-relaxed mb-2 md:mb-4">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* ET Analysis Dedicated Widget */}
                  <div className="mt-1 md:mt-4">
                    <div className="bg-gray-50/50 border border-gray-100 p-3 md:p-6 shadow-[0_1px_5px_rgba(0,0,0,0.02)] md:shadow-[0_2px_10px_rgba(0,0,0,0.03)] rounded-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <img
                          src="https://economictimes.indiatimes.com/icons/etfavicon.ico"
                          alt="ET"
                          className="w-[1rem] md:w-[1.2rem] h-[1rem] md:h-[1.2rem] object-contain flex-shrink-0"
                        />
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] md:text-[12px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-[#ed1c24] leading-none">
                            ANALYSIS
                          </span>
                          <Sparkles size={11} className="text-[#ed1c24]" fill="currentColor" fillOpacity={0.2} />
                        </div>
                      </div>

                      <p className="text-[13px] md:text-[19px] leading-tight md:leading-snug font-serif font-bold text-gray-900 tracking-tight">
                        {analysisContent || article.whyItMatters}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Source and Time Section - Aligned to bottom of card via mt-auto & flex-grow above */}
                <div className="mt-auto py-2 md:py-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 group cursor-pointer hover:text-blue-700 transition-colors text-[9px] md:text-[12px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-400">
                    <span className="text-gray-500">SOURCE:</span>
                    <span className="text-gray-900 border-b border-transparent group-hover:border-blue-700">{article.source}</span>
                    <ArrowUpRight size={10} className="md:size-[12px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <div className="flex items-center gap-1.5 text-[9px] md:text-[12px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-400">
                    <Clock size={10} className="md:size-[12px]" />
                    <span className="text-gray-900">{getDisplayDay(article.timestamp)}</span>
                  </div>
                </div>

                {/* Desktop Tags (Hidden on Mobile) */}
                <div className="hidden md:block mt-6">
                  <div className="flex flex-wrap gap-2.5">
                    {article.sectors.map(s => (
                      <button
                        key={s}
                        onClick={() => navigateTo(`/sector/${encodeURIComponent(s)}`)}
                        className="px-4 py-2 bg-gray-100 text-gray-900 border border-gray-200 text-[11px] font-black uppercase tracking-[0.15em] rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="max-w-[1400px] mx-auto md:px-8 md:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content Column - Snap Container on Mobile */}
          <div ref={snapContainerRef} className="lg:col-span-8 mobile-snap-container md:block">
            <div className="flex flex-col w-full h-full md:h-auto">
              {fullStack.map((art, idx) => (
                <SingleArticleContent key={art.id} article={art} isFirst={idx === 0} />
              ))}
            </div>

            {/* End of Feed Placeholder - Only visible after snapping through list */}
            <div className="hidden md:flex py-24 text-center border-t border-gray-50 flex-col items-center justify-center bg-transparent">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#ed1c24] mb-4"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Loading Subsequent Intelligence</p>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="hidden lg:block lg:col-span-4 border-l border-gray-100 pl-12">
            <ListingSidebar
              articles={articles}
              companies={MOCK_COMPANIES}
              people={MOCK_PEOPLE}
              onNavigate={(id) => navigateTo(`/article/${id}`)}
              onSectorSelect={(s) => navigateTo(`/sector/${encodeURIComponent(s)}`)}
              onCompanySelect={(c) => navigateTo(`/company/${encodeURIComponent(c)}`)}
              onPersonSelect={(p) => navigateTo(`/person/${encodeURIComponent(p)}`)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <NewsMasthead
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavClick={() => navigateTo('/')}
        onNavigate={navigateTo}
      />
      {/* Reduced mobile margin to mt-[44px] for the compact header target */}
      <main className="flex-grow mt-[44px] md:mt-[112px]">
        {activeView === 'home' ? <HomeView /> :
          activeView === 'article' ? <ArticleView id={activeId || ''} /> :
            <ListingView type={activeView} id={activeId || ''} />}
      </main>
      <footer className="hidden md:block bg-gray-950 text-white py-24 px-8 mt-auto border-t border-gray-900">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 text-sm">
          <div className="space-y-6">
            <img
              src="https://st.etb2bimg.com/Themes/Release/theme4/images/logos/supplychain-logo-mobile-header.svg?mod=3129"
              alt="ET"
              className="w-56 h-auto invert brightness-0 opacity-90"
            />
            <p className="text-gray-400 pt-4 leading-relaxed font-medium text-base">Global benchmark for operational risk and high-density supply chain intelligence.</p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">INTELLIGENCE VERTICALS</h4>
            <ul className="space-y-3 text-gray-300 font-medium text-base">
              <li className="hover:text-white cursor-pointer transition-colors">Maritime Logistics</li>
              <li className="hover:text-white cursor-pointer transition-colors">Semiconductor Flow</li>
              <li className="hover:text-white cursor-pointer transition-colors">Auto Components</li>
              <li className="hover:text-white cursor-pointer transition-colors">Trade Policy Monitor</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">TERMINAL SERVICES</h4>
            <ul className="space-y-3 text-gray-300 font-medium text-base">
              <li className="hover:text-white cursor-pointer transition-colors">Live API Access</li>
              <li className="hover:text-white cursor-pointer transition-colors">Custom Port Feeds</li>
              <li className="hover:text-white cursor-pointer transition-colors">Risk Analytics Dashboard</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">EDITORIAL CONTACT</h4>
            <p className="text-gray-400 font-medium text-base">Newsroom: editorial@etsupplychain.com</p>
            <p className="text-gray-400 font-medium text-base">Terminal: pro@etsupplychain.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
