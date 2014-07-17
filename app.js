// Add URL parameter parsing to the View page.
$(function () {
    $.mobile.paramsHandler.addPage(
        "view",  // jquery mobile page id which will accept parameters
        ["id"],    // required parameters for that page
        [],         // optional parameters for that page,
        function (urlVars) {
            $("#nid").html(urlVars.id);
        }
    );

    $.mobile.paramsHandler.init();
});

// On List page, call out to Drupal to get the list of nodes.
$(document).on("pageinit", "#list", function( event ) {
  $.ajax({
    url: "http://d8ws.webchick.net/node",
    type: "GET", // Default.
    // Add custom header for HAL.
    beforeSend: function( jqXHR ) {
      jqXHR.setRequestHeader('Accept', 'application/hal+json');
    }
  })
  .done(function( data ) {
    var items = [];

    // Request was successful; loop through each result.
    $(data).each(function( key, value ) {
      var title = $(data)[key]["title"][0]["value"];

      // Get the node ID of the record from the end of the URL.
      // @todo: There *has* to be a better way than this. :P
      var url = $(data)[key]["_links"]["self"]["href"];
      var nid = url.substring(url.lastIndexOf('/') + 1);

      // Build an array of rows.
      items.push('<li><a href="#view?id=' + nid + '">' + title + '</a></li>');
    });

    // Add rows to the listview.
    $("#content-list").append( items.join('') );

    // Refresh the listview to style the new rows.
    $("#content-list").listview("refresh");
  })
  .fail(function() {
    alert( "error" );
  });
});
