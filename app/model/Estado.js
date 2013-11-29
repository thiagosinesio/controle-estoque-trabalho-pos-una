Ext.define('UNA.model.Estado', {
    extend		: 'Ext.data.Model',
	idProperty  : 'cod_estado',		
    fields: [
    {
     name : 'cod_estado',
	   type: 'int'
    }, 
	{
     name : 'cod_pais',
	   type: 'int'
    },
	{
     name : 'estado_sigla',
	   type: 'string'
    }, 	
	{
     name : 'desc_estado',
	   type: 'string'
    }
    ]
});
