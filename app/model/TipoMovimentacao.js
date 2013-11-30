Ext.define('UNA.model.TipoMovimentacao', {
    extend		: 'Ext.data.Model',
	idProperty  : 'id',		
    fields: [
    {
       name : 'id',
	   type: 'int'
    }, 
    {
        name : 'movimento',
		type : 'string'
    }
    ]
});


