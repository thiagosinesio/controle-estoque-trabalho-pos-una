<?php

require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 
//var_dump($_REQUEST);
if($arrDados["acao"]=="insert")
{
	$arrDados['categoria'] = str_replace("\\","",$arrDados['categoria']);
    $data 			= json_decode(utf8_encode($arrDados['categoria']));	 
	$strNome 	= mysql_escape_string($data->{'descricao'}); 		
	
	$strSQL = "INSERT INTO CATEGORIA (DESCRICAO) VALUES ('".$strNome."')";
	
	if(mysql_query($strSQL))
	{
		
		$data->{'id'} 	   	= mysql_insert_id(); 
		$arrMessage['success'] 		= true; 
		$arrMessage['message'] 		= "Registro salvo com sucesso!";
		$arrMessage['categoria']    		= $data;		
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
	$idCategoria 	= mysql_escape_string($arrDados['idCategoria']); 
	$strNome 		= mysql_escape_string($arrDados['NmCategoria']); 	

	$strSQL = "UPDATE tecategoria SET NmCategoria = '".$strNome."' WHERE idCategoria = '".$idCategoria."' ";
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
    $arrCategorias = $arrDados["id"];
	//var_dump($arrDados['id']);
	for($i=0;$i<count($arrCategorias);$i++)
	{
       $idCategoria = mysql_real_escape_string($arrCategorias[$i]);
	   $strSQL 	 	= "DELETE FROM CATEGORIA WHERE COD_CATEGORIA = '".$idCategoria."'"; 
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
        
        $strSQL = "SELECT COD_CATEGORIA AS id, DESCRICAO AS descricao FROM CATEGORIA ORDER BY ".mysql_real_escape_string($order);
        
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
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM CATEGORIA";
        $total 		= mysql_fetch_array(mysql_query($strSQL));

        echo json_encode(array(
            "categoria" => $arrBanco,
            "success" => true,
			"inicio" => $inicio,
            "total" => $total['total']			
        ));
	
	
}		
mysql_close(); 