function buildCharts(id) {
  d3.json("samples.json").then((data) => {

      var otu_ids = data.samples[0].otu_ids;
      var sample_values =  data.samples.sample_values.slice(0,10).reverse();
      var otu_labels =  data.samples.otu_labels.slice(0,10);
      var topOTU = (data.samples.otu_ids.slice(0, 10)).reverse();
      var OTUS = topOTU.map(d => "OTU " + d);
      var samples = data.samples.filter(s => s.id.toString() === id);

      var trace = {
          x: sampleValues,
          y: OTUS,
          text: otu_labels,
          type:"bar",
          orientation: "h",
          marker: {
          color: '#0000FF'},
      };

      var data = [trace];

      var layout = {
          title: "Top 10 Bacteria Cultures Found:",
          height: 450,
          width: 600
      }

      Plotly.newPlot("bar", data, layout);
      
  
      var trace_2 = {
          x: samples.otu_ids,
          y: samples.sample_values,
          mode: "markers",
          marker: {
              size: samples.sample_values,
              color: samples.otu_ids
          },
          text: data.otu_labels
      };

      var layoutOTU_ID = {
          xaxis:{title: "OTU ID"},
          height: 700,
          width: 800
      };

      var data_OTU = [trace1];


      Plotly.newPlot("bubble", data_OTU, layoutOTU_ID); 
  
  });
}  

function demographicINFO(id) {
  d3.json("samples.json").then((data)=> {

      var metaData = data.metaData;

      var filteredResult = metaData.filter(meta => meta.id.toString() === id)[0];
      
      var demographic_info = d3.select("#sample-metadata");
      
      demographic_info.html("");

      Object.entries(filteredResult).forEach((id) => {   
          demographic_info.append("h5")
          .text(id[0]
          .toUpperCase() + ": " + id[1] + "\n");    
      });
  });
}

function options(id) {
  buildCharts(id);
  demographicINFO(id);
}


function init() {
  var dropdownMenu = d3.select("#selDataset");
  d3.json("samples.json").then((data)=> {
      data.names.forEach(function(name) {
          dropdownMenu.append("option")
          .text(name)
          .property("value");
      });
      
      buildCharts(data.names[0]);
      demographicINFO(data.names[0]);
  });
};
init();

function optionChanged(id) {
  buildCharts(id);
  demographicINFO(id);
};

init();