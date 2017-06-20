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
            layers: [layers.bmapgrau],
            center: [47.802904,12.9863902],
            zoom: 10
        });
		
        
        // Maßstab hinzufügen
        L.control.scale({
            maxWidth: 200,
            metric: true,
            imperial: false
        }).addTo(map);
		
		// Farbige Flächen der Naturparke mit Popup hinzufügen
        var Flaechennaturpark = L.geoJSON(window.naturparkFlaeche, {
            onEachFeature : function (feature, layer) {
                var markup = '<h3>' + 'Naturpark' + feature.properties.NAME + '</h3>';
				markup += '<a target="_blank" href="https://www.naturparke.at/naturparke/salzburg/">Homepage Naturparke</a>';
                layer.bindPopup(markup);
            },
            style : function (feature) {
                var fill = 'green';
				return {
                    color : fill,
					}
            }
        }).addTo(map);
        
		// Radwege mit Pop-up und Farbe definieren
        var Linienradwege = L.geoJSON(window.radwegLinien, {
            onEachFeature : function (feature, layer) {
                var markup = '<h3>' + feature.properties.BEZEICHNUN + '</h3>';
				markup += '<li>' + 'Streckenverlauf: ' + feature.properties.Bedeutung + '</li>';
				markup += '<li>' +'<a target="_blank" href= "http://' + feature.properties.Homepage + '">Homepage</a></div>';
                layer.bindPopup(markup);
            },
            style : function (feature) {
                var fill = 'red';
				return {
                    color : fill,
					}
            }
        }).addTo(map);
		
		//Cluster für Burgen definieren 
        var clusterGruppeburg = L.markerClusterGroup().addTo(map);
        
        var Punkteburgen = L.geoJSON(window.burgenPunkte,{
		        onEachFeature: function(feature, layer) {
				var markup = '<h3>' + feature.properties.Name + '</h3>';
				markup += '<li>' + 'Adresse: ' + feature.properties.Adresse + '</li>';
				markup += '<li>' + 'Ort: ' + feature.properties.Ort + '</li>';
				markup += '<li>' +'<a target="_blank" href="' + feature.properties.DBLink + '">Homepage</a></div>';

                layer.bindPopup(markup);
				},
				
				pointToLayer: function(feature,latlng){
					return L.marker(latlng, {
		                icon: L.icon({
                        iconSize: [20, 20],
                        iconAnchor: [1, 1],
                        popupAnchor: [1, 1],
                        iconUrl: 'http://www.data.wien.gv.at/icons/burgschlossogdsichtbar.png'
						})
					});
				}
			}).addTo(clusterGruppeburg);			
		
        
         L.control.layers({
            "basemap.at - STANDARD": layers.geolandbasemap,
            "basemap.at - GRAU": layers.bmapgrau,
            "basemap.at - OVERLAY": layers.bmapoverlay,
            "basemap.at - HIGH-DPI": layers.bmaphidpi,
            "basemap.at - ORTHOFOTO": layers.bmaporthofoto30cm,
            "OpenStreetMap": layers.osm,
        }, {
            "Radwege": Linienradwege,
            "Burgen und Schlösser": clusterGruppeburg,
            "Naturparks": Flaechennaturpark,
        }).addTo(map)
};