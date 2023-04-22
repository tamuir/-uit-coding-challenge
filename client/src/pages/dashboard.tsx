import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Chart } from '../components/line-chart';
import { InfoBlock, StockData } from '../components/info-block';

export interface DashboardData {
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

const Dashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData>({ labels: [], datasets: [] });
    const [stockData, setStockData] = useState<StockData | null>(null);
    const [queryString, setQueryString] = useState<string>('');

    const getParam = () => {
        const fullUrl = window.location.href;
        const param = fullUrl.substring(fullUrl.lastIndexOf('/') + 1);
        return param;
    };

    useEffect(() => {
        setQueryString(getParam());

        const fetchData = async () => {

            const response: AxiosResponse = await axios.get(`http://localhost:3000/api/data/${queryString}`);

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

        queryString && fetchData();
    }, [queryString]);

    return (
        queryString ? (
            <div className="flex flex-col pt-10 w-full md:h-screen bg-purple-200 justify-center text-center">
                <InfoBlock stockData={stockData} />
                <Chart data={data} />
            </div>
        ) : (
            <div className="flex flex-col pt-10 w-full md:h-screen bg-purple-200 justify-center text-center">
                <p>Ouch! no symbol information was found.</p>
                <p>usage: {window.location.href}<strong>googl</strong></p>
            </div>
        )

    );
};

export default Dashboard;
