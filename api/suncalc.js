const SunCalc = require('suncalc');

module.exports = async (req, res) => {
    // get today's sunlight times for London
    var times = SunCalc.getTimes(new Date(), 51.5, -0.1);
    res.json(times);
};
