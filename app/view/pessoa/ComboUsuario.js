Ext.define('UNA.view.pessoa.ComboUsuario', {
    extend		: 'Ext.form.field.ComboBox',
    alias		: 'widget.usuarioCombo',
    name 		: 'idUsuario',
    fieldLabel		: 'Usuário',
    store		: 'Usuarios',
    displayField	: 'login',
    valueField		: 'id',
    queryMode		: 'local',
    typeAhead		: true,
    forceSelection	: true,
    initComponent	: function() {
        this.callParent(arguments);
    }
});
