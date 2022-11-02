import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimmer, Segment, Loader, Card,
} from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomCard from '../Card';
import './gallery.css';

function Section({ children }) {
  return (
    <Segment as="section" className="gallery-container">
      {children}
    </Segment>
  );
}

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default function Gallery({
  isLoading,
  error,
  photos,
  hasMore,
  fetchNextPage,
}) {
  if (isLoading) {
    return (
      <Dimmer.Dimmable as={Section} dimmed>
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      </Dimmer.Dimmable>
    );
  }

  if (error) {
    return (
      <Section>
        <h3>{`An error has occurred: ${error.message}`}</h3>
      </Section>
    );
  }

  return photos?.length
    ? (
      <Section>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={photos.length}
          hasMore={hasMore}
          next={() => fetchNextPage()}
          loader={<Loader content="Loading" />}
          endMessage={(
            <p style={{ textAlign: 'center', margin: '1rem' }}>
              <b>These are all the photos that match the search & filter criteria.</b>
            </p>
            )}
        >
          <Card.Group centered stackable>
            {
              photos.map(({
                id, sol, camera, img_src: imgSrc, earth_date: earthDate, rover,
              }) => (
                <CustomCard
                  sol={sol}
                  camera={camera}
                  imgSrc={imgSrc}
                  earthDate={earthDate}
                  rover={rover}
                  key={id}
                />
              ))
            }

          </Card.Group>
        </InfiniteScroll>
      </Section>
    )
    : (
      <Section>
        <h2 className="empty-response-message">No photos were found, try a with another parameters!</h2>
      </Section>
    );
}

Gallery.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.shape({ message: PropTypes.string }),
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    sol: PropTypes.number,
    camera: PropTypes.exact({
      id: PropTypes.number,
      name: PropTypes.string,
      rover_id: PropTypes.number,
      full_name: PropTypes.string,
    }),
    img_src: PropTypes.string,
    earth_date: PropTypes.string,
    rover: PropTypes.exact({
      id: PropTypes.number,
      name: PropTypes.string,
      landing_date: PropTypes.string,
      launch_date: PropTypes.string,
      status: PropTypes.string,
    }),
  })).isRequired,
  hasMore: PropTypes.bool,
  fetchNextPage: PropTypes.func,
};

Gallery.defaultProps = {
  error: null,
  hasMore: false,
  fetchNextPage: () => {},
};
