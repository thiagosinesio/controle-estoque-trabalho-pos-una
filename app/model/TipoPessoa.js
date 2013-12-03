Ext.define('UNA.model.TipoPessoa', {
		extend		: 'Ext.data.Model',
		idProperty  : 'id',				
		fields :[{
			name : 'id',
			type : 'int'		
		},
		{
			name : 'tipo',
			type : 'string'
		}	
		]
}); 
