import { useEffect, useState } from "react";

import PageMeta from "../../components/common/PageMeta";
import ScoreMetrics from "../../components/ecommerce/ScoreMetrics";
import ScoreLevelChart from "../../components/ecommerce/ScoreLevelChart";

import { fetchReports } from "../../apis/api";

import {
  ReportResponse,
  SubjectReport,
} from "../../types/report.response";

export default function Home() {
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [selectedSubject, setSelectedSubject] =
    useState<SubjectReport | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetchReports();

      setReport(res);

      if (res.data.length > 0) {
        setSelectedSubject(res.data[0]);
      }
    };

    load();
  }, []);

  if (!report || !selectedSubject) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      <PageMeta
        title="Student Report"
        description="Student Report"
      />

      <div className="space-y-6">

        <div className="flex justify-end">

          <select
            className="rounded-lg border border-gray-300 px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
            value={selectedSubject.code}
            onChange={(e) => {
              const subject = report.data.find(
                (x) => x.code === e.target.value
              );

              if (subject) {
                setSelectedSubject(subject);
              }
            }}
          >
            {report.data.map((subject) => (
              <option
                key={subject.code}
                value={subject.code}
              >
                {subject.name}
              </option>
            ))}
          </select>

        </div>

        <ScoreMetrics
          totalStudents={report.totalStudents}
          subject={selectedSubject}
        />

        <ScoreLevelChart
          subject={selectedSubject}
        />

      </div>
    </>
  );
}