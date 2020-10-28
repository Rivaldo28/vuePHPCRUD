<?php
  $connection = new mysqli("localhost", "root", "", "cliente");
  if($connection->connect_error){
    die("Falha de Conexão!" .$connection->connect_error);
  }
  $result = array('error'=>false);
  $action = '';

  if(isset($_GET['action'])){
    $action = $_GET['action'];
  }
  if($action == 'read'){
    $sql = $connection->query("SELECT * FROM pessoas");
    $pessoas = array();
    while($row = $sql->fetch_assoc()){
      array_push($pessoas, $row);
    }
    $result['pessoas'] = $pessoas;
  }
  
  if($action == 'create'){
    $nome = $_POST['nome'];
    $ano = $_POST['ano'];
    $sql = $connection->query("INSERT INTO pessoas (nome, ano) VALUES('$nome', '$ano')");
    
    if($sql){
      $result['message'] = "Pessoa adicionada com sucesso!";
    }else{
      $result['error'] = true;
      $result['message'] = "Falha ao adicionar a pessoa!";
    }
  }
  if($action == 'update'){
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $ano = $_POST['ano'];
    $sql = $connection->query("UPDATE pessoas SET nome='$nome',ano='$ano' WHERE id='$id'");
    
    if($sql){
      $result['message'] = "Pessoa Atualizada com sucesso!";
    }else{
      $result['error'] = true;
      $result['message'] = "Falha ao Atualizada a pessoa!";
    }
  }
  if($action == 'delete'){
    $id = $_POST['id'];
 
    $sql = $connection->query("DELETE FROM pessoas WHERE id='$id'");
    if($sql){
      $result['message'] = "Pessoa deletada com sucesso!";
    }else{
      $result['error'] = true;
      $result['message'] = "Falha ao deletar!";
    }
  }
  echo json_encode($result);
?>