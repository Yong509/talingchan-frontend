import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Button } from "@mui/material";
import { Bar } from "react-chartjs-2";


interface ReportChartProp {
  heading ?:string
  sub_heading ?: string
  label : Array<string>
  dataset : Array<number>
}


const ProductChart: React.FC<ReportChartProp> = (prop : ReportChartProp) => {
  Chart.register(CategoryScale, LinearScale, BarElement);
  const labels =  prop.label
  const data = {
    labels: labels,
    datasets: [
      {
        label: "dataset",

        data: prop.dataset,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          // "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          // "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="add-body">
        <div className="text-body">
            <h1 className="add-heading">{prop.heading}</h1>
            <h1 className="add-subheading">{prop.sub_heading}</h1>
        </div>
        <div className="chart">
          <Bar
            data={data}
            options={{
              maintainAspectRatio: true,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProductChart;
