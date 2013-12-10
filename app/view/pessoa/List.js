Ext.require(['UNA.view.AbstractList']);

Ext.define('UNA.view.pessoa.List' ,{
    extend          : 'UNA.view.AbstractList',
    alias           : 'widget.pessoaList',
    store           : 'Pessoas',
    title           : 'Lista de Pessoas',         
    selModel        : Ext.create('Ext.selection.CheckboxModel'),
    initComponent   : function(){

        this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
                        {header: 'Código',  dataIndex: 'id',  flex: 1},
                        {header: 'Nome',  dataIndex: 'nome',  flex: 1},   
                        {header: 'Documento',  dataIndex: 'cpfcnpj',  flex: 1},
                        {header: 'Telefone',  dataIndex: 'telefone',  flex: 1},  
                        {header: 'E-mail',  dataIndex: 'email',  flex: 1},
                        {header: 'Grupo',  dataIndex: 'grupo',  flex: 1 },  
                        {header: 'Usuário',  dataIndex: 'usuarioPessoa',  flex: 1},
                        {header: 'Tipo Pessoa',  dataIndex: 'tipoPessoa',  flex: 1}
        ]; 
        
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Pessoas',
            dock: 'bottom',
            displayInfo: true
        }];
        
        this.callParent();        
    }   
});