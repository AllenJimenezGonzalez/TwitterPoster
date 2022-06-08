const axios = require('axios').default;
const config = {
    consumer_key: '8ycEyln8TpKDve7GGWKccivHE',
    consumer_secret: '2KKMs4ZCuWYFxZPzaKy3bZZtgiDDQx28OFmiYTvBP0WabeSXNi',
    access_token_key: '1527662460999712784-eaO2Ke3q50qBjXADnSijYVUs8MqHRF',
    access_token_secret: 'fnq6xhPP5ZT8QVIgM2HjzsCYHejaZDSGub679f8CwxwU8'
}

const twitter = require('twitter-lite');
const client = new twitter(config);
const postTweet = () => {

    const date = new Date();
    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {
            q: 'Costa Rica, CR',
            lat: '0',
            lon: '0',
            id: '2172797',
            lang: 'null',
            units: 'metric',
            mode: 'json'
        },
        headers: {
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
            'X-RapidAPI-Key': 'abe6c54049mshe7f28ad265faf6cp175ff3jsn94be78097b5b'
        }
    };

    axios.request(options).then(function (resp) {
        console.log(resp.data);
        let tweetBody = `On location ${resp.data.coord.lat} and ${resp.data.coord.lon}\nThe temperature is: ${resp.data.main.temp} °C\nDate: ${date} \n#salvandoRedes2022IC`;
        client.post('statuses/update', { status: tweetBody }).then(result => {
            console.log('You successfully tweeted this : "' + result.text + '"');
        }).catch(console.error);
    }).catch(function (error) {
        console.error(error);
    });

}

var myInterval = setInterval(postTweet, 600);