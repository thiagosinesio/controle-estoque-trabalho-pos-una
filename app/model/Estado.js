Ext.define('UNA.model.Estado', {
    extend		: 'Ext.data.Model',
	idProperty  : 'id',		
    fields: [
    {
     name : 'id',
	   type: 'int'
    }, 
	{
     name : 'idPais',
	   type: 'int'
    },
	{
     name : 'sigla',
	   type: 'string'
    }, 	
	{
     name : 'descricao',
	   type: 'string'
    }
    ]
});


