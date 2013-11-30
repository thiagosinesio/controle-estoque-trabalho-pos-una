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
       name : 'valor_unitario',
	   type: 'float'
    },
	{
        name : 'movimentacao_id',
		type : 'int'
    },
    {
        name : 'produto_id',
		type : 'int'
    }
    ]
});




