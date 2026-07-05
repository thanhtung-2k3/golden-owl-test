import Chart from "react-apexcharts";

import { ApexOptions } from "apexcharts";

import { SubjectReport } from "../../types/report.response";

interface Props {
  subject: SubjectReport;
}

export default function ScoreLevelChart({
  subject,
}: Props) {

  const options: ApexOptions = {

    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      fontFamily: "Outfit, sans-serif",
    },

    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
      },
    },

    xaxis: {
      categories: [
        ">= 8",
        "6 - <8",
        "4 - <6",
        "< 4",
      ],
    },

    colors: [
      "#465FFF",
    ],

    dataLabels: {
      enabled: true,
    },

  };

  const series = [
    {
      name: "Students",
      data: [
        subject.stats.level1,
        subject.stats.level2,
        subject.stats.level3,
        subject.stats.level4,
      ],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

      <h3 className="mb-5 text-lg font-semibold">
        {subject.name}
      </h3>

      <Chart
        options={options}
        series={series}
        type="bar"
        height={380}
      />

    </div>
  );
}