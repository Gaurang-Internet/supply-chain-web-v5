
import React from 'react';
import { Article } from '../types';
import { highlightEntities } from '../utils';
import { Clock } from 'lucide-react';

interface FeedItemProps {
  article: Article;
  isLead?: boolean;
  onNavigate: (id: string) => void;
  density?: 'full' | 'compact';
}

const FeedItem: React.FC<FeedItemProps> = ({ article, isLead = false, onNavigate, density = 'full' }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(article.id);
  };
  
  const showThumbnail = (isLead || density === 'full') && article.imageUrl;

  return (
    <article className={`group py-8 ${isLead ? 'news-border-heavy' : 'news-border'} relative overflow-hidden`}>
      <div className="flex flex-col md:flex-row gap-8">
        {showThumbnail && article.imageUrl && (
          <div 
            className={`flex-shrink-0 cursor-pointer overflow-hidden bg-gray-100 order-first md:order-last ${isLead ? 'w-full md:w-2/5 aspect-video' : 'w-full md:w-1/3 aspect-video'}`}
            onClick={handleClick}
          >
            <img 
              src={article.imageUrl} 
              alt="" 
              className={`w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105 ${isLead ? '' : 'grayscale group-hover:grayscale-0'}`} 
            />
          </div>
        )}

        <div className="flex flex-col gap-4 flex-grow">
          {/* Headline */}
          <a href={`#/article/${article.id}`} onClick={handleClick} className="block group/link">
            <h2 className={`font-serif font-bold text-gray-900 leading-[1.1] group-hover/link:text-blue-800 transition-colors ${isLead ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>
              {article.headline}
            </h2>
          </a>

          {/* Dek/Snippet */}
          <p className={`text-gray-600 leading-relaxed ${isLead ? 'text-lg md:text-xl line-clamp-3' : 'text-sm md:text-base line-clamp-2'}`} 
             dangerouslySetInnerHTML={{ __html: highlightEntities(article.dek, article.entities) }} />

          {/* Footer info */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex gap-4">
              {article.sectors.map(sector => (
                <span key={sector} className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 cursor-pointer transition-colors">
                  #{sector}
                </span>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
               <Clock size={14} className="flex-shrink-0" />
               <span className="tracking-tighter">{article.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedItem;
