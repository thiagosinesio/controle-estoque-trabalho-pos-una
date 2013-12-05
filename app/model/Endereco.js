Ext.define('UNA.model.Endereco', {
		extend		: 'Ext.data.Model',
		idProperty  : 'id',				
		fields :[{
			name : 'id',
			type : 'int'		
		},
		{
			name : 'logradouro',
			type : 'string'
		},
		{
			name : 'numero',
			type : 'int'
		},
		{
			name : 'complemento',
			type : 'string'
		},
		{
			name : 'bairro',
			type : 'string'
		},
		{
			name : 'cep',
			type : 'string'
		},
		{
			name : 'idCidade',
			type : 'int'
		},
		{
			name : 'idEstado',
			type : 'int'
		},
		{
			name : 'idPais',
			type : 'int'
		}						
		]
}); 

