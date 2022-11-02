import { useInfiniteQuery, useQuery } from 'react-query';
import encodeQueryData from '../utils/encodeQueryData';
import { API_KEY } from '../utils/constants';
import getQueryPages from '../utils/getQueryPages';

// !DELETE `earth_date=2022-10-25&page=1&api_key=${API_KEY}`;

async function fetchPhotos(searchParams) {
  console.log('(fetchPosts) searchParams', searchParams);
  const {
    // eslint-disable-next-line camelcase
    earth_date = undefined,
    sol = undefined,
    page = 1,
    rover = 'Curiosity',
  } = searchParams;

  const URI = 'https://api.nasa.gov/mars-photos/api/v1/rovers';
  const endpoint = `/${rover.toLowerCase()}/photos?`;
  const params = encodeQueryData({
    // eslint-disable-next-line camelcase
    earth_date,
    sol,
    page,
    api_key: API_KEY,
  });

  const response = await fetch(`${URI}${endpoint}${params}`);
  return response.json();
}

export default function usePhotos({ searchParams, manifests }) {
  const totalPages = getQueryPages({
    manifests,
    rover: searchParams.rover,
    date: searchParams.earth_date || searchParams.sol,
  });

  const result = useInfiniteQuery(['PHOTOS', searchParams], ({ pageParam = 1 }) => fetchPhotos({ ...searchParams, page: pageParam }), {
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    getNextPageParam:
      (_, allPages) => (allPages.length === totalPages ? false : allPages.length + 1),
  });

  const photos = result?.data?.pages
    .reduce((prevPhotos, page) => prevPhotos.concat(page.photos), []) ?? [];

  return { ...result, photos };
}
