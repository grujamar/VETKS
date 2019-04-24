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

                    /*$('#data-json-wrapper').empty();*/
                    $('#user-login').fadeOut('fast');

                    /*
                     for (var x in data) {
                     $('#data-json-wrapper').append('<h2>' + data[x].id + '. ' + data[x].title + '</h2>');
                     $('#data-json-wrapper').append('<p>' + data[x].body + '</p> <hr>');
                     }
                     */
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

    //////////////////////////////////////////////




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










});