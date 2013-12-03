Ext.define('UNA.model.Pais', {
    extend		: 'Ext.data.Model',
	idProperty  : 'id',		
    fields: [
    {
       name : 'id',
	   type: 'int'
    }, 
	{
        name : 'sigla',
		type : 'string'
    },
    {
        name : 'descricao',
		type : 'string'
    }
    ]
});

