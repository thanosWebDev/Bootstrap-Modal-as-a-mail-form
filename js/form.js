jQuery(document).ready(function () {

    // Contact form validation - Feedback if empty or not
    $('#name, #message, #human').on('focusout', function () {

        if ($(this).val()) {
            $(this).removeClass('input-error').addClass('input-correct');
        } else {
            $(this).removeClass('input-correct').addClass('input-error');
        }
    });

    // Check email for simple pattern validation
    $('#email').on('focusout', function () {

        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (pattern.test($(this).val())) {
            $(this).removeClass('input-error').addClass('input-correct');
        } else {
            $(this).removeClass('input-correct').addClass('input-error');
        }
    });



    // Post to php and feedback of server-side validation
    $('.contact-form form').submit(function (e) {

        e.preventDefault();

        var postdata = $('.contact-form form').serialize();
        $.ajax({
            type: 'POST',
            url: 'contact.php',
            data: postdata,
            dataType: 'json',
            success: function (json) {
                if (json.name !== '') {
                    $('#name').addClass('input-error');
                }
                if (json.email !== '') {
                    $('#email').removeClass('input-correct').addClass('input-error');
                }
                if (json.message !== '') {
                    $('#message').addClass('input-error');
                }
                if (json.human !== '') {
                    $('#human').removeClass('input-correct').addClass('input-error').val('Wrong number');
                }
                if (json.name === '' && json.email === '' && json.message === '' && json.human === '') {
                    // Show the success message
                    $('#body-form').fadeOut('fast', function () {
                        $('#body-feedback').fadeIn('slow').removeClass('hidden');
                    });
                }
            }
        });
    });


});