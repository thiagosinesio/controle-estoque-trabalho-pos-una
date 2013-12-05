Ext.define('UNA.store.Fornecedores', {
    extend		: 'Ext.data.Store',
    model		: 'UNA.model.Fornecedor',    
    remoteSort	: false,    
	autoLoad	: false,
    pageSize	: 10,
   autoLoad		: {start: 0, limit: 10},
   //Create, update, destroy, read 
    proxy		: {
        simpleSortMode	: true,
        type			: 'ajax',			
			api         : {
				read    : 'http://www.estoque.ninjadevspace.com/estoqueservice/fornecedores/list',
				create  : 'php/fornecedores.php?acao=insert',		
				update  : 'http://estoque.ninjadevspace.com/estoqueservice/fornecedores/update',						
				destroy : 'php/fornecedores.php?acao=delete'			
						  },
		actionMethods 	: {
				read	: 'GET',
				create	: 'POST',
				update	: 'POST',
				destroy : 'POST'		
						  },  
			reader		: {
				type		: 'json',
				root		: 'fornecedor',
            successProperty	: 'success'
        },
		writer			: {
            type			: 'json',
            writeAllFields	: true,
            encode			: true,
            root			: 'fornecedor'
        },
		extraParams: {             
            sort 	: 'id, nome',    
            dir 	: 'ASC'            
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    listeners: {
        
        write: function(proxy, operation){
            
            var obj = Ext.decode(operation.response.responseText);
            
            if(obj.success){
                Ext.ux.Msg.flash({
                    msg: obj.message,
                    type: 'success'
                });
            }else{
                Ext.ux.Msg.flash({
                    msg: obj.message,
                    type: 'error'
                });
            }
        }
        
    }    
});