function plotGauge() {
    
    var wFreqLoc = d3.select('#wfreq');
    var wFreqValue = wFreqLoc.text().slice(-1);

    var trace1 = {
        domain: { x: [0, 9], y: [0, 9] }, 
        value: wFreqValue,
        title: "Belly Button Washing Frequency",
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { 
                range: [null, 9],
                dtick: 1,
            },
            threshold: {
                line: { color: "purple", width: 10 },
                thickness: 2,
                value: wFreqValue
              }
        },

    };
    
    var data = [trace1];

    var layout = {
        title:"Belly Button Washing Frequency 2"
    };

    Plotly.newPlot('gauge', data, layout);

    console.log(wFreqValue);
};