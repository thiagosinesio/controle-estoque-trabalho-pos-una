Ext.require(['UNA.view.AbstractForm']);
Ext.require(['UNA.view.AbstractWindow']);
Ext.require(['UNA.view.produto.ComboCategoria']);
Ext.require(['UNA.view.produto.ComboUnidadeMedida']);

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
                        xtype      : 'fieldcontainer',
                        fieldLabel : 'Status',
                        defaultType: 'radiofield',
                        defaults: {
                            flex: 1
                        },
                        layout: 'hbox',
                        items: [
                            {
                                boxLabel  : 'Disponível',
                                name      : 'status',
                                inputValue: 'V',
                                id        : 'radio1'
                            }, {
                                boxLabel  : 'Indisponível',
                                name      : 'status',
                                inputValue: 'F',
                                id        : 'radio2'
                            }
                        ]
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
  
