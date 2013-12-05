<?php
require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 

if($arrDados["acao"]=="grafico")
{    	        
        $strSQL  = "SELECT 	  COUNT( a.idAgenda ) AS total
							, c.NmCategoria AS categoria   
						   FROM 
								teagenda a 
					 INNER JOIN 
								tecategoria c 
							 ON 
								a.teCategoria_idCategoria = c.idCategoria
					   GROUP BY 
								c.NmCategoria";
               				
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