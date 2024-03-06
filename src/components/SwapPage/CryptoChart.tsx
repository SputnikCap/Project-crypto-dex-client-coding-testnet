// CryptoChart.tsx
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TooltipItem,
  Legend,
  ChartData,
} from "chart.js";
import { useTokenContext } from "../../context/TokenContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface CryptoChartProps {
  selectedTokenId: string;
  timePeriod: string;
}

const CryptoChart: React.FC<CryptoChartProps> = ({
  selectedTokenId,
  timePeriod,
}) => {
  const { tokenData } = useTokenContext();
  const [tokenPriceData, setTokenPriceData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  // Функция для получения исторических данных о цене токена
  // Изменим функцию для получения данных за выбранный период
  const fetchTokenPriceHistory = async (
    tokenId: string,
    timePeriod: string
  ) => {
    let url = "";
    switch (timePeriod) {
      case "24h":
        url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${tokenId}&tsym=USD&limit=24`;
        break;
      case "7d":
        url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${tokenId}&tsym=USD&limit=7`;
        break;
      case "30d":
        url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${tokenId}&tsym=USD&limit=30`;
        break;
      default:
        url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${tokenId}&tsym=USD&limit=6`; // Настройка по умолчанию
    }
    const response = await fetch(url);
    const data = await response.json();
    return data.Data.Data;
  };

  useEffect(() => {
    async function getTokenPrices() {
      try {
        const priceHistory = await fetchTokenPriceHistory(
          selectedTokenId,
          timePeriod
        );
        // Преобразуем данные о цене и временные метки
        const prices = priceHistory.map((entry: any) => entry.close);
        const hours = priceHistory.map((entry: any) =>
          new Date(entry.time * 1000).toLocaleTimeString().slice(0, 5)
        );

        // Обновляем состояние компонента данными о цене и временными метками
        setTokenPriceData(prices);
        setLabels(hours);
      } catch (error) {
        console.error("Ошибка при получении данных о цене токена:", error);
      }
    }

    getTokenPrices();
  }, [selectedTokenId, timePeriod]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: `${selectedTokenId.toUpperCase()} Price`,
        data: tokenPriceData,
        fill: false,
        backgroundColor: "rgb(245,245,245)",
        borderColor: "#22c55e",
        pointRadius: 1, // Скрыть точки на графике
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Скрыть легенду
      },
      title: {
        display: false, // Скрыть заголовок
      },
      tooltip: {
        enabled: true,
        mode: "nearest" as const, // Explicitly define the type as 'nearest'
        intersect: false,
        callbacks: {
          label: function (tooltipItem: TooltipItem<"line">) {
            let label = data.datasets[tooltipItem.datasetIndex].label || "";
            if (label) {
              label += ": ";
            }
            if (tooltipItem.parsed.y !== null) {
              label += `${tooltipItem.parsed.y} USD`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {}, // Пустой объект или специфические настройки
        grid: {
          display: false, // Скрыть линии сетки на оси X
          borderWidth: 0,
        },
      },
      y: {
        position: "right" as const, // Уточняем, что position - это константа с типом 'right'
        ticks: {}, // Пустой объект или специфические настройки
        grid: {
          display: false, // Скрыть линии сетки на оси Y
          borderColor: "transparent", // Скрыть линию оси Y
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Сглаживание линии (0 - для прямых линий, 1 - максимальное сглаживание)
      },
    },
  };

  return (
    <div className="w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default CryptoChart;
