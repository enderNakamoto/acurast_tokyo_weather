const WEBHOOK_URL = "https://webhook.site/903f24ef-01cc-42c5-a036-cde6e81d5a9e"; // TODO: Replace with your https://webhook.site/ URL

const BASE_URL = "https://samples.openweathermap.org";
const CITY = "Tokyo";
const API_KEY = "b1b15e88fa797225412429c1c50c122a1";


declare const _STD_: any;

if (typeof _STD_ === "undefined") {
  // If _STD_ is not defined, we know it's not running in the Acurast Cloud.
  // Define _STD_ here for local testing.
  console.log("Running in local environment");
  (global as any)._STD_ = {
    app_info: { version: "local" },
    job: { getId: () => "local" },
    device: { getAddress: () => "local" },
  };
}

fetch(`${BASE_URL}/data/2.5/weather?q=${CITY}&appid=${API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    const weather = data["weather"][0]["main"];
    return fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weather,
        timestamp: Date.now(),
        acurast: {
          version: _STD_.app_info.version,
          deploymentId: _STD_.job.getId(),
          deviceAddress: _STD_.device.getAddress(),
        },
      }),
    })
      .then((postResponse) => console.log("Success:", postResponse.status))
      .catch((error) => console.error("Error posting data:", error));
  })
  .catch((error) => console.error("Error getting data:", error));
