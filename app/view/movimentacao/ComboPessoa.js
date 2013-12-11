Ext.define('UNA.view.movimentacao.ComboPessoa', {
    extend          : 'Ext.form.field.ComboBox',
    alias           : 'widget.pessoaCombo',
    name            : 'idPessoa',
    fieldLabel      : 'Pessoa',
    store           : 'Pessoas',
    displayField    : 'nome',
    valueField      : 'id',
    queryMode       : 'local',
    typeAhead       : true,
    forceSelection  : true,
    initComponent   : function() {
        this.callParent(arguments);
    }
});