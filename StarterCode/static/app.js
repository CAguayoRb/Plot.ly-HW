// Get data to build plots 
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
      var otus_data = data.metadata.map (d => d.otus_data)
      var otu_ids = data.samples[0].otu_ids;
      var sample_values = data.samples.sample_values.slice(0,10).reverse();
      var otu_labels =  data.samples.otu_labels.slice(0,10);
      var topOTU = (data.samples.otu_ids.slice(0, 10)).reverse();
      var OTUS = topOTU.map(d => "OTU " + d);
      var samples = data.samples.filter(s => s.id.toString() === id);

      var dataBar = {
          type:"bar",
          x: sampleValues,
          y: OTUS,
          text: otu_labels,
          marker: {
          color: '#0000FF'},
      };


      var layoutBar = {
          title: "Top 10 Bacteria Cultures Found:",
          height: 450,
          width: 600
      }

      Plotly.newPlot("bar", dataBar, layoutBar);
      
      buildPlot();
  
      var dataBubble = {
          x: samples.otu_ids,
          y: samples.sample_values,
          mode: "markers",
          marker: {
              size: samples.sample_values,
              color: samples.otu_ids
          },
          text: data.otu_labels
      };

      var layoutBubble = {
          xaxis:{title: "OTU ID"},
          height: 700,
          width: 800
      };


      Plotly.newPlot("bubble", dataBubble, layoutBubble); 
  
  });
}

buildPlot();

//Get info for the demographics table. Build table. 

function DemoInfo(sample) {
  d3.json("samples.json").then((data)=> {

      var metaData = data.metaData;
    // var table = d3.select("#summaryTableMetadata");
    // var tbody = table.select("tbody");
    // buildTable = (otus_data, otu_ids, sample_values);
      var filteredResult = metaData.filter(sampleobject => sampleobject(id))
      
      var demographic_info = d3.select("#sample-metaData");
      
      demographic_info.html("");

      Object.entries(filteredResult).forEach((sample) => {   
          demographic_info.append("tr")
          .text(id)    
      });
  });
}

//function getNewInfo(sample) {
//  buildCharts(sample);
// DemoInfo(sample);
// }


function init() {
  var dropdownOTU = d3.select("#selDataset");
  d3.json("samples.json").then((data)=> {
      data.names.forEach(function(name) {
          dropdownOTU.append("option")
          .text(sample)
          .property("value", sample);
      });
      
      buildCharts(data.names[0]);
      DemoInfo(data.names[0]);
  });
};
//init();

function newInfo(sample) {
  buildCharts(sample);
  DemoInfo(sample);
};

init();