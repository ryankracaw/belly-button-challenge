// Make variables of data
let names = data.names;
let metaData = data.metadata;
let samples = data.samples;

// Make empty arrays for graphs later on
const ids = [];
const values = [];

for (let i=0;i<samples.length;i+=1) {
    let otu_ids = samples[i].otu_ids;
    const slicedOtu_ids = otu_ids.slice(0,10);
    const stringIDS = [];
    for (let i=0;i<slicedOtu_ids.length;i+=1) {
        var mystr = "OTU ";
        var idToStr = slicedOtu_ids[i].toString();
        stringIDS.push(mystr + idToStr);
    }
    ids.push(stringIDS);
    
    let sampleValues = samples[i].sample_values;
    const slicedSampleValues = sampleValues.slice(0,10);
    values.push(slicedSampleValues);

};

function init() {
    let bar_chart = [{
        type: 'bar',
        x: values[0].reverse(),
        y: ids[0].reverse(),
        orientation: 'h'
      }];

      let layout = {
        height: 600,
        width: 400
      };

      Plotly.newPlot('bar', bar_chart, layout);
};

d3.selectAll("#selDataset").on("change", getData);

function getData() {
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");
    let data = [];
    let keys = [];

    for (let i = 0;i<names.length;i+=1) {
        if (dataset == names[i]) {
            data = values[i].reverse();
            keys = ids[i].reverse();
        };
    };
    updatePlotly(data, keys);
};

function updatePlotly(newdata, moredata) {
    Plotly.restyle("bar", "x", [newdata], "y", [moredata]);
};

init();