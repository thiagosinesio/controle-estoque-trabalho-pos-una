Ext.define('UNA.model.MovimentacaoItem', {
    extend		: 'Ext.data.Model',
    fields: [
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




