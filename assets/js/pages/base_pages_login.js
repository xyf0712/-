/*
 *  Document   : base_pages_login.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Login Page
 */

var BasePagesLogin = function() {
    // Init Login Form Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
    var initValidationLogin = function(){
        jQuery('.js-validation-login').validate({
            errorClass: 'help-block text-right animated fadeInDown',
            errorElement: 'div',
            errorPlacement: function(error, e) {
                jQuery(e).parents('.form-group > div').append(error);
            },
            highlight: function(e) {
                jQuery(e).closest('.form-group').removeClass('has-error').addClass('has-error');
                jQuery(e).closest('.help-block').remove();
            },
            success: function(e) {
                jQuery(e).closest('.form-group').removeClass('has-error');
                jQuery(e).closest('.help-block').remove();


            },
            rules: {
                'login-username': {
                    required: true,
                    minlength: 1
                },
                'login-password': {
                    required: true,
                    minlength: 1
                }
            },
            messages: {
                'login-username': {
                    required: '请输入用户名',
                    minlength: '用户名长度必须大于2'
                },
                'login-password': {
                    required: '请输入密码',
                    minlength: '密码长度必须大于1'
                }
            },
            submitHandler: function () {
                $.ajax({
                    url: "http://139.219.195.94:36544/simitFire/base/BaseUserLogin.do",
                    data: {
                        userName: jQuery("#login-username").val(),
                        s_Pwd: jQuery("#login-password").val()
                    },
                    xhrFields: {
                    	withCredentials: true,
                    },
                    method: "get",
                    success: function (data) {
                        console.log(data)
                        if (data.message_level != undefined && data.message_level == 0) {
                            localStorage.setItem("uinfo", JSON.stringify(data.data))
                            window.location.href = "home_page.html";
                        } else {
                            alert("用户名或者密码错误");
                        }
                    }
                })
            }
        });
    };

    return {
        init: function () {
            // Init Login Form Validation
            initValidationLogin();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BasePagesLogin.init(); });
