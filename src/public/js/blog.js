$(document).ready(function() {
    // Place JavaScript code here...
    $("#btnAddBlog").on("click", function(event) {
        $(this).parents("form")
        .attr({"action": "/blog/add", "method": "get"})
        .submit();
    });

    $("#btnSaveBlog").on("click", function(event) {
        let form = $(this).parents("form");
        
        if(validBlog(form)) {
            form.attr({"action": "/blog", "method": "post"}).submit();
        } else {
            alert("Please input or select require value");
        }
    });

    
    function validBlog(form) {
        let flag = true, parent,
            len = 0, len2 = 0,
            radioParent;

        form.find(".blogInput").each(function( index, element ) {
            parent = $(element).parent();

            if(!element.value) {
                parent.addClass("has-error");
                flag = false;
                return;
            } else {
                parent.removeClass("has-error");
            }
        });


        if(!radioCheckBox(form, "blog-radio", "blog-item", 1))
            flag = false;


        if(!radioCheckBox(form, "blog-check", "blog-item", 2))
            flag = false;

        form.find(".blogSelect").each(function( index ) {
            let _this = $(this);

            if(_this.val() == 0) {
                flag = false;
                _this.parent().addClass("has-error");
            } else {
                flag = true;
                _this.parent().removeClass("has-error");
            }
        });

        return flag;
    }

    function radioCheckBox(form, className, parentClassName, type) {
        let selector = "." + className + ":checked",
            checkElement = form.find( selector ),
            len = checkElement.length,
            parent, 
            flag = true,
            value = ""
            ;

        parent = form.find("." + parentClassName).parent();

        if(len === 0) {
            flag = false;
            parent.addClass("has-error");
        } else {
            flag = true;
            parent.removeClass("has-error");

            if(type == 1) {
                value = checkElement.val();
                $("#open").val(value);
            } else if(type == 2) {
                checkElement.each(function(index) {
                    value += $(this).val();
                    value += index == len - 1 ? "" : ",";
                });
                $("#labels").val(value);
            }
        }

        return flag;
    }

    $(".blogInput, .blogSelect").on("keypress, change", function(event) {
        if($(this).val())
            $(this).parent().removeClass("has-error");
    });

    $(".blog-radio, .blog-check").on("change", function(event) {
        if($(this).val())
            $(this).parent().parent().parent().removeClass("has-error");
    });
});
