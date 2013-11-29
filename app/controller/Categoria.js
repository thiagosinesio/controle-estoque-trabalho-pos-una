Ext.require('Ext.window.MessageBox');
Ext.define('UNA.controller.Categoria', {
    extend: 'Ext.app.Controller',
    stores: ['Categorias'],
    models: ['Categoria'], 
	
    views: [
    'categoria.Edit',
	'categoria.List'    
    ],
    
    refs: [
    {
        ref:'categoriaEdit', 
        selector:'categoriaEdit'
    },
    {
        ref:'categoriaList', 
        selector:'categoriaList'
    }
    ],

    init: function() {
        this.control({
            'categoriaList': {
                itemdblclick: this.edit
            },

            'categoriaList button[action=insert]': {
                click: this.insert
            },
            
            'categoriaList button[action=edit]': {
                click: this.edit
            },

            'categoriaList button[action=destroy]': {
                click: this.deleteUser
            },
            
            'categoriaList button[action=refresh]': {
                click: this.refresh
            },

            'categoriaEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getCategoriaList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('categoriaEdit');
        view.setTitle('Nova Categoria');
    },
    
    deleteUser: function() {
        
        var grid    = this.getCategoriaList(),
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
                        /* var store = this.getCategoriaList().store;						
                        store.remove(records);
                        this.getCategoriaList().store.sync(); */ 
						// array para armazenar o(s) id(s) dos registros a serem excluídos
			var idSel = [];
			
			// atribui o(s) id(s) dos registros selecionados ao array de id(s) dos registros a serem excluídos
			for( var i = 0 ; i < records.length ; i++ ){
				idSel.push(records[i].data.idCategoria);
			}
				
			// faz a requisição da exclusão
			Ext.Ajax.request ({
				scope: this,
				url	: 'php/categorias.php?acao=delete', //arquivo que contém o método a utilizar
				params	: {
					'id[]'	: idSel //manda o array idSel para o método excluir o registro 
				},
				success: function(r){ // se a exclusão foi executada com sucesso
					//Se tudo OK, pegamos a resposta que é um JSON e decodificamos para um objeto
					var obj = Ext.decode(r.responseText);
					//Verificamos se obtivemos sucesso na ação
					if(obj.success){						
						Ext.Msg.alert('Sucesso', obj.message);
						this.getCategoriaList().store.loadPage(1);
						//this.getCategoriaList().store.load(); // atualiza informações do grid												 
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
            idCategoria = form.getRecord() ? form.getRecord().get('idCategoria') : 0;
			
        if (form.isValid()) {
            var record = form.getRecord(),
                values = form.getValues();
            if (record)
			{												
                if(record.data['idCategoria'])
				{						
					Ext.Ajax.request ({
						scope	: this,
						url		: 'php/categorias.php?acao=update', //arquivo que contém o método a utilizar
						params	: {
						'idCategoria'	: idCategoria,
						'NmCategoria'   : values.NmCategoria //manda os dados do form 
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
					this.getCategoriaList().store.load();
					//record.set(values);									
                }
            } 
			else
			{
                var record = Ext.create('UNA.model.Categoria');
                record.set(values);
                this.getCategoriaList().store.add(record);
				this.getCategoriaList().store.sync();
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
        
        var records = this.getCategoriaList().getSelectionModel().getSelection();    	    	
        if(records.length === 1){
            var editWind = Ext.widget('categoriaEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});