const SunCalc = require("suncalc");

module.exports = async (req, res) => {
    // ?lat=36.7201600&lon=-4.4203400&date=2021-04-21
    // ?lat=36.7201600&lon=-4.4203400 => date=today

    /*
    Property        Description

    sunrise         sunrise (top edge of the sun appears on the horizon)
    sunriseEnd      sunrise ends (bottom edge of the sun touches the horizon)
    goldenHourEnd   morning golden hour (soft light, best time for photography) ends
    solarNoon       solar noon (sun is in the highest position)
    goldenHour      evening golden hour starts
    sunsetStart     sunset starts (bottom edge of the sun touches the horizon)
    sunset          sunset (sun disappears below the horizon, evening civil twilight starts)
    dusk            dusk (evening nautical twilight starts)
    nauticalDusk    nautical dusk (evening astronomical twilight starts)
    night           night starts (dark enough for astronomical observations)
    nadir           nadir (darkest moment of the night, sun is in the lowest position)
    nightEnd        night ends (morning astronomical twilight starts)
    nauticalDawn    nautical dawn (morning nautical twilight starts)
    dawn            dawn (morning nautical twilight ends, morning civil twilight starts)
    */

    let lat = req.query.lat ? parseFloat(req.query.lat) : 0;
    let lon = req.query.lon ? parseFloat(req.query.lon) : 0;
    let date = req.query.date ? new Date(req.query.date) : new Date();

    date.setHours(12, 0, 0, 0);

    let result = {
        times: SunCalc.getTimes(date, lat, lon),
        moon: {
            ...SunCalc.getMoonIllumination(date),
            ...SunCalc.getMoonTimes(date, lat, lon, true),
        },
    };
    res.json(result);
};
