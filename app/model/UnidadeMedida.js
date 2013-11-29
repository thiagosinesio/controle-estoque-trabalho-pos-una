Ext.define('UNA.model.UnidadeMedida', {
    extend		: 'Ext.data.Model',
	idProperty  : 'cod_unidade',		
    fields: [
    {
       name : 'cod_unidade',
	   type: 'int'
    }, 
	{
        name : 'unidade',
		type : 'string'
    }
    ]
});


