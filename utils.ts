
import { ImpactRating } from './types';

export const getImpactColor = (rating: ImpactRating) => {
  switch (rating) {
    case ImpactRating.HIGH: return 'bg-red-50 text-red-700 border-red-200';
    case ImpactRating.MEDIUM: return 'bg-amber-50 text-amber-700 border-amber-200';
    case ImpactRating.LOW: return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export const highlightEntities = (text: string, entities: { name: string; type: string }[]) => {
  let result = text;
  // Simple highlight logic - in a real app, this would use regex and handle overlapping entities
  entities.forEach(entity => {
    const className = entity.type === 'COMPANY' ? 'font-bold' : entity.type === 'PERSON' ? 'font-semibold' : 'italic text-gray-800';
    const regex = new RegExp(`(${entity.name})`, 'gi');
    result = result.replace(regex, `<span class="${className}">$1</span>`);
  });
  return result;
};
