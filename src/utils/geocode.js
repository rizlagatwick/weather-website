const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?limit=1?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoicml6bGFnYXR3aWNrIiwiYSI6ImNrMnF1cGIwczBobjgzbWw0a2Fjcm0xZGQifQ.sgbCQ0C5-1Bj6VcNx9Up4Q";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[0],
        long: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
