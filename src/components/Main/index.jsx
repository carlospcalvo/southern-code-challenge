import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import format from 'date-fns/format';
import useManifests from '../../hooks/useManifests';
import usePhotos from '../../hooks/usePhotos';
import Gallery from '../Gallery';
import Filters from '../Filters';

export default function Main() {
  const [camera, setCamera] = useState();
  const [searchParams, setSearchParams] = useState({
    earth_date: format(new Date(), 'yyyy-MM-dd'),
    rover: 'Curiosity',
  });
  const { data: manifests } = useManifests();
  const {
    isLoading,
    error,
    photos,
    hasNextPage,
    fetchNextPage,
  } = usePhotos({ searchParams, manifests });

  const filteredPhotos = camera ? photos?.filter((photo) => photo.camera.name === camera) : photos;

  return (
    <Container as="main" fluid>
      <Filters
        manifests={manifests ?? []}
        params={searchParams}
        setParams={setSearchParams}
        camera={camera}
        setCamera={setCamera}
      />
      <Gallery
        photos={filteredPhotos || []}
        error={error}
        isLoading={isLoading}
        hasMore={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
}
