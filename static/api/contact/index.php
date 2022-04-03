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
    $subject = 'Formularz kontaktowy: ' . $_POST['name'] . ' ' . $_POST['city'];
    $from = 'noreply@ruszkowski.biz';
    $message = '<b>Wiadomość: </b>' . $_POST['message'] . '<br/>' . '<b>Email: </b>' . $_POST['email'] . '<br/>' . '<b>Telefon: </b>' . $_POST['phone'] . '<br/>' . '<b>Miasto: </b>' . $_POST['city'] . '<br/>' . '<b>Produkt: </b>' . $_POST['productName'] . '<br/>' . '<b>Rodzaj drewna: </b>' . $_POST['woodType'];
    $sendEmail = new Sender($adminEmail, $from, $subject, $message);
    $sendEmail->send();
} else {
 echo json_encode(
     [
        "sent" => false,
        "message" => $SendMailFailederrorMessage
     ]
 );
}
