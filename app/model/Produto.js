Ext.define('UNA.model.Produto', {
    extend		: 'Ext.data.Model',
	idProperty  : 'cod_produto',		
    fields: [
    {
        name: 'cod_produto',
        type: 'int'
    },
    {
        name: 'descricao',
        type: 'string'
    },
    {
        name: 'estoque_minimo',
        type: 'int'
    },
    {
        name: 'estoque_atual',
        type: 'int'
    },
    {
        name: 'estoque_maximo',
        type: 'int'
    },
    {
        name: 'preco_compra',
        type: 'float'
    },
    {
        name: 'preco_venda',
        type: 'float'
    },{
        name: 'status',
        type: 'string'
    },
    {
        name: 'cod_categoria',
        type: 'int'
    },
    {
        name: 'cod_unidade_medida',
        type: 'int'
    }           
    ]
});

