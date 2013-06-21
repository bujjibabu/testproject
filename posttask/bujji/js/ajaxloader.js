function savecomment() {
    var comment = $('#inputpost').val();
    //alert(comment);
    document.getElementById('resultdiv').innerHTML = "Loading Please wait...!";
    url = "bujjiservice/index.php?action=savecomment";
    $.ajax({
        type: "POST",
        url: url,
        data: "comment=" + comment,
        success: "success",
        statusCode: {
            204: function () {
                document.getElementById('resultdiv').innerHTML = "";
                alert("No comments found");
            },
            200: function (data) {
                if (data) {
                    //alert("comment inserted");
                    document.getElementById('content').innerHTML = "";
                    showcomment();
                }
            }
        }
    });
}

function deletecomment(cid) {
    var con = confirm("Do you really want to delete comment");
    if (con) {
        document.getElementById('resultdiv').innerHTML = "Redirecting Please wait...!";
        url = "bujjiservice/index.php?action=deletecomment";
        $.ajax({
            type: "POST",
            url: url,
            data: "commentid=" + cid,
            statusCode: {
                200: function (data) {
                    //alert(data);
                    document.getElementById('resultdiv').innerHTML = "";

                    if (data == 1) {
                        //alert("comment deleted  Successfully");

                        document.getElementById('content').innerHTML = "";
                        showcomment();
                    } else {
                        //alert("Unable to delete comment, please try after some time.");
                    }

                }
            }
        });

        return true;
    } else {
        return false;
    }
}

function showcomment() {
    document.getElementById('postdiv').innerHTML = "";
    showpost();
    document.getElementById('resultdiv').innerHTML = "Loading Please wait...!";
    url = "bujjiservice/index.php?action=getcomment";
    $.ajax({
        type: "GET",
        url: url,
        success: "success",
        statusCode: {
            204: function () {
                document.getElementById('resultdiv').innerHTML = "";
                alert("No comments found");
            },
            200: function (data) {
                // alert(data);
                $("<table>").appendTo('#content');
                $.each(data, function (i, o) {
                    //alert(o+"comment");
                    document.getElementById('resultdiv').innerHTML = "";
                    $("<tr><td>" + o.comment + "</td><td>&nbsp;<input class='btn btn-primary' type='button' value='delete' onclick='deletecomment(" + o.id + ")'></td></tr>").appendTo('#content ');

                });
                $("</table>").appendTo('#content');

            }
        }
    });
}

function showpost() {

    document.getElementById('resultdiv').innerHTML = "Loading Please wait...!";
    url = "bujjiservice/index.php?action=getpost";
    $.ajax({
        type: "GET",
        url: url,
        success: "success",
        statusCode: {
            204: function () {
                document.getElementById('resultdiv').innerHTML = "";
                alert("No posts found");
            },
            200: function (data) {
                // alert(data);
                $("<table>").appendTo('#postdiv');
                $.each(data, function (i, o) {
                    //alert(o+"comment");
                    document.getElementById('resultdiv').innerHTML = "";
                    $("<tr><td id='editid'>" + o.post + "</td><td>&nbsp;<input class='btn btn-primary' type='button' value='edit' onclick='editpost(" + o.id + ")'></td></tr>").appendTo('#postdiv ');

                });
                $("</table>").appendTo('#postdiv');

            }
        }
    });
}

function editpost() {
    var post = prompt("Edit post ", document.getElementById("editid").innerHTML);
    if (post != null) {
        var comment = $('#inputpost').val();
        //alert(comment);
        document.getElementById('resultdiv').innerHTML = "Loading Please wait...!";
        url = "bujjiservice/index.php?action=updatepost";
        $.ajax({
            type: "POST",
            url: url,
            data: "postdata=" + post,
            success: "success",
            statusCode: {
                204: function () {
                    document.getElementById('resultdiv').innerHTML = "";
                    alert("No post found");
                },
                200: function (data) {
                    if (data) {
                        //alert("comment inserted");
                        document.getElementById('postdiv').innerHTML = "";
                        showpost();
                    }
                }
            }
        });
    }
}