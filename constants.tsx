
import { Article, ImpactRating, Subscriber, Company, Person } from './types';

export const SECTORS = [
  'Automotive',
  'Logistics',
  'Ports',
  'Chemicals',
  'Warehousing',
  'Trade',
  'Cold Chain',
  'Tech',
  'Energy'
];

export const MOCK_COMPANIES: Company[] = [
  { id: 'c1', name: 'Maersk', industry: 'Logistics', description: 'Global leader in container shipping and integrated logistics.' },
  { id: 'c2', name: 'Tata Motors', industry: 'Automotive', description: 'Major Indian multinational automotive manufacturer.' },
  { id: 'c3', name: 'DHL', industry: 'Logistics', description: 'International courier, package delivery and express mail service.' },
  { id: 'c4', name: 'Adani Ports', industry: 'Ports', description: 'India’s largest private multi-port operator.' },
  { id: 'c5', name: 'TSMC', industry: 'Tech', description: 'The world\'s largest dedicated independent semiconductor foundry.' },
  { id: 'c6', name: 'FedEx', industry: 'Logistics', description: 'Global courier delivery services company.' }
];

export const MOCK_PEOPLE: Person[] = [
  { id: 'p1', name: 'Tobias Meyer', title: 'CEO', company: 'DHL Express', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&auto=format&fit=crop' },
  { id: 'p2', name: 'Vincent Clerc', title: 'CEO', company: 'A.P. Moller-Maersk', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop' },
  { id: 'p3', name: 'Gautam Adani', title: 'Chairman', company: 'Adani Group', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop' },
  { id: 'p4', name: 'C.C. Wei', title: 'CEO', company: 'TSMC', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop' },
  { id: 'p5', name: 'Raj Subramaniam', title: 'CEO', company: 'FedEx', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop' },
  { id: 'p6', name: 'Mary Barra', title: 'CEO', company: 'General Motors', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop' }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    headline: 'Maersk Re-routes Major Suez Vessel Amid New Red Sea Volatility',
    dek: 'Shipping giant Maersk confirms three cargo vessels will detour via Cape of Good Hope as regional tensions escalate.',
    body: 'A.P. Moller-Maersk announced today that it is temporarily suspending all transit through the Red Sea due to escalating security risks in the Bab el-Mandeb strait.\n\nThe decision comes after a series of targeted attacks on commercial shipping in the region. Analysts suggest this rerouting will add approximately 10-14 days to transit times between Asia and Northern Europe.',
    timestamp: '12m ago',
    source: 'Copenhagen Bureau',
    impactRating: ImpactRating.HIGH,
    signalScore: 92,
    sectors: ['Logistics', 'Trade', 'Ports'],
    imageUrl: 'https://www.indianchemicalnews.com/public/thumbs/news/2023/08/18437/maersk-truck.jpg',
    entities: [{ name: 'Maersk', type: 'COMPANY' }, { name: 'Suez Canal', type: 'LOCATION' }],
    whyItMatters: 'Redirecting the Suez fleet triggers a massive shift in global container capacity.',
    analysisTrigger: 'Increased security risks in the Bab el-Mandeb strait forcing immediate fleet detours.',
    analysisImpact: 'Add 10-14 days to Asia-Europe transit; sharp rise in container rates.',
    analysisAudience: 'Global logistics directors, European retail planners, and commodity traders.'
  },
  {
    id: '2',
    headline: 'Tata Motors Signals Potential Production Slowdown at Pune Plant',
    dek: 'Microchip shortages originating from a major fab fire in Taiwan are reaching Tier 1 suppliers in India.',
    body: 'Tata Motors has warned shareholders of a potential disruption in its commercial vehicle production. The bottleneck is attributed to a fire at a specialized wafer facility in Hsinchu. While the automaker has alternative sources for legacy chips, advanced management modules remain in critically short supply.',
    timestamp: '2h ago',
    source: 'ET Intelligence',
    impactRating: ImpactRating.MEDIUM,
    signalScore: 74,
    sectors: ['Automotive', 'Tech'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
    entities: [{ name: 'Tata Motors', type: 'COMPANY' }, { name: 'Taiwan', type: 'LOCATION' }],
    whyItMatters: 'Localized semiconductor outages continue to expose the fragility of automotive supply chains.',
    analysisTrigger: 'Major fire at a key wafer fab in Taiwan affecting global power management module supply.',
    analysisImpact: 'Slowdown in EV production lines; potential delivery delays for commercial segments.',
    analysisAudience: 'Automotive OEMs, Tier 1 component suppliers, and regional equity analysts.'
  },
  {
    id: 'a2',
    headline: 'Hyundai Invests $2B in Georgia EV Metaplant to Secure Local Supply',
    dek: 'Expansion aims to mitigate future logistics bottlenecks by co-locating battery assembly.',
    body: 'Hyundai Motor Group is accelerating its US electrification strategy with a $2B investment. The capital will ensure critical battery components are produced within a 50-mile radius of the main vehicle assembly line, dodging maritime freight risks and reducing lead times.',
    timestamp: '4h ago',
    source: 'Atlanta Business Desk',
    impactRating: ImpactRating.MEDIUM,
    signalScore: 68,
    sectors: ['Automotive', 'Manufacturing'],
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop',
    entities: [{ name: 'Hyundai', type: 'COMPANY' }],
    whyItMatters: 'Co-location reduces lead times and inventory carrying costs.',
    analysisTrigger: 'Strategic pivot toward localizing high-value EV component production.',
    analysisImpact: 'Reduced vulnerability to maritime delays; increased local manufacturing jobs.',
    analysisAudience: 'US economic development agencies, EV competitors, and battery manufacturers.'
  }
];

export const MOCK_SUBSCRIBERS: Subscriber[] = [
  { id: '1', name: 'James Wilson', initials: 'JW', company: 'Goldman Sachs', joinedAt: '2h ago' },
  { id: '2', name: 'Elena Rossi', initials: 'ER', company: 'Nestlé SA', joinedAt: '4h ago' },
  { id: '3', name: 'Akira Sato', initials: 'AS', company: 'Toyota Corp', joinedAt: '6h ago' }
];

export const TRENDING_SIGNALS = [
  { id: '1', headline: 'Red Sea Detours: Full Impact Analysis', score: 92, sector: 'Logistics' },
  { id: '2', headline: 'TSMC Arizona Fab Acceleration', score: 88, sector: 'Tech' },
  { id: '3', headline: 'Tata Motors: Chip Supply Bottlenecks', score: 74, sector: 'Automotive' },
  { id: '4', headline: 'Sri Lanka Port Expansion Delays', score: 68, sector: 'Ports' }
];
