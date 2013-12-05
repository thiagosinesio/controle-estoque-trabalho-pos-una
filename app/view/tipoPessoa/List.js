Ext.require(['UNA.view.AbstractList']);

Ext.define('UNA.view.tipoPessoa.List' ,{
    extend			: 'UNA.view.AbstractList',
    alias 			: 'widget.tipoPessoaList',
    store			: 'TiposPessoa',
    title 			: 'Lista dos Tipos de Pessoa',         
	selModel 		: Ext.create('Ext.selection.CheckboxModel'),
    initComponent	: function(){

		this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
        {header: 'Código',  dataIndex: 'id',  flex: 1},
        {header: 'Tipo',  dataIndex: 'tipo',  flex: 1}        
		]; 
		
		this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'TiposPessoa',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});