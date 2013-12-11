Ext.require('Ext.window.MessageBox');
Ext.define('UNA.controller.Movimentacao', {
    extend: 'Ext.app.Controller',
    stores: ['Movimentacoes'],
    models: ['Movimentacao'], 
	
    views: [
    'movimentacao.Edit',
	'movimentacao.List'    
    ],
    
    refs: [
    {
        ref:'movimentacaoEdit', 
        selector:'movimentacaoEdit'
    },
    {
        ref:'movimentacaoList', 
        selector:'movimentacaoList'
    }
    ],

    init: function() {
        this.control({
            'movimentacaoList': {
                itemdblclick: this.edit
            },

            'movimentacaoList button[action=insert]': {
                click: this.insert
            },
            
            'movimentacaoList button[action=edit]': {
                click: this.edit
            },

            'movimentacaoList button[action=destroy]': {
                click: this.deleteUser
            },
            
            'movimentacaoList button[action=refresh]': {
                click: this.refresh
            },

            'movimentacaoEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getMovimentacaoList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('movimentacaoEdit');
        view.setTitle('Nova Movimentação');
    },
    
    deleteUser: function() {
        
        var grid    = this.getMovimentacaoList(),
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
                        /* var store = this.getMovimentacaoList().store;						
                        store.remove(records);
                        this.getMovimentacaoList().store.sync(); */ 
						// array para armazenar o(s) id(s) dos registros a serem excluídos
			var idSel = [];
			
			// atribui o(s) id(s) dos registros selecionados ao array de id(s) dos registros a serem excluídos
			for( var i = 0 ; i < records.length ; i++ ){
				idSel.push(records[i].data.id);
			}
				
			// faz a requisição da exclusão
			Ext.Ajax.request ({
				scope: this,
				url	: 'php/movimentacoes.php?acao=delete', //arquivo que contém o método a utilizar
				params	: {
					'id[]'	: idSel //manda o array idSel para o método excluir o registro 
				},
				success: function(r){ // se a exclusão foi executada com sucesso
					//Se tudo OK, pegamos a resposta que é um JSON e decodificamos para um objeto
					var obj = Ext.decode(r.responseText);
					//Verificamos se obtivemos sucesso na ação
					if(obj.success){						
						Ext.Msg.alert('Sucesso', obj.message);
						this.getMovimentacaoList().store.loadPage(1);
						//this.getMovimentacaoList().store.load(); // atualiza informações do grid												 
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
						url		: 'php/movimentacoes.php?acao=update', //arquivo que contém o método a utilizar
						params	: {
						'id'	: id,
						'data'   : values.data,
                                                'idTipoMovimentacao': values.idTipoMovimentacao,
                                                'idPessoa': values.idPessoa //manda os dados do form 
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
					this.getMovimentacaoList().store.load();
					//record.set(values);									
                }
            } 
			else
			{
                var record = Ext.create('UNA.model.Movimentacao');
                record.set(values);
                this.getMovimentacaoList().store.add(record);
				this.getMovimentacaoList().store.sync();
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
        
        var records = this.getMovimentacaoList().getSelectionModel().getSelection();    	    	
        if(records.length === 1){
            var editWind = Ext.widget('movimentacaoEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});