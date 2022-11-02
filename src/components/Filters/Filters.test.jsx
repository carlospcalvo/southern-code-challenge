import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  describe,
  expect,
  it,
  beforeEach,
} from 'vitest';
import Filters from './index';
import { AVAILABLE_CAMERAS, CAMERAS } from '../../utils/constants';

const manifestMock = [
  {
    photo_manifest: {
      launch_date: '2022-10-21',
      landing_date: '2022-10-31',
      max_date: '2022-11-01',
      max_sol: 1,
      name: 'Curiosity',
      photos: [
        {
          cameras: ['FHAZ',
            'RHAZ',
            'MAST',
            'MARDI',
            'NAVCAM',
          ],
          earth_date: '2022-10-31',
          sol: 0,
          total_photos: 15,
        },
        {
          cameras: ['FHAZ',
            'RHAZ',
            'MAST',
          ],
          earth_date: '2022-11-01',
          sol: 1,
          total_photos: 9,
        },
      ],
      status: 'active',
      total_photos: 24,
    },
  },
];

const searchParamsMock = {
  earth_date: '2022-11-01',
  rover: 'Curiosity',
};

describe('Filters component tests', () => {
  beforeEach(() => {
    render(
      <Filters
        manifests={manifestMock}
        params={searchParamsMock}
        setParams={() => {}}
        setCamera={() => {}}
      />,
    );
  });

  it('should display default values correctly', () => {
    const dropdownTexts = screen.getAllByRole('alert');
    const roverSelect = dropdownTexts[0];
    const cameraSelect = dropdownTexts[1];
    const dateTypeSelect = dropdownTexts[2];
    const dateInput = screen.getByLabelText('Earth date');

    expect(roverSelect).toBeDefined();
    expect(roverSelect.textContent).toBe('Curiosity');

    expect(cameraSelect).toBeDefined();
    expect(cameraSelect.textContent).toBe('All');

    expect(dateTypeSelect).toBeDefined();
    expect(dateTypeSelect.textContent).toBe('Earth Date');

    expect(dateInput).toBeDefined();
    expect(dateInput.value).toBe('2022-11-01');
  });

  describe('Select inputs', () => {
    const roverOptions = [];
    const cameraOptions = [];
    const dateTypeOptions = [];

    beforeEach(() => {
      const allOptions = screen.getAllByRole('option');

      allOptions.forEach((option) => {
        const grandparentId = option.parentElement.parentElement.id;
        if (grandparentId === 'rover') {
          roverOptions.push(option.textContent);
        } else if (grandparentId === 'camera') {
          cameraOptions.push(option.textContent);
        } else {
          dateTypeOptions.push(option.textContent);
        }
      });
    });

    describe('Rover input', () => {
      it('should list all 3 available rovers', () => {
        expect(roverOptions).toHaveLength(3);
        expect(roverOptions).toContain('Curiosity');
        expect(roverOptions).toContain('Opportunity');
        expect(roverOptions).toContain('Spirit');
      });
    });

    it('should show the corresponding cameras for the selected rover', () => {
      const cameras = CAMERAS.filter(
        (camera) => AVAILABLE_CAMERAS.curiosity.includes(camera.value),
      ).map((cam) => cam.text);

      cameraOptions.forEach((cam) => {
        expect(cameras).toContain(cam);
      });

      expect(cameraOptions).not.toContain('Miniature Thermal Emission Spectrometer (Mini-TES)');
      expect(cameraOptions).not.toContain('Panoramic Camera');
    });

    it('should show both possible date types', () => {
      expect(dateTypeOptions).toContain('Sol (Mars date)');
      expect(dateTypeOptions).toContain('Earth Date');
    });
  });
});
