import { Line } from 'react-chartjs-2'; // 'npm i chart.js react-chartjs-2' 설치 필요
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthGraph = (props) => {
  const options = {
    responsive: true,
    display: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <Line options={options} data={props.data} />;
};

export default MonthGraph;
