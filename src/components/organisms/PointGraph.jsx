import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

export default function PointGraph({ pointHistory }) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const [labels, setLabels] = useState([]);
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    const lastDay = new Date(year, month + 1, 0).getDate();
    const _labels = [];
    const _pointData = [];
    for (let i = 1; i <= lastDay; i++) {
      _labels.push(
        `${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
      );
      _pointData.push(0);
    }
    for (let point of pointHistory) {
      const _date = new Date(point.createdAt);
      if (_date.getFullYear() !== year || _date.getMonth() !== month) {
        continue;
      }
      _pointData[date.getDate() - 1] += point.amount;
    }
    for (let i = 2; i <= lastDay; i++) {
      _pointData[i] += _pointData[i - 1];
    }
    setLabels(_labels);
    setDataSet(_pointData);
  }, [pointHistory]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: '보유 포인트',
        data: dataSet,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.3,
        pointRadius: 0, // 점 크기 0 → 안 보임
        pointHoverRadius: 5, // 마우스 올리면 보임
        hitRadius: 5,
        pointBackgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
        display: true,
        position: 'top',
      },
    },
    animation: {
      duration: 1000, // 1초 동안 애니메이션
      easing: 'easeOutQuart', // 부드러운 곡선
    },
    scales: {
      x: {
        grid: {
          color: '#ffffff43',
        },
        ticks: {
          callback: function (value, index) {
            // 특정 날짜만 축에 표시 (예: 5일 간격)
            const label = this.getLabelForValue(value);
            return label.endsWith('01') ||
              label.endsWith('05') ||
              label.endsWith('10') ||
              label.endsWith('15') ||
              label.endsWith('20') ||
              label.endsWith('25') ||
              label.endsWith('30') ||
              label.endsWith('31')
              ? label
              : '';
          },
          color: '#fff',
        },
      },
      y: {
        grid: {
          color: '#ffffff43',
        },
        ticks: {
          color: '#fff',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="aspect-[16/9] w-full max-w-full min-w-0 rounded-xl bg-[#2c2c2c] p-4 text-[#fff] shadow-sm inset-shadow-sm shadow-[#fff] shadow-white inset-shadow-[#fff]">
      <Line data={data} options={options} />
    </div>
  );
}
