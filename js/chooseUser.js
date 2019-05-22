$(document).ready(function () {

    function GetURLParameter(sParam) {
        var urlCurrent = $(location).attr('href'); //get current url
        //console.log(urlCurrent);
        var decodedUrl = decodeURIComponent(urlCurrent);
        //console.log(decodedUrl);
        var substring = decodedUrl.substring(decodedUrl.indexOf('?') + 1);
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
    //console.log(personId);
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
                    console.log(data);
                    
                    $('#user-img').empty();
                    $('#user-profile').empty();

                    $('#user-img').append('<figure><img src="https://api.adorable.io/avatars/150x150/abott@adorable.png" alt=""/></figure>');
                    $('#user-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Ime</label></div><div class="col-md-8">' + data.Person.Name + '</div></div><hr>');
                    $('#user-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Prezime</label></div><div class="col-md-8">' + data.Person.LastName + '</div></div><hr>');
                    $('#user-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Titula</label></div><div class="col-md-8">' + data.Person.Title + '</div></div><hr>');
                    $('#user-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Datum rodjenja</label></div><div class="col-md-8">' + (data.Person.DateOfBirth).substring(8, 10) + '-' + (data.Person.DateOfBirth).substring(5, 7) + '-' + (data.Person.DateOfBirth).substring(0, 4) + '</div></div><hr>');
                    if (data.Person.Status === true)
                    {
                        $('#user-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Status</label></div><div class="col-md-8 text-success">Aktivan</div></div><hr>');
                    } else {
                        $('#user-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Status</label></div><div class="col-md-8 text-danger">Neaktivan</div></div><hr>');
                    }

                    $('#card-img').empty();
                    $('#card-profile').empty();
                    //console.log("card profile konacno + " + data);

                    $('#card-img').append('<span class="fa fa-id-card-o"></span>');
                    $('#card-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Broj kartice</label></div><div class="col-md-8">' + data.CardNumber + '</div></div><hr>');
                    $('#card-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Rok važenja kartice</label></div><div class="col-md-8">' + (data.CardValidity).substring(8, 10) + '-' + (data.CardValidity).substring(5, 7) + '-' + (data.CardValidity).substring(0, 4) + '</div></div><hr>');
                    $('#card-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Poslednji put ažurirana</label></div><div class="col-md-8">' + (data.LastUpdateTime).substring(8, 10) + '-' + (data.LastUpdateTime).substring(5, 7) + '-' + (data.LastUpdateTime).substring(0, 4) + '</div></div><hr>');
                    if (data.Status === true){
                        $('#card-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Status</label></div><div class="col-md-8 text-success">Aktivna kartica</div></div><hr>');
                    } else {
                        $('#card-profile').append('<div class="row"><div class="col-md-4"><label class="font-weight-bold">Status</label></div><div class="col-md-8 text-danger">Neaktivna kartica</div></div><hr>');
                    }
                })
                .fail(function (jqXHR, statusText) {
                    if (jqXHR.statusText === "Not Found"){
                        $('#user-profile').html('<p class="error"><strong>Greška!</strong> Ne postoji podaci za izabranu osobu.</p>');
                    }else{
                        $('#user-profile').text(jqXHR.status + '-' + jqXHR.statusText + '-' + statusText);
                    }
                    if (jqXHR.statusText === "Not Found"){
                        $('#card-profile').html('<p class="error"><strong>Greška!</strong> Ne postoji kartica za izabranu osobu.</p>');
                    }else{
                        $('#card-profile').text(jqXHR.status + '-' + jqXHR.statusText + '-' + statusText);
                    } 
                });

    }

});