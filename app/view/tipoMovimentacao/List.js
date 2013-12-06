Ext.require(['UNA.view.AbstractList']);

Ext.define('UNA.view.tipoMovimentacao.List' ,{
    extend			: 'UNA.view.AbstractList',
    alias 			: 'widget.tipoMovimentacaoList',
    store			: 'TiposMovimentacao',
    title 			: 'Lista de Tipos de Movimentação',         
	selModel 		: Ext.create('Ext.selection.CheckboxModel'),
    initComponent	: function(){

		this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
        {header: 'Código',  dataIndex: 'id',  flex: 1},
        {header: 'Nome',  dataIndex: 'movimento',  flex: 1}        
		]; 
		
		this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'TiposMovimentacao',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});