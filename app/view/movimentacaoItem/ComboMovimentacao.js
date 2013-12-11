Ext.define('UNA.view.movimentacaoItem.ComboMovimentacao', {
    extend			: 'Ext.form.field.ComboBox',
    alias			: 'widget.movimentacaoCombo',
    name 			: 'idMovimentacao',
    fieldLabel		: 'Movimentação',
    store			: 'Movimentacoes',
    displayField	: 'id',
    valueField		: 'id',
    queryMode		: 'local',
    typeAhead		: true,
    forceSelection	: true,
    initComponent	: function() {
        this.callParent(arguments);
    }
});