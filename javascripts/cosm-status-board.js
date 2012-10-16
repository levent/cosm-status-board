(function($){ 
  $.fn.digits = function(){ 
    return this.each(function(){ 
      $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
  }
})(jQuery);

$(document).ready(function(){

  // This is my user level GET advanced api key
  var api_key = "3P-2DLv_7awcqj9jTLlu_BB1lMiSAKxpc1dPR1lYeWFpTT0g";
  var counter = 0;
  var average = 0;
  var rate = 1;
  var date = new Date;
  var stop = false;

  cosm.setKey(api_key);

  cosm.feed.update(80584, {"datastreams":[{"id":"test", "current_value":(Math.random() * 100.0)}], "version":"1.0.0"}, function(data) {$('#feed_update .status_code').html(data.status);});
  cosm.feed.get(80584, function(data, _, http_response) {
    $('#feed_get .status_code').html(http_response.status);
    $('#feed_get .value').html(data.datastreams[0].current_value);
  });

  cosm.subscribe('firehose', function(event, data) {
    if (data) {
      counter++;
      average = (counter / (((new Date) - date)) * 1000).toFixed(2);
      $('#counter').html(counter).digits();
      $('#average').html(average).digits();
    }
  });

});

