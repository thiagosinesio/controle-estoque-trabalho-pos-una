Ext.define('UNA.model.Cliente', {
    extend		: 'Ext.data.Model',
	idProperty  : 'id',		
    fields: [
    {
     name : 'id',
	   type: 'int'
    }, 
    {
     name : 'nome',
	   type: 'string'
    }, 	
    {
     name : 'cpfcnpj',
	   type: 'string'
    },
    {
     name : 'telefone',
	   type: 'string'
    },
    {
       name : 'email',
	   type: 'string'
    },
    {
       name : 'grupo',
	   type: 'string'
    }, 
    {
       name : 'idUsuario',
	   type: 'int'
    },
    {
       name : 'idTipoPessoa',
	   type: 'int'
    }, 
    {
       name : 'idEndereco',
	   type: 'int'
    }
    ]
});