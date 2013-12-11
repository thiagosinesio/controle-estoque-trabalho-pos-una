Ext.define('UNA.view.produto.graficoProdutoCategoria' ,{
    extend	: 'Ext.chart.Chart',
	alias 	: 'widget.graficoProdutoCategoria',   
    style	: 'background:#fff',
    animate	: true,
	shadow	: true,
	legend	: true,
	legend	: { position: 'right'},
    store	: 'GraficoProdutosCategorias',
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['total'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: 'Qtde de Produtos',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['categoria'],
                title: 'Categoria'
            }],
            series: [{
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 300,
                  height: 30,
                  renderer: function(storeItem, item) {
                    this.setTitle('Qtde de Produto(s) de ' + storeItem.get('categoria') + ': ' + storeItem.get('total') + '.');
                  }
                },
                label: {
                  display: 'insideEnd',
                  'text-anchor': 'middle',
                    field: 'total',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'vertical',
                    color: '#333'
                },
                xField: 'categoria',
                yField: 'total'
            }],
	initComponent: function(){
        this.callParent();
        this.store.load();
		}   
        });