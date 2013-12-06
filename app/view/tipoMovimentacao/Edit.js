Ext.require(['UNA.view.AbstractForm']);
Ext.require(['UNA.view.AbstractWindow']);

Ext.define('UNA.view.tipoMovimentacao.Edit', {
    extend: 'UNA.view.AbstractWindow',
    alias : 'widget.tipoMovimentacaoEdit',
    title : 'Edição de Tipo de Movimentação',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [{
                        name : 'movimento',
                        fieldLabel: 'Tipo Movimentação'		
					}			
			]}
        ];
        this.callParent(arguments);
    }
});