import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import mockdata from '../services/mockdata';
import { vi } from 'vitest'

const mock = {
  ok: true,
  json: async () => mockdata,
} as Response;

describe('testando as funcionalidades', () => {

  test('testando se os inputs estao presentes', () => {
    render(<App />)
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
  });

  test('testando o input de pesquisa por texto', () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mock);
    render(<App />);
    const text = screen.getByTestId('name-filter');
    expect(text).toBeInTheDocument();
    fireEvent.change(text, {target: {value: 'Naboo'}});
    expect(text).toHaveDisplayValue('Naboo')
  });
  test('testando o input de pesquisa por comparacao' , () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mock);
    render(<App />);
    const operador = screen.getByTestId('comparison-filter');
    expect(operador).toBeInTheDocument();
    fireEvent.change(operador, {target: {value: 'menor que'}});
    expect(operador).toHaveDisplayValue('menor que')
  })
})
