Ext.define('UNA.store.TiposMovimentacao', {
    extend		: 'Ext.data.Store',
    model		: 'UNA.model.TipoMovimentacao',    
    remoteSort	: false,    
	autoLoad	: false,
    pageSize	: 10,
   autoLoad		: {start: 0, limit: 10},
   //Create, update, destroy, read 
    proxy		: {
        simpleSortMode	: true,
        type			: 'ajax',			
			api         : {
				read    : 'php/tiposMovimentacao.php?acao=list',
				create  : 'php/tiposMovimentacao.php?acao=insert',		
				update  : 'php/tiposMovimentacao.php?acao=update',						
				destroy : 'php/tiposMovimentacao.php?acao=delete'			
						  },
		actionMethods 	: {
				read	: 'GET',
				create	: 'POST',
				update	: 'POST',
				destroy : 'POST'		
						  },  
			reader		: {
				type		: 'json',
				root		: 'tipoMovimentacao',
            successProperty	: 'success'
        },
		writer			: {
            type			: 'json',
            writeAllFields	: true,
            encode			: true,
            root			: 'tipoMovimentacao'
        },
		extraParams: {             
            sort 	: 'COD_TIPO_MOVIMENTACAO',    
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