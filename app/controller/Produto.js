Ext.require('Ext.window.MessageBox');
Ext.define('UNA.controller.Produto', {
    extend: 'Ext.app.Controller',
    stores: ['Produtos'],
    models: ['Produto'], 
	
    views: [
    'produto.Edit',
	'produto.List'    
    ],
    
    refs: [
    {
        ref:'produtoEdit', 
        selector:'produtoEdit'
    },
    {
        ref:'produtoList', 
        selector:'produtoList'
    }
    ],

    init: function() {
        this.control({
            'produtoList': {
                itemdblclick: this.edit
            },

            'produtoList button[action=insert]': {
                click: this.insert
            },
            
            'produtoList button[action=edit]': {
                click: this.edit
            },

            'produtoList button[action=destroy]': {
                click: this.deleteUser
            },
            
            'produtoList button[action=refresh]': {
                click: this.refresh
            },

            'produtoEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getProdutoList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('produtoEdit');
        view.setTitle('Novo Produto');
    },
    
    deleteUser: function() {
        
        var grid    = this.getProdutoList(),
            records = grid.getSelectionModel().getSelection();

        if(records.length === 0){
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }else{
            Ext.Msg.show({
                title : 'Confirmação',
                msg : 'Tem certeza que deseja deletar o(s) registro(s) selecionado(s)?',
                buttons : Ext.Msg.YESNO,
                icon : Ext.MessageBox.WARNING,
                scope : this,
                width : 450,
                fn : function(btn, ev){
                    if (btn == 'yes') {						
                        /* var store = this.getProdutoList().store;						
                        store.remove(records);
                        this.getProdutoList().store.sync(); */ 
						// array para armazenar o(s) id(s) dos registros a serem excluídos
			var idSel = [];
			
			// atribui o(s) id(s) dos registros selecionados ao array de id(s) dos registros a serem excluídos
			for( var i = 0 ; i < records.length ; i++ ){
				idSel.push(records[i].data.id);
			}
				
			// faz a requisição da exclusão
			Ext.Ajax.request ({
				scope: this,
				url	: 'http://estoque.ninjadevspace.com/estoqueservice/produtos/remove', //arquivo que contém o método a utilizar
				params	: {
					'id[]'	: idSel //manda o array idSel para o método excluir o registro 
				},
				success: function(r){ // se a exclusão foi executada com sucesso
					//Se tudo OK, pegamos a resposta que é um JSON e decodificamos para um objeto
					var obj = Ext.decode(r.responseText);
					//Verificamos se obtivemos sucesso na ação
					if(obj.success){						
						Ext.Msg.alert('Sucesso', obj.message);
						this.getProdutoList().store.loadPage(1);
						//this.getProdutoList().store.load(); // atualiza informações do grid												 
					}
					else{
						Ext.Msg.alert('Erro', obj.message); //exibe a mensagem
					}
				},
				failure: function(){ // se houve algum erro ao submeter o formulário 					
					Ext.Msg.alert('Erro', 'Erro na comunicação com o servidor.'); //exibe a mensagem
				}
			});
												
                    }
                }
            });
        }
    },

    save: function(button) {	
        
        var win     	= button.up('window'),
            form    	= win.down('form').getForm(),
            id = form.getRecord() ? form.getRecord().get('id') : 0;
			
        if (form.isValid()) {
            var record = form.getRecord(),
                values = form.getValues();
            if (record)
			{												
                if(record.data['id'])
				{						
					Ext.Ajax.request ({
						scope	: this,
						url		: 'http://estoque.ninjadevspace.com/estoqueservice/produtos/update', //arquivo que contém o método a utilizar
						params	: {
						'id'	: id,
						'descricao'   : values.descricao //manda os dados do form 
						},
						success: function(r){ 
							//Se tudo OK, pegamos a resposta que é um JSON e decodificamos para um objeto
							var obj = Ext.decode(r.responseText);
							//Verificamos se obtivemos sucesso na ação
							if(obj.success)
							{
								Ext.Msg.alert('Sucesso', obj.message);								
							}
							else
							{
								Ext.Msg.alert('Erro', obj.message); //exibe a mensagem								
							}
						},
						failure: function(){ // se houve algum erro ao submeter o formulário 					
								Ext.Msg.alert('Erro', 'Erro na comunicação com o servidor.'); //exibe a mensagem
						}
					});										
					this.getProdutoList().store.load();
					//record.set(values);									
                }
            } 
			else
			{
                var record = Ext.create('UNA.model.Produto');
                record.set(values);
                this.getProdutoList().store.add(record);
				this.getProdutoList().store.sync();
            }
			
            win.close();            
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getProdutoList().getSelectionModel().getSelection();    	    	
        if(records.length === 1){
            var editWind = Ext.widget('produtoEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});