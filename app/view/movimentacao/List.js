Ext.require(['UNA.view.AbstractList']);

Ext.define('UNA.view.movimentacao.List' ,{
    extend			: 'UNA.view.AbstractList',
    alias 			: 'widget.movimentacaoList',
    store			: 'Movimentacoes',
    title 			: 'Lista de Movimentações',         
	selModel 		: Ext.create('Ext.selection.CheckboxModel'),
    initComponent	: function(){

		this.columns = [
                    Ext.create('Ext.grid.RowNumberer'),
                        {header: 'Código',  dataIndex: 'id',  flex: 1}, 
                        {header: 'Data',  dataIndex: 'data',  flex: 1, xtype: 'datecolumn',   format:'d-m-Y'},
                        {header: 'Tipo da Movimentação',  dataIndex: 'tipoMovimentacao',  flex: 1},  
                        {header: 'Pessoa',  dataIndex: 'pessoa',  flex: 1}
		]; 
		
		this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Movimentacoes',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});
