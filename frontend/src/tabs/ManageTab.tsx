import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Edit3, AlertCircle, Check, RefreshCw } from 'lucide-react';
import { saveStudent } from '../api/index.ts';
import { FRONT_SUBJECTS } from '../type/index.ts';

interface ManageTabProps {
  onSaved: () => void;
}

export default function ManageTab({ onSaved }: ManageTabProps) {
  const [formSbd, setFormSbd] = useState('');
  const [formScores, setFormScores] = useState<Record<string, string>>({
    toan: '',
    ngu_van: '',
    ngoai_ngu: '',
    vat_li: '',
    hoa_hoc: '',
    sinh_hoc: '',
    lich_su: '',
    dia_li: '',
    gdcd: '',
    ma_ngoai_ngu: 'N1'
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const allSubjects = FRONT_SUBJECTS;

  const validateSbdString = (sbd: string): boolean => {
    return /^\d{8}$/.test(sbd.trim());
  };

  const handleSaveStudent = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const cleanSbd = formSbd.trim();
    if (!cleanSbd) {
      setFormError('Vui lòng nhập số báo danh.');
      return;
    }

    if (!validateSbdString(cleanSbd)) {
      setFormError('Số báo danh không hợp lệ. SBD phải gồm đúng 8 chữ số.');
      return;
    }

    // Prepare JSON payload
    const payload: any = { sbd: cleanSbd, ma_ngoai_ngu: formScores.ma_ngoai_ngu || null };
    const invalidFields: string[] = [];

    allSubjects.forEach(sub => {
      const rawVal = formScores[sub.code];
      if (rawVal === undefined || rawVal === null || rawVal.trim() === '') {
        payload[sub.code] = null;
      } else {
        const num = parseFloat(rawVal);
        if (isNaN(num) || num < 0 || num > 10) {
          invalidFields.push(sub.name);
        } else {
          payload[sub.code] = num;
        }
      }
    });

    if (invalidFields.length > 0) {
      setFormError(`Điểm môn ${invalidFields.join(', ')} không hợp lệ. Điểm số phải từ 0.0 đến 10.0.`);
      return;
    }

    setIsSaving(true);
    try {
      const result = await saveStudent(payload);
      if (result.success) {
        setFormSuccess(result.message || 'Lưu thông tin điểm thi thành công!');
        setFormSbd('');
        // Clear scores
        const cleared: Record<string, string> = {};
        allSubjects.forEach(sub => { cleared[sub.code] = ''; });
        cleared.ma_ngoai_ngu = 'N1';
        setFormScores(cleared);
        
        // Refresh parent stats/top10
        onSaved();
      } else {
        setFormError(result.error || 'Lưu thông tin thất bại.');
      }
    } catch (err) {
      setFormError('Lỗi hệ thống khi lưu thông tin.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      key="manage"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl">
            <Edit3 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Quản lý điểm thi thí sinh</h2>
            <p className="text-xs text-slate-500">Thêm mới hoặc cập nhật điểm thi đã có bằng mã khóa SBD</p>
          </div>
        </div>

        <form onSubmit={handleSaveStudent} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Số báo danh (SBD)</label>
              <input
                type="text"
                maxLength={8}
                value={formSbd}
                onChange={(e) => setFormSbd(e.target.value.replace(/\D/g, ''))}
                placeholder="Nhập 8 chữ số SBD"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                id="manage-input-sbd"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Mã ngoại ngữ</label>
              <input
                type="text"
                maxLength={2}
                value={formScores.ma_ngoai_ngu}
                onChange={(e) => setFormScores({ ...formScores, ma_ngoai_ngu: e.target.value.toUpperCase() })}
                placeholder="Ví dụ: N1"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                id="manage-input-language-code"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-slate-600 uppercase">Điểm số các môn (Tầm điểm: 0.0 - 10.0)</span>
              <span className="text-[10px] text-slate-400 italic">Để trống nếu không tham gia thi môn đó</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {allSubjects.map(sub => (
                <div key={sub.code} className="bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                  <label className="block text-xs font-bold text-slate-500 mb-1 truncate">{sub.name}</label>
                  <input
                    type="text"
                    placeholder="—"
                    value={formScores[sub.code]}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) {
                        setFormScores({ ...formScores, [sub.code]: val });
                      }
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono text-sm font-bold text-slate-800 text-center focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 flex items-start gap-2">
              <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          {formSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-700 flex items-start gap-2">
              <Check className="h-4.5 w-4.5 shrink-0 mt-0.5" />
              <span>{formSuccess}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-3 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-55"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Đang lưu thông tin lên database...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Lưu thông tin điểm
              </>
            )}
          </button>

        </form>

      </div>
    </motion.div>
  );
}
