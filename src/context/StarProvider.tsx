import { useEffect, useState } from 'react';
import { fetchPlanets } from '../services/helpers';
import StarContext from './StarContext';
import { resultsType } from '../services/types';

function StarProvider({ children }: { children: React.ReactNode }) {
  const [planetsList, setPlanetsList] = useState<resultsType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchPlanets();
      setPlanetsList(data);
    };
    fetch();
  }, []);

  return (
    <StarContext.Provider value={ { planetsList, setPlanetsList } }>
      {children}
    </StarContext.Provider>
  );
}
export default StarProvider;
