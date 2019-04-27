var map = L.map('mapid').setView([52.226958, 21.010151], 12);
var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, { minZoom: 3, maxZoom: 18, attribution: osmAttrib });		
map.addLayer(osm);
map.on('click', onMapClick);

function onMapClick(e) {
    var randomColor = '#' + Math.random().toString(16).slice(-3);
    var marker = L.marker([e.latlng.lat, e.latlng.lng], {
        icon: getIcon(randomColor), 
        draggable: true
    }).addTo(map);
    createTableRow(marker, randomColor);
    marker.on('move', editTableRow);
    marker.bindPopup('<b>Marker ' + marker._leaflet_id + '.</b>').openPopup();
}

function getIcon(color) {
    return L.divIcon({
        className: 'leaflet-div-icon', 
        html: '<i class="fas fa-map-marker-alt fa-2x" style="color: ' + color + '"></i>'
    });
}

function createTableRow(marker, color) {
    var row = '<tr id="marker-' + marker._leaflet_id + '"><td>' + marker._leaflet_id
        + '</td><td id="latitude">' + marker._latlng.lat + '</td><td id="length">' + marker._latlng.lng
        + '</td><td><i class="fas fa-map-marker-alt fa-2x" style="color: ' + color + '"></i></td></tr>'
    $('#marks-table > tbody:last').append(row);
}

function editTableRow(e) {
    $('#marker-' + e.target._leaflet_id + ' #latitude').text(e.latlng.lat);
    $('#marker-' + e.target._leaflet_id + ' #length').text(e.latlng.lng);
}