
import React from 'react';
import { Article, Company, Person, Subscriber } from '../types';
import FeedItem from './FeedItem';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Truck, 
  Package, 
  Factory, 
  Landmark, 
  Cpu, 
  Leaf,
  ArrowUpRight,
  Search
} from 'lucide-react';
import { MOCK_SUBSCRIBERS } from '../constants';

export const Section1Subscribe: React.FC = () => (
  <section className="pt-20 pb-20 relative overflow-hidden border-b border-gray-100">
    <div className="max-w-5xl relative z-10">
      <h1 className="text-5xl md:text-[4.5rem] font-serif font-bold tracking-tighter text-gray-900 mb-8 leading-tight">
        <span className="text-blue-700">Driving the Future of Global Supply Chains</span>
      </h1>
      
      <p className="text-2xl md:text-3xl text-gray-600 font-serif leading-tight italic mb-12 max-w-4xl">
        Get the latest news, insights, and expert analysis on logistics, trade, technology, and strategies shaping resilient, sustainable supply chains.
      </p>

      <div className="space-y-10">
        <div className="flex flex-col sm:flex-row gap-0 group max-w-2xl">
          <input 
            type="email" 
            placeholder="Professional email address" 
            className="flex-grow px-6 py-5 bg-white border border-gray-200 border-r-0 outline-none focus:border-blue-600 transition-all text-base font-medium"
          />
          <button className="bg-blue-700 text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg active:scale-95 whitespace-nowrap">
            SUBSCRIBE NOW
          </button>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex -space-x-3 overflow-hidden">
              {MOCK_SUBSCRIBERS.map((sub) => (
                <div key={sub.id} className="inline-block h-10 w-10 rounded-full ring-4 ring-white bg-gray-100 flex items-center justify-center text-[10px] font-bold border border-gray-200 shadow-sm overflow-hidden">
                  <span className="text-gray-600">{sub.initials}</span>
                </div>
              ))}
              <div className="inline-block h-10 w-10 rounded-full ring-4 ring-white bg-blue-50 flex items-center justify-center text-[11px] font-bold text-blue-600 border border-blue-100 shadow-sm">
                +50k
              </div>
           </div>
           <p className="text-[13px] font-medium text-gray-500 uppercase tracking-widest leading-relaxed">
             Join <span className="text-gray-900 font-bold">50k+ decision-makers</span> tracking India’s supply chain signals.
           </p>
        </div>
      </div>
    </div>
    
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/20 to-transparent pointer-events-none -z-10 skew-x-12 transform translate-x-32"></div>
  </section>
);

