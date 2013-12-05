Ext.require(['UNA.view.AbstractForm']);
Ext.require(['UNA.view.AbstractWindow']);
Ext.require(['UNA.view.produto.Combo']);

Ext.define('UNA.view.produto.Edit', {
    extend: 'UNA.view.AbstractWindow',
    alias : 'widget.produtoEdit',
    title : 'Edição de Produto',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [{
                        name : 'descricao',
                        fieldLabel: 'Nome'				
					},
                    {
                        name : 'descricao',
                        fieldLabel: 'Estoque Mínimo'             
                    },  
                    {
                        name : 'descricao',
                        fieldLabel: 'Estoque Atual'             
                    },  
                    {
                        name : 'descricao',
                        fieldLabel: 'Estoque Máximo'             
                    },  
                    {
                        name : 'descricao',
                        fieldLabel: 'Preço Compra'             
                    },  
                    {
                        name : 'descricao',
                        fieldLabel: 'Preço Venda'             
                    },  
                    {
                        name : 'descricao',
                        fieldLabel: 'Status'             
                    },  
                    {
                        name : 'descricao',
                        fieldLabel: 'Descrição'             
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
  
