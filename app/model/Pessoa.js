Ext.define('UNA.model.Pessoa', {
        extend      : 'Ext.data.Model',
        idProperty  : 'id',             
        fields :[{
            name : 'id',
            type : 'int'        
        },
        {
            name : 'nome',
            type : 'string'
        },
        {
            name : 'cpfcnpj',
            type : 'string'
        },
        {
            name : 'telefone',
            type : 'string'
        },
        {
            name : 'email',
            type : 'string'
        },
        {
            name : 'grupo',
            type : 'string'
        },
        {
            name : 'idUsuario',
            type : 'int'
        },
        {
            name : 'idTipoPessoa',
            type : 'int'
        },
        {
            name : 'usuarioPessoa',
            type : 'string'
        },
        {
            name : 'tipoPessoa',
            type : 'string'
        } 
        ]
}); 
