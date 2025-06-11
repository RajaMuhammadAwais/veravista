export interface User {
  name: string;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  image: string;
  progress: number;
  totalSteps: number;
}

export interface VerificationItem {
  id: string;
  title: string;
  status: 'verified' | 'pending' | 'failed';
  timestamp: string;
  confidence?: number;
}

export interface TrendItem {
  id: string;
  title: string;
  growth: number; // percentage growth
  dataPoints: number[]; // for trend visualization
}

export interface KnowledgeGraphUpdate {
  id: string;
  source: string;
  target: string;
  relationship: string;
}

export interface ResearchSuggestion {
  id: string;
  title: string;
  relevance: number; // 0-100
}

export const mockUser: User = {
  name: 'Alex',
  avatar: '/avatars/alex.jpg'
};

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Renewable Energy Adoption',
    image: '/images/solar-panels.jpg',
    progress: 65,
    totalSteps: 100
  },
  {
    id: '2',
    title: 'Urban Development',
    image: '/images/city-skyline.jpg',
    progress: 42,
    totalSteps: 100
  },
  {
    id: '3',
    title: 'AI in Healthcare',
    image: '/images/ai-brain.jpg',
    progress: 28,
    totalSteps: 100
  }
];

export const mockVerificationActivity: VerificationItem[] = [
  {
    id: 'v1',
    title: 'Climate Change Data',
    status: 'verified',
    timestamp: '30 minutes ago',
    confidence: 92
  },
  {
    id: 'v2',
    title: 'Autonomous Vehicles',
    status: 'pending',
    timestamp: '3 hours ago'
  },
  {
    id: 'v3',
    title: 'Machine Learning Models',
    status: 'verified',
    timestamp: '1 day ago',
    confidence: 88
  }
];

export const mockTrends: TrendItem[] = [
  {
    id: 't1',
    title: 'Green Technologies',
    growth: 32,
    dataPoints: [10, 12, 15, 18, 24, 30, 32]
  },
  {
    id: 't2',
    title: 'Smart Cities',
    growth: 28,
    dataPoints: [8, 10, 12, 15, 18, 22, 28]
  },
  {
    id: 't3',
    title: 'AI Applications',
    growth: 45,
    dataPoints: [15, 18, 22, 25, 30, 38, 45]
  },
  {
    id: 't4',
    title: 'Electric Vehicles',
    growth: 38,
    dataPoints: [12, 15, 18, 22, 25, 32, 38]
  }
];

export const mockKnowledgeGraphUpdates: KnowledgeGraphUpdate[] = [
  {
    id: 'kg1',
    source: 'Wind Power',
    target: 'Energy Storage',
    relationship: 'complementary technology'
  },
  {
    id: 'kg2',
    source: 'Telemedicine',
    target: 'Patient Care',
    relationship: 'improves'
  }
];

export const mockResearchSuggestions: ResearchSuggestion[] = [
  {
    id: 'rs1',
    title: 'Digital Economy Impact Analysis',
    relevance: 85
  },
  {
    id: 'rs2',
    title: 'Blockchain in Supply Chain Management',
    relevance: 78
  }
];

export const mockDashboardData = {
  user: mockUser,
  projects: mockProjects,
  verificationActivity: mockVerificationActivity,
  trends: mockTrends,
  knowledgeGraphUpdates: mockKnowledgeGraphUpdates,
  researchSuggestions: mockResearchSuggestions
};

export default mockDashboardData;
