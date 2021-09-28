import { render, screen } from '@testing-library/react';
import App from './components/App';
import { columns as expectedColumns } from "./components/table"

test('renders learn react link', () => {
  render(<App />);

  expect(screen.getByRole("heading", { level: 3 }).textContent).toEqual("Well-known Inventors")
  expect(screen.getByRole("table")).toBeInTheDocument();

  const foundTableCols = screen.queryAllByRole("columnheader");
  expect(foundTableCols.length).toEqual(4);
  foundTableCols.forEach((col, index) => {
    expect(col.textContent).toEqual(expectedColumns[index].label)
  })
});
