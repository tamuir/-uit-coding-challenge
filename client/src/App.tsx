import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import numeral from 'numeral';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';


// Register the category scale with Chart.js
ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Data {
  labels: string[];
  datasets: {
    label: string;
    data: any[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointHoverBackgroundColor: string;
    pointHoverBorderColor: string;
  }[];
}

interface StockData {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  MarketCapitalization: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  BookValue: string;
}



const App: React.FC = () => {
  const [data, setData] = useState<Data>({ labels: [], datasets: [] });
  const [stockData, setStockData] = useState<StockData | null>(null);

  const url = window.location.href;
  const param = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    const fetchData = async () => {
      const response: AxiosResponse = await axios.get(`http://localhost:3000/api/data/${param}`);

      const dailyData = response.data.prices;
      const metaData = response.data.metaData;

      const dates = dailyData.map(d => d.x);

      setStockData(metaData);

      setData({
        labels: dates.reverse(),
        datasets: [
          {
            label: `${metaData?.Symbol}`,
            data: dailyData,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',

          },
        ],
      });


    };
    fetchData();
  }, []);


  return (

    <div className="flex flex-col pt-10 w-full md:h-screen bg-purple-50 justify-center text-center">
      <h1 className="text-4xl  md:text-9xl font-bold text-gray-900">{stockData?.Symbol}</h1>
      <h2 className=" md:text-2xl font-medium text-gray-500">{stockData?.Name}</h2>
      <div className='mx-auto px-4 lg:px-8 max-w-xl sm:max-w-full'>

        <ul className='sm:flex  items-baseline py-10 font-medium justify-center'>
          <li className='mx-5'>Market Capitalization: <strong>{numeral(stockData?.MarketCapitalization).format('$0,0')}</strong></li>
          <li className='mx-5'>Currency: <strong>{stockData?.Currency}</strong></li>
          <li className='mx-5'>Country: <strong>{stockData?.Country}</strong></li>
          <li className='mx-5'>Sector: <strong>{stockData?.Sector}</strong></li>
          <li className='mx-5'>BookValue: <strong>{stockData?.BookValue}</strong></li>


        </ul>
        <p className="font-regular text-slate-900 lg:max-w-[1200px] mx-auto">{stockData?.Description}</p>
      </div>

      <div className="p-10 mt-auto w-full min-h-[45vh]" >

        <Line data={data} options={{

          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              grid: {
                display: false
              }
            },

            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 12,
                align: 'inner',


              },
              grid: {
                display: false
              },
              type: 'category',

            }
          },
        }} />
      </div>
    </div>

  );
};

export default App;
