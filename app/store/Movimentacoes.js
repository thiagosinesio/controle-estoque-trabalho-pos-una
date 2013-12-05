Ext.define('UNA.store.Movimentacoes', {
    extend		: 'Ext.data.Store',
    model		: 'UNA.model.Movimentacao',    
    remoteSort	: false,    
	autoLoad	: false,
    pageSize	: 10,
   autoLoad		: {start: 0, limit: 10},
   //Create, update, destroy, read 
    proxy		: {
        simpleSortMode	: true,
        type			: 'ajax',			
			api         : {
				read    : 'http://www.estoque.ninjadevspace.com/estoqueservice/movimentacoes/list',
				create  : 'php/movimentacoes.php?acao=insert',		
				update  : 'http://estoque.ninjadevspace.com/estoqueservice/movimentacoes/update',						
				destroy : 'php/movimentacoes.php?acao=delete'			
						  },
		actionMethods 	: {
				read	: 'GET',
				create	: 'POST',
				update	: 'POST',
				destroy : 'POST'		
						  },  
			reader		: {
				type		: 'json',
				root		: 'movimentacao',
            successProperty	: 'success'
        },
		writer			: {
            type			: 'json',
            writeAllFields	: true,
            encode			: true,
            root			: 'movimentacao'
        },
		extraParams: {             
            sort 	: 'id',    
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