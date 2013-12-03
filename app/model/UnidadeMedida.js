Ext.define('UNA.model.UnidadeMedida', {
    extend		: 'Ext.data.Model',
	idProperty  : 'id',		
    fields: [
    {
       name : 'id',
	   type: 'int'
    }, 
	{
        name : 'unidade',
		type : 'string'
    }
    ]
});

