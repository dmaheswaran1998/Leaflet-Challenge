// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
// Create a map object
// Creating map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 8
  });
  // Load in geojson data
  
  
  var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery Â© <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  }).addTo(myMap);
  
  
  var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  var geojson;
  
  
  d3.json(geoData, function(data) {
  
    // Create a new choropleth layer
    for (var i = 0; i < data.features.length; i++) {
      var location= data.features[i].geometry.coordinates;
      var location2 = location.slice(0,2).reverse();
  
      
  
      var mag=data.features[i].properties.mag;
      var place= data.features[i].properties.place;
      var radius= mag*20000
  
      var color = "";
      if (mag > 5) {
        color = "#770000";
      }
      else if (mag > 4) {
        color = "#FF6347";
      }
      else if (mag > 3) {
        color = "#FFA500";
      }
      else if (mag > 2) {
        color = "#FFD700";
      }
      else if (mag > 1) {
        color = "#7FFF00";
      }
      else {
        color = "#ADFF2F";
      }
  
  
  
      L.circle(location2, {
        fillOpacity: 1,
        color: "white",
        fillColor: color,
        // Adjust radius
        radius: radius
      }).bindPopup("<h1> Location of Earthquake:" + place + "</h1> <hr> <h3>Magnitude: " + mag+ "</h3>").addTo(myMap);
  
  
    
    
      //Overlay listener for adding
     
  
  
      
  
  
  
      
  
  
  
      
  
  
  
  
    
    
    }
  
    var legend = L.control({position: 'bottomright'});
  
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = [0,1,2,3,4,5]
      var colors = ["#ADFF2F", "#7FFF00","#FFD700","#FFA500","#FF6347","#770000"]
      var labels = ['0-1','1-2','2-3','3-4','4-5','5+'];
  
      // Add min & max
      var legendInfo = "<h2 style=\"background-color: white" + "\">"+"Legend for Magnitude Scale"+"</h2>"
  
      div.innerHTML = legendInfo;
  
      limits.forEach(function(limit, index) {
        div.innerHTML += "<li style=\"background-color: " + colors[index] + "\">"+labels[index]+"</li>"
      });
      return div;
    };
  
    // Adding legend to the map
    legend.addTo(myMap);
  
    
  
    
    
  });
  
  