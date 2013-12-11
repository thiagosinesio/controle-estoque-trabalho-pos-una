<?php
require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 
//var_dump($_REQUEST);
if($arrDados["acao"]=="insert")
{      
	$arrDados['data'] = str_replace("\\","",$arrDados['data']);  
        $data           = json_decode(utf8_encode($arrDados['data']));
        
        $qtd 	= mysql_escape_string($data->{'quantidade'});
	$valUnit 	= mysql_escape_string($data->{'valorUnitario'});
        $idMov 	= mysql_escape_string($data->{'idMovimentacao'});
        $idProd 	= mysql_escape_string($data->{'idProduto'});
        
        $strSQL = "INSERT INTO MOVIMENTACAO_ITEM (QUANTIDADE, VALOR_UNITARIO, 
                    MOVIMENTACAO_ID, PRODUTO_ID) VALUES ('".$qtd."', '".$valUnit."', '".$idMov."',"
                . "'".$idProd."')";
	
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
	$qtd    = mysql_escape_string($arrDados['quantidade']); 	
        $valUnit    = mysql_escape_string($arrDados['valorUnitario']); 	
        $idMov    = mysql_escape_string($arrDados['idMovimentacao']); 	
        $idProd    = mysql_escape_string($arrDados['idProduto']); 	               
        
	$strSQL = "UPDATE MOVIMENTACAO_ITEM SET "
                . "QUANTIDADE = '".$qtd."',  
                    VALOR_UNITARIO = '".$valUnit."',
                    MOVIMENTACAO_ID = '".$idMov."',
                    PRODUTO_ID = '".$idProd."'
                    WHERE COD_MOVIMENTACAO_ITEM = '".$id."' ";
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
    $arrDados = $arrDados["id"];
	//var_dump($arrDados['id']);
	for($i=0;$i<count($arrDados);$i++)
	{
       $id = mysql_real_escape_string($arrDados[$i]);
	   $strSQL 	 	= "DELETE FROM MOVIMENTACAO_ITEM WHERE COD_MOVIMENTACAO_ITEM = '".$id."'"; 
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
        
        $strSQL = "SELECT COD_MOVIMENTACAO_ITEM AS id, QUANTIDADE AS quantidade, 
                    VALOR_UNITARIO AS valorUnitario, MOVIMENTACAO_ID AS idMovimentacao,
                    PRODUTO.DESCRICAO AS produto, PRODUTO_ID AS idProduto
                    FROM MOVIMENTACAO_ITEM 
                    JOIN PRODUTO ON PRODUTO.COD_PRODUTO = MOVIMENTACAO_ITEM.PRODUTO_ID"
                . " ORDER BY ".mysql_real_escape_string($order);
        
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
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM MOVIMENTACAO_ITEM";
        $total 		= mysql_fetch_array(mysql_query($strSQL));

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true,
	    "inicio" => $inicio,
            "total" => $total['total']			
        ));
	
	
}		
mysql_close(); 