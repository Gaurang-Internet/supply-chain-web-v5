
import React from 'react';
import { Article, Company, Person, ImpactRating } from '../types';
import { TrendingUp, ArrowRight, ArrowUpRight, Building2, User } from 'lucide-react';

interface ListingSidebarProps {
  articles: Article[];
  companies: Company[];
  people: Person[];
  onNavigate: (id: string) => void;
  onSectorSelect: (sector: string) => void;
  onCompanySelect: (company: string) => void;
  onPersonSelect: (person: string) => void;
}

const ListingSidebar: React.FC<ListingSidebarProps> = ({ 
  articles, 
  companies, 
  people, 
  onNavigate, 
  onSectorSelect,
  onCompanySelect,
  onPersonSelect
}) => {
  const topStories = articles.slice(0, 5);
  const mostRead = [
    { id: 'm1', headline: 'Red Sea Crisis: Full Impact Assessment', views: '12.4K', trend: 'Rising' },
    { id: 'm2', headline: 'TSMC Arizona: What Went Wrong', views: '8.2K', trend: 'Rising' },
    { id: 'm3', headline: 'Global Shipping Rate Tracker', views: '6.8K', trend: null },
    { id: 'm4', headline: '2024 Supply Chain Risk Map', views: '5.1K', trend: 'Rising' },
    { id: 'm5', headline: 'Semiconductor Shortage Update', views: '4.7K', trend: null },
  ];

  const sectors = ['Auto', 'Logistics', 'Ports', 'Chemicals', 'Warehousing', 'Trade', 'Cold Chain', 'Semiconductors', 'Energy'];

  const SectionHeader = ({ title, onCtaClick, ctaText }: { title: string, onCtaClick?: () => void, ctaText?: string }) => (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4 flex-grow">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 whitespace-nowrap">{title}</h3>
        <div className="h-[1px] w-full bg-gray-100"></div>
      </div>
      {onCtaClick && ctaText && (
        <button 
          onClick={onCtaClick}
          className="text-[10px] font-bold text-blue-600 hover:text-black uppercase tracking-widest whitespace-nowrap transition-colors flex items-center gap-1 shrink-0"
        >
          {ctaText} <ArrowRight size={10} />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-12 py-2">
      {/* Top Stories */}
      <section>
        <SectionHeader title="Top Stories" />
        <div className="space-y-6">
          {topStories.map((story, idx) => (
            <div key={story.id} className="flex gap-4 group cursor-pointer" onClick={() => onNavigate(story.id)}>
              <span className="text-[14px] font-serif font-bold text-gray-300 mt-1">{idx + 1}</span>
              <div className="space-y-1">
                <h4 className="text-[15px] font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                  {story.headline}
                </h4>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black px-1.5 py-0.5 border rounded-sm ${
                    story.impactRating === ImpactRating.HIGH ? 'bg-red-50 text-red-600 border-red-100' : 
                    story.impactRating === ImpactRating.MEDIUM ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                    'bg-blue-50 text-blue-600 border-blue-100'
                  }`}>
                    {story.impactRating}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{story.sectors[0]}</span>
                  <ArrowUpRight size={10} className="text-red-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Most Read */}
      <section>
        <SectionHeader title="Most Read" />
        <div className="space-y-5">
          {mostRead.map((item, idx) => (
            <div key={item.id} className="flex gap-4 group cursor-pointer border-b border-gray-50 pb-4 last:border-0">
              <span className="text-[14px] font-serif font-bold text-gray-300 mt-1">{idx + 1}</span>
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-gray-800 leading-snug group-hover:text-blue-700 transition-colors">
                  {item.headline}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                  <span>{item.views} views</span>
                  {item.trend && <span className="flex items-center gap-1 text-red-500 font-bold uppercase tracking-tighter"><TrendingUp size={10} /> {item.trend}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Sectors */}
      <section>
        <SectionHeader 
          title="Explore Sectors" 
          onCtaClick={() => onSectorSelect('All')} 
          ctaText="View All" 
        />
        <div className="flex flex-wrap gap-2">
          {sectors.map(s => (
            <button 
              key={s} 
              onClick={() => onSectorSelect(s)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[10px] font-bold text-gray-600 rounded-sm transition-colors uppercase tracking-widest border border-transparent hover:border-gray-300"
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Companies Redesign - 2 Column Grid */}
      <section>
        <SectionHeader 
          title="Recently Covered" 
          onCtaClick={() => onCompanySelect('All')} 
          ctaText="View all" 
        />
        <div className="grid grid-cols-2 gap-x-6 gap-y-6">
          {companies.slice(0, 6).map((company) => (
            <div 
              key={company.id} 
              className="group cursor-pointer flex flex-col gap-1 border-l-2 border-transparent hover:border-blue-600 pl-3 transition-all"
              onClick={() => onCompanySelect(company.name)}
            >
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-1">{company.name}</span>
              </div>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest line-clamp-1">{company.industry}</span>
            </div>
          ))}
        </div>
      </section>

      {/* People Redesign - 2 Column Grid */}
      <section>
        <SectionHeader 
          title="People in the news" 
          onCtaClick={() => onPersonSelect('All')} 
          ctaText="View all" 
        />
        <div className="grid grid-cols-2 gap-x-6 gap-y-6">
          {people.slice(0, 6).map((person) => (
            <div 
              key={person.id} 
              className="group cursor-pointer flex flex-col gap-1 border-l-2 border-transparent hover:border-orange-500 pl-3 transition-all"
              onClick={() => onPersonSelect(person.name)}
            >
              <span className="text-[13px] font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-1">{person.name}</span>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest line-clamp-1 leading-tight">{person.company}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ETSupplychain Newsletter */}
      <section className="bg-[#122131] p-8 rounded-[2px] text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 -rotate-45 translate-x-12 -translate-y-12"></div>
        <h3 className="text-xl font-serif font-bold mb-4">ETSupplychain Newsletter</h3>
        <p className="text-[13px] text-gray-300 mb-8 leading-relaxed">
          Stay updated on the key logistics, trade, and technology shifts shaping supply chains.
        </p>
        <div className="space-y-3">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="w-full bg-white text-gray-900 px-4 py-3 text-sm rounded-sm outline-none focus:ring-2 focus:ring-orange-400 transition-all border-none"
          />
          <button className="w-full bg-[#f6a01b] hover:bg-[#e08f15] text-white font-bold py-3 text-[13px] uppercase tracking-widest transition-colors shadow-lg active:scale-95">
            Subscribe Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default ListingSidebar;
