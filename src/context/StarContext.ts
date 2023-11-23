import { createContext } from 'react';
import { NumberType, ResultsType, SortType } from '../services/types';

type StarContextType = {
  planetsList: ResultsType[],
  setPlanetsList: (data: ResultsType[]) => void,
  filteredPlanetsList: ResultsType[],
  filteredByText: string,
  setFilteredByText: (data: string) => void,
  handleSubmit: () => void,
  filteredByNumber: NumberType,
  setFilteredByNumber: (data:NumberType) => void,
  avaibleColumns: string[],
  setAvaibleColumns: (data: string[]) => void,
  arrayNumbers: NumberType[],
  setArrayNumbers: (data: NumberType[]) => void,
  ordenation: SortType,
  setOrdenation: (data: SortType) => void,
};

const StarContext = createContext<StarContextType>({} as StarContextType);

export default StarContext;
