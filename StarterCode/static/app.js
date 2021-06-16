// Create dropdown-menu fo Test Subject ID Number:
function pageSetup() {
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then(data=> {
        console.log(data)
        data.names.forEach(n => {
            dropdown.append("option").text(n).value;
        });
        getMeta(data.names[0]);
        createPlot(data.names[0]);
    });
}

pageSetup();

//Define optionChanged function for HTML.
function optionChanged(id) {
    getMeta(id);
    createPlot(id);}

// Function to gather metadata demographics
function getMeta(id) {
    d3.json("samples.json").then(data=> {
        let metadata = data.metadata;
        console.log(metadata)
        var metaID = metadata.filter(datum => datum.id.toString() === id)[0];
        var sample_metaData = d3.select("#sample-metadata");        
        sample_metaData.html("");
        Object.entries(metaID).forEach((key) => {   
                sample_metaData.append("h5").text(key[0].toUpperCase() + ": " + key[1]);    
        });
    });
}

//Create the plotCharts using D3.
function createPlot(id) {
    d3.json('samples.json').then(data => {
        console.log(data)
        var samples = data.samples.filter(sample => sample.id === id)[0];
        console.log(samples);
        var sample_values = samples.sample_values.slice(0, 10).reverse();
        var topIDs = samples.otu_ids.slice(0, 10).reverse();
        var otu_ids = topIDs.map(id => "OTU " + id)
        var otu_labels = samples.otu_labels.slice(0, 10);

        var barTrace = [{x: sample_values, y: otu_ids, type:"bar",
            text: otu_labels, orientation: "h",
            marker: {color: 'rgb(65,105,225)',
                    opacity: 0.9}}];

        var layout = {title: "Top 10 Bacterial Cultures Found"};

        Plotly.newPlot("bar", barTrace, layout);
        
        var bubbleTrace = [{x: samples.otu_ids, y: samples.sample_values, mode: "markers", 
            marker: {
            size: samples.sample_values,
            color: samples.otu_ids},
            text: samples.otu_labels}];

        var layout = {xaxis:{title: "OTU ID"}, height: 800};

        Plotly.newPlot("bubble", bubbleTrace, layout); 
    });    
}
    