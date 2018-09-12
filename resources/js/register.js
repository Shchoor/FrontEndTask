"use strict";

$(function() {
    
    $('form').submit(function(event) {

        var formData = {
            name: $('input[name=name]').val(),
            secondname: $('input[name=secondname]').val(),
            email: $('input[name=email]').val(),
            gender: $('select[name=gender]').val(),
            pass: $('input[name=pass]').val(),
        };

        // process the form
        $.ajax({
            type: 'POST',
            url: 'http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration', 
            data: formData,
            dataType: 'json', 
            encode: true
        }).done(function(data) {

            if(data.status === 'OK') {
                $(location).attr('href', './companies.html');
            } else if(data.status === 'Form error' || data.status === 'Error') {
                $("#message").empty().append(data.message);
            }else {
                $("#message").empty().append("Woops, something went wrong. Unknown error occured, please try again later");
            }
        });

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });
});
