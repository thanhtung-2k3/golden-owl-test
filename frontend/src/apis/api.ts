import { StudentData, TopStudent, SubjectReport } from '../types/index.ts';
const API_GET_STUDENT_SCORE_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT || "http://localhost:3000/api";

export async function fetchReports(): Promise<{ data: SubjectReport[]; totalStudents: number; error?: string }> {
  try {
    const res = await fetch(`${API_GET_STUDENT_SCORE_ENDPOINT}/report`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('Error fetching reports:', err);
    return { data: [], totalStudents: 0, error: err.message };
  }
}

export async function fetchTop10GroupA(): Promise<{ data: TopStudent[]; error?: string }> {
  try {
    const res = await fetch(`${API_GET_STUDENT_SCORE_ENDPOINT}/top10-group-a`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('Error fetching top 10 group A:', err);
    return { data: [], error: err.message };
  }
}

export async function getStudentBySbd(sbd: string): Promise<{ data?: StudentData; error?: string }> {
  try {
    const res = await fetch(`${API_GET_STUDENT_SCORE_ENDPOINT}/students/${sbd}`);
    const result = await res.json();
    return result;
  } catch (err: any) {
    console.error(`Error searching student ${sbd}:`, err);
    return { error: 'Lỗi kết nối đến máy chủ. Vui lòng kiểm tra lại.' };
  }
}

