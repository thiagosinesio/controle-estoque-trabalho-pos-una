Ext.require(['UNA.view.AbstractForm']);
Ext.require(['UNA.view.AbstractWindow']);
Ext.require(['UNA.view.movimentacaoItem.ComboMovimentacao']);
Ext.require(['UNA.view.movimentacaoItem.ComboProduto']);

Ext.define('UNA.view.movimentacaoItem.Edit', {
    extend: 'UNA.view.AbstractWindow',
    alias : 'widget.movimentacaoItemEdit',
    title : 'Edição de Item da Movimentação',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [{
                        name : 'quantidade',
                        fieldLabel: 'Quantidade'				
                    },
                    {
                        name : 'valorUnitario',
                        fieldLabel: 'Valor Unitário'             
                    },
                    {
                        xtype: 'movimentacaoCombo'
                    },
                    {
                        xtype: 'produtoCombo'
                    }	
			]}
        ];
        this.callParent(arguments);
    }
});
  
