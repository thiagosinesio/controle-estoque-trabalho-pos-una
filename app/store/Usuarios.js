Ext.define('UNA.store.Usuarios', {
		extend     : 'Ext.data.Store',
		model      : 'UNA.model.Usuario',
		autoLoad   : false, 
		remoteSort : false,
		//pageSize   : 3,
		proxy      : {
			simpleSortMode : true,
			type           : 'ajax',
			api            : {
				read    : 'http://www.estoque.ninjadevspace.com/estoqueservice/categorias/list',
				create  : 'php/usuarios.php?acao=insert',
				update  : 'http://www.estoque.ninjadevspace.com/estoqueservice/categorias/update',
				destroy : 'php/usuarios.php?acao=delete'			
			},
		actionMethods : {
				create : 'GET',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST' 		
		},
		reader : {
			type 			: 'json',
			root 			: 'usuario',
			successProperty : 'success'		
		},
		writer : {
			type 			: 'json',
			writeAllFields  : true,
            encode          : true,
            root            : 'usuario'			
		},
		extraParams : 
		{
			limit : 'limit', 
			sort  : 'id',
			dir   : 'ASC',
			total : 'total'
		}, 
		listeners : {
			exception : function(proxy, response, operation)
			{
				Ext.MessageBox.show({
					title   : 'Erro no proxy',
					msg     : operation.getError(), 
					icon    : Ext.MessageBox.ERROR,
					buttons : Ext.Msg.OK 
				
				});
			
			}
		
		},
		listeners : {
			write : function(proxy, operation){
				var obj = Ext.decode(operation.response.responseText);
				
				if(obj.success)
				{
					Ext.ux.Msg.flash({
						msg  : obj.message,
						type : 'success' 
					});
				}
				else
				{
						Ext.ux.Msg.flash({
						msg  : obj.message,
						type : 'error' 
					});
				}
			}
		
		}
		
	}	
});