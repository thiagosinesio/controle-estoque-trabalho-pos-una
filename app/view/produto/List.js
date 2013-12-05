Ext.require(['UNA.view.AbstractList']);

Ext.define('UNA.view.produto.List' ,{
    extend			: 'UNA.view.AbstractList',
    alias 			: 'widget.produtoList',
    store			: 'Produtos',
    title 			: 'Lista de Produtos',         
	selModel 		: Ext.create('Ext.selection.CheckboxModel'),
    initComponent	: function(){

		this.columns = [
                    Ext.create('Ext.grid.RowNumberer'),
                        {header: 'Código',  dataIndex: 'id',  flex: 1},
                        {header: 'Nome',  dataIndex: 'descricao',  flex: 1},   
                        {header: 'Estoque Mínimo',  dataIndex: 'id',  flex: 1},
                        {header: 'Estoque Atual',  dataIndex: 'descricao',  flex: 1},  
                        {header: 'Estoque Máximo',  dataIndex: 'id',  flex: 1},
                        {header: 'Preço Compra',  dataIndex: 'descricao',  flex: 1},  
                        {header: 'Preço Venda',  dataIndex: 'id',  flex: 1},
                        {header: 'Status',  dataIndex: 'descricao',  flex: 1}, 
                        {header: 'Categoria',  dataIndex: 'categoriaProduto.descricao',  flex: 1},
                        {header: 'Unidade de Medida',  dataIndex: 'descricao',  flex: 1}   
		]; 
		
		this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Produtos',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});
