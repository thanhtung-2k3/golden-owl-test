import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Sparkles, RefreshCw, ListOrdered } from 'lucide-react';
import { TopStudent } from '../type/index.ts';

interface Top10TabProps {
  top10: TopStudent[];
  isLoadingTop10: boolean;
}

export default function Top10Tab({ top10, isLoadingTop10 }: Top10TabProps) {
  return (
    <motion.div
      key="top10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-500" />
            Bảng Vàng Danh Dự: Top 10 Thí Sinh Điểm Cao Nhất Khối A
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Danh sách 10 thí sinh có tổng điểm cao nhất của tổ hợp khối A (Toán, Vật lí, Hóa học).
          </p>
        </div>

        <div className="px-3 py-1.5 bg-amber-50 text-amber-800 rounded-xl border border-amber-100 text-xs font-bold flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
          Tổng khối A tối đa: 30.0 điểm
        </div>
      </div>

      {isLoadingTop10 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center flex flex-col items-center justify-center">
          <RefreshCw className="h-8 w-8 text-amber-500 animate-spin mb-3" />
          <p className="text-sm font-semibold text-slate-600">Đang truy vấn bảng xếp hạng từ DB...</p>
        </div>
      ) : top10.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Table */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-4 text-center w-16">Hạng</th>
                    <th className="py-4 px-4 font-mono">Số báo danh</th>
                    <th className="py-4 px-4 text-center">Toán</th>
                    <th className="py-4 px-4 text-center">Vật lí</th>
                    <th className="py-4 px-4 text-center">Hóa học</th>
                    <th className="py-4 px-4 text-right pr-6">Tổng điểm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium">
                  {top10.map((student, index) => {
                    const isTop3 = index < 3;
                    const medalColors = [
                      'bg-amber-100 text-amber-800 border-amber-200', // Gold
                      'bg-slate-100 text-slate-800 border-slate-200', // Silver
                      'bg-orange-100 text-orange-800 border-orange-200', // Bronze
                    ];

                    return (
                      <tr key={student.sbd} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-4 text-center">
                          {isTop3 ? (
                            <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full border text-xs font-black ${medalColors[index]}`}>
                              {index + 1}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-bold font-mono">{index + 1}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-slate-800">
                          {student.sbd}
                        </td>
                        <td className="py-4 px-4 text-center font-mono text-slate-600">
                          {student.toan.toFixed(1)}
                        </td>
                        <td className="py-4 px-4 text-center font-mono text-slate-600">
                          {student.vat_li.toFixed(1)}
                        </td>
                        <td className="py-4 px-4 text-center font-mono text-slate-600">
                          {student.hoa_hoc.toFixed(1)}
                        </td>
                        <td className="py-4 px-4 text-right pr-6 font-mono font-black text-emerald-600 text-base">
                          {student.total.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Highlights Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Top 1 Callout card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 h-20 w-20 bg-amber-200/10 rounded-full blur-xl -mr-4 -mt-4"></div>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-amber-600" />
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Thủ Khoa Khối A</span>
              </div>
              <div className="font-mono text-2xl font-black text-amber-900 mt-1">
                SBD {top10[0].sbd}
              </div>
              <div className="text-3xl font-black text-amber-700 font-mono mt-1">
                {top10[0].total.toFixed(2)} <span className="text-xs font-medium">điểm</span>
              </div>
              <p className="text-[11px] text-amber-850 mt-2.5 leading-relaxed">
                Thí sinh đạt vị trí cao nhất khối A trong tệp dữ liệu, đạt điểm số: Toán {top10[0].toan.toFixed(1)}, Vật lí {top10[0].vat_li.toFixed(1)}, Hóa học {top10[0].hoa_hoc.toFixed(1)}.
              </p>
            </div>

            {/* Criteria information box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs text-xs text-slate-500 space-y-3">
              <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ListOrdered className="h-4 w-4 text-emerald-600" />
                Quy chế xét duyệt top 10:
              </h4>
              <ul className="space-y-2 list-disc pl-4 text-slate-500 leading-relaxed">
                <li>Thí sinh phải dự thi đầy đủ tổ hợp 3 môn khối A: Toán, Vật lí, Hóa học.</li>
                <li>Tổng điểm được sắp xếp theo thứ tự giảm dần từ cao xuống thấp để lấy ra 10 học sinh xuất sắc nhất.</li>
                <li>Được tính toán tự động bằng Sequelize query, không qua lọc dữ liệu thủ công.</li>
              </ul>
            </div>

          </div>

        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
          Không tìm thấy thông tin thủ khoa trong hệ thống.
        </div>
      )}
    </motion.div>
  );
}
