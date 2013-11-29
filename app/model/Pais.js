Ext.define('UNA.model.Pais', {
    extend		: 'Ext.data.Model',
	idProperty  : 'cod_pais',		
    fields: [
    {
       name : 'cod_pais',
	   type: 'int'
    }, 
	{
        name : 'sgl_pais',
		type : 'string'
    },
    {
        name : 'desc_pais',
		type : 'string'
    }
    ]
});


