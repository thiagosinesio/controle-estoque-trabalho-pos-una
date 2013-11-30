Ext.define('UNA.model.Cidade', {
    extend		: 'Ext.data.Model',
	idProperty  : 'id',		
    fields: [
    {
     name : 'id',
	   type: 'int'
    }, 
	{
     name : 'cod_estado',
	   type: 'int'
    },
	{
     name : 'desc_cidade',
	   type: 'string'
    }
    ]
});

