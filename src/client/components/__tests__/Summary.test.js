import React from 'react';
import { render } from '@testing-library/react';
import {Summary} from '../Summary'
it('should render the Summary information', () => {
  const props = {
    results: {
      correct: 1,
      incorrect: 1,
      total: 2,
      score: 0.5
    }
  }
  const { getByText } = render(<Summary {...props}/>);
  expect(getByText('Final score')).toBeInTheDocument();
  expect(getByText(/50/)).toBeInTheDocument();
});