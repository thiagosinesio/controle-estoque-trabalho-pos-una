Ext.define('UNA.model.TipoPessoa', {
		extend		: 'Ext.data.Model',
		idProperty  : 'cod_usuario',				
		fields :[{
			name : 'cod_usuario',
			type : 'int'		
		},
		{
			name : 'login',
			type : 'string'
		},
		{
			name : 'password',
			type : 'string'
		},
		{
			name : 'status',
			type : 'string'
		}		
		]
}); 