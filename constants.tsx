
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
  { id: 'c6', name: 'FedEx', industry: 'Logistics', description: 'Global courier delivery services company.' },
  { id: 'c7', name: 'Amazon', industry: 'Warehousing', description: 'Global e-commerce and cloud computing giant with massive warehousing operations.' }
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
  },
  {
    id: 'w1',
    headline: 'Amazon Accelerates Robotic Integration Across Tier-2 Warehousing Hubs',
    dek: 'Next-gen automation aimed at cutting fulfillment times by 20% in semi-urban distribution centers.',
    body: 'Amazon has announced a phased rollout of its latest Proteus and Sparrow robotic systems across its Tier-2 distribution hubs. The move is designed to optimize inventory density and staff safety in regions previously underserved by high-end automation.\n\nThe deployment is expected to significantly reduce internal lead times and operational overhead, marking a shift toward decentralized robotic fulfillment.',
    timestamp: '5h ago',
    source: 'Seattle Reports',
    impactRating: ImpactRating.MEDIUM,
    signalScore: 82,
    sectors: ['Warehousing', 'Logistics', 'Tech'],
    imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop',
    entities: [{ name: 'Amazon', type: 'COMPANY' }],
    whyItMatters: 'Robotic density in warehouses is the new frontier for e-commerce competitive advantage.',
    analysisTrigger: 'Expanding AI-driven automation into smaller, regional warehousing footprints.',
    analysisImpact: '20% improvement in package handling speeds; lower long-term labor dependence.',
    analysisAudience: 'E-commerce logistics managers, warehouse operators, and robotics investors.'
  },
  {
    id: 'ch1',
    headline: 'BASF Declares Force Majeure at Ludwigshafen Following Precursor Shortage',
    dek: 'Disruption in ammonia supply chain triggers production stoppage at global chemical flagship.',
    body: 'BASF has issued a notice of force majeure regarding several key performance chemicals. The disruption stems from an upstream supply failure in the ammonia precursor chain. Management expects the stoppage to impact global automotive and agricultural chemical supply for at least 30 days.',
    timestamp: '7h ago',
    source: 'Frankfurt Intel',
    impactRating: ImpactRating.HIGH,
    signalScore: 89,
    sectors: ['Chemicals', 'Energy'],
    imageUrl: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800&auto=format&fit=crop',
    entities: [{ name: 'BASF', type: 'COMPANY' }, { name: 'Ludwigshafen', type: 'LOCATION' }],
    whyItMatters: 'Chemical precursors are the foundational "hidden" bottleneck for global manufacturing.',
    analysisTrigger: 'Upstream supply chain failure at the world\'s largest integrated chemical site.',
    analysisImpact: 'Price spikes in nitrogen-based fertilizers and polymer additives.',
    analysisAudience: 'Procurement teams in automotive, agriculture, and consumer goods.'
  },
  {
    id: 'cc1',
    headline: 'Global Biopharma Logistics Braces for 15% Surge in Cold Chain Demand',
    dek: 'Approval of new GLP-1 and Alzheimer’s biotherapeutics creates immediate capacity pressure.',
    body: 'The rapid adoption of new biological therapies is outstripping existing -70°C and 2-8°C storage capacity. Logistics providers are rushing to commission specialized cold-hubs in Singapore and Amsterdam to manage the surge in temperature-sensitive international flows.',
    timestamp: '9h ago',
    source: 'Life Sciences Desk',
    impactRating: ImpactRating.MEDIUM,
    signalScore: 78,
    sectors: ['Cold Chain', 'Logistics', 'Pharma'],
    imageUrl: 'https://images.unsplash.com/photo-1582719201913-b73ca0fed3c0?q=80&w=800&auto=format&fit=crop',
    entities: [{ name: 'DHL Express', type: 'COMPANY' }],
    whyItMatters: 'Biologics represent 40% of future pharma value, all requiring non-break cold chains.',
    analysisTrigger: 'Major drug approvals triggering a shift in global specialized freight requirements.',
    analysisImpact: 'Tightening of air-cargo reefer capacity; higher specialty logistics margins.',
    analysisAudience: 'Pharma supply chain leads, air cargo carriers, and clinical trial planners.'
  },
  {
    id: 'en1',
    headline: 'LNG Supply Chains Under Pressure as European Winter Demand Spikes',
    dek: 'Maritime bottlenecks at Panama Canal complicating LNG transits from US Gulf Coast.',
    body: 'Low water levels in the Panama Canal are forcing LNG carriers to choose between long wait times or the 6,000-mile detour via Cape Horn. The congestion is occurring just as European utilities scale up terminal intake for the peak heating season.',
    timestamp: '11h ago',
    source: 'Energy Weekly',
    impactRating: ImpactRating.HIGH,
    signalScore: 85,
    sectors: ['Energy', 'Trade', 'Logistics'],
    imageUrl: 'https://images.unsplash.com/photo-1628173143301-49e0b2ea4ec4?q=80&w=800&auto=format&fit=crop',
    entities: [{ name: 'Panama Canal', type: 'LOCATION' }],
    whyItMatters: 'Energy supply chains are now globalized, making regional weather events an international risk.',
    analysisTrigger: 'Simultaneous climate-driven canal congestion and seasonal demand surge.',
    analysisImpact: 'Volatility in natural gas pricing; higher charter rates for LNG vessels.',
    analysisAudience: 'Utility companies, energy traders, and maritime regulators.'
  }
];

export const MOCK_SUBSCRIBERS: Subscriber[] = [
  { id: '1', name: 'James Wilson', initials: 'JW', company: 'Goldman Sachs', joinedAt: '2h ago' },
  { id: '2', name: 'Elena Rossi', initials: 'ER', company: 'Nestlé SA', joinedAt: '4h ago' },
  { id: '3', name: 'Akira Sato', initials: 'AS', company: 'Toyota Corp', joinedAt: '6h ago' }
];

export const TRENDING_SIGNALS = [
  { id: '1', headline: 'Red Sea Detours: Full Impact Analysis', score: 92, sector: 'Logistics' },
  { id: '2', headline: 'BASF Ludwigshafen Force Majeure', score: 89, sector: 'Chemicals' },
  { id: '3', headline: 'Amazon Warehouse Robotic Push', score: 82, sector: 'Warehousing' },
  { id: '4', headline: 'LNG Supply Chain Bottlenecks', score: 85, sector: 'Energy' }
];
