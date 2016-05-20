//define the onmessage hander for the delegation
onmessage = start_calculate;

/*
 * resolve the command and kick off the calculation
 */
function start_calculate(event) {
    var command = event.data.command;
    if (command != null && command == 'start') {
        var coutry = event.data.country;
        do_calculate(country);
    }
    onmessage = null;
}

/*
 * the complex calculation method defined here
 * return the population of the country
 */
function do_calculate(country) {
    var population = 0;
    var cities = ['aa','bb'];
        for (var i = 0; i < cities.length; i++) {
            var city_popu = 0;
            // perform the calculation for this city
            //update the city_popu
            population += city_popu;
        }
    postMessage(population);
    close();
}

