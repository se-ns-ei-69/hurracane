<?php
require 'vendor/autoload.php';

// require 'PHPMailer/PHPMailer.php';
// require 'PHPMailer/SMTP.php';
// require 'PHPMailer/Exception.php';

// require_once __DIR__ . '/Dotenv/Dotenv.php';
// require_once __DIR__ . '/Dotenv/Exception/ExceptionInterface.php';
// require_once __DIR__ . '/Dotenv/Exception/InvalidArgumentException.php';
// require_once __DIR__ . '/Dotenv/Exception/RuntimeException.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// use Dotenv\Dotenv;

// $dotenv = Dotenv::createImmutable(__DIR__);
// $dotenv->load();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars($_POST['name']);
    $lastName = !empty($_POST['last_name']) ? htmlspecialchars($_POST['last_name']) : 'N/A';
    $email = htmlspecialchars($_POST['email']);
    $phone = !empty($_POST['phone']) ? htmlspecialchars($_POST['phone']) : 'N/A';
    $company = !empty($_POST['company_name']) ? htmlspecialchars($_POST['company_name']) : 'N/A';
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        $mail->SMTPDebug = 2;
        $mail->isSMTP();
        $mail->Host = 'localhost';
        $mail->SMTPAuth = false;
        $mail->Username = '';
        $mail->Password = '';
        $mail->SMTPSecure = 'STARTTLS';
        $mail->Port = 25;

        $mail->setFrom('info@leads-strategy.com', 'Lead Strategy Contact Form');
        $mail->addAddress('info@leads-strategy.com');

        $mail->isHTML(true);
        $mail->Subject = "You're here! Let's get started";

        $mail->Body = "<b>First Name:</b> $firstName <br>
                         <b>Last Name:</b> $lastName <br>
                         <b>Email:</b> $email <br>
                         <b>Phone:</b> $phone <br>
                         <b>Company:</b> $company <br>
                         <b>Message:</b> $message";
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

?>
