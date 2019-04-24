<?php
	session_start();
	if(isset($_GET['userEmail'])){
		$user=$_GET['userEmail'];
		$_SESSION['user']=$user;
		header('Location: page.php');
	}

?>