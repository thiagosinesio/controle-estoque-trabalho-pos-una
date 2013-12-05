Ext.require(['UNA.view.AbstractList']);

Ext.define('UNA.view.usuario.List' ,{
    extend          : 'UNA.view.AbstractList',
    alias           : 'widget.usuarioList',
    store           : 'Usuarios',
    title           : 'Lista de Usuarios',         
    selModel        : Ext.create('Ext.selection.CheckboxModel'),
    initComponent   : function(){

        this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
            {header: 'Código'   ,  dataIndex: 'id'  ,  flex: 1},
            {header: 'Login'    ,  dataIndex: 'login'   ,  flex: 1},
            {header: 'Status'   ,  dataIndex: 'status'      ,  flex: 1},                
            {header: 'Senha'    ,  dataIndex: 'password'        ,  flex: 1}      
        ]; 
        
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Usuarios',
            dock: 'bottom',
            displayInfo: true
        }];
        
        this.callParent();        
    }   
});
   