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



  function gaugeChart(){
    var inputName = d3.select("#selDataset").property("value");
    data.metadata.forEach(function(sample){
      if(sample.id == inputName){
        var freq = sample.wfreq;
      //   var traceGauge = {
      //   type: 'indicator',
      //   showlegend: false,
      //   hole: 0.4,
      //   mode:"gauge +number",
      //   rotation: 90,
      //   values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
      //   text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      //   direction: 'clockwise',
      //   textinfo: 'text',
      //   textposition: 'inside',
      //   marker: {
      //     colors: ['','','','','','','','','','white'],
      //     labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      //     hoverinfo: 'label'
      //   }
      // }
      //   // needle
      //   var degrees = 50, radius = .9
      //   var radians = degrees * Math.PI / 180
      //   var x = -1 * radius * Math.cos(radians) 
      //   var y = radius * Math.sin(radians)
    
      //   var gaugeLayout = {
      //     shapes: [{
      //       type: 'line',
      //       x0: 0.5,
      //       y0: 0.5,
      //       x1: 0.6,
      //       y1: 0.6,
      //       line: {
      //         color: 'black',
      //         width: 3
      //       }
      //     }],
      //     title: 'Chart',
      //     xaxis: {visible: false, range: [-1, 1]},
      //     yaxis: {visible: false, range: [-1, 1]}
      //   }
    
      //   var dataGauge = [traceGauge];
    
      //   Plotly.plot('gauge', dataGauge, gaugeLayout)
      // }
    // })
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