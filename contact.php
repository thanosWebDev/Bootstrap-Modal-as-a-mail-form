<?php

// Email address verification
function isEmail($email) {
	return filter_var($email, FILTER_VALIDATE_EMAIL);
}

//Clean message
function isMessage($message) {
	return filter_var($message, FILTER_SANITIZE_STRING);
}


if($_POST) {

    // Enter the email where you want to receive the message
    $emailTo = 'name@yourdomain.com';

    $email = addslashes(trim($_POST['email']));
    $name = addslashes(trim($_POST['name']));
    $message = addslashes(trim($_POST['message']));
    $human = addslashes(trim($_POST['human']));
    
    $message = isMessage($message);
    
    $array = array('name' => '', 'email' => '', 'message' => '', 'human' => '');
    
    //Validate email
    if(!isEmail($email)) {
        $array['email'] = 'Invalid email!';
    }
    //Validate empty name
    if($name == '') {
        $array['name'] = 'Empty name!';
    }
    //Validate empty message
    if($message == '') {
        $array['message'] = 'Empty message!';
    }
    //Validate antispam answer
    if($human != '12') {
    	$array['human'] = 'Wrong antispam answer!';
    }
    if(isEmail($email) && $name != '' && $message != '' && $human == '12') {
        // Send email
		$headers = "From: " . $name . " <" . $email . ">" . "\r\n" . "Reply-To: " . $email;
		mail($emailTo, "YourDomain.com web form message", $message, $headers);
    }

    echo json_encode($array);

}

?>
