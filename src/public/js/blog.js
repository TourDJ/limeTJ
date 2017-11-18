$(document).ready(function() {
    // Place JavaScript code here...
    $("#btnAddBlog").on("click", function(event) {
        $(this).parents("form")
        .attr({"action": "/blog/add", "method": "get"})
        .submit();
    });

    $("#btnSaveBlog").on("click", function(event) {
        $(this).parents("form")
        .attr({"action": "/blog", "method": "post"})
        .submit();
    });


});
