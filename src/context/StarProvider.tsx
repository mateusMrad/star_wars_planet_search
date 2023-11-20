import { useEffect, useState } from 'react';
import { fetchPlanets } from '../services/helpers';
import StarContext from './StarContext';
import { ResultsType } from '../services/types';

function StarProvider({ children }: { children: React.ReactNode }) {
  const [planetsList, setPlanetsList] = useState<ResultsType[]>([]);
  const [filteredByText, setFilteredByText] = useState<string>('');

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchPlanets();
      setPlanetsList(data);
    };
    fetch();
  }, []);

  const filteredPlanetsList = planetsList.filter((planet) => planet.name
    .includes(filteredByText));

  return (
    <StarContext.Provider
      value={ {
        planetsList,
        setPlanetsList,
        filteredPlanetsList,
        filteredByText,
        setFilteredByText,
      } }
    >
      {children}
    </StarContext.Provider>
  );
}
export default StarProvider;
