import React from 'react';
import { GraduationCap, Clock, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentTime: string;
  isResetting: boolean;
  onResetDatabase: () => void;
}

export default function Header({ currentTime, isResetting, onResetDatabase }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-md shadow-emerald-100 flex items-center justify-center">
            <GraduationCap className="h-6 w-6" id="header-logo-icon" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Cổng Tra Cứu &amp; Phổ Điểm THPT 2024
            </h1>
            <p className="text-xs text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              Thời gian cập nhật: {currentTime || 'Đang nạp...'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetDatabase}
            disabled={isResetting}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer disabled:opacity-50"
            id="btn-re-seed"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isResetting ? 'animate-spin' : ''}`} />
            {isResetting ? 'Đang nạp lại...' : 'Khôi phục dữ liệu gốc'}
          </button>

          <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Đồng bộ Sequelize SQL
          </div>
        </div>

      </div>
    </header>
  );
}
