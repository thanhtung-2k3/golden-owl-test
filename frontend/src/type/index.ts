export interface StudentData {
  sbd: string;
  toan: number | null;
  ngu_van: number | null;
  ngoai_ngu: number | null;
  vat_li: number | null;
  hoa_hoc: number | null;
  sinh_hoc: number | null;
  lich_su: number | null;
  dia_li: number | null;
  gdcd: number | null;
  ma_ngoai_ngu: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface TopStudent {
  sbd: string;
  toan: number;
  vat_li: number;
  hoa_hoc: number;
  total: number;
}

export interface SubjectReport {
  code: string;
  name: string;
  category: string;
  stats: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    total: number;
  };
}

export interface FrontSubject {
  code: string;
  name: string;
  category: 'compulsory' | 'natural_science' | 'social_science';
}

export const FRONT_SUBJECTS: FrontSubject[] = [
  { code: 'toan', name: 'Toán', category: 'compulsory' },
  { code: 'ngu_van', name: 'Ngữ văn', category: 'compulsory' },
  { code: 'ngoai_ngu', name: 'Ngoại ngữ', category: 'compulsory' },
  { code: 'vat_li', name: 'Vật lí', category: 'natural_science' },
  { code: 'hoa_hoc', name: 'Hóa học', category: 'natural_science' },
  { code: 'sinh_hoc', name: 'Sinh học', category: 'natural_science' },
  { code: 'lich_su', name: 'Lịch sử', category: 'social_science' },
  { code: 'dia_li', name: 'Địa lí', category: 'social_science' },
  { code: 'gdcd', name: 'GDCD', category: 'social_science' }
];

export function classifyScore(score: number | null | undefined): 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | 'No Score' {
  if (score === null || score === undefined || isNaN(score)) return 'No Score';
  if (score >= 8.0) return 'Level 1';
  if (score >= 6.0) return 'Level 2';
  if (score >= 4.0) return 'Level 3';
  return 'Level 4';
}

export function getLevelLabel(level: string): string {
  switch (level) {
    case 'Level 1': return '≥ 8.0 điểm';
    case 'Level 2': return '6.0 đến < 8.0 điểm';
    case 'Level 3': return '4.0 đến < 6.0 điểm';
    case 'Level 4': return '< 4.0 điểm';
    default: return 'Không có điểm';
  }
}

export function getLevelColor(level: string): string {
  switch (level) {
    case 'Level 1': return '#10b981'; // green-500
    case 'Level 2': return '#3b82f6'; // blue-500
    case 'Level 3': return '#f59e0b'; // amber-500
    case 'Level 4': return '#ef4444'; // red-500
    default: return '#9ca3af'; // gray-400
  }
}
