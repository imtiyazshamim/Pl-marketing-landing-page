<?php

function clean_input($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

function sendDataToGoogleSheet($formData) {
    $url = 'https://script.google.com/macros/s/AKfycbwQnMhPqzpnsnXxAYlOkR988a1tdFktC0GwwvBCaBOCjo7Tqj8n8Uwx3158Ou_C8fc/exec';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($formData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);
}

if ($argc > 1) {
    $formData = json_decode($argv[1], true);
    sendDataToGoogleSheet($formData);
}

?>
