Ext.require(['UNA.view.AbstractList']);

Ext.define('UNA.view.movimentacaoItem.List' ,{
    extend			: 'UNA.view.AbstractList',
    alias 			: 'widget.movimentacaoItemList',
    store			: 'MovimentacaoItens',
    title 			: 'Lista de Movimentação de Itens',         
	selModel 		: Ext.create('Ext.selection.CheckboxModel'),
    initComponent	: function(){

	this.columns = [
                    Ext.create('Ext.grid.RowNumberer'),
                        {header: 'Código',  dataIndex: 'id',  flex: 1},
                        {header: 'Quantidade',  dataIndex: 'quantidade',  flex: 1},   
                        {header: 'Valor Unitário',  dataIndex: 'valorUnitario',  flex: 1, renderer: Ext.util.Format.usMoney},
                        {header: 'Código da Movimentação',  dataIndex: 'idMovimentacao',  flex: 1},  
                        {header: 'Produto',  dataIndex: 'produto',  flex: 1}
		]; 
		
            this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'MovimentacaoItens',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});
