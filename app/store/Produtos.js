Ext.define('UNA.store.Produtos', {
    extend		: 'Ext.data.Store',
    model		: 'UNA.model.Produto',    
    remoteSort	: false,    
	autoLoad	: false,
    pageSize	: 10,
   autoLoad		: {start: 0, limit: 10},
   //Create, update, destroy, read 
    proxy		: {
        simpleSortMode	: true,
        type			: 'ajax',			
			api         : {
				read    : 'php/produtos.php?acao=list',
				create  : 'php/produtos.php?acao=insert',		
				update  : 'php/produtos.php?acao=update',						
				destroy : 'php/produtos.php?acao=delete'			
						  },
		actionMethods 	: {
				read	: 'POST',
				create	: 'POST',
				update	: 'POST',
				destroy : 'POST'		
						  },  
			reader		: {
				type		: 'json',
				root		: 'produto',
            successProperty	: 'success'
        },
		writer			: {
            type			: 'json',
            writeAllFields	: true,
            encode			: true,
            root			: 'produto'
        },
		extraParams: {             
            sort 	: 'COD_PRODUTO, DESCRICAO',    
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