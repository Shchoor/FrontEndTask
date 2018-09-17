"use strict";function onPartnersUpdate(e,t,a){$("#companyPartnersList").empty(),$.each(a.partners,function(e,t){let a='<div class="progress progress-bar-vertical flex-item">\n            <div class="progress-bar bg-info" role="progressbar" style="height:'+t.value+'%;" ></div>\n            <div class="progress-bar-title"><h6>'+t.name+" "+t.value+" %</h6></div>\n        </div>";$("#companyPartnersList").append(a)})}function dynamicSort(e){var t=1;return"-"===e[0]&&(t=-1,e=e.substr(1)),function(a,n){return(a[e]<n[e]?-1:a[e]>n[e]?1:0)*t}}function getDate(e){var t=new Date(1e3*e),a=t.getFullYear(),n=t.getMonth(),s=t.getDate();return s<10&&(s="0"+s),n<10&&(n="0"+n),s+"."+n+"."+a}function getDescription(e){return e.length>90?e.substring(0,90)+"...":e}$(function(){$.ajax({type:"GET",url:"http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList",dataType:"json",encode:!0}).done(function(e){console.log(e);let t=!1,a=null,n="-value";setTimeout(function(){$.each(e.list,function(e,s){$("#companiesList").append('<a href="#" id="company'+e+'" class="list-group-item list-group-item-action">'+s.name+"</a>"),$("#company"+e).click(function(){onPartnersUpdate(s.partners.sort(dynamicSort(n)),e,s),$("#byNameUp").click(function(){onPartnersUpdate(s.partners.sort(dynamicSort("name")),e,s),n="name"}),$("#byNameDown").click(function(){onPartnersUpdate(s.partners.sort(dynamicSort("-name")),e,s),n="-name"}),$("#byPersentageUp").click(function(){onPartnersUpdate(s.partners.sort(dynamicSort("value")),e,s),n="value"}),$("#byPersentageDown").click(function(){onPartnersUpdate(s.partners.sort(dynamicSort("-value")),e,s),n="-value"}),!1===t?($("#companyPartners").css("display","block"),t=!0):!0===t&&a===e&&($("#companyPartners").css("display","none"),t=!1),a=e})}),$("#totalCompanies").append("<strong>"+e.list.length+"</strong>"),$("#loader1").css("display","none"),$("#loader2").css("display","none"),$("#companiesList").css("display","block"),$("#totalCompanies").css("display","block"),$(".list-group .list-group-item").click(function(e){$(".list-group .list-group-item").removeClass("active"),$(e.target).addClass("active")})},500)}),$.ajax({type:"GET",url:"http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList",dataType:"json",encode:!0}).done(function(e){$.each(e.list,function(e,t){let a='<div id="slide'+e+'" class="carousel-item">\n                <img class="image" src="'+t.img+'" alt="img'+e+'">\n                <div class="carousel-caption text-dark">\n                    <h6>'+t.link+"</h6>\n                    <p>"+getDescription(t.description)+"</p>\n                    <p><b>"+t.author+"</b></p>\n                    <p>Posted: "+getDate(t.date)+"</p>\n                </div>\n            </div>",n='<li class="bg-secondary" data-target="#demo" data-slide-to="'+e+'"></li>';$("#slideshow").append(a),$("#indicators").append(n)}),$("#slide0").addClass("active"),$("#loader4").css("display","none"),$("#demo").css("display","block")})}),$(function(){$("form").submit(function(e){var t={name:$("input[name=name]").val(),secondname:$("input[name=secondname]").val(),email:$("input[name=email]").val(),gender:$("select[name=gender]").val(),pass:$("input[name=pass]").val()};$.ajax({type:"POST",url:"http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration",data:t,dataType:"json",encode:!0}).done(function(e){"OK"===e.status?($("#message").empty().append('<div class="alert alert-success" role="alert">User has been successfully created. Redirecting...</div>'),setTimeout(function(){$(location).attr("href","./companies.html")},2e3)):"Error"===e.status?($("#message").empty().append('<div class="alert alert-danger" role="alert">'+e.message+"</div>"),console.log(e)):$("#message").empty().append('<div class="alert alert-warning" role="alert">Woops, something went wrong</div>')}),e.preventDefault()})});