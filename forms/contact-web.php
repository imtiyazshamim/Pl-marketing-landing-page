<?php

date_default_timezone_set('Asia/Kolkata'); // Set the default timezone to IST

$receiving_email_address = 'shamim@pinklemonade.in,team.web@pinklemonade.in,reachus@pinklemonade.in';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $from_name = clean_input($_POST['fname']);
    $from_email = clean_input($_POST['email']);
    $subject = "Web Landing page - ".$from_name;

    $message = "First Name: " . $from_name . "\n";
    $message .= "Company Name: " . clean_input($_POST['cname']) . "\n";
    $message .= "Company Email: " . clean_input($_POST['cemail']) . "\n";
    $message .= "Email: " . $from_email . "\n";
    $message .= "Phone: " . clean_input($_POST['phone']) . "\n";
    $message .= "Project Budget: " . clean_input($_POST['budget']) . "\n";
    $message .= "City: " . clean_input($_POST['city']) . "\n";
    $message .= "Message: " . clean_input($_POST['message']) . "\n";
    $currentMonth = date('m'); // Current month
    $currentDate = date('d'); // Current date
    // $message .= "Month: " . $currentMonth . "\n";
    // $message .= "Date: " . $currentDate . "\n";
    
    $fromemail = "team.web@pinklemonade.in";
    $headers = "From: " . $fromemail . "\r\n";
    $headers .= "Reply-To: " . $from_email . "\r\n";
   // Add BCC header
    // $headers .= "Bcc: nikazaonlinemedia@gmail.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($receiving_email_address, $subject, $message, $headers)) {
        echo 'OK';
    } else {
        echo 'Email sending failed.';
    }
} else {
    header("Location: index.html");
    exit();
}

function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function sendDataToGoogleSheet($formData) {
    $url = 'https://script.google.com/macros/s/AKfycbwQnMhPqzpnsnXxAYlOkR988a1tdFktC0GwwvBCaBOCjo7Tqj8n8Uwx3158Ou_C8fc/exec';
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($formData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);
}

// Prepare data for sending
$formData = array(
    'date' => date('d'), // Current date
    'time' => date('H:i:s'), // Current time
    'fname' => clean_input($_POST['fname']),
    'email' => clean_input($_POST['email']),
    'cname' => clean_input($_POST['cname']),
    'cemail'=>clean_input($_POST['cemail']),
    'phone' => clean_input($_POST['phone']),
    'budget' => clean_input($_POST['budget']),
    'city' => clean_input($_POST['city']),
    'message' => clean_input($_POST['message']),
    'Campaign' => 'Web Landing Page',
    'Form_Heading' => clean_input($_POST['form_title']),
    'page_url' => isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'Direct Access',
    // Include UTM parameters and gclid
    'utm_source' => clean_input($_POST['utm_source']),
    'utm_campaign' => clean_input($_POST['utm_campaign']),
    'utm_ad_group' => clean_input($_POST['utm_ad_group']),
    'utm_keyword' => clean_input($_POST['utm_keyword']),
    'gclid' => clean_input($_POST['gclid']),
);

sendDataToGoogleSheet($formData);

?>
