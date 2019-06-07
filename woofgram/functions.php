<?php
require ("../../../../../config.php");
$database = "if18_Marianne_Ar_1";
session_start();
function signin($email, $password){
	$notice = "";
	$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
	$stmt = $mysqli->prepare("SELECT id, username, password FROM woofgram_user WHERE email=?");
	echo $mysqli->error;
	$stmt->bind_param("s", $email);
	$stmt->bind_result($idFromDb, $usernameFromDb, $passwordFromDb);
	if($stmt->execute()){
		//Kui päring õnnestus
	  if($stmt->fetch()){
		  //kasutaja on olemas
		  if(password_verify($password,$passwordFromDb)){
			//Kui salasõna klapib
			$notice = "Logisite sisse";
			//Määran sessiooni muutujad
			$_SESSION["userId"] = $idFromDb;
			$_SESSION["userName"] = $usernameFromDb;
			$_SESSION["userEmail"] = $email;
			//liigume kohe vaid sisselogitudele mõeldud pealehele
			$stmt->close();
			$mysqli->close();
			header("Location: main.php");
			exit();
		  } else {
		    $notice = "Vale salasõna";
		  }

	  } else {
	    $notice = "Sellist kasutajat(" .$email .") ei leitud";
	  }
	} else {
	  $notice = "Sisenemisel tekkis viga" .$stmt->error;
	}


	$stmt->close();
	$mysqli->close();
	return $notice;
  }//sisselogimine lõppeb

function signup($username, $email, $password){
	$notice = "";
	$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
	//kontrollime, ega kasutajat juba olemas pole
	$stmt = $mysqli->prepare("SELECT id FROM woofgram_user WHERE email=?");
	echo $mysqli->error;
	$stmt->bind_param("s",$email);
	$stmt->execute();
	if($stmt->fetch()){
		//leiti selline, seega ei saa uut salvestada
		$notice = "Sellise kasutajatunnusega (" .$email .") kasutaja on juba olemas! Uut kasutajat ei salvestatud!";
	} else {
		$stmt->close();
		$stmt = $mysqli->prepare("INSERT INTO woofgram_user (username, email, password) VALUES(?,?,?)");
    	echo $mysqli->error;
	    $options = ["cost" => 12, "salt" => substr(sha1(rand()), 0, 22)];
	    $pwdhash = password_hash($password, PASSWORD_BCRYPT, $options);
	    $stmt->bind_param("sss", $username, $email, $pwdhash);
	    if($stmt->execute()){
		  $notice = "ok";
	    } else {
	      $notice = "error" .$stmt->error;
	    }
	}
	$stmt->close();
	$mysqli->close();
	return $notice;
  }
function test_input($data) {
	//echo "Koristan!\n";
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}


?>
