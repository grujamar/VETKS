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
   //-------------------TABLE-------------------------------------------
    $.ajax({
        url: 'http://ucenickidomovi.pis.rs/VetWebService/api/person',
        dataType: 'json',
        beforeSend: function () {
            $('#example').html('<img src="https://i.gifer.com/7YQl.gif">');
        }
    })
            .done(function (data) {
                //$('#example').empty();
                console.log(data);
                //var objData = jQuery.parseJSON(data);
                //console.log(objData);
                //var theadTable = $('<thead class="thead-dark"><tr><th>Ime</th><th>Prezime</th><th>Titula</th><th>Datum rodjenja</th><th>Fotografija</th><th>Broj Licence</th><th>Rok važenja licence</th><th></th></tr></thead>');
                //var tr;
                //var tfootTable = $('<tfoot><tr><th><input type="text" data-search=".name"></th><th><input type="text" data-search=".lastName"></th><th><input type="text" data-search=".title"></th><th><input type="text" data-search=".dateOfBirth"></th><th><input type="text" data-search=".photo"></th><th><input type="text" data-search=".licenseNumber"></th><th><input type="text" data-search=".licenseValidity"></th></tr></tfoot>');
                for (var x in data) {
                    /*
                    $('#example').append(theadTable);                 
                    $('#example').append("<tbody id='myTable'><tr><td>" + data[x].name + 
                                                        "</td><td>" + data[x].lastName + 
                                                        "</td><td>" + data[x].title + 
                                                        "</td><td>" + (data[x].dateOfBirth).substring(0, 10) + 
                                                        "</td><td>" + data[x].photo + 
                                                        "</td><td>" + data[x].licenseNumber + 
                                                        "</td><td>" + (data[x].licenseValidity).substring(0, 10) + 
                                                        "</td><td><button id='chooseUser' class='btn btn-outline-secondary' value="+data[x].personId+">Izaberi korisnika</button></td></tr></tbody>");
                                                
                                                
                     */                           
                    var table = $('#example1').DataTable();

                    var table_rows = '<tr><td>'+data[x].name+
                                     '</td><td>'+ data[x].lastName + 
                                     '</td><td>'+ data[x].title +
                                     '</td><td>'+ (data[x].dateOfBirth).substring(0, 10) +
                                     '</td><td><img src="https://api.adorable.io/avatars/150x150/abott@adorable.png">\n\
                                        </td><td>'+ data[x].licenseNumber + 
                                     '</td><td>'+ (data[x].licenseValidity).substring(0, 10) +'</td>\n\
                                      <td><button id="chooseUser" class="btn btn-outline-secondary" value='+data[x].personId+'>Izaberi korisnika</button></td></tr>';

                    table.rows.add($(table_rows)).draw();
                }
                
            })
            .fail(function (jqXHR, statusText) {
                $('#example1').text(jqXHR.status + '-' + jqXHR.statusText + '-' + statusText);
            });
            /*
            $("#myInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                //console.log(value);
                $("#myTable tr").filter(function() {
                  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                });
                
            });*/
    
    
    ///////////////////////////////////////////////
    
    /////////////////////////////////////////////////////////////////////////
   //-------------------ChooseUser-------------------------------------------
    $("#example1").on("click","#chooseUser" , function(){
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