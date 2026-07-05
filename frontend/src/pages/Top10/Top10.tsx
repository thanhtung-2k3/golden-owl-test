import { useEffect, useState } from "react";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Top10GroupATable from "../../components/tables/Top10Table";

import { fetchTop10GroupA } from "../../apis/api";
import { TopStudent } from "../../types/index";

export default function Top10() {
  const [students, setStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const result = await fetchTop10GroupA();

      if (result.error) {
        setError(result.error);
      } else {
        setStudents(result.data);
      }

      setLoading(false);
    };

    load();
  }, []);

  return (
    <>
      <PageMeta
        title="Top 10 khối A"
        description="Top 10 học sinh có tổng điểm khối A cao nhất"
      />

      <PageBreadcrumb pageTitle="Top 10 khối A" />

      <div className="space-y-6">

          {loading && (
            <div className="py-12 text-center text-gray-500">
              Đang tải dữ liệu...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && (
            <Top10GroupATable students={students} />
          )}

      </div>
    </>
  );
}