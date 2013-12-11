<?php

require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 

if($arrDados["acao"]=="insert")
{
	$arrDados['usuario'] = str_replace("\\","",$arrDados['usuario']);
    $data 			= json_decode(utf8_encode($arrDados['usuario']));	    
	
	$strNome 	= mysql_escape_string($data->{'login'}); 
	$strStatus 	= mysql_escape_string($data->{'status'}); 
	$strSenha 	= mysql_escape_string($data->{'password'}); 
	
	$strSQL = "INSERT INTO USUARIO (LOGIN, STATUS, PASSWORD) VALUES ('".$strNome."','".$strStatus."','".$strSenha."')";
	
	if(mysql_query($strSQL))
	{

		$data->{'id'} 	   	= mysql_insert_id(); 

		$arrMessage['success'] 		= true; 
		$arrMessage['message'] 		= "Registro salvo com sucesso!";
		$arrMessage['usuario']    	= $data;		
	}
	else
	{
		$arrMessage['success'] = false;
		$arrMessage['message'] = "Erro ao salvar no banco de dados!";
	}
	
	 echo json_encode($arrMessage);
	
}
else if($arrDados["acao"]=="update")
{
	$data 		= json_decode($arrDados['usuario']);
	$idUsuario 	= mysql_escape_string($data->{'id'}); 
	$strNome 	= mysql_escape_string($data->{'login'}); 
	$strStatus 	= mysql_escape_string($data->{'status'}); 
	$strSenha 	= mysql_escape_string($data->{'password'}); 

	$strSQL = "UPDATE USUARIO SET LOGIN = '".$strNome."', PASSWORD = '".$strSenha."', STATUS = '".$strStatus."' WHERE COD_USUARIO = '".$idUsuario."' ";
	if(mysql_query($strSQL))
	{
		$arrMessage['success'] 						= true; 
		$arrMessage['message'] 						= "Registro(s) salvo(s) com sucesso!";	
	}
	else
	{
		$arrMessage['success'] = false;
		$arrMessage['message'] = "Erro ao salvar no banco de dados!";
	}
		
	 echo json_encode($arrMessage);
}
else if($arrDados["acao"]=="delete")
{	
    $arrTiposPessoa = $arrDados["id"];
	//var_dump($arrDados['id']);
	for($i=0;$i<count($arrTiposPessoa);$i++)
	{
       $id = mysql_real_escape_string($arrTiposPessoa[$i]);
	   $strSQL 	 	= "DELETE FROM USUARIO WHERE COD_USUARIO = '".$id."'"; 
                if(!mysql_query($strSQL))
				{
						echo json_encode(array(
							"success" => false,
							"message" => 'Erro na exclusão'
					));	
					break;	
				}
	}
	echo json_encode(array(
		"success" => true,
		"message" => 'Registro(s) excluído(s) com sucesso'
	));	 
}
else 
{
		$sort 	= $arrDados['sort'] ? $arrDados['sort'] : '1';
        $dir 	= $arrDados['dir']  ? $arrDados['dir']  : 'ASC';
        $order 	= $sort . ' ' . $dir;
        
        $strSQL = "SELECT COD_USUARIO AS id, LOGIN AS login, PASSWORD AS password, STATUS AS status FROM USUARIO "
                . "ORDER BY ".mysql_real_escape_string($order);
        
        if($arrDados["start"] !== null && $arrDados["start"] !== 'start' && $arrDados["limit"] !== null && $arrDados["limit"] !== 'limit')
		{
				
			$inicio  = ($arrDados["page"]-1);  
			$inicio *= $arrDados["limit"];
			
            $strSQL .= " LIMIT " . $inicio . " , " . $arrDados["limit"];
        }
        		
		
		$objRs = mysql_query($strSQL);
		$arrBanco = array(); 
		
		while($objRow = mysql_fetch_assoc ($objRs))
		{
			$arrBanco[] = $objRow; 	
		}		        
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM USUARIO";
        $total 		= mysql_fetch_array(mysql_query($strSQL));

        echo json_encode(array(
            "usuario" => $arrBanco,
            "success" => true,
            "inicio" => $inicio,
            "total" => $total['total']
			
        ));
	
	
}		
mysql_close(); 