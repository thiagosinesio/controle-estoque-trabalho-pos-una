Ext.define('UNA.model.Categoria', {
    extend		: 'Ext.data.Model',
	idProperty  : 'id',		
    fields: [
    {
       name : 'id',
       type: 'int'
    }, 
    {
        name : 'descricao',
		type : 'string'
    }
    ]
});