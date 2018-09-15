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
        clicked = null,
        sortOrder = "-value";
          
        //added a delay 0.5 sec for smooth work of loaders, as server time responce is so fast
        setTimeout(function() {
            
            //append data to list
            $.each(data.list, function (index, value) {
                $("#companiesList").append('<a  id="company' + index + '" class="list-group-item list-group-item-action">'+ value.name + '</a>');

                $('#company' + index + '').click(function() {

                    partnersUpdate(value.partners.sort(dynamicSort(sortOrder)), index, value);
                   
                    //if onlick sort occurs
                    $("#byNameUp").click(function(){
                        let newSortOrder = "name";
                        partnersUpdate(value.partners.sort(dynamicSort(newSortOrder)), index, value);
                        sortOrder = newSortOrder;
                    });
                    $("#byNameDown").click(function(){
                        let newSortOrder = "-name";
                        partnersUpdate(value.partners.sort(dynamicSort(newSortOrder)), index, value);
                        sortOrder = newSortOrder;
                    });
                    $("#byPersentageUp").click(function(){
                        let newSortOrder = "value";
                        partnersUpdate(value.partners.sort(dynamicSort(newSortOrder)), index, value);
                        sortOrder = newSortOrder;
                    });
                    $("#byPersentageDown").click(function(){
                        let newSortOrder = "-value";
                        partnersUpdate(value.partners.sort(dynamicSort(newSortOrder)), index, value);
                        sortOrder = newSortOrder;
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




    $.ajax({
        type: 'GET',
        url: 'http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList', 
        dataType: 'json', 
        encode: true
    }).done(function(data) {
        console.log(data);
    });






});

function partnersUpdate(partners, index, value) {
    $("#companyPartnersList").empty();

    //display list of partners for each company
    $.each(value.partners, function (index, value) {

        let progress =
        `<div class="progress progress-bar-vertical flex-item">
            <div class="progress-bar bg-info" role="progressbar" style="height:`+ value.value +`%;" ></div>
            <div class="progress-bar-title"><h6>`+ value.name +" "+ value.value+" %"+ `</h6></div>
        </div>`;

        $("#companyPartnersList").append(progress);
    });
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}