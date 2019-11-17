const request = require("request");

const forecast = (long, lat, callback) => {
  const url =
    "https://api.darksky.net/forecast/9a0a9277de699731e3cd346734ac2bf8/-33.868820,151.209290?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " Temp is " +
          body.currently.temperature +
          " Rain likely: " +
          body.currently.precipProbability
      );
    }
  });
};

module.exports = forecast;
