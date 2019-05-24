$(document).ready(function () {

//Validation form start
    $(function () {
        ValidateLogin();
    });
    function ValidateLogin() {
        $(".user-login-form").validate({
            highlight: function (element) {
                $(element).closest('.form-group').addClass("has-danger");
                $(element).addClass("form-control-danger");
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
                $(element).removeClass('form-control-danger').addClass('form-control-success');
            },
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                email: {
                    required: 'Email je obavezan',
                    email: 'Email nije u validnom formatu'
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
    }

    /*
     //Form Validation
     //------------------LOGIN JSON----------------
     
     $('#ajax-json').click(function () {
     var Validation = $(".user-login-form").valid();
     //console.log("Console log " + Validation);
     if (Validation){
     var userEmail = $('#userEmail').val();
     var userPassword = $('#userPassword').val();
     var loginError = true;
     console.log("userInfo: " + userEmail + " " + userPassword + " " + loginError);
     
     $.ajax({
     type: 'POST',
     url: 'https://jsonplaceholder.typicode.com/posts',
     dataType: 'json',
     beforeSend: function () {
     $('#user-login').html('<img src="https://i.gifer.com/7YQl.gif">').fadeIn('fast');
     }
     })
     .done(function (data) {
     
     
     $('#user-login').fadeOut('fast');
     
     
     $.each(data, function (key, value) {
     if (userEmail === value.title && userPassword === value.body) {
     loginError = false;
     }
     });
     
     if (loginError === false) {
     document.locattion = "index.php?userEmail=" + userEmail;
     console.log("index.html: " + userEmail + " " + userPassword + " " + loginError);
     } else {
     $('#user-login').slideUp('slow').slideDown('slow');
     if (userEmail !== ''){
     }else{
     $('#userEmail').val('');
     }
     if (userPassword !== ''){
     }else{
     $('#userPassword').val('');
     }
     console.log("login.html: " + userEmail + " " + userPassword + " " + loginError);
     alert("Parametri za prijavu nisu dobri.");
     }
     })
     .fail(function (jqXHR, statusText) {
     
     $('#data-text-wrapper').text(jqXHR.status + '-' + jqXHR.statusText + '-' + statusText);
     console.log("Fail: " + userEmail + userPassword + loginError);
     });
     
     return false;
     
     } 
     });
     */
//////////////////////////////////////////////


    /*
     
     msieversion();
     
     function msieversion() {
     var ua = window.navigator.userAgent;
     var msie = ua.indexOf('MSIE ');
     if (msie > 0) {
     var version = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)));
     if (version == 9 || version == 10) {
     $('html').addClass('ie-old');
     }
     if (version == 9) {
     $('html').addClass('ie-9');
     }
     if (version == 10) {
     $('html').addClass('ie-10');
     }
     }
     return false;
     }
     
     
     //Animate elements on scrool
     function animation() {
     var windowHight = $(window).height();
     var scroll = $(window).scrollTop();
     $('.animation').each(function () {
     var pozicija = $(this).offset().top;
     var animacija = $(this).attr('data-animation');
     if (pozicija < scroll + windowHight - 100) {
     $(this).addClass(animacija);
     }
     });
     }
     
     animation();
     
     $(window).scroll(function () {
     animation();
     });
     
     function backgroundSize() {
     var ww = $(window).width();
     var sectionHeight = $('.display').innerHeight();
     if (ww < 768) {
     var bgrdWidth = 100;
     } else if (ww < 992) {
     var bgrdWidth = 58;
     } else {
     var bgrdWidth = 55;
     }
     var background = bgrdWidth + '%' + sectionHeight + 'px';
     $('.scholl-rules').css('background-size', background);
     }
     ;
     backgroundSize();
     $(window).resize(function () {
     backgroundSize();
     });
     */
/////////////////////////////////////////////////////////////////////////
//-------------------TABLE USERS-------------------------------------------
    if ($('#example1').length > 0) {
        $.ajax({
            url: 'http://ucenickidomovi.pis.rs/VetWebService/api/person',
            dataType: 'json',
            beforeSend: function () {
                $('#example1').hide();
                }
            })
            .done(function (data) {
                //$('#example').empty();
                //console.log(data);
                /*
                 for (var x in data) {
                 var table = $('#example1').DataTable();
                 var table_rows = '<tr><td>' + data[x].name +
                 '</td><td>' + data[x].lastName +
                 '</td><td>' + data[x].title +
                 '</td><td>' + (data[x].dateOfBirth).substring(0, 10) +
                 '</td><td><img src="https://api.adorable.io/avatars/150x150/abott@adorable.png">\n\
                 </td><td>' + data[x].licenseNumber +
                 '</td><td>' + (data[x].licenseValidity).substring(0, 10) + '</td>\n\
                 <td><button id="chooseUser" class="btn btn-outline-secondary" value=' + data[x].personId + '>Izaberi korisnika</button></td></tr>';
                 table.rows.add($(table_rows)).draw();
                 }
                */
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
    
    
    
    /////////////////////////////////////////////////////////////////////////
    //-------------------TABLE CARDS-------------------------------------------
    if ($('#exampleCards').length > 0) {
        $.ajax({
            url: 'http://ucenickidomovi.pis.rs/VetWebService/api/Cards',
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
    
    
    
});