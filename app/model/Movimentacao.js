Ext.define('UNA.model.Movimentacao', {
		extend		: 'Ext.data.Model',
		idProperty  : 'id',				
		fields :[{
			name : 'id',
			type : 'int'		
		},
		{
			name : 'data',
			type : 'date',
			dateFormat: 'd/m/Y'
		},
		{
			name : 'idTipoMovimentacao',
			type : 'int'
		},
		{
			name : 'idPessoa',
			type : 'int'
		}				
		]
}); 

