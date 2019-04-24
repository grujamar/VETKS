$(document).ready(function () {

    //Validation form start
    $(function () {
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
    });
    //Form Validation


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



    /* === Forms === */

    /* --- Labels --- */
    /*
     $('.floating-label').next().on('input change focus', function () {
     $(this).prev('.floating-label').addClass('is-floating');
     }).on('blur', function () {
     if (!$(this).val().length > 0 || $(this).is('select') && $(this).val() === 0) {
     $(this).prev('.floating-label').removeClass('is-floating');
     }
     });
     
     $('.floating-label').each(function () {
     var value = $(this).next().val();
     if (value.length > 0) {
     $(this).addClass('is-floating');
     }
     });
     */


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


    /* === Do it on scroll === */

    $(window).on('scroll', function () {
        if (coursesSection.length > 0) {
            courseCardsReveal();
            courseGraphicReveal();
        }
        if (pageCourse.length > 0) {
            navCourse();
        } else {
            navHome();
        }
    });








});