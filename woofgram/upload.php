<?php
if(isset($_POST['submit'])){
  $file = $_FILES['file'];

  $filename = $_FILES['file']['name'];
  $fileTmpName = $_FILES['file']['tmp_name'];
  $fileSize = $_FILES['file']['size'];
  $fileError = $_FILES['file']['error'];
  $fileType = $_FILES['file']['type'];

  $fileExt = explode('.', $filename);
  $fileActualExt = strtolower(end($fileExt));

  $allowed = array('jpg', 'jpeg','png','pdf');

  if(in_array($fileActualExt, $allowed)){
    if($fileError ===0){
      if($fileSize < 5000000){
        $fileNameNew = uniqid('', true).".".$fileActualExt;
        $fileDestination = 'img/'.$fileNameNew;
        move_uploaded_file($fileTmpName, $fileDestination);
        header("Location: main.php");
      } else {
        echo"<script language='javascript'>
    				alert('Fail on liiga suur!');
            window.location.href = 'main.php';
    		</script>";
      }
    } else {
      echo"<script language='javascript'>
  				alert('Oli viga üleslaadimisel!');
          window.location.href = 'main.php';
  		</script>";
    }
  }else{
    echo"<script language='javascript'>
				alert('Ei saa sellist tüüpi faili laadida!');
        window.location.href = 'main.php';
		</script>";
  }
}
 ?>
