Ext.require(['UNA.view.AbstractList']);

Ext.define('UNA.view.categoria.List' ,{
    extend			: 'UNA.view.AbstractList',
    alias 			: 'widget.categoriaList',
    store			: 'Categorias',
    title 			: 'Lista das Categorias',         
	selModel 		: Ext.create('Ext.selection.CheckboxModel'),
    initComponent	: function(){

		this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
        {header: 'Código',  dataIndex: 'id',  flex: 1},
        {header: 'Nome',  dataIndex: 'descricao',  flex: 1}        
		]; 
		
		this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Categorias',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});