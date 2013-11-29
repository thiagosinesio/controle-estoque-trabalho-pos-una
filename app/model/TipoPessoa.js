Ext.define('UNA.model.TipoPessoa', {
		extend		: 'Ext.data.Model',
		idProperty  : 'cod_tipo_pessoa',				
		fields :[{
			name : 'cod_tipo_pessoa',
			type : 'int'		
		},
		{
			name : 'tipo_pessoa',
			type : 'string'
		}	
		]
}); 