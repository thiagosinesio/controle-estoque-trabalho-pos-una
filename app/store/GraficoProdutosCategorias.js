Ext.define('UNA.store.GraficoProdutosCategorias', {
    extend		: 'Ext.data.Store',
    autoLoad	: false,
    fields		: ['total', 'categoria'],
    remoteSort	: false,
    proxy: {
        type: 'ajax',
        url: 'php/graficoProdutoCategoria.php?acao=grafico',
        reader: {
            type			: 'json',
            root			: 'data',
            successProperty	: 'success'
        }
    }
});