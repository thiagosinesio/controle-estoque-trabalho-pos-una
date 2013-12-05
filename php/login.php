<?php session_start(); 

require_once "conexao.php";
//Get como POST
$arrDados 						= $_REQUEST; 
$arrRetorno						= array(); 
$arrRetorno["success"]			= false;
$arrRetorno["erro"]["motivo"] 	= "Erro no usuario ou senha";
$_SESSION["idUsuario"]			= ""; 
$_SESSION["NmUsuario"]			= ""; 

if($arrDados["acao"]=="login")
{
	$strSQL = "SELECT COD_USUARIO AS id, LOGIN AS login FROM USUARIO WHERE 
			   LOGIN = '" . mysql_real_escape_string($arrDados["email"]) . "' 
			   AND 
			   PASSWORD = '" . mysql_real_escape_string($arrDados["senha"]) . "' 	
			   ";    	
	$objRow = mysql_fetch_array(mysql_query($strSQL));

	if($objRow["id"]<>"")	
	{
		$arrRetorno["success"] = true; 
		$_SESSION["idUsuario"]			= $objRow["id"]; 
		$_SESSION["NmUsuario"]			= $objRow["login"]; 
		unset($arrRetorno["erro"]);
	}
}

echo json_encode($arrRetorno); 
mysql_close(); 