import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, RefreshCw, Sparkles } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { SubjectReport, FRONT_SUBJECTS } from '../type/index.ts';

interface StatsTabProps {
  reports: SubjectReport[];
  selectedReportSubject: string;
  setSelectedReportSubject: (subject: string) => void;
  isLoadingReports: boolean;
  totalStudents: number;
}

export default function StatsTab({
  reports,
  selectedReportSubject,
  setSelectedReportSubject,
  isLoadingReports,
  totalStudents
}: StatsTabProps) {
  
  const allSubjects = FRONT_SUBJECTS;

  // Extract active subject stats
  const activeReport = reports.find(r => r.code === selectedReportSubject);
  const chartData = activeReport ? [
    { name: 'Giỏi (≥8.0)', value: activeReport.stats.level1, color: '#10b981' },
    { name: 'Khá (6.0 - <8.0)', value: activeReport.stats.level2, color: '#3b82f6' },
    { name: 'Trung bình (4.0 - <6.0)', value: activeReport.stats.level3, color: '#f59e0b' },
    { name: 'Yếu (<4.0)', value: activeReport.stats.level4, color: '#ef4444' }
  ] : [];

  return (
    <motion.div
      key="stats"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Filter Selector Row */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Phổ điểm &amp; Thống kê học phần thi 2024
          </h2>
          <p className="text-xs text-slate-500">Phân tích tỷ lệ thí sinh theo 4 cấp bậc điểm số theo môn thi.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Chọn môn thi:</span>
          <select
            value={selectedReportSubject}
            onChange={(e) => setSelectedReportSubject(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold py-2 px-3.5 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            id="select-subject-chart"
          >
            {allSubjects.map((sub) => (
              <option key={sub.code} value={sub.code}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Layout Grid */}
      {isLoadingReports ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center flex flex-col items-center justify-center">
          <RefreshCw className="h-8 w-8 text-emerald-600 animate-spin mb-3" />
          <p className="text-sm font-semibold text-slate-600">Đang tổng hợp dữ liệu từ cơ sở dữ liệu...</p>
        </div>
      ) : activeReport ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Side: Summary Distribution Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* General metrics */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-blue-500/5 rounded-full blur-xl -mr-4 -mt-4"></div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Thí sinh tham gia môn {activeReport.name}
              </h3>
              <div className="text-3xl font-black text-slate-900 font-mono">
                {activeReport.stats.total} <span className="text-xs font-normal text-slate-500">thí sinh</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                Tổng quy mô tệp dữ liệu: {totalStudents} thí sinh
              </p>
            </div>

            {/* Classified breakdown card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Chi tiết phổ phân chia bậc điểm
              </h3>

              <div className="space-y-3.5">
                {/* Level 1 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-emerald-600 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      Giỏi (≥ 8.0)
                    </span>
                    <span className="font-mono font-bold text-slate-700">
                      {activeReport.stats.level1} ({((activeReport.stats.level1 / activeReport.stats.total) * 100 || 0).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all" 
                      style={{ width: `${(activeReport.stats.level1 / activeReport.stats.total) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Level 2 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-blue-600 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      Khá (6.0 - &lt; 8.0)
                    </span>
                    <span className="font-mono font-bold text-slate-700">
                      {activeReport.stats.level2} ({((activeReport.stats.level2 / activeReport.stats.total) * 100 || 0).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all" 
                      style={{ width: `${(activeReport.stats.level2 / activeReport.stats.total) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Level 3 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-amber-500 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      Trung bình (4.0 - &lt; 6.0)
                    </span>
                    <span className="font-mono font-bold text-slate-700">
                      {activeReport.stats.level3} ({((activeReport.stats.level3 / activeReport.stats.total) * 100 || 0).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-amber-500 h-2 rounded-full transition-all" 
                      style={{ width: `${(activeReport.stats.level3 / activeReport.stats.total) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Level 4 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-red-600 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      Yếu (&lt; 4.0)
                    </span>
                    <span className="font-mono font-bold text-slate-700">
                      {activeReport.stats.level4} ({((activeReport.stats.level4 / activeReport.stats.total) * 100 || 0).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all" 
                      style={{ width: `${(activeReport.stats.level4 / activeReport.stats.total) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Description details */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4.5 text-xs text-emerald-800 leading-relaxed space-y-1.5">
              <div className="font-bold flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                Cơ chế phân cấp và phân tách dữ liệu:
              </div>
              <p>
                Việc phân tách rõ ràng giao diện hiển thị và logic lưu trữ giúp chuẩn hoá các công thức phân chia bậc điểm, tránh phụ thuộc chéo và tối ưu hoá tốc độ tải trang.
              </p>
            </div>

          </div>

          {/* Right Side: Recharts Bar Chart */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                Biểu Đồ Trực Quan Phân Bổ Môn {activeReport.name}
              </h3>
              <p className="text-xs text-slate-500 mb-6">Trực quan hoá phổ điểm học lực theo 4 phân khúc điểm quy định.</p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                    allowDecimals={false}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(241, 245, 249, 0.4)' }}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '12px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                    labelStyle={{ fontWeight: 'bold', fontSize: '12px', color: '#1e293b' }}
                  />
                  <Bar dataKey="value" name="Số lượng thí sinh" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 border-t border-slate-100 pt-4 mt-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-emerald-500"></span>
                <span>Giỏi (≥8.0)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-blue-500"></span>
                <span>Khá (6.0-&lt;8.0)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-amber-500"></span>
                <span>Trung bình (4.0-&lt;6.0)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-red-500"></span>
                <span>Yếu (&lt;4.0)</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
          Không nạp được thông tin phổ điểm thống kê. Vui lòng bấm nạp dữ liệu gốc.
        </div>
      )}
    </motion.div>
  );
}
