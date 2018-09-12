"use strict";

$(function() {

    $.ajax({
        type: 'GET',
        url: 'http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList', 
        dataType: 'json', 
        encode: true
    }).done(function(data) {
        console.log(data);
        let open = false,
            clicked;
        
        //added a delay 0.5 sec for smooth work of loaders, as server time responce is so fast
        setTimeout(function() {
            
            //append data to list
            $.each(data.list, function (index, value) {
                $("#companiesList").append('<a  id="company' + index + '" class="list-group-item list-group-item-action">'+ value.name + '</a>');
                $('#company' + index + '').click(function() {
                    $("#companyPartnersList").empty();

                    //display list of partners for each company
                    $.each(value.partners, function (index, value) {
                        let progress =
                        `<div class="progress progress-bar-vertical">
                            <div class="progress-bar" role="progressbar" style="width:`+ value.value +`%;" ></div>
                            <div class="progress-bar-title"><h4>`+ value.name +" "+ value.value+" %"+ `</h4></div>
                        </div>`;

                        $("#companyPartnersList").append(progress);
                    });

                    if(open === false ) {
                        $("#companyPartners").css("display", "block");
                        open = true;
                    } else if(open === true && clicked === index) {
                        $("#companyPartners").css("display", "none"); 
                        open = false;
                    }
                    clicked = index;
                });
            });

            //append data to total circle
            $("#totalCompanies").append("<strong>" + data.list.length + "</strong>");

            //hide loaders and then show content
            $("#loader1").css("display", "none");
            $("#loader2").css("display", "none");
            $("#companiesList").css("display", "block"); 
            $("#totalCompanies").css("display", "block");

            $(".list-group .list-group-item").click(function(e) {
                $(".list-group .list-group-item").removeClass("active");
                $(e.target).addClass("active");
             });

        }, 0);
    });


});
    