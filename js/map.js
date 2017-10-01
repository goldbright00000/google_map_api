function convertToMapPoints() {
  var loc = [[40.812527010636536,-74.15256386691237], [40.750386968567405,-73.97805431926156], [40.71992686553926,-73.67976183140183]];
  var pre_content = '<div id="iw-container"><div class="iw-title">';
  var middle_content = '</div><div class="iw-content"><div style="color: #666;">Details from Google Maps</div><br/><div style="font-weight: bold;">';
  var end_content = '</div><br/><div><a href="#">888-504-4204</a></div><br/><div><a href="#" style="color: #007bff;font-weight: bold;" onclick="find_location(2)">View in Google Maps</a></div></div></div>';
  var contentString = [
    ['Nutley, NJ', '230 Centre St, Nutley, NJ 07110'],
    ['Grand Central', '110 E 40th St, New York, NY 10016'],
    ['Long Island', '110 New Hyde Park Rd, Garden City, NY 11530']
  ];

  var locations = [];

  for(var i= 0; i < loc.length; i++) {

    locations.push(new Location(
       new google.maps.LatLng(loc[i][0], loc[i][1]),
       new google.maps.InfoWindow({
          content: pre_content + contentString[i][0] + middle_content + contentString[i][1] + end_content,
          maxWidth: 280
       })
    ));

  }

  return locations;
}

function Location(latlon, message){
   this.latlon = latlon;
   this.message = message
};

function initMap() {

   var mapCanvas = document.getElementById("map");
   var myCenter=new google.maps.LatLng(40.780386968567405,-73.97805431926156);
   var mapOptions = {center: myCenter, zoom: 10};
   var map = new google.maps.Map(mapCanvas, mapOptions);
   icon = "images/clipart-green-home-icon-8a2b.png";
   locations = convertToMapPoints();

   locations.forEach(function(n, i){
      var marker = new google.maps.Marker({
         position: n.latlon,
         map: map,
         icon: icon,
      });

      google.maps.event.addListener(map, 'click', function() {
         for (var i = 0; i < locations.length; i++) {
            locations[i].message.close();
         }
      });

      google.maps.event.addListener(marker, 'click', function(e){

         for (var i = 0; i < locations.length; i++) {
            locations[i].message.close();
         }

         currentSelectedMarker = n;
         n.message.open(map, marker);
      

      google.maps.event.addListener(n.message, 'domready', function() {

          // Reference to the DIV that wraps the bottom of infowindow
          var iwOuter = $('.gm-style-iw');
          
          var iwBackground = iwOuter.prev();

          // Removes background shadow DIV
          iwBackground.children(':nth-child(2)').css({'display' : 'none'});

          // Removes white background DIV
          iwBackground.children(':nth-child(4)').css({'display' : 'none'});

          // Moves the infowindow 115px to the right.
          iwOuter.parent().parent().css({left: '80px'});

          // Moves the shadow of the arrow 76px to the left margin.
          iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

          // Moves the arrow 76px to the left margin.
          iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

          // Changes the desired tail shadow color.
          iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

          // Reference to the div that groups the close button elements.
          var iwCloseBtn = iwOuter.next();

          // Apply the desired effect to the close button
          iwCloseBtn.css({opacity: '1', right: '40px', top: '4px',width: '26', height: '26', border: '7px solid #48b5e9', 'border-radius': '12px', 'box-shadow': '0 0 5px #3990B9'});

          // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
          if($('.iw-content').height() < 140){
            $('.iw-bottom-gradient').css({display: 'none'});
          }

          // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
          iwCloseBtn.mouseout(function(){
            $(this).css({opacity: '1'});
          });
        });
      });
   });

}

function find_location(i) {
   if (i == 0) {
      var url = "https://www.google.com/maps/place/230+Centre+St,+Nutley,+NJ+07110/@40.8127958,-74.1582544,17z/data=!3m1!4b1!4m5!3m4!1s0x89c2558ee0929075:0xb0ae5f95e606499c!8m2!3d40.8127958!4d-74.1560657";
   }
   else if (i == 1){
      var url = "https://www.google.com/maps?q=110+E+40th+St,+New+York,+NY+10016,+USA&ftid=0x89c25901448019bf:0x1565f2716c6e8b44";
   }
   else{
      var url = "https://www.google.com/maps?q=110+New+Hyde+Park+Rd,+Garden+City,+NY+11530,+USA&ftid=0x89c262e7b409fde9:0x81bcc9d39e9834ba";
   }
   window.open(url);
}