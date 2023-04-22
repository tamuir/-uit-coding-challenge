import React from 'react';
import { Line } from 'react-chartjs-2';
import { DashboardData } from '../../pages/dashboard';
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
    Filler,
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

interface ChartProps {
    data: DashboardData;
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
    return (
        <div className="p-10 mt-auto w-full min-h-[45vh]" >
            <Line options={{
                responsive: true,
                maintainAspectRatio: false
            }} data={data} />
        </div>);
};
