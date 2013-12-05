Ext.require(['UNA.view.AbstractForm']);
Ext.require(['UNA.view.AbstractWindow']);

Ext.define('UNA.view.tipoPessoa.Edit', {
    extend: 'UNA.view.AbstractWindow',
    alias : 'widget.tipoPessoaEdit',
    title : 'Edição dos Tipo de Pessoa',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [{
                        name : 'tipo',
                        fieldLabel: 'Tipo'				
					}			
			]}
        ];
        this.callParent(arguments);
    }
});