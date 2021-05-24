import { render, screen } from '@testing-library/react';
import MaskInput from './MaskInput';

test('renders learn react link', () => {
  render(<MaskInput />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
