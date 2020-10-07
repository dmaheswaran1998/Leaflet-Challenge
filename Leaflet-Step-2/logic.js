// var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
// console.log (earthquakes_url)
var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var plate_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"



var earthquake_layer = new L.LayerGroup();

d3.json(earthquake_url, function (data) {
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
    }).bindPopup("<h1> Location of Earthquake:" + place + "</h1> <hr> <h3>Magnitude: " + mag+ "</h3>").addTo(earthquake_layer);
    
  }createMap(earthquake_layer);;
});

var plate_layer= new L.LayerGroup();

d3.json(plate_url, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function() {
      return {
        color: "orange",
        weight: 2
      };
    },
  }).addTo(plate_layer);
});


//var faultline_layer = new L.LayerGroup();



function createMap() {
  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery Â© <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-streets-v11",
    accessToken: API_KEY
  });

  var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery Â© <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var outdoor = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery Â© <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
  });

  var baseLayers = {
    "Satellite": satellite,
    "Grayscale": light,
    "Outdoors" : outdoor,  
  };

  var overlays = {
    "Earthquakes": earthquake_layer,
    "Plates": plate_layer
    
  };

  var mymap = L.map('map', {
    center: [37.8968, -119.5828],
    zoom: 3.5,
    layers: [satellite, earthquake_layer]
  });

  L.control.layers(baseLayers, overlays).addTo(mymap);

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

  legend.addTo(mymap);

  // Adding legend to the map
 

}


