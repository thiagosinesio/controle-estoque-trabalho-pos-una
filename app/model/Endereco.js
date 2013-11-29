Ext.define('UNA.model.Endereco', {
		extend		: 'Ext.data.Model',
		idProperty  : 'cod_endereco',				
		fields :[{
			name : 'cod_endereco',
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
			name : 'cod_cidade',
			type : 'int'
		},
		{
			name : 'cod_estado',
			type : 'int'
		},
		{
			name : 'cod_pais',
			type : 'int'
		}						
		]
}); 