Ext.require('Ext.window.MessageBox');
Ext.define('UNA.controller.MovimentacaoItem', {
    extend: 'Ext.app.Controller',
    stores: ['MovimentacaoItens'],
    models: ['MovimentacaoItem'], 
	
    views: [
    'movimentacaoItem.Edit',
	'movimentacaoItem.List'    
    ],
    
    refs: [
    {
        ref:'movimentacaoItemEdit', 
        selector:'movimentacaoItemEdit'
    },
    {
        ref:'movimentacaoItemList', 
        selector:'movimentacaoItemList'
    }
    ],

    init: function() {
        this.control({
            'movimentacaoItemList': {
                itemdblclick: this.edit
            },

            'movimentacaoItemList button[action=insert]': {
                click: this.insert
            },
            
            'movimentacaoItemList button[action=edit]': {
                click: this.edit
            },

            'movimentacaoItemList button[action=destroy]': {
                click: this.deleteUser
            },
            
            'movimentacaoItemList button[action=refresh]': {
                click: this.refresh
            },

            'movimentacaoItemEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getMovimentacaoItemList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('movimentacaoItemEdit');
        view.setTitle('Nova Movimentação de Item');
    },
    
    deleteUser: function() {
        
        var grid    = this.getMovimentacaoItemList(),
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
                        /* var store = this.getMovimentacaoItemList().store;						
                        store.remove(records);
                        this.getMovimentacaoItemList().store.sync(); */ 
						// array para armazenar o(s) id(s) dos registros a serem excluídos
			var idSel = [];
			
			// atribui o(s) id(s) dos registros selecionados ao array de id(s) dos registros a serem excluídos
			for( var i = 0 ; i < records.length ; i++ ){
				idSel.push(records[i].data.id);
			}
				
			// faz a requisição da exclusão
			Ext.Ajax.request ({
				scope: this,
				url	: 'php/movimentacaoItens.php?acao=delete', //arquivo que contém o método a utilizar
				params	: {
					'id[]'	: idSel //manda o array idSel para o método excluir o registro 
				},
				success: function(r){ // se a exclusão foi executada com sucesso
					//Se tudo OK, pegamos a resposta que é um JSON e decodificamos para um objeto
					var obj = Ext.decode(r.responseText);
					//Verificamos se obtivemos sucesso na ação
					if(obj.success){						
						Ext.Msg.alert('Sucesso', obj.message);
						this.getMovimentacaoItemList().store.loadPage(1);
						//this.getMovimentacaoItemList().store.load(); // atualiza informações do grid												 
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
						url		: 'php/movimentacaoItens.php?acao=update', //arquivo que contém o método a utilizar
						params	: {
						'id'	: id,
						'quantidade'   : values.quantidade,
                                                'valorUnitario': values.valorUnitario,
                                                'idMovimentacao': values.idMovimentacao,
                                                'idProduto': values.idProduto//manda os dados do form 
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
					this.getMovimentacaoItemList().store.load();
					//record.set(values);									
                }
            } 
			else
			{
                var record = Ext.create('UNA.model.MovimentacaoItem');
                record.set(values);
                this.getMovimentacaoItemList().store.add(record);
				this.getMovimentacaoItemList().store.sync();
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
        
        var records = this.getMovimentacaoItemList().getSelectionModel().getSelection();    	    	
        if(records.length === 1){
            var editWind = Ext.widget('movimentacaoItemEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});