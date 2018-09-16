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
                $("#message").empty().append('<div class="alert alert-success" role="alert">User has been successfully created. Redirecting...</div>');
                setTimeout( function() {
                    $(location).attr('href', './companies.html');
                }, 2000);
            } else if(data.status === 'Error') {
                $("#message").empty().append('<div class="alert alert-danger" role="alert">'+ data.message +'</div>');
                console.log(data);
            }else {
                $("#message").empty().append('<div class="alert alert-warning" role="alert">Woops, something went wrong</div>');
            }
        }); 

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });
});
