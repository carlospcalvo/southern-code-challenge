import parse from 'date-fns/parse';

function binarySearch(array, date, start = 0, end = array.length - 1) {
  if (start > end) return false;
  const dateType = typeof date === 'number' ? 'sol' : 'earth_date';
  const mid = Math.floor((start + end) / 2);

  if (array[mid][dateType] === date) {
    return array[mid];
  }

  // Parsing if date is earth_date
  if (dateType === 'earth_date') {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    const parsedCurrentIdxDate = parse(array[mid].earth_date, 'yyyy-MM-dd', new Date());

    if (parsedCurrentIdxDate > parsedDate) {
      return binarySearch(array, date, start, mid - 1);
    }
    return binarySearch(array, date, mid + 1, end);
  }

  if (array[mid].sol > date) {
    return binarySearch(array, date, start, mid - 1);
  }
  return binarySearch(array, date, mid + 1, end);
}

export default function getQueryPages({
  manifests,
  rover,
  date,
  pageSize = 25,
}) {
  let pages = 1;
  if (manifests) {
    const [manifest] = manifests.filter(
      /* eslint-disable-next-line camelcase */
      ({ photo_manifest }) => (photo_manifest?.name === rover),
    );
    const currentRoverManifestPhotos = manifest?.photo_manifest?.photos;

    if (currentRoverManifestPhotos) {
      const data = binarySearch(currentRoverManifestPhotos, date);
      if (data) {
        pages = Math.ceil(data.total_photos / pageSize);
      }
    }
  }

  return pages;
}
