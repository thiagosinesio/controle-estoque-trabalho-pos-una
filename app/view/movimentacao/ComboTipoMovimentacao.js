Ext.define('UNA.view.movimentacao.ComboTipoMovimentacao', {
    extend			: 'Ext.form.field.ComboBox',
    alias			: 'widget.tipoMovimentacaoCombo',
    name 			: 'idTipoMovimentacao',
    fieldLabel		: 'Tipo de Movimentação',
    store			: 'TiposMovimentacao',
    displayField	: 'movimento',
    valueField		: 'id',
    queryMode		: 'local',
    typeAhead		: true,
    forceSelection	: true,
    initComponent	: function() {
        this.callParent(arguments);
    }
});