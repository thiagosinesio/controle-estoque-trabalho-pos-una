Ext.require('Ext.window.MessageBox');
Ext.define('UNA.controller.Usuario', {
    extend: 'Ext.app.Controller',
    stores: ['Usuarios'],
    models: ['Usuario'], 
    
    views: [
    'usuario.Edit',
    'usuario.List'    
    ],
    
    refs: [
    {
        ref:'usuarioEdit', 
        selector:'usuarioEdit'
    },
    {
        ref:'usuarioList', 
        selector:'usuarioList'
    } 
    ],

    init: function() {
        this.control({
            'usuarioList': {
                itemdblclick: this.edit
            },

            'usuarioList button[action=insert]': {
                click: this.insert
            },
            
            'usuarioList button[action=edit]': {
                click: this.edit
            },

            'usuarioList button[action=destroy]': {
                click: this.deleteUser
            },
            
            'usuarioList button[action=refresh]': {
                click: this.refresh
            },

            'usuarioEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getUsuarioList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('usuarioEdit');
        view.setTitle('Novo Usuário');
    },
    
    deleteUser: function() {
        
        var grid    = this.getUsuarioList(),
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
                        /* var store = this.getUsuarioList().store;                      
                        store.remove(records);
                        this.getUsuarioList().store.sync(); */ 
                        // array para armazenar o(s) id(s) dos registros a serem excluídos
            var idSel = [];
            
            // atribui o(s) id(s) dos registros selecionados ao array de id(s) dos registros a serem excluídos
            for( var i = 0 ; i < records.length ; i++ ){
                idSel.push(records[i].data.id);
            }
                
            // faz a requisição da exclusão
            Ext.Ajax.request ({
                scope: this,
                url : 'php/usuarios.php?acao=delete', //arquivo que contém o método a utilizar
                params  : {
                    'id[]'  : idSel //manda o array idSel para o método excluir o registro 
                },
                success: function(r){ // se a exclusão foi executada com sucesso
                    //Se tudo OK, pegamos a resposta que é um JSON e decodificamos para um objeto
                    var obj = Ext.decode(r.responseText);
                    //Verificamos se obtivemos sucesso na ação
                    if(obj.success){                        
                        Ext.Msg.alert('Sucesso', obj.message);
                        this.getUsuarioList().store.loadPage(1);
                        //this.getUsuarioList().store.load(); // atualiza informações do grid                                                 
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
        
        var win         = button.up('window'),
            form        = win.down('form').getForm(),
            id = form.getRecord() ? form.getRecord().get('id') : 0;
            
        if (form.isValid()) {
            var record = form.getRecord(),
                values = form.getValues();
            if (record)
            {                                               
                if(record.data['id'])
                {                       
                    Ext.Ajax.request ({
                        scope   : this,
                        url     : 'php/usuarios.php?acao=update', //arquivo que contém o método a utilizar
                        params  : {
                        'id'    : id,
                        'login'   : values.login,
                        'password': values.password,
                        'status': values.status //manda os dados do form 
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
                    this.getUsuarioList().store.load();
                    //record.set(values);                                   
                }
            } 
            else
            {
                var record = Ext.create('UNA.model.Usuario');
                record.set(values);
                this.getUsuarioList().store.add(record);
                this.getUsuarioList().store.sync();
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
        
        var records = this.getUsuarioList().getSelectionModel().getSelection();              
        if(records.length === 1){
            var editWind = Ext.widget('usuarioEdit');        
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }       
    }

});