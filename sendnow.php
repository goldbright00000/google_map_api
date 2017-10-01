<?php
 require_once "Mail.php";
 $from = '"info@revelaselaser.com" <no-reply@revelaselaser.com>';
 $to = 'import@mdprospects.com';
 $host = "email-smtp.us-east-1.amazonaws.com";
 $port = "25";
 $username = 'AKIAIAR3G5N2KPGFTSUA';
 $password = 'AkM91VSDyVnG+JvzKg9FlqBWaSmuHWWdQlU99zOCMVdd';
 $first_name = $_POST['first_name'];
 $last_name = $_POST['last_name'];
 $email_address = $_POST['email_address'];
 $phone_number = $_POST['phone_number'];
 $select_office = $_POST['select_office'];
 $contact_time = $_POST['contact_time'];
 $subject = "Schedule An Appointment";
 $email_message = "5008 RevelaseLaser.com Schedule An Appointment\n\n";
     function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 $email_message .= "First Name: ".clean_string($first_name)."\n";
 $email_message .= "Last Name: ".clean_string($last_name)."\n";
 $email_message .= "Email Address: ".clean_string($email_address)."\n";
 $email_message .= "Phone Number: ".clean_string($phone_number)."\n";
 $email_message .= "Select Office: ".clean_string($select_office)."\n";
 $email_message .= "Contact Time: ".clean_string($contact_time)."\n";
 $headers = array ('From' => $from, 'To' => $to,'Subject' => $subject);
 $smtp = Mail::factory('smtp',
   array ('host' => $host,
     'port' => $port,
     'auth' => true,
     'username' => $username,
     'password' => $password));
 $mail = $smtp->send($to, $headers, $email_message);
 if (PEAR::isError($mail)) {
   echo($mail->getMessage());
 } else {
   echo("The message was successfully sent. - Thank you for your interest, we will contact you as soon as possible.!\n");
   echo "<script>setTimeout(\"location.href = 'http://revelaselaser.com';\",1700);</script>";
 }
 ?>