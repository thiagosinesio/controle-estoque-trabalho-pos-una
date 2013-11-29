Ext.define('UNA.model.Cidade', {
    extend		: 'Ext.data.Model',
	idProperty  : 'cod_cidade',		
    fields: [
    {
     name : 'cod_cidade',
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

