<?php
	$errors = array(); // array to hold validation errors
	$data = array(); // array to pass back data

	// validate the variables ======================================================
	if (empty($_POST['name'])) {
		$errors['name'] = 'Name is required.';
	}
	if (empty($_POST['email'])) {
		$errors['email'] = 'Email is required.';
	}
	if (empty($_POST['subject'])) {
		$errors['message'] = 'Subject is required.';
	}
	if (empty($_POST['message'])) {
		$errors['message'] = 'Message is required.';
	}
	// return a response ===========================================================

	// response if there are errors
	if (!empty($errors)) {
		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors'] = $errors;
		$data['messageError'] = 'Please check the fields in red';
	} else {
		// if there are no errors, return a message
		$data['success'] = true;
		$data['messageSuccess'] = 'Hey! Thanks for reaching out. I will get back to you soon';

		// CHANGE THE TWO LINES BELOW
		$emailTo = "toanqc@gmail.com";
		$emailSubject = $_POST['subject'];
		$name = $_POST['name']; // required
		$emailFrom = $_POST['email']; // required
		$message = $_POST['message']; // required

		$emailMessage = $message . "\n";
		$headers = 'From: webmaster@toanquach.com' . "\r\n" ;
		$headers .='Reply-To: '. $emailFrom . "\r\n" ;
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "X-Priority: 3\r\n";
		$headers .= "Content-type: text/plain; charset=utf-8\r\n";
		$headers .='X-Mailer: PHP/' . phpversion();   

		@mail($emailTo, $emailSubject, $emailMessage, $headers);
}

// return all our data to an AJAX call
echo json_encode($data);