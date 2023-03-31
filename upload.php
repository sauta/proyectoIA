<?php
$target_dir = "imagenes/";
$newImageName = $_POST['newImageName'];
$imageFileType = strtolower(pathinfo(basename($_FILES["fileToUpload"]["name"]), PATHINFO_EXTENSION));
$target_file = $target_dir . $newImageName . "." . $imageFileType;
$uploadOk = 1;

// Comprueba si el archivo es una imagen real
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        echo "El archivo no es una imagen.";
        $uploadOk = 0;
    }
}

// Comprueba si el archivo ya existe
if (file_exists($target_file)) {
    echo "Lo siento, el archivo ya existe.";
    $uploadOk = 0;
}

// Comprueba el tamaño del archivo
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Lo siento, el archivo es demasiado grande.";
    $uploadOk = 0;
}

// Permite ciertos formatos de archivo
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
    echo "Lo siento, solo se permiten archivos JPG, JPEG, PNG y GIF.";
    $uploadOk = 0;
}

// Comprueba si $uploadOk está establecido en 0 por un error
if ($uploadOk == 0) {
    echo "Lo siento, el archivo no se pudo cargar.";
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "La imagen " . htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " se ha cargado correctamente.";
    } else {
        echo "Lo siento, hubo un error al cargar el archivo.";
    }
}
?>
