Ext.define('UNA.view.produto.ComboUnidadeMedida', {
    extend          : 'Ext.form.field.ComboBox',
    alias           : 'widget.unidadeMedidaCombo',
    name            : 'idUnidade',
    fieldLabel      : 'Unidade de Medida',
    store           : 'UnidadesMedidas',
    displayField    : 'unidade',
    valueField      : 'id',
    queryMode       : 'local',
    typeAhead       : true,
    forceSelection  : true,
    initComponent   : function() {
        this.callParent(arguments);
    }
});