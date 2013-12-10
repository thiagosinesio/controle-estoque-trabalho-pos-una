<?php

require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 
//var_dump($_REQUEST);
if($arrDados["acao"]=="insert")
{
	$arrDados['data'] = str_replace("\\","",$arrDados['data']);  
        $data 			= json_decode(utf8_encode($arrDados['data']));
	$nome 	= mysql_escape_string($data->{'nome'}); 		
	$cpfCnpj 	= mysql_escape_string($data->{'cpfcnpj'});
        $telefone 	= mysql_escape_string($data->{'telefone'});
        $email 	= mysql_escape_string($data->{'email'});
        $grupo 	= mysql_escape_string($data->{'grupo'});
        $idUsu 	= mysql_escape_string($data->{'idUsuario'});
        $idTipoPessoa 	= mysql_escape_string($data->{'idTipoPessoa'});
             
        
	$strSQL = "INSERT INTO PESSOA (NOME, CPFCNPJ, TELEFONE, EMAIL, "
                . "GRUPO, COD_USUARIO, COD_TIPO_PESSOA) VALUES "
                . "('".$nome."', '".$cpfCnpj."', '".$telefone."', '".$email."', '".$grupo."'"
                . ", '".$idUsu."', '".$idTipoPessoa."')";
        
	if(mysql_query($strSQL))
	{
		
		$data->{'id'} 	   	= mysql_insert_id(); 
		$arrMessage['success'] 		= true; 
		$arrMessage['message'] 		= "Registro salvo com sucesso!";
		$arrMessage['data']    		= $data;		
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
	$id 	= mysql_escape_string($arrDados['id']); 
	$strNome 		= mysql_escape_string($arrDados['nome']); 	
	$cpfCnpj 	= mysql_escape_string($arrDados['cpfcnpj']);
        $telefone 	= mysql_escape_string($arrDados['telefone']);
        $email 	= mysql_escape_string($arrDados['email']);
        $grupo 	= mysql_escape_string($arrDados['grupo']);
        $idUsu 	= mysql_escape_string($arrDados['idUsuario']);
        $idTipoPessoa 	= mysql_escape_string($arrDados['idTipoPessoa']);
             
	$strSQL = "UPDATE PESSOA SET "
                . "NOME = '".$strNome."', "
                . "CPFCNPJ = '".$cpfCnpj."', "
                . "TELEFONE = '".$telefone."', "
                . "EMAIL = '".$email."', "
                . "GRUPO = '".$grupo."', "
                . "COD_USUARIO = '".$idUsu."', "
                . "COD_TIPO_PESSOA = '".$idTipoPessoa."' "                
                . "WHERE COD_PESSOA = '".$id."' ";
	if(mysql_query($strSQL))
	{
		$arrMessage['success'] 	= true; 
		$arrMessage['message'] 	= "Registro(s) salvo(s) com sucesso!";	
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
	   $strSQL 	 	= "DELETE FROM PESSOA WHERE COD_PESSOA = '".$id."'"; 
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
        
        $strSQL = "SELECT COD_PESSOA AS id, NOME AS nome, CPFCNPJ AS cpfcnpj, "
                . "TELEFONE AS telefone, EMAIL AS email, GRUPO AS grupo, LOGIN AS usuarioPessoa,"
                . " TIPO_PESSOA AS tipoPessoa, TIPO_PESSOA.COD_TIPO_PESSOA AS idTipoPessoa, USUARIO.COD_USUARIO AS idUsuario "
                . " FROM PESSOA "
                . " JOIN TIPO_PESSOA ON TIPO_PESSOA.COD_TIPO_PESSOA = PESSOA.COD_TIPO_PESSOA"
                . " JOIN USUARIO ON USUARIO.COD_USUARIO = PESSOA.COD_USUARIO "
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
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM PESSOA";
        $total 		= mysql_fetch_array(mysql_query($strSQL));

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true,
	    "inicio" => $inicio,
            "total" => $total['total']			
        ));
	
	
}		
mysql_close(); 