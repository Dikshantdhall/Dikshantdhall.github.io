d3.json("../samples.json").then(function(data){  
  // drop down menu
    var selector = d3.select("#selDataset");
    

    data.names.forEach(function(name){
      selector.append("option").property("value", name).text(name)

    })

  d3.select("#selDataset").on("change", function(d) {
  metaData(d);
  barChart(d);
  bubbleChart(d);
  gaugeChart(d);
});



 // Demographic info 

  function metaData(){
    var inputName = d3.select("#selDataset").property("value");
    console.log(inputName);
    data.metadata.forEach(function(d){
      if(inputName ==  d.id){
        d3.select("#sample-metadata").html("");
        Object.entries(d).forEach(function([key, value]){
        console.log(key, value);
        d3.select("#sample-metadata").append("p").text([`${key} : ${value}`]);
  });
  
  }})};
  metaData();



// barChart
  function barChart(){
    var inputName = d3.select("#selDataset").property("value");
    data.samples.forEach(function(sample){
      if(sample.id == inputName){
        var sampleValues = sample.sample_values.slice(0, 10).reverse();
        var otuIds = sample.otu_ids.slice(0, 10).reverse();
        var labels  = otuIds.map(x => "OTU "+ x);
        var otuLabels = sample.otu_labels.slice(0, 10).reverse();
        var trace = {
          x:sampleValues,
          y:labels,
          orientation:'h',
          text: otuLabels,    
          type:'bar'
          };
        var data = [trace];
        var layout = {
          title: 'Horizontal BarChart with Top 10 OTUs',
          width: 500,
          height: 500
        };
        Plotly.newPlot('bar', data, layout);
      };
    });
  };

  barChart();  



// bubbleChart 
  function bubbleChart(){
    var inputName = d3.select("#selDataset").property("value");
   data.samples.forEach(function(sample){
      if(sample.id == inputName){
        var sampleValues = sample.sample_values.slice(0, 10).reverse();
        var otuIds = sample.otu_ids.slice(0, 10).reverse();
        var otuLabels = sample.otu_labels.slice(0, 10).reverse();
        var trace1 = {
        x: otuIds, 
        y: sampleValues,
        mode: 'markers',
        text : otuLabels, 
        marker: {
          color: otuIds,
          size:sampleValues
        }
        };
        var data = [trace1];
        var layout = {
        title: 'Bubble Chart',
        height: 600,
        width: 600,
        xaxis: {title: "OTU ID"}
        };
        Plotly.newPlot('bubble', data, layout);
      };
    });
  }
  bubbleChart();

    // Gauage Chart

  function gaugeChart(){
    var inputName = d3.select("#selDataset").property("value");
    data.metadata.forEach(function(sample){
      if(sample.id == inputName){
        var freq = sample.wfreq;
        var data = [
          {
            domain: { x: [0, 1], y: [0, 1] },
            value: freq,
            title: { text: "Weekly Washing Frequency" },
            type: "indicator",
            mode: "gauge+number",
            gauge:{
              axis:{range:[0, 9]},

            }
          }
        ];
      
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
      }
    });
  }
  gaugeChart();
})