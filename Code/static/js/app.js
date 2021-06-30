// POPULATE TEST SUBJECT ID #S
// -------------------------------------------------------- //

function init() {
    
    // Grab <select> tag to capture dropdown
    var dropdown = d3.select("select");

    // Define path to data file 'samples'
    var path = `samples.json`;

    // Pull data from json. 'Then' define variables
    d3.json(path).then((data) => {
        
        // Pull array of ID numbers from dataset
        var names = data.names;
            
        // Iterate through names array
        for (var i = 0; i < names.length; i++ ) {

            // Add <option> tag after select
            var option = dropdown.append("option");

            // Add list of test subjects ids one by one
            option.text(names[i]);
        }    
        
        // Store current test subject into variable
        var theSubject = d3.select("select").node().value;

        // Populate initial demographic info (ID #940)
        optionChanged(theSubject);


    }); 
}

// Run page initilization
init();

// -------------------------------------------------------- //




// IF USERS CHANGE SUBJECT ID
// -------------------------------------------------------- //
// Define main function optionChanged
function optionChanged(theSubject) {

    // Show demographic info
    demographicInfo(theSubject);

    // Show bar and bubble charts
    allCharts(theSubject);

    // Show gauge
    // plotGauge(); 

}
// -------------------------------------------------------- //





// SHOW DEMOGRAPHIC INFO
// -------------------------------------------------------- //

function demographicInfo(theSubject) {

    // Remove any existing <p> tags
    d3.select("#sample-metadata").selectAll("p").remove();

    // Grab <select> tag to capture dropdown
    var dropdown = d3.select("select");

    // Define path to data file 'samples'
    var path = `samples.json`;
    
    // Pull data from json. 'Then' define variables
    thePromise(path, theSubject);
    
    
};

// Promise FUNCTION //

function thePromise(path, theSubject) {
    return d3.json(path).then((data) => {

        // Pull data for every subject from data into an array
        var metadata = data.metadata;

        // Iterate through each subject
        metadata.forEach(subjects => {

            if (subjects.id == theSubject) {

                // Iterate through all keys and their respective values
                Object.entries(subjects).forEach(([key, value]) => {
                    
                    // Change key to uppercase
                    var upperKey = key.toUpperCase();

                    // Define sentence to be added
                    var sentence = `${upperKey}: ${value}`

                    // Select where to append keys and values
                    var demographic = d3.select("#sample-metadata");

                    // Append <p> tag
                    var paragraph = demographic.append("p");

                    // Define what <p> should say
                    paragraph.text(sentence); 
                    
                    // Change style of <p>
                    paragraph.style("font-weight", "bold");
                    
                    // Change font 
                    paragraph.style('font-family', 'Seriff');

                    // Set ID
                    paragraph.attr('id', key);

                    // Store wfreq value
                    if (key == 'wfreq') {
                        wFreq = value;                        
                    }    
                });
            }
            
            
        });
        
        // Call plotGauge function to plot the gauge chart
        plotGauge(wFreq)  
    });
}

// -------------------------------------------------------- //


// SHOW BAR AND BUBBLE
// -------------------------------------------------------- //

function allCharts(theSubject) {
    
    // Grab <select> tag to capture dropdown
    var dropdown = d3.select("select");

    // Define path to data file 'samples'
    var path = `samples.json`;    

    // Pull data from json. 'Then' define variables
    d3.json(path).then((data) => {
        
        // Store current test subject into variable
        var theSubject = d3.select("select").node().value;
        
        // Iterate through samples
        data.samples.forEach(subject => {

            // Check if id's match
            switch (subject.id) {

                case theSubject:

                // Sample Values
                var sampleValues = subject.sample_values;

                // OTU IDs            
                var otuIds = subject.otu_ids;

                // OTU Labels
                var otuLabels = subject.otu_labels;

                // GET TOP 10 BACTERIA CULTURES FOR SUBJECT
                // -------------------------------------- //

                // Define blank sample values
                var tenSampleValues = [];

                // Define blank OTU IDs array. We will attach "OTU" to the current otuIds (e.g. 1167 -> OTU 1167)
                var tenOtuIds = [];
                
                // Define blank OTU Labels array
                var tenOtuLabels = [];

                // Get top 10 OTUs
                for (var i = 0; i < 10 && i < sampleValues.length; i++) {

                    // Append index to each of the blank arrays
                    tenSampleValues.push(sampleValues[i]);
                    tenOtuIds.push(`OTU ${otuIds[i]}`);
                    tenOtuLabels.push(otuLabels[i]);
                }         
                
                // Reverse orders of arrays to go descending
                tenSampleValues = tenSampleValues.reverse();
                tenOtuIds = tenOtuIds.reverse();
                tenOtuLabels = tenOtuLabels.reverse();
                // -------------------------------------- //

                // PLOT HORIZONTAL BAR CHART 
                // -------------------------------------- //

                // Define trace
                var trace1 = {
                    x: tenSampleValues,
                    y: tenOtuIds,
                    text: tenOtuLabels, 
                    type: 'bar',
                    orientation: 'h',
                };

                // Define data
                var data = [trace1];

                // Define layout
                var layout = {
                    title: "Top 10 Bacteria Cultures Found",
                };
                
                // Plot bar chart
                Plotly.newPlot("bar", data, layout);
                // -------------------------------------- //


                // PLOT BUBBLE CHART
                // -------------------------------------- //

                // Define trace 
                var trace1 = {
                    x: otuIds,
                    y: sampleValues,
                    text: otuLabels,
                    mode: 'markers',
                    marker: {
                        size: sampleValues,
                        color: otuIds,
                    }
                };

                // Define data
                var data = [trace1];

                var layout = {
                    xaxis: {
                        title: "OTU ID"
                    }
                };

                // Plot bubble chart
                Plotly.newPlot("bubble", data, layout);

                break
                // -------------------------------------- //

            };
        });
    });
};
// -------------------------------------------------------- //










