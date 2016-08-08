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
                geolocator();
                $(function() {
                    $("#ename").focus();
                });
                lCtrl.addFeedbackForEvent();
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

        lCtrl.addFeedbackForEvent = function() {
            $(function() {
                $('#event_form').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        ename: {
                            validators: {
                                stringLength: {
                                    min: 2
                                },
                                notEmpty: {
                                    message: 'Please Enter The Event Name'
                                }
                            }
                        },
                        etype: {
                            validators: {
                                stringLength: {
                                    min: 2
                                },
                                notEmpty: {
                                    message: 'Please Enter The Type Of Event'
                                }
                            }
                        },
                        hname: {
                            validators: {
                                stringLength: {
                                    min: 2
                                },
                                notEmpty: {
                                    message: 'Please Enter The Host Name'
                                }
                            }
                        },
                        stdate: {
                            validators: {
                                regexp: lCtrl.unsafe ? {
                                    regexp: /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))([ ]){1}([0-2][0-3]:[0-5][0-9])$/g,
                                    message: "Value Should be in dd/mm/yyyy HH:MM format"
                                } : null
                            }
                        },
                        eddate: {
                            validators: {
                                callback: {
                                    callback: function() {
                                        var start = $('#stdate').val();
                                        var end = $('#eddate').val();
                                        var smYr = null;
                                        var smMn = null;
                                        var smDay = null;
                                        var smHr = null;
                                        if (lCtrl.unsafe) {
                                            if (end.substring(6, 10) < start.substring(6, 10)) {
                                                return false;
                                            }
                                            if (end.substring(6, 10) == start.substring(6, 10)) {
                                                smYr = true;
                                            }
                                            if (smYr && end.substring(3, 5) < start.substring(3, 5)) {
                                                return false;
                                            }
                                            if (smYr && end.substring(3, 5) == start.substring(3, 5)) {
                                                smMn = true;
                                            }
                                            if (smMn && smYr && end.substring(0, 2) < start.substring(0, 2)) {
                                                return false;
                                            }
                                            if (smMn && smYr && end.substring(0, 2) == start.substring(0, 2)) {
                                                smDay = true;
                                            }
                                            if (smDay && smMn && smYr && end.substring(11, 13) < start.substring(11, 13)) {
                                                return false;
                                            }
                                            if (smDay && smMn && smYr && end.substring(11, 13) == start.substring(11, 13)) {
                                                smHr = true;
                                            }
                                            if (smHr && smDay && smMn && smYr && end.substring(14, 16) < start.substring(14, 16)) {
                                                return false;
                                            }
                                        }
                                        else {
                                            var stDate = new Date(start.toString());
                                            var endDate = new Date(end.toString());
                                            var startObj = {
                                                day: stDate.getDate(),
                                                month: (stDate.getMonth()+1),
                                                year: stDate.getFullYear(),
                                                hour: stDate.getHours(),
                                                minutes: stDate.getMinutes()
                                            };

                                            var endObj = {
                                                day: endDate.getDate(),
                                                month: (endDate.getMonth()+1),
                                                year: endDate.getFullYear(),
                                                hours: endDate.getHours(),
                                                minutes: endDate.getMinutes()
                                            };

                                            if (endObj.year < startObj.year) {
                                                return false;
                                            }
                                            if (endObj.year == startObj.year) {
                                                smYr = true;
                                            }
                                            if (smYr && endObj.month < startObj.month) {
                                                return false;
                                            }
                                            if (smYr && endObj.month == startObj.month) {
                                                smMn = true;
                                            }
                                            if (smMn && smYr && endObj.day < startObj.day) {
                                                return false;
                                            }
                                            if (smMn && smYr && endObj.day == startObj.day) {
                                                smDay = true;
                                            }
                                            if (smDay && smMn && smYr && endObj.hours < startObj.hours) {
                                                return false;
                                            }
                                            if (smDay && smMn && smYr && endObj.hours == startObj.hours) {
                                                smHr = true;
                                            }
                                            if (smHr && smDay && smMn && smYr && endObj.minutes < startObj.minutes) {
                                                return false;
                                            }
                                        }
                                        if (start == end){
                                            return false;
                                        }
                                        return true;
                                    },
                                    message: "End Date & Date Should Be Greater Than Start Date & Time"
                                },
                                regexp: lCtrl.unsafe ? {
                                    regexp: /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))([ ]){1}([0-2][0-3]:[0-5][0-9])$/g,
                                    message: "Date Should be in dd/mm/yyyy HH:MM format"
                                } : true
                            }
                        },
                        eloc: {
                            validators: {
                                notEmpty: {
                                    message: 'Please Enter The Event Location'
                                }
                            }
                        }
                    }
                }).on('error.field.bv', function(e, data) {
                    if ($('#ename').val() == '' || $('#etype').val() == '' || $('#hname').val() == '' || $('#estdate').val() == '' || $('#stdate').val() == '' || $('#eddate').val() == '' || $('#geocomplete').val() == '') {
                        $('#esubmit').prop("disabled",true);
                    }
                    data.bv.disableSubmitButtons(true);
                }).on('status.field.bv', function(e, data) {
                    if ($('#ename').val() == '' || $('#etype').val() == '' || $('#hname').val() == '' || $('#estdate').val() == '' || $('#stdate').val() == '' || $('#eddate').val() == '' || $('#geocomplete').val() == '') {
                        $('#esubmit').prop("disabled",true);
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

        lCtrl.logout = function() {
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

        function process(obj) {
            obj.start = obj.start.toString();
            obj.end = obj.end.toString();
            obj.location = $("#geocomplete").val();
        }

        geolocator();
        function geolocator() {
            $(function(){
                $("#geocomplete").geocomplete()
            });
        }
    }

})();