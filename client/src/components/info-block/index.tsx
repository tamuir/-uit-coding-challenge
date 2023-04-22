import React from 'react';
import numeral from 'numeral';
export interface StockData {
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

interface InfoBlockProps {
    stockData: StockData | null;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ stockData }) => {
    return (
        <div>
            {stockData && (
                <>
                    <h1 className="text-4xl  md:text-9xl font-bold text-purple-900">{stockData?.Symbol}</h1>
                    <h2 className=" md:text-2xl font-medium text-gray-500">{stockData?.Name}</h2>
                    <div className='max-w-xl max-w-full'>

                        <div className='bg-purple-50 shadow-2xl px-6 md:py-5 my-5 flex flex-col items-center text-center mb-10 w-screen relative overflow-hidden'>
                            <h1 className="text-[300px] md:text-[300px] font-bold text-purple-900 opacity-5 absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{stockData?.Symbol}</h1>
                            <ul className='sm:flex  items-baseline py-10 font-medium justify-center'>
                                <li className='mx-5'>Market Capitalization: <strong className='text-purple-[900]'>{numeral(stockData?.MarketCapitalization).format('$0,0.[00]')}</strong></li>
                                <li className='mx-5'>Currency: <strong className='text-purple-900'>{stockData?.Currency}</strong></li>
                                <li className='mx-5'>Country: <strong className='text-purple-900'>{stockData?.Country}</strong></li>
                                <li className='mx-5'>Sector: <strong className='text-purple-900'>{stockData?.Sector}</strong></li>
                                <li className='mx-5'>BookValue: <strong className='text-purple-900'>{numeral(stockData?.BookValue).format('$0,0.[00]')}</strong></li>


                            </ul>
                        </div>
                    </div>
                    <p className="font-regular text-slate-900 lg:max-w-[1200px] mx-auto px-10">{stockData?.Description}</p>
                </>
            )}
        </div>
    );
};
