function plotGauge(wFreqValue) {
    
    // var wFreqLoc = d3.selectAll('#wfreq');
    // console.log(wFreqLoc);
    // var wFreqValue = wFreqLoc.text;
    // console.log(wFreqValue);
    
    var trace1 = {
        domain: { x: [0, 9], y: [0, 9] }, 
        value: wFreqValue,
        title: {
            text: "Scrubs per Week",
            font: {
                color: 'Grey'
            },
        },   
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
            },
            steps: [
                { range: [0, 1], color: 'rgb(245,248,248)' },
                { range: [1, 2], color: 'rgb(235,242,242)' },
                { range: [2, 3], color: 'rgb(215,229,229)' },
                { range: [3, 4], color: 'rgb(195,216,216)' },
                { range: [4, 5], color: 'rgb(175,203,204)' },
                { range: [5, 6], color: 'rgb(155,190,191)' },
                { range: [6, 7], color: 'rgb(135,178,178)' },
                { range: [7, 8], color: 'rgb(115,164,165)' },
                { range: [8, 9], color: 'rgb(95,152,153)' },
            ]
            
        },

    };
    
    var data = [trace1];

    var layout = {
        title: {
            text: "<b>Belly Button Washing Frequency 2<b>",
            font: {
                size: 30,
            },
        },
        width: 600,
        height: 450,
        margin: {
            b: 100,
        }
    };

    Plotly.newPlot('gauge', data, layout);

    
};