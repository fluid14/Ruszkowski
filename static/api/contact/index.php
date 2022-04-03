<?php
//include the two files
include_once('classes/sendmail.php');
include_once('config.php');

header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if( empty($_POST['name']) && empty($_POST['email']) ) {
    echo json_encode(
        [
           "sent" => false,
           "message" => $SendMailEmptyerrorMessage
        ]
    ); 
    exit();
}

if ($_POST){
    http_response_code(200);
    $subject = 'Formularz kontaktowy: ' . $_POST['name'];
    $from = 'noreply@ruszkowski.biz';
    $message = 'Wiadomość: ' . $_POST['message'] . 'Email: ' . $_POST['email'];
    //Actual sending email
    $sendEmail = new Sender($adminEmail, $from, $subject, $message);
    $sendEmail->send();
} else {
var_dump( error_get_last() );
    var_dump( $recipient );
    var_dump( $subject );
    var_dump( $email_content );
    var_dump( $email_headers );
 echo json_encode(
     [
        "sent" => false,
        "message" => $SendMailFailederrorMessage
     ]
 );
}
