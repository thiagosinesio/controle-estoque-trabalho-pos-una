<?php

/*
{
                                text:'Agenda',
                                leaf:true,
                                itemMenu: 'agendaList'
                            }*/

$menu = "{ 
            children: [
                    {
                        text:'Cadastros',
                        expanded: true,
                        children:[
                         	{
                                text:'Categoria',
                                leaf:true,
                                itemMenu: 'categoriaList'
                            },
                            {
                                text:'Movimentação',
                                leaf:true,
                                itemMenu: 'movimentacaoList'
                            },
                            {
                                text:'Movimentação de Itens',
                                leaf:true,
                                itemMenu: 'movimentacaoItemList'
                            },
                            {
                                text:'Pessoa',
                                leaf:true,
                                itemMenu: 'pessoaList'
                            },
                            {
                                text:'Produto',
                                leaf:true,
                                itemMenu: 'produtoList'
                            },
                            {
                                text:'Tipo Movimentação',
                                leaf:true,
                                itemMenu: 'tipoMovimentacaoList'
                            },
                            {
                                text:'Tipo Pessoa',
                                leaf:true,
                                itemMenu: 'tipoPessoaList'
                            },
                            {
                                text:'Unidade Medida',
                                leaf: true,
                                itemMenu: 'unidadeMedidaList'
                            },
                            {
                                text:'Usuário',
                                leaf: true,
                                itemMenu: 'usuarioList'
                            }

                        ]
                    }
                    
                ]
            }";
echo $menu;