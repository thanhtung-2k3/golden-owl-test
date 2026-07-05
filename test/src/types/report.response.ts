export interface SubjectStats {
  level1: number;
  level2: number;
  level3: number;
  level4: number;
  total: number;
}

export interface SubjectReport {
  code: string;
  name: string;
  stats: SubjectStats;
}

export interface ReportResponse {
  data: SubjectReport[];
  totalStudents: number;
  error?: string;
}