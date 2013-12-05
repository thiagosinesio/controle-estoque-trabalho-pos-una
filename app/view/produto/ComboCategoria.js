Ext.define('UNA.view.produto.ComboCategoria', {
    extend			: 'Ext.form.field.ComboBox',
    alias			: 'widget.categoriaCombo',
    name 			: 'idCategoria',
    fieldLabel		: 'Categoria',
    store			: 'Categorias',
    displayField	: 'descricao',
    valueField		: 'id',
    queryMode		: 'local',
    typeAhead		: true,
    forceSelection	: true,
    initComponent	: function() {
        this.callParent(arguments);
    }
});