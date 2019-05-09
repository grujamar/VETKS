$(document).ready(function () {
        
    function GetURLParameter(sParam) {
        var urlCurrent = $(location).attr('href'); //get current url
        //console.log(urlCurrent);
        var decodedUrl = decodeURIComponent(urlCurrent);
        //console.log(decodedUrl);
        var substring = decodedUrl.substring(decodedUrl.indexOf('?')+1);
        var sURLVariables = substring.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            //console.log(sParameterName);
            if (sParameterName[0] === sParam) {
                return sParameterName[1];
            }
        }
    }

    var personId = GetURLParameter('personid');
    console.log(personId);
    callAjaxUserInfo(personId);
    
    function callAjaxUserInfo(personID) {
    $.ajax({
        url: "http://ucenickidomovi.pis.rs/VetWebService/api/person/" + personID,
        dataType: 'json',
        beforeSend: function () {
                $('#user-profile').html('<img src="https://i.gifer.com/7YQl.gif">');
            }
        })
            .done(function (data) {
                $('#user-profile').empty();
                console.log(data);
                //var objData = jQuery.parseJSON(data);
                //console.log(objData);

                    $('#user-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Ime</label></div><div class="col-md-8">' + data.name + '</div></div><hr>');
                    $('#user-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Prezime</label></div><div class="col-md-8">' + data.lastName + '</div></div><hr>');
                    $('#user-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Titula</label></div><div class="col-md-8">' + data.title + '</div></div><hr>');
                    $('#user-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Datum rodjenja</label></div><div class="col-md-8">' + (data.dateOfBirth).substring(0, 10) + '</div></div><hr>');
                    if(data.status === true)
                    {
                        $('#user-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Status</label></div><div class="col-md-8">Aktivan</div></div><hr>');
                    }else{
                        $('#user-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Status</label></div><div class="col-md-8">Neaktivan</div></div><hr>');
                    } 
            })
            .fail(function (jqXHR, statusText) {
                $('#user-profile').text(jqXHR.status + '-' + jqXHR.statusText + '-' + statusText);
            });
    
    }
});