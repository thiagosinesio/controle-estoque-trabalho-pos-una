Ext.require(['UNA.view.AbstractForm']);
Ext.require(['UNA.view.AbstractWindow']);

Ext.define('UNA.view.produto.Edit', {
    extend: 'UNA.view.AbstractWindow',
    alias : 'widget.produtoEdit',
    title : 'Edição de Produto',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [{
                        name : 'descricao',
                        fieldLabel: 'Descrição'				
					}			
			]}
        ];
        this.callParent(arguments);
    }
});