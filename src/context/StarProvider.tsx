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
  const [arrayNumbers, setArrayNumbers] = useState<NumberType[]>([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchPlanets();
      setPlanetsList(data);
    };
    getData();
  }, []);

  const filteredPlanetsList = planetsList.filter((planet) => planet.name
    .includes(filteredByText));

  const handleSubmit = () => {
    setArrayNumbers((prevstate) => [
      ...prevstate, filteredByNumber,
    ]);
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
        arrayNumbers,
        setArrayNumbers,
      } }
    >
      {children}
    </StarContext.Provider>
  );
}
export default StarProvider;
