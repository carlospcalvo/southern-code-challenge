import React from 'react';
import PropTypes from 'prop-types';
import formatDate from 'date-fns/format';
import parseDate from 'date-fns/parse';
import { Card, Image } from 'semantic-ui-react';
import './card.css';

export default function CustomCard({
  sol, camera, imgSrc, earthDate, rover,
}) {
  const altText = `Rover ${rover.name} - ${camera.full_name}`;
  const parsedDate = formatDate(parseDate(earthDate, 'yyyy-M-d', new Date()), 'dd/MM/yyyy');

  return (
    <Card>
      <Image src={imgSrc} alt={altText} ui={false} className="card-image" />
      <Card.Content>
        <Card.Header>{`Rover ${rover.name}`}</Card.Header>
        <Card.Meta>{camera.full_name}</Card.Meta>
        <Card.Description>
          {`Date: ${parsedDate} | Sol: ${sol}`}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

CustomCard.propTypes = {
  sol: PropTypes.number.isRequired,
  camera: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    rover_id: PropTypes.number,
    full_name: PropTypes.string,
  }).isRequired,
  imgSrc: PropTypes.string.isRequired,
  earthDate: PropTypes.string.isRequired,
  rover: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    landing_date: PropTypes.string,
    launch_date: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};
