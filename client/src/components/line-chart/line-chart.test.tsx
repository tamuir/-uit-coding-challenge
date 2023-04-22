import React from 'react';
import { render } from '@testing-library/react';
import { Chart } from './index';

describe('Chart component', () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'red'
            }
        ]
    };

    it('should render without errors', () => {
        render(<Chart data={data} />);
    });

});
