// POPULATE TEST SUBJECT ID #S
// ------------------------------- //

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

    // Populate Demogrphaic info
    optionChanged(theSubject);

}); 


// SHOW DEMOGRAPHIC INFO
// ------------------------------- //

function optionChanged(theSubject) {
    
    // Remove any existing <p> tags
    d3.selectAll("p").remove();

    // Pull data from json. 'Then' define variables
    d3.json(path).then((data) => {

        // Pull data for every subject from data into an array
        var metadata = data.metadata;

        // Iterate through each subject
        metadata.forEach(subjects => {
        
            // Find where subject from data matches users subject selection
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
                });
            }
        });
    });
}
