<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

$subject = trim($_POST["subject"]);
$email = trim($_POST["email"]);


$mail = new PHPMailer();
        //Server settings
$mail->SMTPDebug = 0; 
$mail->isSMTP();
$mail->Host = 'mail.gruva.net';
 $mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'waisgold@gruva.net';                 // SMTP username
$mail->Password = 'waisgold@123456';                           // SMTP password
$mail->SMTPSecure = 'tls';
$mail->Port = 25;
// $mail->Port = 587;                                   // TCP port to connect to
$mail->CharSet = 'UTF8';

$mail->setFrom('waisgold@gruva.net', 'Sonrevivir');  // Host
$mail->addAddress('danilhamsik@gmail.com');
$mail->addReplyTo($email);

    //Content
$mail->isHTML(true);
$mail->Subject = $subject;

$mailContent = 'aea';

$mail->Body    = $mailContent ;

    if($mail->send()){
        echo '¡Gracias por Sonrevivir! Tu envío ha sido exitoso, pronto nos comunicaremos contigo.';
    }   	
    else{
        echo 'Ups, no se pudo enviar';
        echo 'Error: '. $mail->ErrorInfo;
    }
?>