export const CategoryGrid: React.FC<{ onCategorySelect: (cat: string) => void }> = ({ onCategorySelect }) => {
  const categories = [
    { id: 'Logistics', icon: Truck, label: 'Logistics &', sublabel: 'Transport' },
    { id: 'Procurement', icon: Package, label: 'Procurement', sublabel: '& Sourcing' },
    { id: 'Manufacturing', icon: Factory, label: 'Manufacturing', sublabel: '' },
    { id: 'Policy', icon: Landmark, label: 'Policy & Trade', sublabel: '' },
    { id: 'Technology', icon: Cpu, label: 'Technology', sublabel: '' },
    { id: 'Sustainability', icon: Leaf, label: 'Sustainability', sublabel: '' },
  ];

  return (
    <section className="py-12 border-b border-gray-100 bg-[#fbfbfb]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            className="group flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="mb-6 p-4 rounded-full bg-blue-50/50 group-hover:bg-blue-600 transition-colors duration-300">
              <cat.icon size={32} strokeWidth={1.5} className="text-blue-700 group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="text-center">
              <div className="text-[15px] font-bold text-gray-800 leading-tight group-hover:text-blue-700 transition-colors">{cat.label}</div>
              {cat.sublabel && <div className="text-[15px] font-bold text-gray-800 leading-tight group-hover:text-blue-700 transition-colors">{cat.sublabel}</div>}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export const TrendingAndMostRead: React.FC<{
  articles: Article[];
  onNavigate: (id: string) => void;
}> = ({ articles, onNavigate }) => {
  const trending = articles.slice(0, 5);
  const mostRead = articles.slice(0, 8);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-16">
      <div className="lg:col-span-8">
        <div className="flex flex-col">
          {trending.map((article, idx) => (
            <FeedItem 
              key={article.id} 
              article={article} 
              isLead={idx === 0} 
              onNavigate={onNavigate}
              density="full"
            />
          ))}
        </div>
      </div>
      <div className="lg:col-span-4 lg:pl-12 border-l border-gray-100">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 news-border pb-1 mb-8">
          MOST READ THIS WEEK
        </h3>
        <div className="space-y-8">
          {mostRead.map((article, idx) => (
            <div key={article.id} className="flex gap-4 group cursor-pointer" onClick={() => onNavigate(article.id)}>
              <span className="text-3xl font-serif font-bold text-gray-200 group-hover:text-blue-700 transition-colors leading-none">
                {(idx + 1).toString().padStart(2, '0')}
              </span>
              <div className="flex flex-col pt-1">
                <h4 className="text-[15px] font-bold text-gray-800 leading-snug group-hover:text-blue-800 transition-colors">
                  {article.headline}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">{article.sectors[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ExploreSectors: React.FC<{
  sectors: string[];
  articles: Article[];
  onSectorSelect: (s: string) => void;
  onNavigate: (id: string) => void;
}> = ({ sectors, articles, onSectorSelect, onNavigate }) => {
  const displayedSectors = ['Automotive', 'Logistics', 'Ports', 'Warehousing'];

  return (
    <section className="py-24 border-t border-gray-100 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-700">
            VERTICAL INTELLIGENCE
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-none">
            Sectors in Focus
          </h2>
        </div>
        <button 
          onClick={() => onSectorSelect('All')}
          className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-blue-700 transition-all flex items-center gap-2 group border-b-2 border-transparent hover:border-blue-700 pb-2"
        >
          Browse All Sectors <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-100">
        {displayedSectors.map((sectorName, idx) => {
          const sectorArticles = articles.filter(a => a.sectors.includes(sectorName));
          const hasArticles = sectorArticles.length > 0;
          const leadArticle = hasArticles ? sectorArticles[0] : null;
          // Only show up to 2 secondary stories (total 3 stories per card)
          const subArticles = hasArticles ? sectorArticles.slice(1, 3) : [];
          
          return (
            <div 
              key={sectorName} 
              className={`flex flex-col p-10 bg-white transition-all duration-300 ${idx !== displayedSectors.length - 1 ? 'lg:border-r' : ''} ${idx % 2 === 0 ? 'md:border-r lg:border-r' : ''} border-gray-100`}
            >
              <div className="flex items-center justify-between mb-8 group/header">
                <button 
                  onClick={() => onSectorSelect(sectorName)}
                  className="text-2xl font-serif font-bold text-gray-900 group-hover/header:text-blue-700 transition-colors"
                >
                  {sectorName}
                </button>
                <ArrowUpRight size={16} className="text-gray-200 group-hover/header:text-blue-600 transition-all opacity-0 group-hover/header:opacity-100" />
              </div>
              
              {leadArticle ? (
                <div className="flex flex-col gap-6 flex-grow">
                  <div className="group/lead space-y-4">
                    {leadArticle.imageUrl && (
                      <div 
                        className="aspect-[16/10] w-full bg-gray-100 overflow-hidden cursor-pointer rounded-sm group-hover/lead:shadow-lg transition-all duration-500" 
                        onClick={() => onNavigate(leadArticle.id)}
                      >
                        <img 
                          src={leadArticle.imageUrl} 
                          className="w-full h-full object-cover grayscale group-hover/lead:grayscale-0 transition-all duration-1000 transform group-hover/lead:scale-110" 
                          alt="" 
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <h4 
                        className="text-xl font-serif font-bold leading-[1.2] text-gray-900 group-hover/lead:text-blue-800 transition-colors cursor-pointer"
                        onClick={() => onNavigate(leadArticle.id)}
                      >
                        {leadArticle.headline}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase font-black tracking-widest">
                        <span>{leadArticle.timestamp}</span>
                        <span className="w-1 h-1 bg-blue-100 rounded-full"></span>
                        <span>SCORE: {leadArticle.signalScore}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-5">
                    {subArticles.map(sa => (
                      <div 
                        key={sa.id} 
                        className="group/item cursor-pointer flex items-start gap-3" 
                        onClick={() => onNavigate(sa.id)}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-100 mt-2 flex-shrink-0 group-hover/item:bg-blue-600 transition-all group-hover/item:scale-125"></div>
                        <p className="text-[14px] text-gray-600 font-medium group-hover/item:text-blue-700 leading-snug transition-colors">
                          {sa.headline}
                        </p>
                      </div>
                    ))}
                    
                    <button 
                      onClick={() => onSectorSelect(sectorName)}
                      className="mt-2 text-[11px] font-black uppercase tracking-widest text-blue-600 hover:text-black flex items-center gap-2 transition-colors border-t border-gray-50 pt-4"
                    >
                      View all <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-grow py-12 text-center bg-gray-50/50 rounded-sm border border-dashed border-gray-200">
                  <div className="mb-4 text-blue-200 animate-pulse">
                    <Search size={32} strokeWidth={1} />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                    Monitoring Feed
                  </p>
                  <p className="text-xs text-gray-400 px-4 italic leading-relaxed">
                    Active ingestion for {sectorName} signals in progress...
                  </p>
                  <div className="mt-6 flex gap-1">
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const CompanyCoverageGrid: React.FC<{
  companies: Company[];
  articles: Article[];
  onCompanySelect: (c: string) => void;
  onNavigate: (id: string) => void;
}> = ({ companies, articles, onCompanySelect, onNavigate }) => {
  const activeCompanies = companies.filter(company => 
    articles.some(a => a.entities.some(e => e.name === company.name))
  ).slice(0, 6);

  if (activeCompanies.length === 0) return null;

  return (
    <section className="py-20 border-t border-gray-100 bg-gray-50/30 -mx-8 px-8">
      <div className="flex justify-between items-end mb-12">
        <h3 className="text-3xl font-serif font-bold text-gray-900">
          Recently Covered Companies
        </h3>
        <button 
          onClick={() => onCompanySelect('All')}
          className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black flex items-center gap-1 group"
        >
          All Companies <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16">
        {activeCompanies.map(company => {
          const companyArticles = articles.filter(a => a.entities.some(e => e.name === company.name));
          return (
            <div key={company.id} className="flex flex-col h-full bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div 
                className="flex justify-between items-end mb-6 cursor-pointer group"
                onClick={() => onCompanySelect(company.name)}
              >
                <h4 className="text-2xl font-serif font-bold group-hover:text-blue-800 transition-colors">{company.name}</h4>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{company.industry}</span>
              </div>
              <div className="space-y-6 flex-grow">
                {companyArticles.map((article, i) => (
                  <div key={article.id} className="cursor-pointer group/item" onClick={() => onNavigate(article.id)}>
                    {i === 0 && article.imageUrl && (
                      <div className="aspect-video mb-4 overflow-hidden bg-gray-200">
                        <img 
                          src={article.imageUrl} 
                          alt="" 
                          className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-700" 
                        />
                      </div>
                    )}
                    <h5 className={`font-bold leading-tight group-hover/item:text-blue-700 transition-colors ${i === 0 ? 'text-lg' : 'text-sm text-gray-600'}`}>
                      {article.headline}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const PeopleSlider: React.FC<{
  people: Person[];
  articles: Article[];
  onPersonSelect: (p: string) => void;
  onNavigate: (id: string) => void;
}> = ({ people, articles, onPersonSelect, onNavigate }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 border-y border-gray-100 bg-[#f9f9f9] -mx-8 px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div className="flex items-center gap-8">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] text-gray-600 font-serif whitespace-nowrap">
              PEOPLE IN THE NEWS
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="p-3 bg-white border border-gray-100 hover:border-blue-600 transition-all rounded-full shadow-sm text-gray-400 hover:text-blue-600 active:scale-90"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-3 bg-white border border-gray-100 hover:border-blue-600 transition-all rounded-full shadow-sm text-gray-400 hover:text-blue-600 active:scale-90"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => onPersonSelect('All')}
            className="text-[11px] font-black text-gray-400 hover:text-blue-700 flex items-center gap-3 transition-colors uppercase tracking-[0.2em] group border-b border-transparent hover:border-blue-700 pb-1 self-start md:self-center"
          >
            All People <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory touch-pan-x cursor-grab active:cursor-grabbing"
        >
          {people.map(person => {
            const initials = person.name.split(' ').map(n => n[0]).join('').toUpperCase();
            const relatedArticle = articles.find(a => a.entities.some(e => e.name === person.name || e.name === person.company)) || articles[0];
            
            return (
              <div 
                key={person.id} 
                className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)] snap-start bg-white border border-gray-200 rounded-[2px] shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col relative"
              >
                {/* Accent bar mirroring the design provided */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-orange-100/60"></div>
                
                <div className="p-8 pb-6 flex items-start gap-5">
                  <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100/50 flex items-center justify-center text-xl font-bold text-orange-400 flex-shrink-0 font-serif">
                    {initials}
                  </div>
                  <div className="pt-1">
                    <button 
                      onClick={() => onPersonSelect(person.name)}
                      className="text-2xl font-serif font-bold text-gray-900 hover:text-blue-700 transition-colors block text-left leading-tight mb-1"
                    >
                      {person.name}
                    </button>
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em] font-sans">
                      {person.title}, <span className="text-gray-900">{person.company}</span>
                    </div>
                  </div>
                </div>

                <div className="px-8 pb-10 flex-grow">
                  <div className="pt-6 border-t border-gray-50 flex gap-4 group/item">
                    {relatedArticle.imageUrl && (
                      <div 
                        className="w-24 h-16 bg-gray-100 overflow-hidden rounded-sm flex-shrink-0 cursor-pointer"
                        onClick={() => onNavigate(relatedArticle.id)}
                      >
                        <img 
                          src={relatedArticle.imageUrl} 
                          alt="" 
                          className="w-full h-full object-cover grayscale opacity-80 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-700" 
                        />
                      </div>
                    )}
                    <div className="space-y-1.5 overflow-hidden">
                      <h5 
                        className="text-[14px] font-bold text-gray-700 leading-snug cursor-pointer group-hover/item:text-blue-700 transition-colors line-clamp-2"
                        onClick={() => onNavigate(relatedArticle.id)}
                      >
                        {relatedArticle.headline}
                      </h5>
                      <span className="text-[10px] uppercase font-black tracking-widest text-gray-400 block font-sans">
                        {relatedArticle.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
