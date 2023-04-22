import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { InfoBlock, StockData } from './index';
import numeral from 'numeral';

describe('InfoBlock', () => {
  const stockData: StockData = {
    Symbol: 'AAPL',
    AssetType: 'Equity',
    Name: 'Apple Inc.',
    Description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services.',
    MarketCapitalization: '1000000000',
    Exchange: 'NASDAQ',
    Currency: 'USD',
    Country: 'USA',
    Sector: 'Technology',
    Industry: 'Consumer Electronics',
    BookValue: '40',
  };

  it('renders without stock data', () => {
    render(<InfoBlock stockData={null} />);
    expect(screen.queryByText('AAPL')).not.toBeInTheDocument();
  });

  it('renders with stock data', () => {
    render(<InfoBlock stockData={stockData} />);

    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.getByText('Market Capitalization:')).toBeInTheDocument();
    expect(screen.getByText(numeral(stockData.MarketCapitalization).format('$0,0.[00]'))).toBeInTheDocument();
  });
});


