$(document).ready(function () {
    
    //console.log('Session storage is ' + sessionStorage["data.token"] + ' .Length ' + sessionStorage.length );
    //Chekc if URL contains string index.html
    console.log('Stranica + ' + window.location.href.indexOf("index.html") > -1);
    if (window.location.href.indexOf("index.html") > -1 || window.location.href.indexOf("InsertPerson.html") > -1 || window.location.href.indexOf("cards.html") > -1) {
        if (sessionStorage.length === 0) {
            console.log('Session storage is ' + sessionStorage["data.token"] + ' . Length ' + sessionStorage.length );
            window.location= 'http://localhost:8383/VETKS/login.html';
        }
    }
    
    if (window.location.href.indexOf("login.html") > -1){
        console.log('clear session');
        sessionStorage.clear();
    }
    
    ////-------------------SWEETALERT-------------------------------
    /////////////////////////////////////////////////////////////////
    function successAlertInsertUser() {
        swal({
            title: 'Podaci su uspešno upisani.',
            text: '',
            type: 'OK'
        });
    }
    function successAlertErrorInsertUser() {
        swal({
            title: 'Greška.',
            text: 'Pokušajte ponovo kasnije.',
            type: 'OK'
        });
    }
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    
    
    //Validation form start
    $('#ajax-json').click(function () {
        var userLoginForm = $("#user-login-form-group");

        userLoginForm.validate({
            highlight: function (element) {
                $(element).closest('.form-group').addClass("has-danger");
                $(element).addClass("form-control-danger");
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
                $(element).removeClass('form-control-danger').addClass('form-control-success');
            },
            rules: {
                username:{
                    required:true,
                    rangelength: [2, 20]
                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                username: {
                    required: 'Username je obavezan',
                    rangelength: 'Username mora biti izmedju 2 i 20 karaktera.'
                },
                password: {
                    required: "Lozinka je obavezna",
                    minlength: "Lozinka mora imati bar {0} karaktera"
                }

            },
            errorElement: 'p',
            errorPlacement: function (error, element) {
                error.appendTo($(element).closest('.form-group').find('.error-msg'));
            }
        });
        
        var user = {
                "Username": $('#userName').val(),
                "Password": $('#userPassword').val()
            };
           /*
           var user = {
                "Username":"mare",
                "Password":"P@ssw0rd"
            };
            */
            console.log("userInfo: " + $('#userName').val() + " , " + $('#userPassword').val());
        
        //------------------LOGIN JSON----------------
        if (userLoginForm.valid()){
           $.ajax({
                type: "POST",
                url: "http://ucenickidomovi.pis.rs/VetWebService/api/auth/login",
                data: JSON.stringify(user),
                contentType: "application/json",
                beforeSend: function () {
                    $('.user-login-inner').html('<div class="loading text-center mt-5"><h4>Molimo Vas sačekajte..</h4><img src="images/throbber.gif" class="animated-gif"></div>');
                    //$('#user-login-form-group').html('<img src="https://i.gifer.com/7YQl.gif">');
                }
            })
                .done(function(data){
                    console.log(data);
                    sessionStorage["data.token"] = data.token;
                    
                     $.ajax({
                        type: 'GET',
                        url: 'http://ucenickidomovi.pis.rs/VetWebService/api/person/1',
                        headers: {"Authorization": 'Bearer ' + data.token},
                        success: function(response){
                            console.log('success' + response);
                            //console.log(newData);
                            window.location= 'http://localhost:8383/VETKS/index.html';
                       }
                     });
                })
                 .fail(function(jqXHR, statusText){
                    console.log('Error while loading' + jqXHR + statusText);  
                    location.reload();
                    //successAlertErrorLoginUser();
                    //$('#loading-gif').empty();
                    //$('#user-login-form-group').html('<div class="container-fluid"><div class="row justify-content-center"><div class="form-group col-md-9 col-lg-7"><input type="text" name="username" value="" class="form-control" placeholder="Username" id="userName"><div class="error-msg"></div></div><div class="form-group col-md-9 col-lg-7"><input type="password" name="password" value="" class="form-control" placeholder="Password" id="userPassword"><div class="error-msg"></div></div></div><div class="text-center"><button id="ajax-json" type="submit" name="submit" value="login" class="btn btn-lg btn-info">PRIJAVA</button></div></div>');
                });     
        } 
     });
     
//////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//-------------------TABLE USERS-------------------------------------------
    if ($('#example1').length > 0) {
        console.log("Token vetks" + sessionStorage["data.token"]);
        $.ajax({
            url: 'http://ucenickidomovi.pis.rs/VetWebService/api/person',
            headers: {"Authorization": 'Bearer ' + sessionStorage["data.token"]},
            dataType: 'json',
            beforeSend: function () {
                $('#example1').hide();
                }
            })
            .done(function (data) {

               $('#example1').show();
                var data1 = [];
                for (var x in data) {
                    data1.push([data[x].name, 
                                data[x].lastName, 
                                data[x].title, 
                                (data[x].dateOfBirth).substring(8, 10) + '-' + (data[x].dateOfBirth).substring(5, 7) + '-' + (data[x].dateOfBirth).substring(0, 4), 
                                '<img src="https://api.adorable.io/avatars/150x150/abott@adorable.png">', 
                                data[x].licenseNumber,
                                (data[x].licenseValidity).substring(8, 10) + '-' + (data[x].licenseValidity).substring(5, 7) + '-' + (data[x].licenseValidity).substring(0, 4),
                                '<button id="chooseUser" class="btn btn-outline-secondary" value=' + data[x].personId + '>Izaberi korisnika</button>']);
                }
                $('#example1').DataTable({
                    data: data1,
                    lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
                    scrollY: false,
                    scrollX: false,
                    initComplete: function( settings, json ) {
                        
                        $('div.loading').remove();
                        
                      }
                });
            })
            .fail(function (jqXHR, statusText) {
                $('#example1').text(jqXHR.status + '-' + jqXHR.statusText + '-' + statusText);
            });

    }
///////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//-------------------ChooseUser-------------------------------------------
    $("#example1").on("click", "#chooseUser", function () {
        //alert("RADI" + $(this).val());
        //this will redirect us in same window
        var url = 'http://localhost:8383/VETKS/UserInfo.html';
        urlParameter = "?personid=" + $(this).val();
        var encodedUrlParameter = encodeURIComponent(urlParameter);
        url += encodedUrlParameter;
        document.location.href = url;
    });
    /////////////////////////////////////////////////////////////////////////


    ///////////----------------VALIDATE USER FORM-------------------------
    if ($('.calendar').length > 0) {
        $(function () {
            $(".calendar").datepicker({
                showAnim: 'slideDown',
                changeMonth: true,
                changeYear: true,
                dateFormat: 'yy-mm-dd',
                yearRange: '1950:2050'
            });
        });
    }


//---------------------Call Ajax on btnInsert---------------------
//----------------------------------------------------------------
    $("#btnSubmit").click(function () {

        var contactForm = $("#contact-form-id");
        contactForm.validate({
            highlight: function (element) {
                $(element).closest('.form-group').addClass("has-danger");
                $(element).addClass("form-control-danger");
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
                $(element).removeClass('form-control-danger').addClass('form-control-success');
            },
            rules: {
                name: {
                    required: true,
                    rangelength: [2, 20]
                },
                lastName: {
                    required: true,
                    rangelength: [2, 20]
                },
                title: {
                    required: true,
                    rangelength: [2, 20]
                },
                dateOfBirth: {
                    required: true
                },
                licenseNumber: {
                    required: true,
                    rangelength: [2, 20]
                },
                licenseValidity: {
                    required: true,
                    rangelength: [2, 20]
                }
            },
            messages: {
                name: {
                    required: 'Ime je obavezno.',
                    rangelength: 'Ime mora biti izmedju 2 i 20 karaktera.'
                },
                lastName: {
                    required: 'Prezime je obavezno.',
                    rangelength: 'Prezime mora biti izmedju 2 i 20 karaktera.'
                },
                title: {
                    required: 'Polje titula je obavezno.',
                    rangelength: 'Polje titula mora biti izmedju 2 i 20 karaktera.'
                },
                dateOfBirth: {
                    required: 'Polje datum rodjenja je obavezno.'
                },
                licenseNumber: {
                    required: 'Polje broj licence je obavezno.',
                    rangelength: 'Polje broj licence mora biti izmedju 2 i 20 karaktera.'
                },
                licenseValidity: {
                    required: 'Rok važenja licence je obavezno.'
                }

            },
            errorElement: 'p',
            errorPlacement: function (error, element) {
                error.appendTo($(element).closest('.form-group').find('.error-msg'));
            }

        });
        /////////////////////////////////////////////////////////////////////////

        if (contactForm.valid()) {
            var SendInfo = {name: $('#txt_name').val(),
                lastName: $('#txt_lastName').val(),
                title: $('#txt_title').val(),
                dateOfBirth: $('#txt_dateOfBirth').val(),
                licenseNumber: $('#txt_licenseNumber').val(),
                licenseValidity: $('#txt_licenseValidity').val()};

            console.log('Parametri za upis - name: ' + $('#txt_name').val() +
                    ' lastName: ' + $('#txt_lastName').val(),
                    ' title: ' + $('#txt_title').val(),
                    ' dateOfBirth: ' + $('#txt_dateOfBirth').val(),
                    ' licenseNumber: ' + $('#txt_licenseNumber').val(),
                    ' licenseValidity: ' + $('#txt_licenseValidity').val());

            $.ajax({
                type: 'post',
                url: 'http://ucenickidomovi.pis.rs/VetWebService/api/person',
                headers: {"Authorization": 'Bearer ' + sessionStorage["data.token"]},
                data: JSON.stringify(SendInfo),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                beforeSend: function () {
                    $('#user-info').html('<div class="loading text-center mt-5"><h4>Molimo Vas sačekajte da se upišu podaci..</h4><img src="images/throbber.gif" class="animated-gif"></div>');
                },
                success: function (response) {
                    // successful request; 
                    console.log('Uspešno - ' + response);
                    $('#user-info').empty();
                    $('#user-info').html('<div class="row"><aside id="user-img" class="col-12 col-md-3 text-center"></aside><article id="user-profile" class="col-12 col-md-9"><p><strong>Uspešno upisani podaci!</strong></p><a href="InsertPerson.html" class="">nazad</a></article></div>');
                    successAlertInsertUser();
                },
                error: function () {
                    // failed request;
                    $('#user-profile').html('<p class="error"><strong>Greška!</strong> Pokušajte ponovo kasnije.</p>');
                    successAlertErrorInsertUser();
                }
            });

        }
    });
    //////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////
    //-------------------TABLE CARDS-------------------------------------------
    if ($('#exampleCards').length > 0) {
        $.ajax({
            url: 'http://ucenickidomovi.pis.rs/VetWebService/api/Cards',
            headers: {"Authorization": 'Bearer ' + sessionStorage["data.token"]},
            dataType: 'json',
            beforeSend: function () {
                $('#exampleCards').hide();
                }
            })
            .done(function (data) {
               $('#exampleCards').show();
                var data1 = [];
                
                for (var x in data) {
                    data1.push([data[x].cardNumber, 
                                (data[x].cardValidity).substring(8, 10) + '-' + (data[x].cardValidity).substring(5, 7) + '-' + (data[x].cardValidity).substring(0, 4),
                                cardStatus(data[x].status), 
                                (data[x].lastUpdateTime).substring(8, 10) + '-' + (data[x].lastUpdateTime).substring(5, 7) + '-' + (data[x].lastUpdateTime).substring(0, 4),
                                '<button id="chooseCard" class="btn btn-outline-secondary" value=' + data[x].personId + '>Izaberi korisnika</button>']);
                }
                $('#exampleCards').DataTable({
                    data: data1,
                    lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
                    scrollY: false,
                    scrollX: false,
                    initComplete: function( settings, json ) {  
                        $('div.loading').remove(); 
                      }
                });
            })
            .fail(function (jqXHR, statusText) {
                 $('#exampleCards').text(jqXHR.status + '-' + jqXHR.statusText + '-' + statusText);
            });
    }
    
    function cardStatus(jsonStatus){
        if (jsonStatus === true){
            return "Aktivna";
        }else{
            return "Neaktivna";
        }
    }
    /////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////
    //-------------------ChooseCard-------------------------------------------
    $("#exampleCards").on("click", "#chooseCard", function () {
        //alert("RADI" + $(this).val());
        //this will redirect us in same window
        var url = 'http://localhost:8383/VETKS/UserInfo.html';
        urlParameter = "?personid=" + $(this).val();
        var encodedUrlParameter = encodeURIComponent(urlParameter);
        url += encodedUrlParameter;
        document.location.href = url;
    });
    /////////////////////////////////////////////////////////////////////////
    
    
    
//---------------------Call Ajax on btnRegisterSubmit---------------------
//------------------------------------------------------------------------
    $("#btnRegisterSubmit").click(function () {

        var contactFormRegister = $("#contact-form-id-register");
        contactFormRegister.validate({
            highlight: function (element) {
                $(element).closest('.form-group').addClass("has-danger");
                $(element).addClass("form-control-danger");
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
                $(element).removeClass('form-control-danger').addClass('form-control-success');
            },
            rules: {
                username: {
                    required: true,
                    rangelength: [2, 20]
                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                username: {
                    required: 'Username je obavezan',
                    rangelength: 'Username mora biti izmedju 2 i 20 karaktera.'
                },
                password: {
                    required: "Lozinka je obavezna",
                    minlength: "Lozinka mora imati bar {0} karaktera"
                }

            },
            errorElement: 'p',
            errorPlacement: function (error, element) {
                error.appendTo($(element).closest('.form-group').find('.error-msg'));
            }

        });
        /////////////////////////////////////////////////////////////////////////

        if (contactFormRegister.valid()) {
            var SendInfoRegister = {username: $('#txt_username').val(),
                password: $('#txt_password').val()};
            /*
            console.log('Parametri za upis - username: ' + $('#txt_username').val() +
                    ' password: ' + $('#txt_password').val());
            */
            $.ajax({
                type: 'post',
                url: 'http://ucenickidomovi.pis.rs/VetWebService/api/auth/register',
                data: JSON.stringify(SendInfoRegister),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                beforeSend: function () {
                    $('.user-login-inner').html('<div class="loading text-center mt-5"><h4>Molimo Vas sačekajte da se upišu podaci..</h4><img src="images/throbber.gif" class="animated-gif"></div>');
                },
                success: function (response) {
                    // successful request; 
                    console.log('Uspešno - ' + response);
                    $('.user-login-inner').empty();
                    $('.user-login-inner').html('<div class="row"><article id="user-profile" class="col-12"><p><strong>Uspešno upisani podaci.</strong></p><a href="login.html" class="btn btn-info px-4">nazad</a></article></div>');
                    successAlertInsertUser();
                },
                error: function () {
                    // failed request;
                    $('.user-login-inner').html('<p class="error"><strong>Greška!</strong> Pokušajte ponovo kasnije.</p>');
                    successAlertErrorInsertUser();
                }
            });

        }
    });
    
    
    //////////////EYE/////////////////
    $('.password .fa').click(function(){
        $(this).toggleClass('fa-eye fa-eye-slash');
        var type = $(this).parent().prev().attr('type');
        if(type=='password'){
            $(this).parent().prev().attr('type', 'text');
        }else{
            $(this).parent().prev().attr('type', 'password');
        }
    });
    
    
    //////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
});