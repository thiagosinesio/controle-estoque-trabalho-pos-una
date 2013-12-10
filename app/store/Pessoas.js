Ext.define('UNA.store.Pessoas', {
    extend      : 'Ext.data.Store',
    model       : 'UNA.model.Pessoa',    
    remoteSort  : false,    
    autoLoad    : false,
    pageSize    : 10,
   autoLoad     : {start: 0, limit: 10},
   //Create, update, destroy, read 
    proxy       : {
        simpleSortMode  : true,
        type            : 'ajax',           
            api         : {
                read    : 'php/pessoas.php?acao=list',
                create  : 'php/pessoas.php?acao=insert',        
                update  : 'php/pessoas.php?acao=update',                        
                destroy : 'php/pessoas.php?acao=delete'         
                          },
        actionMethods   : {
                read    : 'POST',
                create  : 'POST',
                update  : 'POST',
                destroy : 'POST'        
                          },  
            reader      : {
                type        : 'json',
                root        : 'data',
            successProperty : 'success'
        },
        writer          : {
            type            : 'json',
            writeAllFields  : true,
            encode          : true,
            root            : 'data'
        },
        extraParams: {             
            sort    : 'COD_PESSOA',    
            dir     : 'ASC'            
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