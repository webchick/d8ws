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
