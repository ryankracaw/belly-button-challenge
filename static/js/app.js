// Make variables of data
let names = data.names;
let metaData = data.metadata;
let samples = data.samples;

// Make empty arrays for graphs later on
const ids = [];
const values = [];
const otu_labels = [];

const allIDS = [];
const allValues = [];
const allLabels = [];

for (let i=0;i<samples.length;i+=1) {
    let otu_ids = samples[i].otu_ids;
    allIDS.push(otu_ids);
    const slicedOtu_ids = otu_ids.slice(0,10);
    const stringIDS = [];
    for (let i=0;i<slicedOtu_ids.length;i+=1) {
        var mystr = "OTU ";
        var idToStr = slicedOtu_ids[i].toString();
        stringIDS.push(mystr + idToStr);
    }
    ids.push(stringIDS);
    
    let sampleValues = samples[i].sample_values;
    allValues.push(sampleValues);
    const slicedSampleValues = sampleValues.slice(0,10);
    values.push(slicedSampleValues);

    let sampleLabels = samples[i].otu_labels;
    allLabels.push(sampleLabels);
    const slicedSampleLables = sampleLabels.slice(0,10);
    otu_labels.push(slicedSampleLables);

};

console.log(allIDS);

function init() {
    let bar_chart = [{
        type: 'bar',
        x: values[0].reverse(),
        y: ids[0].reverse(),
        text: otu_labels[0],
        orientation: 'h'
      }];

      let layout = {
        height: 600,
        width: 400
      };

    Plotly.newPlot('bar', bar_chart, layout);
    
    let bubble_chart = [{
        x: allIDS[0],
        y: allValues[0],
        mode: 'markers',
        marker: {
            size: allValues[0],
            color: allIDS[0],
        },
        text: allLabels[0]
    }];
    
    Plotly.newPlot('bubble', bubble_chart);
};

d3.selectAll("#selDataset").on("change", getData);

function getData() {
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");
    let data = [];
    let keys = [];
    let text = [];

    let bubData = [];
    let bubKeys = [];
    let bubText = [];

    for (let i = 0;i<names.length;i+=1) {
        if (dataset == names[i]) {
            data = values[i].reverse();
            keys = ids[i].reverse();
            text = otu_labels[i].reverse();

            bubData = allIDS[i];
            bubKeys = allValues[i];
            bubText = allLabels[i];
        };
    };
    updateBarPlotly(data, keys);
    updateBubbblePlotly(bubData, bubKeys);
};

function updateBarPlotly(newdata, moredata) {
    Plotly.restyle("bar", "x", [newdata], "y", [moredata]);
};

function updateBubbblePlotly(newdata, moredata) {
    Plotly.restyle("bubble", "x", [newdata], "y", [moredata]);
};

init();