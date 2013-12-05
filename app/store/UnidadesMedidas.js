Ext.define('UNA.store.UnidadesMedidas', {
    extend      : 'Ext.data.Store',
    model       : 'UNA.model.UnidadeMedida',    
    remoteSort  : false,    
    autoLoad    : false,
    pageSize    : 10,
   autoLoad     : {start: 0, limit: 10},
   //Create, update, destroy, read 
    proxy       : {
        simpleSortMode  : true,
        type            : 'ajax',           
            api         : {
                read    : 'http://services.ninjadevspace.com/estoqueservice/medidas/list',
                create  : 'http://services.ninjadevspace.com/estoqueservice/categorias/save',       
                update  : 'http://services.ninjadevspace.com/estoqueservice/categorias/update',                     
                destroy : ''          
                          },
        actionMethods   : {
                read    : 'GET',
                create  : 'POST',
                update  : 'POST',
                destroy : 'POST'        
                          },  
            reader      : {
                type        : 'json',
                root        : 'unidade',
            successProperty : 'success'
        },
        writer          : {
            type            : 'json',
            writeAllFields  : true,
            encode          : true,
            root            : 'unidade'
        },/*
        extraParams: {             
            sort    : 'idUnidadeMedida, NmUnidadeMedida',    
            dir     : 'ASC'            
        }, */
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