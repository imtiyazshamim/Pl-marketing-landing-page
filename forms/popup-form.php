<?php

date_default_timezone_set('Asia/Kolkata'); // Set the default timezone to IST

$receiving_email_address = 'shamim@pinklemonade.in, team.web@pinklemonade.in';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $from_name = clean_input($_POST['fname']);
    $from_email = clean_input($_POST['email']);
    $subject = "Video Landing page - ".$from_name;

    $message = "First Name: " . $from_name . "\n";
    $message .= "Company Name: " . clean_input($_POST['cname']) . "\n";
    $message .= "Email: " . $from_email . "\n";
    $message .= "Phone: " . clean_input($_POST['phone']) . "\n";
    $message .= "Message: " . clean_input($_POST['message']) . "\n";
    $currentMonth = date('m'); // Current month
    $currentDate = date('d'); // Current date
    // $message .= "Month: " . $currentMonth . "\n";
    // $message .= "Date: " . $currentDate . "\n";
    
    $fromemail = "team.web@pinklemonade.in";
    $headers = "From: " . $fromemail . "\r\n";
    $headers .= "Reply-To: " . $from_email . "\r\n";
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
    $url = 'https://script.google.com/macros/s/AKfycbxk6IP4AHvxd7XOuPW5mhVWHIAUH98BgvQGxcAYI4MirgiKiVyUr8CHHvUxXdOzcCKY/exec';
    
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
    'phone' => clean_input($_POST['phone']),
    'message' => clean_input($_POST['message']),
    'Campaign' => 'Video Landing Page',
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
