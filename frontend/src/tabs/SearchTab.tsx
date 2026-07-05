import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Check, 
  AlertCircle, 
  ChevronRight, 
  User, 
  HelpCircle, 
  Sparkles, 
  RefreshCw, 
  BookOpen, 
  Trophy 
} from 'lucide-react';
import { StudentData, FRONT_SUBJECTS, classifyScore, getLevelLabel, getLevelColor } from '../type/index.ts';
import { getStudentBySbd } from '../api/index.ts';

export default function SearchTab() {
  const [searchSbd, setSearchSbd] = useState('');
  const [searchError, setSearchError] = useState('');
  const [searchedStudent, setSearchedStudent] = useState<StudentData | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const allSubjects = FRONT_SUBJECTS;

  const validateSbdString = (sbd: string): boolean => {
    return /^\d{8}$/.test(sbd.trim());
  };

  const handleSearch = async (e?: FormEvent, targetSbd?: string) => {
    if (e) e.preventDefault();
    setSearchError('');
    setSearchedStudent(null);

    const cleanSbd = (targetSbd || searchSbd).trim();
    if (!cleanSbd) {
      setSearchError('Vui lòng nhập số báo danh.');
      return;
    }

    if (!validateSbdString(cleanSbd)) {
      setSearchError('Số báo danh không hợp lệ. Số báo danh phải bao gồm đúng 8 chữ số.');
      return;
    }

    setIsSearching(true);
    try {
      const result = await getStudentBySbd(cleanSbd);
      if (result.data) {
        setSearchedStudent(result.data);
      } else {
        setSearchError(result.error || 'Không tìm thấy kết quả điểm thi.');
      }
    } catch (err) {
      setSearchError('Lỗi kết nối đến máy chủ. Vui lòng kiểm tra lại.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleShortcutClick = (sbd: string) => {
    setSearchSbd(sbd);
    handleSearch(undefined, sbd);
  };

  return (
    <motion.div
      key="search"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      {/* Left Search Input Column */}
      <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Tra cứu nhanh điểm số</h2>
              <p className="text-xs text-slate-500">Tra cứu điểm thi THPT quốc gia bằng số báo danh</p>
            </div>
          </div>

          <form onSubmit={(e) => handleSearch(e)} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Số báo danh thí sinh (SBD)
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  maxLength={8}
                  value={searchSbd}
                  onChange={(e) => setSearchSbd(e.target.value.replace(/\D/g, ''))}
                  placeholder="Nhập 8 chữ số, ví dụ: 01000001"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono text-lg tracking-wider text-slate-800 placeholder:text-slate-400 placeholder:font-sans placeholder:text-sm"
                  id="search-input-sbd"
                />
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="h-5 w-5" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                Nhập SBD 8 chữ số. Một số SBD mẫu có sẵn từ tệp CSV: <span className="font-mono font-bold text-slate-700">01000001</span> đến <span className="font-mono font-bold text-slate-700">01000020</span>.
              </p>
            </div>

            {searchError && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 flex items-start gap-2">
                <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                <span>{searchError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-55 shadow-emerald-100"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Đang tra cứu dữ liệu...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Xem Điểm Thi
                </>
              )}
            </button>
          </form>
        </div>

        {/* Quick SBD shortcuts */}
        <div className="border-t border-slate-100 pt-5 mt-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            Thí sinh mẫu (Từ tệp CSV)
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {['01000001', '01000002', '01000003', '01000004'].map((sbd) => (
              <button
                key={sbd}
                type="button"
                onClick={() => handleShortcutClick(sbd)}
                className="py-2 px-3 bg-slate-50 hover:bg-emerald-50 border border-slate-150 rounded-xl text-xs font-mono text-slate-700 hover:text-emerald-700 text-left transition-all cursor-pointer flex items-center justify-between"
              >
                <span>SBD {sbd}</span>
                <ChevronRight className="h-3 w-3 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Results Display Column */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          {searchedStudent ? (
            <motion.div
              key="result-card"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/5 rounded-full blur-2xl -mr-6 -mt-6"></div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 mb-6 gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    THÔNG TIN THÍ SINH THPT 2024
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 font-mono tracking-tight mt-0.5">
                    SBD: <span className="text-emerald-600">{searchedStudent.sbd}</span>
                  </h3>
                </div>

                <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-xs font-bold flex items-center gap-1.5">
                  <Check className="h-4 w-4" />
                  Đồng bộ SQLite/PostgreSQL
                </div>
              </div>

              {/* Display Score Grid with Dynamic levels based on Client Types */}
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3.5 flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
                Bảng điểm chi tiết các học phần thi
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
                {allSubjects.map((sub) => {
                  const score = searchedStudent[sub.code as keyof StudentData] as number | null;
                  const hasScore = score !== null && score !== undefined;
                  
                  // Determine performance classification level
                  const level = classifyScore(score);
                  const label = getLevelLabel(level);
                  const color = getLevelColor(level);

                  return (
                    <div 
                      key={sub.code} 
                      className={`p-3.5 rounded-xl border transition-all ${
                        hasScore 
                          ? 'bg-white border-slate-200 hover:shadow-xs' 
                          : 'bg-slate-50/50 border-slate-100 opacity-60'
                      }`}
                    >
                      <div className="text-xs text-slate-500 font-bold">{sub.name}</div>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className={`text-xl font-extrabold font-mono ${hasScore ? 'text-slate-900' : 'text-slate-400'}`}>
                          {hasScore ? score.toFixed(2).replace('.00', '') : '—'}
                        </span>
                        {hasScore && (
                          <span 
                            className="h-2.5 w-2.5 rounded-full" 
                            style={{ backgroundColor: color }}
                            title={label}
                          ></span>
                        )}
                      </div>
                      {hasScore && (
                        <div className="text-[10px] font-bold mt-1.5" style={{ color }}>
                          {label}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Foreign Language Details & custom calculations */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-500">Mã ngoại ngữ đăng ký dự thi:</span>
                  <span className="font-mono font-bold text-slate-800 bg-slate-200/60 px-2 py-0.5 rounded-md text-xs">
                    {searchedStudent.ma_ngoai_ngu || 'Không đăng ký ngoại ngữ'}
                  </span>
                </div>

                {/* Compute Group A scores dynamically if all 3 parameters exist */}
                {searchedStudent.toan !== null && searchedStudent.vat_li !== null && searchedStudent.hoa_hoc !== null ? (
                  <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      Tổng điểm tổ hợp xét tuyển khối A:
                    </span>
                    <span className="text-sm font-black font-mono text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-xl">
                      {((searchedStudent.toan || 0) + (searchedStudent.vat_li || 0) + (searchedStudent.hoa_hoc || 0)).toFixed(2)} điểm
                    </span>
                  </div>
                ) : (
                  <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-400 italic flex items-center gap-1.5 leading-relaxed">
                    <HelpCircle className="h-3.5 w-3.5 shrink-0" />
                    Thí sinh này không thi đủ cả 3 môn khối A (Toán, Vật lí, Hóa học) nên hệ thống không tính điểm khối này.
                  </div>
                )}
              </div>

              {/* Footer Info */}
              <div className="mt-4 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>Cơ chế: Client-side Types</span>
                <span>Dữ liệu: REST API &amp; Sequelize</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[350px]"
            >
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-full text-slate-400 mb-4 shadow-inner">
                <Search className="h-10 w-10 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Sẵn Sàng Tra Cứu</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
                Nhập đúng số báo danh gồm 8 chữ số và nhấn nút "Xem Điểm Thi" để hiển thị chi tiết kết quả từng học phần thi.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
