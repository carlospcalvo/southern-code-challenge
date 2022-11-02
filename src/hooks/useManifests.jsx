import { useQuery } from 'react-query';
import { API_KEY } from '../utils/constants';

async function fetchManifests() {
  const rovers = [
    'Curiosity',
    'Opportunity',
    'Spirit',
  ];
  const requests = rovers.map((rover) => fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API_KEY}`));

  return Promise.all(requests).then(
    (responses) => Promise.all(responses.map((r) => r.json())),
  );
}

export default function useManifests() {
  return useQuery('MANIFESTS', fetchManifests, {
    staleTime: 1000 * 60 * 60 * 24,
  });
}
