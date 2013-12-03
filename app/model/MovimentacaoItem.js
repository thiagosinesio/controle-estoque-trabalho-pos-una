Ext.define('UNA.model.MovimentacaoItem', {
    extend		: 'Ext.data.Model',
	idProperty  : 'id',
    fields: [
    {
       name : 'id',
	   type: 'int'
    }, 	
    {
       name : 'quantidade',
	   type: 'int'
    }, 
    {
       name : 'valorUnitario',
	   type: 'float'
    },
	{
        name : 'idMovimentacao',
		type : 'int'
    },
    {
        name : 'idProduto',
		type : 'int'
    }
    ]
});

