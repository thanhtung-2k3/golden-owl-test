import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import type { studentScore } from "../../types/studentScoreData.response";

interface Props {
  student: studentScore;
}

interface ScoreRow {
  subject: string;
  score: number | string | null;
}

export default function StudentScoreTable({ student }: Props) {
  const rows: ScoreRow[] = [
    {
      subject: "Toán",
      score: student.toan,
    },
    {
      subject: "Ngữ văn",
      score: student.ngu_van,
    },
    {
      subject: "Ngoại ngữ",
      score: student.ngoai_ngu,
    },
    {
      subject: "Vật lí",
      score: student.vat_li,
    },
    {
      subject: "Hóa học",
      score: student.hoa_hoc,
    },
    {
      subject: "Sinh học",
      score: student.sinh_hoc,
    },
    {
      subject: "Lịch sử",
      score: student.lich_su,
    },
    {
      subject: "Địa lí",
      score: student.dia_li,
    },
    {
      subject: "GDCD",
      score: student.gdcd,
    },
     {
      subject: "Mã ngoại ngữ",
      score: student.ma_ngoai_ngu,
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">

      <div className="border-b border-gray-200 px-6 py-4 dark:border-white/[0.05]">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Kết quả tra cứu
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          SBD: <span className="font-semibold">{student.sbd}</span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>

          <TableHeader>
            <TableRow>

              <TableCell
                isHeader
                className="w-2/3 px-6 py-4 text-left"
              >
                Môn học
              </TableCell>

              <TableCell
                isHeader
                className="px-6 py-4 text-center"
              >
                Điểm
              </TableCell>

            </TableRow>
          </TableHeader>

          <TableBody>

            {rows.map((row) => (
              <TableRow key={row.subject}>

                <TableCell className="px-6 py-4 font-medium">
                  {row.subject}
                </TableCell>

                <TableCell className="px-6 py-4 text-center">

                  {row.score === null ? (
                    <span className="text-gray-400">-</span>
                  ) : (
                    row.score
                  )}

                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>
      </div>
    </div>
  );
}