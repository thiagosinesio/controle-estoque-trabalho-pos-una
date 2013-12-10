Ext.require(['UNA.view.AbstractForm']);
Ext.require(['UNA.view.AbstractWindow']);
//Ext.require(['UNA.view.pessoa.ComboCategoria']);
//Ext.require(['UNA.view.pessoa.ComboUnidadeMedida']);

Ext.define('UNA.view.pessoa.Edit', {
    extend: 'UNA.view.AbstractWindow',
    alias : 'widget.pessoaEdit',
    title : 'Edição de Pessoa',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [{
                        name : 'descricao',
                        fieldLabel: 'Nome'				
					},
                    {
                        name : 'estoqueMinimo',
                        fieldLabel: 'Estoque Mínimo'             
                    },  
                    {
                        name : 'estoqueAtual',
                        fieldLabel: 'Estoque Atual'             
                    },  
                    {
                        name : 'estoqueMaximo',
                        fieldLabel: 'Estoque Máximo'             
                    },  
                    {
                        name : 'precoCompra',
                        fieldLabel: 'Preço Compra'             
                    },  
                    {
                        name : 'precoVenda',
                        fieldLabel: 'Preço Venda'             
                    },  
                    {
                        name : 'status',
                        fieldLabel: 'Status'             
                    },
                    {
                        xtype: 'categoriaCombo'
                    },
                    {
                        xtype: 'unidadeMedidaCombo'
                    }	
			]}
        ];
        this.callParent(arguments);
    }
});
  
