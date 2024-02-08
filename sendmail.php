<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

  $mail = new PHPMailer(true);


  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/') ;





  $mail->isHTML(true);


  // От кого письмо
  $mail->setFrom('Kia-digital@gmail.com', 'Константин Павлов');
  // Кому отправить
  $mail->addAddress('info@Switcher.finance');
  // Тема письма
  $mail->Subject = 'Это данные о пользователе с вашего сайта';



// Тело письма
$body = '<h1>Информация о пользователе(ранняя регистрация)</h1>';


if(trim(!empty($_POST['email']))){
  $body.= '<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}

if(trim(!empty($_POST['what-do-you-like']))){
  $body.= '<p><strong>Риск:</strong> '.$_POST['what-do-you-like'].'</p>';
}


$chechbox = $body.='<p><strong>Предпочтительный объём:</strong> '.implode(", " ,$_POST['volum']);'</p>';



$mail->Body = $body;

//Отправляем
if (!$mail->send()){
  $message = 'Ошибка';
}  else {
  $message = 'Данные отправлены';
}


$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>