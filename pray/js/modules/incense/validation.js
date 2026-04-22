export function hasRequiredOptions(options) {
  if (!options) {
    return false;
  }

  const requiredKeys = [
    'triggerSelector',
    'slideSelector',
    'incenseImageSelector',
    'incenseImageClass',
    'incenseImageSrc',
    'incenseImageAlt',
    'audioSrc',
    'resetDelayMs'
  ];

  return requiredKeys.every(function(key) {
    return options[key] !== undefined && options[key] !== null;
  });
}