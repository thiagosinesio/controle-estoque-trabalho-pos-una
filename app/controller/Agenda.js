Ext.require('Ext.window.MessageBox');
Ext.define('EIA.controller.Agenda', {
    extend: 'Ext.app.Controller',
    stores: ['Agendas'],
    models: ['Agenda'], 
	
    views: [
    'agenda.Edit',
	'agenda.List'    
    ],
    
    refs: [
    {
        ref:'agendaEdit', 
        selector:'agendaEdit'
    },
    {
        ref:'agendaList', 
        selector:'agendaList'
    }
    ],

    init: function() {
        this.control({
            'agendaList': {
                itemdblclick: this.edit
            },

            'agendaList button[action=insert]': {
                click: this.insert
            },
            
            'agendaList button[action=edit]': {
                click: this.edit
            },

            'agendaList button[action=destroy]': {
                click: this.delete
            },
            
            'agendaList button[action=refresh]': {
                click: this.refresh
            },

            'agendaEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getAgendaList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('agendaEdit');
        view.setTitle('Novo Contato');
    },
    
    delete: function() {
        
        var grid    = this.getAgendaList(),
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
                    if (btn == 'yes') 
					{						                        
						// array para armazenar o(s) id(s) dos registros a serem excluídos
						var idSel = [];
			
						// atribui o(s) id(s) dos registros selecionados ao array de id(s) dos registros a serem excluídos
						for( var i = 0 ; i < records.length ; i++ )
						{
							idSel.push(records[i].data.idAgenda);
						}
				
			// faz a requisição da exclusão
			Ext.Ajax.request ({
				scope	: this,
				url		: 'php/agendas.php?acao=delete', //arquivo que contém o método a utilizar
				params	: {
							'id[]'	: idSel //manda o array idSel para o método excluir o registro 
						  },
				success: function(r){ // se a exclusão foi executada com sucesso
					//Se tudo OK, pegamos a resposta que é um JSON e decodificamos para um objeto
					var obj = Ext.decode(r.responseText);
					//Verificamos se obtivemos sucesso na ação
					if(obj.success){						
						Ext.Msg.alert('Sucesso', obj.message);
						this.getAgendaList().store.loadPage(1);
						//this.getAgendaList().store.load(); // atualiza informações do grid												 
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
            idAgenda	= form.getRecord() ? form.getRecord().get('idAgenda') : 0;
			
        if (form.isValid()) {
            var record = form.getRecord(),
                values = form.getValues();
            if (record)
			{												
                if(record.data['idAgenda'])
				{						
					Ext.Ajax.request ({
						scope	: this,
						url		: 'php/agendas.php?acao=update', //arquivo que contém o método a utilizar
						params	: {
						'idAgenda'					: idAgenda,
						'NmContato'	   				: values.NmContato,
						'DsTelefone'   				: values.DsTelefone,
						'DtNiver'	   				: values.DtNiver,
						'teCategoria_idCategoria' 	: values.teCategoria_idCategoria
						//manda os dados do form 
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
                }
            } 
			else
			{
                var record = Ext.create('EIA.model.Agenda');
                record.set(values);
                this.getAgendaList().store.add(record);
				this.getAgendaList().store.sync();				
            }
			
            win.close();            
			this.getAgendaList().store.load();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getAgendaList().getSelectionModel().getSelection();    	    	
        if(records.length === 1){
            var editWind = Ext.widget('agendaEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }
});