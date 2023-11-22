import { NumberType, ResultsType } from './types';

export const fetchPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();

  const noResidents = data.results.map((result: any) => {
    const { residents, ...infos } = result;
    return infos;
  });
  return noResidents;
};

export const NewFilter = (
  form: NumberType[],
  list: ResultsType[],
) => {
  const filterUse = list.filter((item) => {
    if (form.length > 0) {
      return form.every(({ column, comparison, value }) => {
        switch (comparison) {
          case 'maior que':
            return Number(item[column]) > Number(value);
          case 'menor que':
            return Number(item[column]) < Number(value);
          case 'igual a':
            return Number(item[column]) === Number(value);
          default:
            return item;
        }
      });
    }
    return item;
  });
  return filterUse;
};
