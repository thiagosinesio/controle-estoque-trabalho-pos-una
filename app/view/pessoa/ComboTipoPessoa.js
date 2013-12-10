Ext.define('UNA.view.pessoa.ComboTipoPessoa', {
    extend          : 'Ext.form.field.ComboBox',
    alias           : 'widget.tipoPessoaCombo',
    name            : 'idTipoPessoa',
    fieldLabel      : 'Tipo de Pessoa',
    store           : 'TiposPessoa',
    displayField    : 'tipo',
    valueField      : 'id',
    queryMode       : 'local',
    typeAhead       : true,
    forceSelection  : true,
    initComponent   : function() {
        this.callParent(arguments);
    }
});