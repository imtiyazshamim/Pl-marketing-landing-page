<?php
 
$receiving_email_address = 'imtiyshamim@gmail.com';

// Collecting the form data
$from_name = $_POST['fname']; // Assuming 'fname' is the sender's name
$from_email = $_POST['email']; // Sender's email
$subject = "PL Video Landing page"; // Email subject

// Constructing the message
$message = "First Name: " . $from_name . "\n";
if (!empty($_POST['cname'])) {
    $message .= "Company Name: " . $_POST['cname'] . "\n";
}
$message .= "Email: " . $from_email . "\n";
$message .= "Phone: " . $_POST['phone'] . "\n";
$message .= "Message: " . $_POST['message'] . "\n";

// Email Headers
$headers = "From: " . $from_email . "\r\n";
$headers .= "Reply-To: " . $from_email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Sending the email
if(mail($receiving_email_address, $subject, $message, $headers)) {
    echo 'OK';
} else {
    echo 'Email sending failed.';
}
?>
