
import React, { useState } from 'react';
import { Search, Menu, X, Home, ChevronDown } from 'lucide-react';

interface NewsMastheadProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavClick: () => void;
  onNavigate: (path: string) => void;
  visible?: boolean;
}

// Define NavItem interface to fix property access errors on union types
interface NavItem {
  label: string;
  id: string;
  special?: boolean;
  highlight?: boolean;
}

const NewsMasthead: React.FC<NewsMastheadProps> = ({ searchQuery, onSearchChange, onNavClick, onNavigate, visible = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const categories: NavItem[] = [
    { label: 'LOGISTICS', id: 'Logistics' },
    { label: 'PROCUREMENT', id: 'Procurement' },
    { label: 'MANUFACTURING', id: 'Manufacturing' },
    { label: 'POLICY', id: 'Policy' },
    { label: 'TECHNOLOGY', id: 'Technology' },
    { label: 'SUSTAINABILITY', id: 'Sustainability' },
  ];

  const visibleItems = categories.slice(0, 3); // Home + these 3 = 4 total upfront
  const moreItems: NavItem[] = [
    ...categories.slice(3),
    { label: 'COMPANIES', id: 'companies', special: true },
    { label: 'PRO', id: 'pro', special: true, highlight: true }
  ];

  return (
    <div 
      className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-[100]"
    >
      <header className="px-4 py-1.5 md:px-8 md:py-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between gap-8">
            {/* ETSupplyChain SVG Logo - Reduced on mobile for 50% height target */}
            <button onClick={onNavClick} className="block transition-transform active:scale-95 shrink-0">
              <img 
                src="https://st.etb2bimg.com/Themes/Release/theme4/images/logos/supplychain-logo-mobile-header.svg?mod=3129" 
                alt="ETSupplyChain" 
                className="w-[110px] md:w-[240px] h-auto object-contain"
              />
            </button>

            {/* Desktop Nav & Search */}
            <div className="hidden md:flex items-center gap-10 flex-grow justify-end">
              <nav className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
                <button 
                  onClick={onNavClick} 
                  className="hover:text-blue-700 transition-colors p-1"
                  aria-label="Home"
                >
                  <Home size={18} strokeWidth={2.5} />
                </button>

                {visibleItems.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => onNavigate(`/sector/${encodeURIComponent(item.id)}`)}
                    className="hover:text-blue-700 transition-colors py-1 border-b-2 border-transparent hover:border-blue-700"
                  >
                    {item.label}
                  </button>
                ))}

                {/* More Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  <button className="flex items-center gap-1 hover:text-blue-700 transition-colors py-1">
                    MORE <ChevronDown size={14} className={`transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isMoreOpen && (
                    <div className="absolute top-full right-0 mt-0 w-56 bg-white border border-gray-100 shadow-xl py-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      {moreItems.map(item => (
                        <button
                          key={item.id}
                          onClick={() => {
                            if (item.id === 'companies') onNavigate('/company/All');
                            else if (item.id === 'pro') window.open('https://supplychain.economictimes.indiatimes.com/pro', '_blank');
                            else onNavigate(`/sector/${encodeURIComponent(item.id)}`);
                            setIsMoreOpen(false);
                          }}
                          className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors text-[10px] font-black tracking-[0.2em] ${item.highlight ? 'text-blue-700' : 'text-gray-600'}`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </nav>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Intelligence search..." 
                  className="pl-9 pr-4 py-2 bg-gray-50 border-transparent focus:border-blue-200 focus:bg-white border text-[10px] w-48 outline-none transition-all rounded-sm uppercase font-bold tracking-widest shadow-inner"
                />
              </div>
            </div>

            {/* Mobile Menu Trigger - Reduced size for compact header */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-1 -mr-1 text-gray-900 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-6 animate-in slide-in-from-top duration-300 overflow-y-auto max-h-[80vh]">
            <nav className="flex flex-col gap-1 text-[13px] font-bold uppercase tracking-[0.2em] text-gray-700">
              <button onClick={() => { onNavClick(); setIsMenuOpen(false); }} className="flex items-center gap-3 py-4 border-b border-gray-50 px-2">
                <Home size={18} /> HOME
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => { onNavigate(`/sector/${encodeURIComponent(cat.id)}`); setIsMenuOpen(false); }} 
                  className="text-left py-4 border-b border-gray-50 px-2"
                >
                  {cat.label}
                </button>
              ))}
              <button onClick={() => { onNavigate('/company/All'); setIsMenuOpen(false); }} className="text-left py-4 border-b border-gray-50 px-2">COMPANIES</button>
              <button className="text-left py-4 text-blue-700 px-2">PRO INTELLIGENCE</button>
              
              <div className="relative mt-6 px-2">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search intelligence..." 
                  className="w-full pl-11 pr-4 py-4 bg-gray-100 border-none text-xs outline-none rounded-sm"
                />
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default NewsMasthead;