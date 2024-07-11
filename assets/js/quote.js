
(function() {
    emailjs.init("Qx-dZb8lPquAReNkr");
})();

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        var name = document.getElementById('form_name').value;
        var email = document.getElementById('form_email').value;
        var phone = document.getElementById('form_phone').value;
        var subject = document.getElementById('form_subject').value;
        var message = document.getElementById('form_message').value;

        // Prepare email parameters
        var templateParams = {
            from_name: name,
            from_email: email,
            from_phone: phone,
            subject: subject,
            message: message
        };

        console.log('Template Params:', templateParams); // Log params to verify

        // Send email
        emailjs.send('service_zcpkxm2', 'template_gfec7ht', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Your message has been sent successfully!');
            }, function(error) {
                console.error('FAILED...', error);
                alert('Failed to send your message. Please try again later.');
            });
    });
});