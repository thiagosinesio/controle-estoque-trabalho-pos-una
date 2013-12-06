<?php

require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 
//var_dump($_REQUEST);
if($arrDados["acao"]=="insert")
{
	$arrDados['tipoMovimentacao'] = str_replace("\\","",$arrDados['tipoMovimentacao']);  
        $data 			= json_decode(utf8_encode($arrDados['tipoMovimentacao']));
	$tipo 	= mysql_escape_string($data->{'movimento'}); 		
	
	$strSQL = "INSERT INTO TIPO_MOVIMENTACAO (MOVIMENTO) VALUES ('".$tipo."')";
        
	if(mysql_query($strSQL))
	{
		
		$data->{'id'} 	   	= mysql_insert_id(); 
		$arrMessage['success'] 		= true; 
		$arrMessage['message'] 		= "Registro salvo com sucesso!";
		$arrMessage['tipoMovimentacao']    		= $data;		
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
	$strNome 		= mysql_escape_string($arrDados['movimento']); 	

	$strSQL = "UPDATE TIPO_MOVIMENTACAO SET MOVIMENTO = '".$strNome."' WHERE COD_TIPO_MOVIMENTACAO = '".$id."' ";
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
	   $strSQL 	 	= "DELETE FROM TIPO_MOVIMENTACAO WHERE COD_TIPO_MOVIMENTACAO = '".$id."'"; 
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
        
        $strSQL = "SELECT COD_TIPO_MOVIMENTACAO AS id, MOVIMENTO AS movimento FROM TIPO_MOVIMENTACAO ORDER BY ".mysql_real_escape_string($order);
        
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
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM TIPO_MOVIMENTACAO";
        $total 		= mysql_fetch_array(mysql_query($strSQL));

        echo json_encode(array(
            "tipoMovimentacao" => $arrBanco,
            "success" => true,
			"inicio" => $inicio,
            "total" => $total['total']			
        ));
	
	
}		
mysql_close(); 