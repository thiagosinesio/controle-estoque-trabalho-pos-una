Ext.define('UNA.model.Usuario', {
		extend		: 'Ext.data.Model',
		idProperty  : 'id',				
		fields :[{
			name : 'id',
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
