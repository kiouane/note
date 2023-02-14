<?php

    session_start();
    require "master.php";

    $uname = $_POST['uname'];
    $pass = $_POST['pass2'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $dob = $_POST['dob'];
    $addr = $_POST['addr'];
    $email = $_POST['email'];
    $mob = $_POST['mob'];

    $helper = new master();
    $msg = $helper->doRegister($uname, $pass, $fname, $lname, $dob, $addr, $email, $mob);

    $_SESSION['msg'] = $msg;
    header("Location: index.php");
    exit();

?>