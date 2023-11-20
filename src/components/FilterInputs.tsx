import { useContext } from 'react';
import StarContext from '../context/StarContext';

function FilterInputs() {
  const { filteredByText, setFilteredByText } = useContext(StarContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredByText(event.target.value);
  };
  return (
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
  );
}
export default FilterInputs;
