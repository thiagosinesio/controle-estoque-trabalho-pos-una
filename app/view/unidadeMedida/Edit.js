Ext.require(['UNA.view.AbstractForm']);
Ext.require(['UNA.view.AbstractWindow']);

Ext.define('UNA.view.unidadeMedida.Edit', {
    extend: 'UNA.view.AbstractWindow',
    alias : 'widget.unidadeMedidaEdit',
    title : 'Edição da Unidade de Medida',

    initComponent: function() {
        
        this.items = [{
            xtype: 'abstractform',
            items: [{
                        name : 'unidade',
                        fieldLabel: 'Unidade'             
                    }           
            ]}
        ];
        this.callParent(arguments);
    }
});