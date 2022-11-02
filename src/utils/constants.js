/* eslint-disable import/prefer-default-export */
export const API_KEY = import.meta.env.VITE_NASA_API_KEY;

export const DATE_TYPES = [
  {
    key: 'earth_date',
    value: 'earth_date',
    text: 'Earth Date',
  },
  {
    key: 'sol',
    value: 'sol',
    text: 'Sol (Mars date)',
  },
];

export const ROVERS = [
  {
    key: 'curiosity',
    value: 'curiosity',
    text: 'Curiosity',
  },
  {
    key: 'opportunity',
    value: 'opportunity',
    text: 'Opportunity',
  },
  {
    key: 'spirit',
    value: 'spirit',
    text: 'Spirit',
  },
];

export const CAMERAS = [
  {
    key: 'FHAZ',
    value: 'FHAZ',
    text: 'Front Hazard Avoidance Camera',
  },
  {
    key: 'RHAZ',
    value: 'RHAZ',
    text: 'Rear Hazard Avoidance Camera',
  },
  {
    key: 'MAST',
    value: 'MAST',
    text: 'Mast Camera',
  },
  {
    key: 'CHEMCAM',
    value: 'CHEMCAM',
    text: 'Chemistry and Camera Complex',
  },
  {
    key: 'MAHLI',
    value: 'MAHLI',
    text: 'Mars Hand Lens Imager',
  },
  {
    key: 'MARDI',
    value: 'MARDI',
    text: 'Mars Descent Imager',
  },
  {
    key: 'NAVCAM',
    value: 'NAVCAM',
    text: 'Navigation Camera',
  },
  {
    key: 'PANCAM',
    value: 'PANCAM',
    text: 'Panoramic Camera',
  },
  {
    key: 'MINITES',
    value: 'MINITES',
    text: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
  },
];

export const AVAILABLE_CAMERAS = {
  curiosity: [
    'FHAZ',
    'RHAZ',
    'MAST',
    'CHEMCAM',
    'MAHLI',
    'MARDI',
    'NAVCAM',
  ],
  opportunity: [
    'FHAZ',
    'RHAZ',
    'NAVCAM',
    'PANCAM',
    'MINITES',
  ],
  spirit: [
    'FHAZ',
    'RHAZ',
    'NAVCAM',
    'PANCAM',
    'MINITES',
  ],
};
