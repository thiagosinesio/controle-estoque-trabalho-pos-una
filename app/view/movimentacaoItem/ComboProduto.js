Ext.define('UNA.view.movimentacaoItem.ComboProduto', {
    extend          : 'Ext.form.field.ComboBox',
    alias           : 'widget.produtoCombo',
    name            : 'idProduto',
    fieldLabel      : 'Produto',
    store           : 'Produtos',
    displayField    : 'descricao',
    valueField      : 'id',
    queryMode       : 'local',
    typeAhead       : true,
    forceSelection  : true,
    initComponent   : function() {
        this.callParent(arguments);
    }
});