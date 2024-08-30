const destination = "0xA46aB2d37b35D47EdAEc405E5e322c03ae5F8B1d";
httpGET(
    "https://samples.openweathermap.org/data/2.5/weather?q=Tokyo&appid=b1b15e88fa797225412429c1c50c122a1",
    {},
    (response, _certificate) => {
        const weather = ["weather"][0]["main"];
        _STD_.chains.ethereum.fulfill(
            "https://rpc.gobob.xyz",
            destination,
            weather,
            {
                methodSignature: "setWeather(string)",
                gasLimit: "9000000",
                maxFeePerGas: "2550000000",
                maxPriorityFeePerGas: "2550000000",
            },
            (opHash) => {
                console.log("Succeeded: " + opHash)
            },
            (err) => {
                console.log("Failed: " + err)
            },
        )
    },
    (err) => {
        console.log("Failed: " + err)
    }
);