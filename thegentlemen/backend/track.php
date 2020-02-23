<?php 

if(isset($_POST['action'])){
    echo '<pre/>';
    print_r($_POST);

    $mysqli = new mysqli("localhost", "root", "", "player_data");

    /* comprueba la conexión */
    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }

    /* devuelve el nombre de la base de datos actualmente seleccionada */
    $result = $mysqli->query("");
  

    $mysqli->close();
}

?>