<?php

require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 
//var_dump($_REQUEST);
if($arrDados["acao"]=="insert")
{
	$arrDados['data'] = str_replace("\\","",$arrDados['data']);  
        $data 			= json_decode(utf8_encode($arrDados['data']));
	$nome 	= mysql_escape_string($data->{'data'}); 		
	$idTipoMov 	= mysql_escape_string($data->{'idTipoMovimentacao'});
        $idPessoa 	= mysql_escape_string($data->{'idPessoa'});
        
	$strSQL = "INSERT INTO MOVIMENTACAO (DATA_MOVIMENTACAO, TIPO_MOVIMENTACAO, COD_PESSOA) VALUES "
                . "('".$nome."', '".$idTipoMov."', '".$idPessoa."')";
        
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
	$data 		= mysql_escape_string($arrDados['data']); 	
	$idTipoMov 	= mysql_escape_string($arrDados['idTipoMovimentacao']);
        $idPessoa 	= mysql_escape_string($arrDados['idPessoa']);
             
	$strSQL = "UPDATE MOVIMENTACAO SET "
                . "DATA_MOVIMENTACAO = '".$data."', "
                . "TIPO_MOVIMENTACAO = '".$idTipoMov."', "
                . "COD_PESSOA = '".$idPessoa."' "               
                . "WHERE COD_MOVIMENTACAO = '".$id."' ";
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
	   $strSQL 	 	= "DELETE FROM MOVIMENTACAO WHERE COD_MOVIMENTACAO = '".$id."'"; 
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
        
        $strSQL = "SELECT COD_MOVIMENTACAO AS id, DATA_MOVIMENTACAO AS data, "
                . "TIPO_MOVIMENTACAO AS idTipoMovimentacao, MOVIMENTACAO.COD_PESSOA AS idPessoa, "
                . "TIPO_MOVIMENTACAO.MOVIMENTO AS tipoMovimentacao, PESSOA.NOME AS pessoa "
                . " FROM MOVIMENTACAO "
                . " JOIN TIPO_MOVIMENTACAO ON TIPO_MOVIMENTACAO.COD_TIPO_MOVIMENTACAO = MOVIMENTACAO.TIPO_MOVIMENTACAO"
                . " JOIN PESSOA ON PESSOA.COD_PESSOA = MOVIMENTACAO.COD_PESSOA "
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
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM MOVIMENTACAO";
        $total 		= mysql_fetch_array(mysql_query($strSQL));

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true,
	    "inicio" => $inicio,
            "total" => $total['total']			
        ));
	
	
}		
mysql_close(); 