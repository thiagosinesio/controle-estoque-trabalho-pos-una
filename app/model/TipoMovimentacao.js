Ext.define('UNA.model.TipoMovimentacao', {
    extend		: 'Ext.data.Model',
	idProperty  : 'cod_tipo_movimentacao',		
    fields: [
    {
       name : 'cod_tipo_movimentacao',
	   type: 'int'
    }, 
    {
        name : 'movimento',
		type : 'string'
    }
    ]
});


