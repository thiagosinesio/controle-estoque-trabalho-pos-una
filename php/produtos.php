<?php
require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 
//var_dump($_REQUEST);
if($arrDados["acao"]=="insert")
{
    
   /* COD_PRODUTO AS id, PRODUTO.DESCRICAO AS , ESTOQUE_MINIMO AS , 
                    ESTOQUE_ATUAL AS , ESTOQUE_MAXIMO AS , PRECO_COMPRA AS , 
                    PRECO_VENDA AS , STATUS AS , CATEGORIA.DESCRICAO AS categoriaProduto, 
                    UNIDADE AS medidaProduto*/
    
	$arrDados['produto'] = str_replace("\\","",$arrDados['produto']);  
        $data           = json_decode(utf8_encode($arrDados['produto']));
	$descricao 	= mysql_escape_string($data->{'descricao'});
        $estoqMin 	= mysql_escape_string($data->{'estoqueMinimo'});
        $estoqAtual 	= mysql_escape_string($data->{'estoqueAtual'});
        $estoqMax 	= mysql_escape_string($data->{'estoqueMaximo'});
        $precoCompra 	= mysql_escape_string($data->{'precoCompra'});
        $precoVenda 	= mysql_escape_string($data->{'precoVenda'});
        $status 	= mysql_escape_string($data->{'status'});
        $idCat          = mysql_escape_string($data->{'idCategoria'});
        $idUnidade 	= mysql_escape_string($data->{'tipo'});
        
	$strSQL = "INSERT INTO PRODUTO (PRODUTO.DESCRICAO, ESTOQUE_MINIMO, 
                    ESTOQUE_ATUAL, ESTOQUE_MAXIMO, PRECO_COMPRA, PRECO_VENDA, STATUS, COD_CATEGORIA, 
                    COD_UNIDADE_MEDIDA) VALUES ('".$descricao."', '".$estoqMin."', '".$estoqAtual."',"
                . "'".$estoqMax."', '".$precoCompra."', '".$precoVenda."', '".$status."', "
                . "'".$idCat."', '".$idUnidade."')";
	
	if(mysql_query($strSQL))
	{
		
		$data->{'id'} 	   	= mysql_insert_id(); 
		$arrMessage['success'] 		= true; 
		$arrMessage['message'] 		= "Registro salvo com sucesso!";
		$arrMessage['produto']    		= $data;		
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
	$id 	= mysql_escape_string($arrDados['idCategoria']); 
	$strNome 		= mysql_escape_string($arrDados['NmCategoria']); 	

	$strSQL = "UPDATE TIPO_PESSOA SET NmCategoria = '".$strNome."' WHERE COD_TIPO_PESSOA = '".$id."' ";
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
	   $strSQL 	 	= "DELETE FROM PRODUTO WHERE COD_PRODUTO = '".$id."'"; 
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
        
        $strSQL = "SELECT COD_PRODUTO AS id, PRODUTO.DESCRICAO AS descricao, ESTOQUE_MINIMO AS estoqueMinimo, 
                    ESTOQUE_ATUAL AS estoqueAtual, ESTOQUE_MAXIMO AS estoqueMaximo, PRECO_COMPRA AS precoCompra, 
                    PRECO_VENDA AS precoVenda, STATUS AS status, CATEGORIA.DESCRICAO AS categoriaProduto, 
                    UNIDADE AS medidaProduto
                    FROM PRODUTO 
                    JOIN CATEGORIA ON CATEGORIA.COD_CATEGORIA = PRODUTO.COD_CATEGORIA
                    JOIN UNIDADE_MEDIDA ON UNIDADE_MEDIDA.COD_UNIDADE = PRODUTO.COD_UNIDADE_MEDIDA"
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
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM PRODUTO";
        $total 		= mysql_fetch_array(mysql_query($strSQL));

        echo json_encode(array(
            "produto" => $arrBanco,
            "success" => true,
	    "inicio" => $inicio,
            "total" => $total['total']			
        ));
	
	
}		
mysql_close(); 