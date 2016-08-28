/**
 * Created by arjunMitraReddy on 8/6/2016.
 */
(function() {
    "use strict";
    angular.module('amr')
        .controller('loginController', loginController);

    loginController.$inject = ['$location', '$rootScope', '$scope'];

    function loginController($location, $rootScope, $scope) {

        var lCtrl = this;
        lCtrl.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        lCtrl.isFirefox = typeof InstallTrigger !== 'undefined';
        lCtrl.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        lCtrl.isIE = false || !!document.documentMode;
        lCtrl.isEdge = !lCtrl.isIE && !!window.StyleMedia;
        lCtrl.isChrome = !!window.chrome && !!window.chrome.webstore;

        lCtrl.unsafe = true;

        (function() {
            if (lCtrl.isFirefox || lCtrl.isSafari || lCtrl.isIE) {
                lCtrl.unsafe = true;
            }
            else if (lCtrl.isOpera || lCtrl.isEdge || lCtrl.isChrome) {
                lCtrl.unsafe = false;
            }
        })();
        $scope.$on('$routeChangeSuccess', function() {
            var path = $location.path();
            if (path.indexOf('dashboard') != -1) {
            }
            else {
                $(function() {
                    $("#rname").focus();
                });
            }
        });

        lCtrl.addFeedbackForRegister = function() {
            $(function() {
                $('#register_form').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        name: {
                            validators: {
                                stringLength: {
                                    min: 2
                                },
                                notEmpty: {
                                    message: 'Please Enter Your Name'
                                }
                            }
                        },
                        email: {
                            validators: {
                                notEmpty: {
                                    message: 'Please Enter Your Email Address'
                                },
                                emailAddress: {
                                    message: 'Please Enter a Valid Email Address'
                                }
                            }
                        },
                        password: {
                            validators: {
                                notEmpty: {
                                    message: 'Please Enter Your Password'
                                },
                                regexp:	{
                                    regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i,
                                    message: ["Password Must Contain:  A Lowercase Alphabet, ",
                                        "An Uppercase alphabet, ",
                                        "A Number, ",
                                        "A Special Symbol, " +
                                        "Must Contain a minimum of 8 charecters "
                                    ]
                                }
                            }
                        },
                        dob: lCtrl.unsafe ? {
                            validators: {
                                regexp: {
                                    regexp: /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g,
                                    message: "Date Should be in dd/mm/yyyy format"
                                }
                            }
                        } : null

                    }
                }).on('error.field.bv', function(e, data) {
                    if ($('#rname').val() == '' || $('#remail').val() == '' || $('#rpassword').val() == '') {
                        $('#rsubmit').prop("disabled",true);
                    }
                    data.bv.disableSubmitButtons(true);
                }).on('status.field.bv', function(e, data) {
                    if ($('#rname').val() == '' || $('#remail').val() == '' || $('#rpassword').val() == '') {
                        $('#rsubmit').prop("disabled",true);
                    }
                    else {
                        data.bv.disableSubmitButtons(false);
                    }
                })
            });
        };

        lCtrl.addFeedbackForLogin = function() {
            $(function() {
                $('#login_form').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        email: {
                            validators: {
                                notEmpty: {
                                    message: 'Please Enter Your Email Address'
                                },
                                emailAddress: {
                                    message: 'Please Enter a Valid Email Address'
                                }
                            }
                        },
                        password: {
                            validators: {
                                notEmpty: {
                                    message: 'Please Enter Your Password'
                                }
                            }
                        }
                    }
                }).on('error.field.bv', function(e, data) {
                    if ($('#lemail').val() == '' || $('#lpassword').val() == '') {
                        $('#lsubmit').prop("disabled",true);
                    }
                    data.bv.disableSubmitButtons(true);
                }).on('status.field.bv', function(e, data) {
                    if ($('#lemail').val() == '' || $('#lpassword').val() == '') {
                        $('#lsubmit').prop("disabled",true);
                    }
                    else {
                        data.bv.disableSubmitButtons(false);
                    }
                })
            });
        };

        $(document).ready(function() {
            lCtrl.addFeedbackForRegister();
            lCtrl.addFeedbackForLogin();
        });

        lCtrl.userdata = {
            name: null,
            email: null,
            password: null,
            dob: null
        };

        lCtrl.userlogindata = {
            email: null,
            password: null
        };

        lCtrl.showReg = true;
        lCtrl.showRegSpanClass = false;

        lCtrl.showLog = false;
        lCtrl.showLogSpanClass = false;

        lCtrl.toggleReg = function() {
            lCtrl.showReg = true;
            lCtrl.showLog = false;
            lCtrl.showRegSpanClass = false;
            lCtrl.showLogSpanClass = true;
            lCtrl.addFeedbackForRegister();
            lCtrl.successMsg = null;
            $(function() {
                $("#rname").focus();
            })
        };

        lCtrl.toggleLog = function() {
            lCtrl.showReg = false;
            lCtrl.showLog = true;
            lCtrl.showRegSpanClass = true;
            lCtrl.showLogSpanClass = false;
            lCtrl.addFeedbackForLogin();
            $(function() {
                $("#lemail").focus();
            })
        };

        if ($rootScope.logBtn) {
            lCtrl.toggleLog();
        }
        if ($rootScope.signBtn) {
            lCtrl.toggleReg();
        }

        function adjustView() {
            $('.navstate').each(function(index, a) {
                if (a.innerHTML == 'Geospatial View') {
                    $(a).parent().addClass('active');
                }
                else {
                    $(a).parent().removeClass('active');
                }
            });
        }

        lCtrl.passwordChecker = function() {
            var regex = '(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$';
            var pass = document.querySelector('rpassword');
            if (!regex.test(pass.value)) {
                pass.setCustomValidity(" Password Must Contain a Lowercase Alphabet \n" +
                    " Password Must Contain an Uppercase Alphabet \n" +
                    " Password Must Contain a Number \n" +
                    " Password Must Contain a Special Symbol"
                )
            }
            else {
                pass.setCustomValidity("");
            }
        };
        lCtrl.successMsg = null;

        lCtrl.register = function() {
            localStorage.setItem("name", lCtrl.userdata.name);
            localStorage.setItem("email", lCtrl.userdata.email);
            localStorage.setItem("password", lCtrl.userdata.password);
            localStorage.setItem("address", lCtrl.userdata.password);
            localStorage.setItem("dob", lCtrl.userdata.dob);
            lCtrl.successMsg = "Registration Successful!";
            lCtrl.toggleLog();
            clearValues();
        };

        function clearValues() {
            lCtrl.userdata.name = null;
            lCtrl.userdata.email = null;
            lCtrl.userdata.password = null;
            lCtrl.userdata.dob = null;
        }
        lCtrl.authError = false;
        lCtrl.login = function() {
            if (localStorage.getItem("email") == lCtrl.userlogindata.email && localStorage.getItem("password") == lCtrl.userlogindata.password) {
                $location.path("dashboard");
                $rootScope.user = {
                    name : localStorage.getItem("name"),
                    email : localStorage.getItem("email"),
                    address: localStorage.getItem("address"),
                    dob: localStorage.getItem("dob")
                };
                lCtrl.authError = false;
            }
            else {
                lCtrl.authError = true;
            }
        };

        $rootScope.logout = function() {
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('address');
            localStorage.removeItem('dob');
            $rootScope.user = null;
            $location.path("/");
        };

        lCtrl.checkLocation = function() {
            return $("#geocomplete").val() == '';
        };
        geolocator();
        function geolocator() {
            $(function(){
                $("#geocomplete").geocomplete()
            });
        }

        var geocoder;
        var map;
        lCtrl.geoAddress = null;
        lCtrl.codeAddress = function() {
            geocoder = new google.maps.Geocoder();
            var lat='';
            var lng='';
            var address = $("#geocomplete").val();
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    lat = results[0].geometry.location.lat(); //getting the lat
                    lng = results[0].geometry.location.lng(); //getting the lng
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
            var latlng = new google.maps.LatLng(lat, lng);
            var myOptions = {
                zoom: 8,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map($("#map_canvas")[0], myOptions);

            google.maps.event.addDomListener(window, "resize", function() {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });
        }


    }

})();