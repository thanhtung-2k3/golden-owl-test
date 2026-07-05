import { GroupIcon, BoxIconLine } from "../../icons";

import { SubjectReport } from "../../types/report.response";

interface Props {
  totalStudents: number;
  subject: SubjectReport;
}

export default function ScoreMetrics({
  totalStudents,
  subject,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800">
          <GroupIcon className="size-6" />
        </div>

        <div className="mt-5">

          <div className="text-gray-500">
            Total Students
          </div>

          <div className="mt-2 text-3xl font-bold">
            {totalStudents.toLocaleString()}
          </div>

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800">
          <BoxIconLine className="size-6" />
        </div>

        <div className="mt-5">

          <div className="text-gray-500">
            {subject.name}
          </div>

          <div className="mt-2 text-3xl font-bold">
            {subject.stats.total.toLocaleString()}
          </div>

        </div>

      </div>

    </div>
  );
}