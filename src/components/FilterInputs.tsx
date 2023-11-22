import { useContext } from 'react';
import StarContext from '../context/StarContext';

function FilterInputs() {
  const { filteredByText, setFilteredByText, filteredByNumber,
    setFilteredByNumber, handleSubmit,
    avaibleColumns, setAvaibleColumns, arrayNumbers,
    setArrayNumbers } = useContext(StarContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredByText(event.target.value);
  };

  const handleChangeSelect = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setFilteredByNumber({ ...filteredByNumber, [name]: value });
  };

  const operadores = ['maior que', 'menor que', 'igual a'];

  const inUseColumns = (data: string) => {
    const avaible = avaibleColumns.filter((coluna) => coluna !== data);
    setAvaibleColumns(avaible);
  };

  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { column } = filteredByNumber;
    inUseColumns(column);
    handleSubmit();
  };

  const INITIAL_COLUMNS = ['population', 'orbital_period', 'diameter', 'rotation_period',
    'surface_water'];
  const deleteAllFilters = () => {
    setArrayNumbers([]);
    setAvaibleColumns(INITIAL_COLUMNS);
  };

  const deleteOneFilter = (data: string) => {
    const filterArray = arrayNumbers.filter((columns) => columns.column !== data);
    setArrayNumbers(filterArray);
    const newColumns = INITIAL_COLUMNS.find((column) => column === data);
    setAvaibleColumns([...avaibleColumns, newColumns as string]);
  };
  return (
    <div>
      <label htmlFor="filtet-text">
        Type Here the Planet name:
        <input
          type="text"
          data-testid="name-filter"
          id="filter-text"
          value={ filteredByText }
          onChange={ handleChange }
        />
      </label>
      <form onSubmit={ handleClick }>
        <select
          data-testid="column-filter"
          name="column"
          value={ filteredByNumber.column }
          onChange={ handleChangeSelect }
        >
          {avaibleColumns.map((coluna) => (
            <option key={ coluna } value={ coluna }>{ coluna }</option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ filteredByNumber.comparison }
          onChange={ handleChangeSelect }
        >
          {operadores.map((operador) => (
            <option key={ operador } value={ operador }>{ operador }</option>
          ))}
        </select>

        <input
          type="number"
          data-testid="value-filter"
          name="value"
          value={ filteredByNumber.value }
          onChange={ handleChangeSelect }
        />
        <button data-testid="button-filter" type="submit"> Filter </button>
      </form>
      {arrayNumbers && arrayNumbers.map((list) => (
        <div key={ list.column }>
          <p data-testid="filter">
            { list.column }
            {' '}
            { list.comparison }
            {' '}
            { list.value }
            <button
              onClick={ () => deleteOneFilter(list.column) }
            >
              Delete Filter
            </button>
          </p>
        </div>
      ))}
      <button
        onClick={ deleteAllFilters }
        data-testid="button-remove-filters"
      >
        Delete All Fillters
      </button>
    </div>
  );
}
export default FilterInputs;
