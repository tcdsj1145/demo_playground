/*
 * define the country list in the whole word
 * take following Array as an example
 */
    self.console.log('debugging--------------------');
    var country_list = ['Albania', 'Algeria', 'American', 'Andorra', 'Angola', 'Antigua', '....'];

    // define the variable to record the population of the word
    var total_population = 0;
    var country_size = country_list.length;
    var processing_size = country_list.length;
    postMessage('heheh');
    for (var i = 0; i < country_size; i++) {
        var worker = new Worker('subworker.js');
        //wrap the command, send to delegations
        var command = {
            command: 'start',
            country: country_list[i]
        };
        worker.postMessage(command);
        worker.onmessage = storeResult;
    }

    function storeResult(event) {
        total_population += event.data;
        processing_size -= 1;
        if (processing_size <= 0) {
            //complete the whole work, post results to web page
            postMessage(total_population);
        }
    }



/*
 * this function will be used to update the result
 * @param event
 * @return
 */


