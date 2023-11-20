import { createContext } from 'react';
import { NumberType, ResultsType } from '../services/types';

type StarContextType = {
  planetsList: ResultsType[],
  setPlanetsList: (data: ResultsType[]) => void,
  filteredPlanetsList: ResultsType[],
  filteredByText: string,
  setFilteredByText: (data: string) => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  filteredByNumber: NumberType,
  setFilteredByNumber: (data:NumberType) => void,
};

const StarContext = createContext<StarContextType>({} as StarContextType);

export default StarContext;
