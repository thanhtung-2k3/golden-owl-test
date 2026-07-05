import { useState } from "react";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import StudentScoreTable from "../../components/tables/StudentScoreTable";
import { getStudentBySbd } from "../../apis/api";
import type { studentScore } from "../../types/studentScoreData.response";

export default function CheckStudentScore() {
  const [searchValue, setSearchValue] = useState("");

  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState<studentScore | null>(null);

  const [error, setError] = useState("");

  const handleSearch = async () => {
    const sbd = searchValue.trim();

    if (!sbd) {
      setError("Vui lòng nhập số báo danh.");
      setStudent(null);
      return;
    }

    if (!/^\d{8}$/.test(sbd)) {
      setError('Số báo danh không hợp lệ. Số báo danh phải gồm đúng 8 chữ số.');
      return;
    }

    setLoading(true);
    setError("");

    const result = await getStudentBySbd(sbd);

    if (result.error) {
      setStudent(null);
      setError(result.error);
    } else {
      setStudent(result.data ?? null);
    }

    setLoading(false);
  };

  return (
    <>
      <PageMeta
        title="Tra cứu điểm"
        description="Tra cứu điểm thí sinh"
      />

      <PageBreadcrumb pageTitle="Tra cứu điểm thi THPT 2024" />

      <div className="space-y-6">

          <div className="flex flex-col gap-4 mb-6 lg:flex-row">

            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Nhập số báo danh..."
              className="flex-1 h-11 rounded-lg border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="h-11 rounded-lg bg-brand-500 px-6 font-medium text-white hover:bg-brand-600 disabled:opacity-50"
            >
              {loading ? "Đang tra cứu..." : "Tra cứu"}
            </button>

          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-600 dark:border-red-800 dark:bg-red-900/20">
              {error}
            </div>
          )}

          {!student && !error && !loading && (
            <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center text-gray-500">
              Nhập số báo danh để xem kết quả.
            </div>
          )}

          {student && (
            <StudentScoreTable student={student} />
          )}
      </div>
    </>
  );
}