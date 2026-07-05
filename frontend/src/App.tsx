import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { 
  Search, 
  TrendingUp, 
  Trophy, 
  PlusCircle
} from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer.tsx';
import SearchTab from './tabs/SearchTab.tsx';
import StatsTab from './tabs/StatsTab.tsx';
import Top10Tab from './tabs/Top10Tab.tsx';
import ManageTab from './tabs/ManageTab.tsx';

import { TopStudent, SubjectReport } from './type/index.ts';
import { fetchReports, fetchTop10GroupA, resetDatabase } from './api/index.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'search' | 'stats' | 'top10' | 'manage'>('search');
  
  // Shared global States
  const [reports, setReports] = useState<SubjectReport[]>([]);
  const [selectedReportSubject, setSelectedReportSubject] = useState<string>('toan');
  const [isLoadingReports, setIsLoadingReports] = useState(false);
  const [totalStudents, setTotalStudents] = useState<number>(0);

  const [top10, setTop10] = useState<TopStudent[]>([]);
  const [isLoadingTop10, setIsLoadingTop10] = useState(false);

  const [isResetting, setIsResetting] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Initial load
  useEffect(() => {
    loadReports();
    loadTop10();
    
    // Display Viet Nam formatted current date & time
    const date = new Date('2026-07-04T05:55:00+07:00');
    setCurrentTime(date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));
  }, []);

  const loadReports = async () => {
    setIsLoadingReports(true);
    const res = await fetchReports();
    if (res) {
      setReports(res.data);
      setTotalStudents(res.totalStudents);
    }
    setIsLoadingReports(false);
  };

  const loadTop10 = async () => {
    setIsLoadingTop10(true);
    const res = await fetchTop10GroupA();
    if (res) {
      setTop10(res.data);
    }
    setIsLoadingTop10(false);
  };

  const handleResetDatabase = async () => {
    if (!confirm('Bạn có chắc chắn muốn khôi phục cơ sở dữ liệu về dữ liệu mẫu từ tệp "diem_thi_thpt_2024.csv" không? Mọi thông tin nhập thêm của bạn sẽ bị xoá.')) {
      return;
    }

    setIsResetting(true);
    const res = await resetDatabase();
    if (res.success) {
      alert('Khôi phục dữ liệu gốc từ CSV thành công!');
      loadReports();
      loadTop10();
    } else {
      alert('Khôi phục thất bại: ' + res.error);
    }
    setIsResetting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900">
      
      {/* Header component */}
      <Header 
        currentTime={currentTime} 
        isResetting={isResetting} 
        onResetDatabase={handleResetDatabase} 
      />

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => setActiveTab('search')}
              className={`py-3.5 px-1.5 border-b-2 font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'search'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-850 hover:border-slate-300'
              }`}
              id="tab-search-score"
            >
              <Search className="h-4.5 w-4.5" />
              Tra Cứu Điểm SBD
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-3.5 px-1.5 border-b-2 font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'stats'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-850 hover:border-slate-300'
              }`}
              id="tab-stats-report"
            >
              <TrendingUp className="h-4.5 w-4.5" />
              Báo Cáo Phổ Điểm (Biểu Đồ)
            </button>
            <button
              onClick={() => setActiveTab('top10')}
              className={`py-3.5 px-1.5 border-b-2 font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'top10'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-850 hover:border-slate-300'
              }`}
              id="tab-top-laureates"
            >
              <Trophy className="h-4.5 w-4.5" />
              Vinh Danh Thủ Khoa Khối A
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`py-3.5 px-1.5 border-b-2 font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'manage'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-850 hover:border-slate-300'
              }`}
              id="tab-add-score"
            >
              <PlusCircle className="h-4.5 w-4.5" />
              Nhập Mới &amp; Sửa Điểm
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          
          {activeTab === 'search' && (
            <SearchTab />
          )}

          {activeTab === 'stats' && (
            <StatsTab 
              reports={reports}
              selectedReportSubject={selectedReportSubject}
              setSelectedReportSubject={setSelectedReportSubject}
              isLoadingReports={isLoadingReports}
              totalStudents={totalStudents}
            />
          )}

          {activeTab === 'top10' && (
            <Top10Tab 
              top10={top10}
              isLoadingTop10={isLoadingTop10}
            />
          )}

          {activeTab === 'manage' && (
            <ManageTab 
              onSaved={() => {
                loadReports();
                loadTop10();
              }}
            />
          )}

        </AnimatePresence>
      </main>

      {/* Footer component */}
      <Footer />

    </div>
  );
}
