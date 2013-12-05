Ext.define('UNA.model.Produto', {
    extend		: 'Ext.data.Model',
	idProperty  : 'id',		
    fields: [
    {
        name: 'id',
        type: 'int'
    },
    {
        name: 'descricao',
        type: 'string'
    },
    {
        name: 'estoqueMinimo',
        type: 'int'
    },
    {
        name: 'estoqueAtual',
        type: 'int'
    },
    {
        name: 'estoqueMaximo',
        type: 'int'
    },
    {
        name: 'precoCompra',
        type: 'float'
    },
    {
        name: 'precoVenda',
        type: 'float'
    },{
        name: 'status',
        type: 'string'
    },
    {
        name: 'idCategoria',
        type: 'int'
    },
    {
        name: 'idUnidade',
        type: 'int'
    },
    {
        name: 'categoriaProduto',
        type: 'string'
    },
    {
        name: 'medidaProduto',
        type: 'string'
    }           
    ]
});
