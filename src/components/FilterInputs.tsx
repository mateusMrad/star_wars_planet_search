import { useContext } from 'react';
import StarContext from '../context/StarContext';
import { ResultsType } from '../services/types';
import { sortAction } from '../services/helpers';

function FilterInputs() {
  const INITIAL_COLUMNS = ['rotation_period', 'orbital_period', 'diameter', 'population',
    'surface_water'];
  const { filteredByText, setFilteredByText, filteredByNumber,
    setFilteredByNumber, handleSubmit,
    avaibleColumns, setAvaibleColumns, arrayNumbers,
    setArrayNumbers, ordenation, setOrdenation,
    setPlanetsList, planetsList } = useContext(StarContext);

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

  const handleChangeOrder = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setOrdenation({ ...ordenation, [name]: value });
  };

  const orderClick = (list: ResultsType[]) => {
    const sorted = sortAction(list, ordenation);
    setPlanetsList([...sorted]);
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
      <p>Sort For:</p>
      <select
        data-testid="column-sort"
        name="columnSorted"
        value={ ordenation.columnSorted }
        onChange={ handleChangeOrder }
      >
        {INITIAL_COLUMNS.map((column) => (
          <option
            value={ column }
            key={ column }
          >
            { column }
          </option>
        ))}
      </select>
      <label htmlFor="descending">
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          name="sort"
          value="desc"
          onChange={ handleChangeOrder }
          id="descending"
        />
        Descending
      </label>
      <label htmlFor="ascending">
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          name="sort"
          value="asc"
          onChange={ handleChangeOrder }
          id="ascending"
        />
        Ascending
      </label>
      <button
        data-testid="column-sort-button"
        onClick={ () => orderClick(planetsList) }
      >
        Sort
      </button>
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
