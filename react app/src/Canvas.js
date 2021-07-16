import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import $ from 'jquery';
import './Canvas.css'

import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'; // Updating node module will keep css up to date.
//import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import 'mapbox-gl/dist/mapbox-gl.css';

//Acces Token will later be moved, but will stay locally for testing purposes
const ACCESS_TOKEN = 'pk.eyJ1IjoiZG91bHVvIiwiYSI6ImNraHYxamRtaDB6YWoyem4zYTIxdHo3N3QifQ.F2U_Q3NzsGZV30k208sYpw';

const styles = { 
    root: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 55,
        bottom: 0 // it is the bottom
    }
};

class Canvas extends React.Component {


  componentDidMount() {
    // Verify access token
    mapboxgl.accessToken = ACCESS_TOKEN;

    // Check for browser support
    if (!mapboxgl.supported()) {
      alert('Your browser does not support Mapbox GL');
      return;
    }

    // Initialize map object
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/douluo/ckifl98ln4q0a19n2l3wzb0q0',
      center: [-118.2437, 34.0522],
      zoom: 10,
      antialias: true
    });

    // Initialize directions object
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "imperial",
      profile: 'mapbox/driving',
      interactive: false,
    })

    //initialize draw object 
    var draw = new MapboxDraw({
      // Instead of showing all the draw tools, show only the line string and delete tools
      displayControlsDefault: false,
      controls: {
        line_string: true,
        trash: true
      },
      styles: [
        // Set the line style for the user-input coordinates
        {
          "id": "gl-draw-line",
          "type": "line",
          "filter": ["all", ["==", "$type", "LineString"],
            ["!=", "mode", "static"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#438EE4",
            "line-dasharray": [0.2, 2],
            "line-width": 4,
            "line-opacity": 0.7
          }
        },
        // Style the vertex point halos
        {
          "id": "gl-draw-polygon-and-line-vertex-halo-active",
          "type": "circle",
          "filter": ["all", ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "circle-radius": 12,
            "circle-color": "#FFF"
          }
        },
        // Style the vertex points
        {
          "id": "gl-draw-polygon-and-line-vertex-active",
          "type": "circle",
          "filter": ["all", ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "circle-radius": 8,
            "circle-color": "#438EE4",
          }
        },
      ]
    });
    // Add map controls
    map.addControl(directions, 'top-left')
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.GeolocateControl(), 'top-right');
    map.addControl(draw, 'top-right');


    // Sets the POIs to the map
    map.on('click', function (e) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['la-data']
      });
      if (!features.length) {
        return;
      }
      var feature = features[0];

      var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.name + '</h3><p>' + feature.properties.description + '</p>')
        .addTo(map);
    });


    function updateRoute() {
      // Set the profile
      var profile = "driving";
      // Get the coordinates that were drawn on the map
      var data = draw.getAll();
      var lastFeature = data.features.length - 1;
      var coords = data.features[lastFeature].geometry.coordinates;
      // Format the coordinates
      var newCoords = coords.join(';')
      // Set the radius for each coordinate pair to 25 meters
      var radius = [];
      coords.forEach(element => {
        radius.push(25);
      });
      getMatch(newCoords, radius, profile);
    }

    // Make a Map Matching request
    function getMatch(coordinates, radius, profile) {
      // Separate the radiuses with semicolons
      var radiuses = radius.join(';')
      // Create the query
      var query = 'https://api.mapbox.com/matching/v5/mapbox/' + profile + '/' + coordinates + '?geometries=geojson&radiuses=' + radiuses + '&steps=true&access_token=' + mapboxgl.accessToken;

      $.ajax({
        method: 'GET',
        url: query
      }).done(function (data) {
        // Get the coordinates from the response
        var coords = data.matchings[0].geometry;
        // Draw the route on the map
        addRoute(coords);
        
      });
    }

    // Draw the Map Matching route as a new layer on the map
    function addRoute(coords) {
      // If a route is already loaded, remove it
      if (map.getSource('route')) {
        map.removeLayer('route')
        map.removeSource('route')
      } else {
        map.addLayer({
          "id": "route",
          "type": "line",
          "source": {
            "type": "geojson",
            "data": {
              "type": "Feature",
              "properties": {},
              "geometry": coords
            }
          },
          "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
          "paint": {
            "line-color": "#03AA46",
            "line-width": 8,
            "line-opacity": 0.8
          }
        });
      };
    }


    // If the user clicks the delete draw button, remove the layer if it exists
    function removeRoute() {
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      } else {
        return;
      }
    }

    map.on('draw.create', updateRoute);
    map.on('draw.update', updateRoute);
    map.on('draw.delete', removeRoute);
  }
  render() {
    return (
      <>
        <div id="map" style={styles.root} ></div>
        {/* <div class="info-box">
          <div id="info">
            <p>Draw your route using the draw tools on the right.</p>
          </div>
          <div id="directions"></div>
        </div> */}
      </>
    );
  }
}


export default Canvas;