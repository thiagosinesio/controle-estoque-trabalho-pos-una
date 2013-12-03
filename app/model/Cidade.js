Ext.define('UNA.model.Cidade', {
    extend		: 'Ext.data.Model',
	idProperty  : 'id',		
    fields: [
    {
     name : 'id',
	   type: 'int'
    }, 
	{
     name : 'idEstado',
	   type: 'int'
    },
	{
     name : 'descricao',
	   type: 'string'
    }
    ]
});

