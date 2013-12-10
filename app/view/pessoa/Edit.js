Ext.require(['UNA.view.AbstractForm']);
Ext.require(['UNA.view.AbstractWindow']);
Ext.require(['UNA.view.pessoa.ComboUsuario']);
Ext.require(['UNA.view.pessoa.ComboTipoPessoa']);

Ext.define('UNA.view.pessoa.Edit', {
    extend: 'UNA.view.AbstractWindow',
    alias : 'widget.pessoaEdit',
    title : 'Edição de Pessoa',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [{
                        name : 'nome',
                        fieldLabel: 'Nome'				
                    },
                    {
                        name : 'cpfcnpj',
                        fieldLabel: 'CPF/CNPJ'             
                    },  
                    {
                        name : 'telefone',
                        fieldLabel: 'Telefone'             
                    },  
                    {
                        name : 'email',
                        fieldLabel: 'E-mail'             
                    },
                    {
                        xtype      : 'fieldcontainer',
                        fieldLabel : 'Grupo',
                        defaultType: 'radiofield',
                        defaults: {
                            flex: 1
                        },
                        //layout: 'hbox',
                        items: [
                            {
                                boxLabel  : 'Administrador',
                                name      : 'grupo',
                                inputValue: 'A',
                                id        : 'radio1'
                            }, {
                                boxLabel  : 'Cliente',
                                name      : 'grupo',
                                inputValue: 'C',
                                id        : 'radio2'
                            }, {
                                boxLabel  : 'Fornecedor',
                                name      : 'grupo',
                                inputValue: 'F',
                                id        : 'radio3'
                            }
                        ]
                    },
                    {
                        xtype: 'usuarioCombo'
                    },
                    {
                        xtype: 'tipoPessoaCombo'
                    }
                ]}
        ];
        this.callParent(arguments);
    }
});
  