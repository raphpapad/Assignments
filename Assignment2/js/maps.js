"use strict";

const xhr = new XMLHttpRequest();

var map;
var markers;
var mar;
var mapnik;

var popup;

var lon = 0;
var lat = 0;

var city0;

function map_func(){
    var service = 'https://nominatim.openstreetmap.org/search'+'?q='+document.getElementById("country").value+'+'+document.getElementById("city").value+'+'+document.getElementById("address").value+'&format='+"json"+'&limit='+1;

    xhr.addEventListener("readystatechange", function(){
        if (xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.responseText);
            var JSON_parser_response = JSON.parse(xhr.responseText);
            if(JSON_parser_response[0] == null) {
                document.getElementById("message4").innerHTML = "Service is NULL. The elements that you gave are invalid.";
                document.getElementById("message4").style.color = "red";
            }
            else if(document.getElementById("city").value != "") {
                /*Mporei na exei to Region of Crete sta ellinika opote prepei na balw JSON_parser_response[0].display_name.includes("Κρήτη") == false*/
                if(JSON_parser_response[0].display_name.includes("Region of Crete") == false) {
                    document.getElementById("message4").innerHTML = "This service is only available in the region of Crete.";
                    document.getElementById("message4").style.color = "red";
                }
                else {
                    lon = JSON_parser_response[0].lon;
                    lat = JSON_parser_response[0].lat;
                    document.getElementById("message4").innerHTML = "";
                }
            }
            else {
                lon = JSON_parser_response[0].lon;
                lat = JSON_parser_response[0].lat;
                document.getElementById("message4").innerHTML = "";
            }
        }
    });
    xhr.open("GET", service);
    xhr.send();
}

function marker_project(){
    map = new OpenLayers.Map("map");
    mapnik = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);

    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
	var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
	var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);

    markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    mar = new OpenLayers.Marker(position);
    var message = document.getElementById("address").value;
    mar.events.register('mousedown', mar, function() {
        handler(position,message);});
    markers.addMarker(mar);

    var zoom = 10;
    map.setCenter (position, zoom);
}

function handler(position, message){
    popup = new OpenLayers.Popup.FramedCloud("Popup", position, null, message, null, true );
    map.addPopup(popup);
    city0 = document.getElementById("city").value
}

function change_map() {
    if(city0 != document.getElementById("city").value) {
        map.removeLayer(markers);
        map.removeLayer(mapnik);
        map.removePopup(popup);

        mapnik = new OpenLayers.Layer.OSM();
        map.addLayer(mapnik);

        var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);

        markers = new OpenLayers.Layer.Markers("Markers");
        map.addLayer(markers);
        mar = new OpenLayers.Marker(position);
        var message = document.getElementById("address").value;
        mar.events.register('mousedown', mar, function() {
            handler(position,message);});
        markers.addMarker(mar);

        var zoom = 10;
        map.setCenter (position, zoom);

        document.getElementById("message4").innerHTML = "";
    }
    else {
        document.getElementById("message4").innerHTML = "You haven't change city.";
        document.getElementById("message4").style.color = "red";
    }
}

function show_map() {
    marker_project();
};

function hide_map(){
    document.getElementById("map").classList.toggle("hidden");
};
