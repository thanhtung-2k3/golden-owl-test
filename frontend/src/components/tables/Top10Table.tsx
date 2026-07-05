import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TopStudent } from "../../types/index";

interface Props {
  students: TopStudent[];
}

const renderRank = (rank: number) => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return rank;
  }
};

export default function Top10GroupATable({
  students,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-center"
              >
                Hạng
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-left"
              >
                SBD
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-center"
              >
                Toán
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-center"
              >
                Vật lí
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-center"
              >
                Hóa học
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-center"
              >
                Tổng điểm
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student.sbd}>
                <TableCell className="px-5 py-4 text-center font-semibold">
                  {renderRank(index + 1)}
                </TableCell>
                <TableCell className="px-5 py-4 font-medium">
                  {student.sbd}
                </TableCell>
                <TableCell className="px-5 py-4 text-center">
                  {student.toan.toFixed(2)}
                </TableCell>
                <TableCell className="px-5 py-4 text-center">
                  {student.vat_li.toFixed(2)}
                </TableCell>
                <TableCell className="px-5 py-4 text-center">
                  {student.hoa_hoc.toFixed(2)}
                </TableCell>
                <TableCell className="px-5 py-4 text-center">
                  <span className="rounded-lg bg-brand-50 px-3 py-1 font-semibold text-brand-600 dark:bg-brand-500/10">
                    {student.total.toFixed(2)}
                  </span>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </div>
    </div>
  );
}