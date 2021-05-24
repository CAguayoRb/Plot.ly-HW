//Use the D3 library to read in samples.json
function buildMetadata(sample) {

    // metadata 
   
      d3.json("samples.json").then(function(data){
        var metadata = data.metadata;
        var filterdata = metadata.filter(sampleobject => sampleobject.id==sample);
        var result = filterdata[0];
        var sampleData = d3.select("#sample-metadata");
        sampleData.html("");
        Object.entries(result).forEach(function([key,value]){
          var row = sampleData.append("p");
          row.text(`${key}:${value}`)
        })
      });
  }

  //create dropdown menu
function dropdown(){
    var ID = d3.select("#selDataset");
    d3.json("samples.json").then((data)=>{
        var id = data.names;
        id.forEach((sampleid)=>{
            ID.append("option")
            .text(sampleid)
            .property("value",sampleid)
        })
        var sample1 = id[0];
        buildMetadata(sample1);
        buildCharts(sample1);
    })
}

dropdown()

/*Create a horizontal bar chart .
Use sample_values as the values for the bar chart.
Use otu_ids as the labels for the bar chart.
Use otu_labels as the hovertext for the chart.
*/

function buildCharts(sample) {
    // pull data w json
    d3.json("samples.json").then(function(data){
        var metadata = data.samples;
        var filterdata = metadata.filter(sampleobject => sampleobject.id==sample);
        var result = filterdata[0];

        var OTU_ids = result.otu_ids;
        var OTU_labels = result.otu_labels;
        var samplevalue = result.sample_values;

 // create Bar chart
     
 var barchart = [{
    y: OTU_ids.slice(0,10).map(otu_ids=>`OTU ${otu_ids}`).reverse(),
    x: samplevalue.slice(0,10).reverse(),
    text: OTU_labels.slice(0,10).reverse(),
    type: "bar",
    orientation:"h"
  }];

  var barlayout = {
      title : "Top 10 Bacteria Cultures Found"
     }
     //plot bar chart

  Plotly.newPlot('bar',barchart,barlayout);

 /* Create a bubble chart that displays each sample.
Use otu_ids for the x values.
Use sample_values for the y values.
Use sample_values for the marker size.
Use otu_ids for the marker colors.
Use otu_labels for the text values.
*/
     //Create Bubble chart

     var bubbledata = [{
        x: OTU_ids, 
        y: samplevalue,
        text: OTU_labels,
        mode:"markers",
        marker: {
            size: samplevalue,
            color: OTU_ids,
            colorscale: "fall"
        }

          
      }];

      var bubblelayout = {
        title : "Bacteria Culture Per Sample",
        xaxis: {
            title:"OTU ID"}
    }
//plot bubble chart
    Plotly.newPlot('bubble',bubbledata,bubblelayout)
});}