Ext.require(['UNA.view.AbstractForm']);
Ext.require(['UNA.view.AbstractWindow']);
Ext.require(['UNA.view.movimentacao.ComboTipoMovimentacao']);
Ext.require(['UNA.view.movimentacao.ComboPessoa']);

Ext.define('UNA.view.movimentacao.Edit', {
    extend: 'UNA.view.AbstractWindow',
    alias : 'widget.movimentacaoEdit',
    title : 'Edição de Produto',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [{
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d', 
                        name : 'data',
                        fieldLabel: 'Data'				
                    },
                    {
                        xtype: 'tipoMovimentacaoCombo'/*,
                        listeners: {
                            select: {
                                    fn:function(combo, value) {
                                        var pessoaCombo = Ext.getCmp('pessoaCombo');
                                        pessoaCombo.setDisabled(true);
                                        pessoaCombo.setValue('');
                                        pessoaCombo.store.removeAll();

                                        pessoaCombo.store.load({
                                                params: { 
                                                        idTipoMovimentacao	: combo.getValue(),
                                                        acao			: 'tipoMovimentacaoCombo'
                                                }
                                        });
                                        pessoaCombo.setDisabled(false);
                                   }
                            }
                         }*/
                    },
                    {
                        xtype: 'pessoaCombo'
                    }	
                    ]}
        ];
        this.callParent(arguments);
    }
});
  
