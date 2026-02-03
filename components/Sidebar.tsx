
import React from 'react';
import { MOCK_SUBSCRIBERS, TRENDING_SIGNALS, SECTORS } from '../constants';
import { TrendingUp, Users, Filter } from 'lucide-react';

interface SidebarProps {
  onSectorSelect: (sector: string) => void;
  selectedSector: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSectorSelect, selectedSector }) => {
  return (
    <aside className="w-full space-y-12">
      {/* Recent Subscribers Widget */}
      <section>
        <div className="flex items-center justify-between mb-4 news-border pb-1">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 flex items-center gap-2">
            <Users size={14} className="text-gray-400" />
            WHO'S READING TODAY
          </h3>
        </div>
        <div className="space-y-4">
          {MOCK_SUBSCRIBERS.map(sub => (
            <div key={sub.id} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                {sub.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-gray-800 leading-tight">{sub.company}</span>
                <span className="text-[11px] text-gray-400 uppercase tracking-tighter">Verified Reader • {sub.joinedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Signals */}
      <section>
        <div className="flex items-center justify-between mb-4 news-border pb-1">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 flex items-center gap-2">
            <TrendingUp size={14} className="text-gray-400" />
            TRENDING SIGNALS
          </h3>
        </div>
        <div className="space-y-4">
          {TRENDING_SIGNALS.map((signal, idx) => (
            <div key={signal.id} className="flex gap-3 group cursor-pointer">
              <span className="text-2xl font-serif font-bold text-gray-200 group-hover:text-gray-400 transition-colors">
                {(idx + 1).toString().padStart(2, '0')}
              </span>
              <div className="flex flex-col pt-1">
                <h4 className="text-[14px] font-bold text-gray-800 leading-snug group-hover:text-blue-700 transition-colors">
                  {signal.headline}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">{signal.sector}</span>
                  <span className="text-[10px] bg-red-50 text-red-600 px-1 font-bold">SCORE {signal.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sector Filter */}
      <section className="sticky top-8">
        <div className="flex items-center justify-between mb-4 news-border pb-1">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            SECTORS & TOPICS
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {SECTORS.map(sector => (
            <button
              key={sector}
              onClick={() => onSectorSelect(sector)}
              className={`text-[11px] px-3 py-1.5 uppercase font-bold tracking-widest transition-all rounded-sm border ${
                selectedSector === sector 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-900 hover:text-gray-900'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
        <div className="mt-8 p-6 bg-gray-900 text-white rounded-sm">
          <h4 className="text-xl font-serif font-bold mb-2 italic">Intelligence Alert</h4>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Get real-time push notifications for "High Impact" signals across your tracked entities.
          </p>
          <button className="w-full py-2 bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
            Configure Alerts
          </button>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
