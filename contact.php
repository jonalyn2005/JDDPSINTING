<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = filter_var(trim($_POST["phone"]), FILTER_SANITIZE_STRING);
    $service = filter_var(trim($_POST["service"]), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);
    
    // Check for required fields
    if (empty($name) || empty($email) || empty($phone) || empty($service)) {
        http_response_code(400);
        echo json_encode(["error" => "Please fill in all required fields."]);
        exit;
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["error" => "Please enter a valid email address."]);
        exit;
    }
    
    // Email configuration
    $to = "jonathan.moreno.17.20@gmail.com";
    $subject = "New Quote Request from JDD PAINTING Website - " . $service;
    
    // Email content
    $email_content = "
    <html>
    <head>
        <title>New Quote Request - JDD PAINTING</title>
    </head>
    <body>
        <h2>New Quote Request from JDD PAINTING Website</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Service Type:</strong> $service</p>
        <p><strong>Project Description:</strong></p>
        <p>$message</p>
        <hr>
        <p><em>This email was sent from the JDD PAINTING contact form.</em></p>
    </body>
    </html>
    ";
    
    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    
    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(["success" => "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Sorry, there was an error sending your message. Please try again or contact us directly."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}
?>