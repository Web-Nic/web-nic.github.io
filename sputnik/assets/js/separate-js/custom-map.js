
/////////////////////////////////////////////////////////////////
// Map
/////////////////////////////////////////////////////////////////



    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 12,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.6700, -73.9400), // New York

            scrollwheel: false,

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"simplified"},{"gamma":"1.00"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"color":"#ba5858"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"color":"#e57878"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"simplified"},{"lightness":"65"},{"saturation":"-100"},{"hue":"#ff0000"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"simplified"},{"saturation":"-100"},{"lightness":"80"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#eeeeee"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#ba5858"},{"saturation":"-100"}]},{"featureType":"transit.station","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#ba5858"},{"visibility":"simplified"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"hue":"#ff0036"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ba5858"}]}]
        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.6700, -73.9400),
            map: map,
            title: 'Snazzy!'
        });
    }
