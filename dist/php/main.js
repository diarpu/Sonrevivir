$(function () {

    // Get the form.
    var form = $('#form-contact');
    const textButton = document.querySelector('#form-contact button').innerHTML;
    const subject = document.querySelector('input.subject').value;

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();
        document.getElementById("submit").innerHTML = '<span class="spinner-icon"></span>';
        // document.getElementById("submit").setAttribute('disabled', true);
        // Submit the form using AJAX.
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');
                document.getElementById("form-messages").style.display = "block";

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $('#name').val('');
                $('#email').val('');
                $('#tel').val('');
                $('#check-term').checked = false;

                setTimeout( function() {document.getElementById("form-messages").style.display = "none" ;}, 4000 );
                                // setTimeout( function() {document.getElementById("submit").setAttribute('disabled', false);});
                document.getElementById("submit").innerHTML = textButton;

                if(subject == "Sonrevivir 1era Edición | Libro físico"){
                    setTimeout( function() {window.location.href = 'https://www.google.com';}, 4000);
                }
                if(subject == "Sonrevivir 1era Edición | Ebook"){
                    setTimeout( function() {window.location.href = 'https://www.facebook.com';}, 4000);
                }
                if(subject == "Sonrevivir 1era Edición | Audiolibro"){
                    setTimeout( function() {window.location.href = 'https://www.instagram.com';}, 4000);
                }
                // if(subject == "Newsletter"){
                //     return false;
                // }      
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('No se obtiene ningún dato');
                    document.getElementById("submit").toggleAttribute('disabled', false);
                    document.getElementById("submit").innerHTML = textButton;
                }
            });
    });

});