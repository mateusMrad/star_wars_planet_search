import { createContext } from 'react';
import { ResultsType } from '../services/types';

type StarContextType = {
  planetsList: ResultsType[];
  setPlanetsList: (data: ResultsType[]) => void;
};

const StarContext = createContext<StarContextType>({} as StarContextType);

export default StarContext;
