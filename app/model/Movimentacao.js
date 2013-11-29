Ext.define('UNA.model.Movimentacao', {
		extend		: 'Ext.data.Model',
		idProperty  : 'cod_movimentacao',				
		fields :[{
			name : 'cod_movimentacao',
			type : 'int'		
		},
		{
			name : 'data_movimentacao',
			type : 'date',
			dateFormat: 'd/m/Y'
		},
		{
			name : 'tipo_movimentacao',
			type : 'int'
		},
		{
			name : 'cod_pessoa',
			type : 'int'
		}				
		]
}); 