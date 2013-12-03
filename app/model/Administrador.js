Ext.define('UNA.model.Administrador', {
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
    }
    ]
});
