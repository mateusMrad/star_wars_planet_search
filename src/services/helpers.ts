export const fetchPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();

  const noResidents = data.results.map((result: any) => {
    const { residents, ...infos } = result;
    return infos;
  });
  return noResidents;
};
