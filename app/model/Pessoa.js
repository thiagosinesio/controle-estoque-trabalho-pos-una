Ext.define('UNA.model.Pessoa', {
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
       name : 'endereco',
	   type: 'string'
    }, 	
    {
       name : 'cep',
	   type: 'string'
    }, 
    {
       name : 'grupo',
	   type: 'string'
    }, 
    {
       name : 'cod_usuario',
	   type: 'int'
    }, 
    {
       name : 'cod_tipo_pessoa',
	   type: 'int'
    }, 
    {
       name : 'cod_endereco',
	   type: 'int'
    }
    ]
});

