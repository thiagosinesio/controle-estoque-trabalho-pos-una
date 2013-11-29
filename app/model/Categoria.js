Ext.define('UNA.model.Categoria', {
    extend		: 'Ext.data.Model',
	idProperty  : 'cod_categoria',		
    fields: [
    {
       name : 'cod_categoria',
       type: 'int'
    }, 
    {
        name : 'descricao',
		type : 'string'
    }
    ]
});