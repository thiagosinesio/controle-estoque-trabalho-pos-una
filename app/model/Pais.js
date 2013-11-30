Ext.define('UNA.model.Pais', {
    extend		: 'Ext.data.Model',
	idProperty  : 'id',		
    fields: [
    {
       name : 'id',
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


