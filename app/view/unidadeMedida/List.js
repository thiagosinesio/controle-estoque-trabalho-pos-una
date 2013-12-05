Ext.require(['UNA.view.AbstractList']);

Ext.define('UNA.view.unidadeMedida.List' ,{
    extend          : 'UNA.view.AbstractList',
    alias           : 'widget.unidadeMedidaList',
    store           : 'UnidadesMedidas',
    title           : 'Lista das Unidades de Medida',         
    selModel        : Ext.create('Ext.selection.CheckboxModel'),
    initComponent   : function(){

        this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
        {header: 'Código',  dataIndex: 'id',  flex: 1},
        {header: 'Unidade',  dataIndex: 'unidade',  flex: 1}        
        ]; 
        
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'UnidadesMedidas',
            dock: 'bottom',
            displayInfo: true
        }];
        
        this.callParent();        
    }   
});