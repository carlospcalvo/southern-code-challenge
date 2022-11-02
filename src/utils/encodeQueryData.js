/**
 * Create query params from object
 * @param {Object} data Object containing query params
 * @returns {string} Query params
 */
export default function encodeQueryData(data) {
  if (!data) return '';

  const query = [];
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      query.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });
  return query.join('&');
}
