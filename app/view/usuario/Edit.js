Ext.require(['UNA.view.AbstractForm']);
Ext.require(['UNA.view.AbstractWindow']);

Ext.define('UNA.view.usuario.Edit', {
    extend: 'UNA.view.AbstractWindow',
    alias : 'widget.usuarioEdit',
    title : 'Edição de Usuário',

    initComponent: function() {
        
        this.items = [{
            xtype: 'abstractform',
            items: [{
                        name : 'login',
                        fieldLabel: 'Login'              
                    },
                    {
                        name : 'status',
                        fieldLabel: 'Status'             
                    },  
                    {
                        name : 'password',
                        fieldLabel: 'Senha'             
                    }   
            ]}
        ];
        this.callParent(arguments);
    }
});