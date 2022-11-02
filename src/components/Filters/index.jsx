/* eslint-disable import/named */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Container, Form, Icon,
} from 'semantic-ui-react';
import { Collapse } from 'react-collapse';
import format from 'date-fns/format';
import useIsDesktop from '../../hooks/useIsDesktop';
import useToggle from '../../hooks/useToggle';
import capitalize from '../../utils/capitalize';
import {
  DATE_TYPES,
  ROVERS,
  CAMERAS,
  AVAILABLE_CAMERAS,
} from '../../utils/constants';
import './filters.css';

function FormWrapper({ children, isDesktop, isOpen }) {
  return isDesktop
    ? <Container>{children}</Container>
    : <Collapse isOpened={isOpen}>{children}</Collapse>;
}

FormWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  isDesktop: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

function Filters({
  manifests, params, setParams, camera, setCamera,
}) {
  const isDesktop = useIsDesktop();
  const [dateType, setDateType] = useState('earth_date');
  const [dateValue, setDateValue] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isOpen, toggleIsOpen] = useToggle();

  const handleRoverChange = (_, { value }) => {
    setParams({ ...params, rover: capitalize(value) });
    if (isOpen) {
      toggleIsOpen();
    }
  };

  const handleCameraChange = (_, { value }) => {
    if (value !== '') {
      setCamera(value);
    } else {
      setCamera(undefined);
    }

    if (isOpen) {
      toggleIsOpen();
    }
  };

  const handleDateTypeChange = (_, { value }) => {
    setDateType(value);
  };

  const handleDateChange = ((_, { value }) => setDateValue(value));

  const handleDateSubmit = () => {
    if (dateType === 'earth_date') {
      setParams({
        ...params,
        sol: undefined,
        earth_date: dateValue,
      });
    } else {
      setParams({
        ...params,
        earth_date: undefined,
        sol: +dateValue,
      });
    }
    if (isOpen) {
      toggleIsOpen();
    }
  };

  const searchButtonProps = useMemo(() => ({
    content: 'Search',
    color: 'blue',
    onClick: handleDateSubmit,
  }), [handleDateSubmit]);

  const [manifest] = manifests.filter(
    /* eslint-disable-next-line camelcase */
    ({ photo_manifest }) => (photo_manifest?.name === params.rover),
  );
  const currentRoverManifest = manifest?.photo_manifest;

  const filteredCameras = CAMERAS.filter(
    (cam) => AVAILABLE_CAMERAS[params?.rover?.toLowerCase()].includes(cam.value),
  );

  return (
    <section className="filters-section-container">
      {
        isDesktop ? (
          <h3 className="filters-title">Filters</h3>
        ) : (
          <Button
            icon
            labelPosition="right"
            onClick={() => toggleIsOpen()}
          >
            Filter
            <Icon name="filter" />
          </Button>
        )
      }

      <FormWrapper isDesktop={isDesktop} isOpen={isOpen}>
        <Form size="small">
          <Form.Group>
            <Form.Dropdown
              label="Rover"
              name="rover"
              id="rover"
              fluid
              search
              selection
              width={5}
              options={ROVERS}
              value={params.rover.toLowerCase()}
              onChange={handleRoverChange}
            />
            <Form.Dropdown
              label="Camera"
              name="camera"
              id="camera"
              fluid
              search
              selection
              clearable
              width={6}
              placeholder="All"
              options={filteredCameras}
              value={camera}
              onChange={handleCameraChange}
            />
            <Form.Dropdown
              label="Date type"
              name="dateType"
              id="dateType"
              fluid
              search
              selection
              width={3}
              options={DATE_TYPES}
              value={dateType}
              onChange={handleDateTypeChange}
            />
            {
              dateType === 'sol' ? (
                <Form.Input
                  type="number"
                  name="sol"
                  id="sol"
                  label="Sol (Mars date)"
                  min={0}
                  max={currentRoverManifest.max_sol}
                  fluid
                  width={4}
                  action={searchButtonProps}
                  onChange={handleDateChange}
                />
              )
                : (
                  <Form.Input
                    type="date"
                    name="date"
                    id="date"
                    label="Earth date"
                    min={currentRoverManifest?.landing_date}
                    max={currentRoverManifest?.max_date}
                    fluid
                    width={5}
                    defaultValue={params.earth_date}
                    action={searchButtonProps}
                    onChange={handleDateChange}
                  />
                )
            }
          </Form.Group>
        </Form>
      </FormWrapper>
    </section>
  );
}

Filters.propTypes = {
  manifests: PropTypes.arrayOf(
    PropTypes.shape({
      photo_manifest: PropTypes.shape({
        landing_date: PropTypes.string,
        launch_date: PropTypes.string,
        max_date: PropTypes.string,
        max_sol: PropTypes.number,
        name: PropTypes.string,
        photos: PropTypes.arrayOf(
          PropTypes.shape({
            cameras: PropTypes.arrayOf(PropTypes.string),
            earth_date: PropTypes.string,
            sol: PropTypes.number,
            total_photos: PropTypes.number,
          }),
        ),
        status: PropTypes.string,
        total_photos: PropTypes.number,
      }),
    }),
  ).isRequired,
  params: PropTypes.shape({
    earth_date: PropTypes.string,
    rover: PropTypes.string,
    page: PropTypes.number,
  }).isRequired,
  setParams: PropTypes.func.isRequired,
  camera: PropTypes.string,
  setCamera: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  camera: undefined,
};

export default Filters;
