<?php

require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 

if($arrDados["acao"]=="insert")
{
	$arrDados['data'] = str_replace("\\","",$arrDados['data']);
    $data 			= json_decode(utf8_encode($arrDados['data']));	
	$idCategoria	= mysql_escape_string($data->{'teCategoria_idCategoria'}); 	
	$strNome 		= mysql_escape_string($data->{'NmContato'}); 	
	$strTelefone	= mysql_escape_string($data->{'DsTelefone'}); 	
	$dtNiver 		= mysql_escape_string($data->{'DtNiver'}); 	 			

	$strSQL  = "INSERT INTO teagenda ";
	$strSQL .= " (teCategoria_idCategoria,NmContato,DsTelefone,DtNiver) "; 
	$strSQL .= "VALUES ('".$idCategoria."', '".$strNome."', '".$strTelefone."', '".$dtNiver."')";
	
	if(mysql_query($strSQL))
	{
	
		$data->{'idAgenda'} 	   					= mysql_insert_id(); 	
		$arrMessage['success'] 						= true; 
		$arrMessage['message'] 						= "Registro salvo com sucesso!";
		$arrMessage['data']    						= $data;		
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
	$idAgenda 		= mysql_escape_string($arrDados['idAgenda']); 
	$idCategoria	= mysql_escape_string($arrDados['teCategoria_idCategoria']); 	
	$strNome 		= mysql_escape_string($arrDados['NmContato']); 	
	$strTelefone	= mysql_escape_string($arrDados['DsTelefone']); 	
	$dtNiver 		= mysql_escape_string($arrDados['DtNiver']); 	

	$strSQL  = "UPDATE teagenda SET "; 
	$strSQL .= "  NmContato 				= '".$strNome."' "; 
	$strSQL .= ", teCategoria_idCategoria 	= '".$idCategoria."'"; 
	$strSQL .= ", DsTelefone 				= '".$strTelefone."'"; 
	$strSQL .= ", DtNiver 					= '".$dtNiver."'"; 	
	$strSQL .= " WHERE idAgenda 			= '".$idAgenda."' ";
			
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
    $arrAgendas = $arrDados["id"];
	
	for($i=0;$i<count($arrAgendas);$i++)
	{
       $idAgenda	= mysql_real_escape_string($arrAgendas[$i]);
	   $strSQL 	 	= "DELETE FROM teagenda WHERE idAgenda = '".$idAgenda."'"; 
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
        
        $strSQL = "SELECT idAgenda, teCategoria_idCategoria, NmContato, DsTelefone, DtNiver FROM teagenda ORDER BY ".mysql_real_escape_string($order);
        
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
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM teagenda";
        $total 		= mysql_fetch_array(mysql_query($strSQL));

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true,
			"inicio" => $inicio,
            "total" => $total['total']			
        ));
	
	
}		
mysql_close(); 