Ext.require(['UNA.view.AbstractForm']);
Ext.require(['UNA.view.AbstractWindow']);

Ext.define('UNA.view.categoria.Edit', {
    extend: 'UNA.view.AbstractWindow',
    alias : 'widget.categoriaEdit',
    title : 'Edição de Categoria',

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