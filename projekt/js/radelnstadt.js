window.onload = function () {
var layers = {
            geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            osm: L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                subdomains: ['a', 'b', 'c'],
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}),

        };

        // Karte definieren und Ausschnitt setzen
        var map = L.map('sMap', {
            layers: [layers.bmaphidpi],
            center: [47.800966, 13.044655],
            zoom: 13
        });
		
        
        // Maßstab hinzufügen
        L.control.scale({
            maxWidth: 200,
            metric: true,
            imperial: false
        }).addTo(map);
        
        var radroutenstadt = L.geoJSON(window.radroutenstadt, {
            onEachFeature: function (feature,layer){
                layer.bindPopup(feature.properties.id);
            }
        }).addTo(map)
        
        var wifistandorte = L.geoJSON(window.wifistandorte,{
			onEachFeature: function(feature, layer) {
				var markup = '<h3>' + feature.properties.STANDORTNAME + '</h3>';
				markup += '<li>' +'<a target="_blank" href="' + feature.properties.HOMEPAGE + '">Homepage</a></div>';

                layer.bindPopup(markup);
				},
				pointToLayer: function(feature, latlng) {
					return L.marker(latlng, {
						icon: L.icon({
                        iconSize: [16, 16],
                        iconAnchor: [0, 0],
                        popupAnchor: [1, 1],
                        iconUrl: 'icons/wifi.png' 
                    })
                });
            }
        }).addTo(map)
		
		 var poi = L.geoJSON(window.poi,{
			 		onEachFeature: function(feature, layer) {
						var markup = '<h3>' + feature.properties.KATEGORIE + '</h3>';
						markup += '<li>' + 'Adresse: ' + feature.properties.ADRESSE + '</li>';
						markup += '<li>' + 'Ort: ' + feature.properties.BESCHREIBUNG + '</li>';
						markup += '<li>' +'<a target="_blank" href="' + feature.properties.HOMEPAGE + '">Homepage</a></div>';
                layer.bindPopup(markup);
				},
                     pointToLayer: function(feature, latlng) {
						return L.marker(latlng, {
						icon: L.icon({
                        iconSize: [20, 20],
                        iconAnchor: [1, 1],
                        popupAnchor: [1, 1],
                        iconUrl: 'icons/poi.png' 
                    })
                });
            }
        }).addTo(map)
		
        var spielplaetze = L.geoJSON(window.spielplaetze,{
					onEachFeature: function(feature, layer) {
						var markup = '<h3>' + feature.properties.NAME + '</h3>';
						markup += '<li>' + 'Adresse: ' + feature.properties.ANGEBOT+ '</li>';
						markup += '<li>' +'<a target="_blank" href="' + feature.properties.HOMEPAGE + '">Homepage</a></div>';
                layer.bindPopup(markup);
				},
                     pointToLayer: function(feature, latlng) {
						return L.marker(latlng, {
						icon: L.icon({
                        iconSize: [25, 25],
                        iconAnchor: [0, 0],
                        popupAnchor: [1, 1],
                        iconUrl: 'icons/spielplaetze.png' 
                    })
                });
            }
        }).addTo(map)
		
         L.control.layers({
            "basemap.at - STANDARD": layers.geolandbasemap,
            "basemap.at - GRAU": layers.bmapgrau,
            "basemap.at - OVERLAY": layers.bmapoverlay,
            "basemap.at - HIGH-DPI": layers.bmaphidpi,
            "basemap.at - ORTHOFOTO": layers.bmaporthofoto30cm,
            "OpenStreetMap": layers.osm
        }, {
            "Radrouten Stadt Salzburg": radroutenstadt,
            "Points of Interest": poi,
			"Wifi-Standorte": wifistandorte,
            "Spielplätze": spielplaetze
        }).addTo(map)
		
};