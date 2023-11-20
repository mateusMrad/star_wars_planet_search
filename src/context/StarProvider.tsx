import { useEffect, useState } from 'react';
import { fetchPlanets } from '../services/helpers';
import StarContext from './StarContext';
import { NumberType, ResultsType } from '../services/types';

function StarProvider({ children }: { children: React.ReactNode }) {
  const INITIAL_VALUE = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };
  const INITIAL_COLUMNS = ['population', 'orbital_period', 'diameter', 'rotation_period',
    'surface_water'];
  const [planetsList, setPlanetsList] = useState<ResultsType[]>([]);
  const [filteredByText, setFilteredByText] = useState<string>('');
  const [filteredByNumber, setFilteredByNumber] = useState<NumberType>(INITIAL_VALUE);
  const [avaibleColumns, setAvaibleColumns] = useState(INITIAL_COLUMNS);
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchPlanets();
      setPlanetsList(data);
    };
    fetch();
  }, []);

  const filteredPlanetsList = planetsList.filter((planet) => planet.name
    .includes(filteredByText));

  const handleSubmit = () => {
    const { column, comparison, value } = filteredByNumber;
    const filter = planetsList.filter((planet) => {
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      return Number(planet[column]) === Number(value);
    });
    setPlanetsList(filter);
    setFilteredByNumber(INITIAL_VALUE);
  };

  return (
    <StarContext.Provider
      value={ {
        planetsList,
        setPlanetsList,
        filteredPlanetsList,
        filteredByText,
        setFilteredByText,
        handleSubmit,
        filteredByNumber,
        setFilteredByNumber,
        avaibleColumns,
        setAvaibleColumns,
      } }
    >
      {children}
    </StarContext.Provider>
  );
}
export default StarProvider;
