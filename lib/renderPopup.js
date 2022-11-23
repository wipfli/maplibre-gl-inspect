function displayValue(value) {
  if (typeof value === 'undefined' || value === null) return value;
  if (value instanceof Date) return value.toLocaleString();
  if (typeof value === 'object' ||
          typeof value === 'number' ||
          typeof value === 'string') return value.toString();
  return value;
}

function renderProperty(propertyName, property) {
  return `${'<div class="maplibregl-inspect_property">' +
    '<div class="maplibregl-inspect_property-name">'}${  propertyName  }</div>` +
    `<div class="maplibregl-inspect_property-value">${  displayValue(property)  }</div>` +
    '</div>';
}

function renderLayer(layerId) {
  return `<div class="maplibregl-inspect_layer">${  layerId  }</div>`;
}

function renderProperties(feature) {
  const sourceProperty = renderLayer(feature.layer['source-layer'] || feature.layer.source);
  const typeProperty = renderProperty('$type', feature.geometry.type);
  const properties = Object.keys(feature.properties).map(propertyName => renderProperty(propertyName, feature.properties[propertyName]));
  return [sourceProperty, typeProperty].concat(properties).join('');
}

function renderFeatures(features) {
  return features.map(ft => `<div class="maplibregl-inspect_feature">${  renderProperties(ft)  }</div>`).join('');
}

function renderPopup(features) {
  return `<div class="maplibregl-inspect_popup">${  renderFeatures(features)  }</div>`;
}

module.exports = renderPopup;
