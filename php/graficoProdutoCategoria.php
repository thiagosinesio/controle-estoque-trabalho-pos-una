<?php
require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 

if($arrDados["acao"]=="grafico")
{    	        
        $strSQL  = "SELECT COUNT( PRODUTO.COD_PRODUTO ) AS total
							, CATEGORIA.DESCRICAO AS categoria   
						   FROM 
								PRODUTO
					 INNER JOIN 
								CATEGORIA
							 ON 
								PRODUTO.COD_CATEGORIA = CATEGORIA.COD_CATEGORIA
					   GROUP BY 
								CATEGORIA.DESCRICAO";
               				
		$objRs = mysql_query($strSQL);
		$arrBanco = array(); 
		
		while($objRow = mysql_fetch_assoc ($objRs))
		{
			$arrBanco[] = $objRow; 	
		}		                

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true			
        ));
	
	
}		
mysql_close(); 