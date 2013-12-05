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
                                text:'Administrador',
                                leaf:true,
                                itemMenu: 'administradorList'
                            },
                            {
                                text:'Categoria',
                                leaf:true,
                                itemMenu: 'categoriaList'
                            },
                            {
                                text:'Cidade',
                                leaf:true,
                                itemMenu: 'cidadeList'
                            },
                            {
                                text:'Cliente',
                                leaf:true,
                                itemMenu: 'clienteList'
                            },
                            {
                                text:'Endereço',
                                leaf:true,
                                itemMenu: 'enderecoList'
                            },
                            {
                                text:'Estado',
                                leaf:true,
                                itemMenu: 'estadoList'
                            },
                            {
                                text:'Fornecedor',
                                leaf:true,
                                itemMenu: 'fornecedorList'
                            },
                            {
                                text:'Movimentação',
                                leaf:true,
                                itemMenu: 'movimentacaoList'
                            },
                            {
                                text:'País',
                                leaf:true,
                                itemMenu: 'paisList'
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
                    ,
                    {
                        text:'Relatórios',
                        expanded: true,
                        children:[
                            {
                                text:'Gráfico de Agenda',
                                leaf:true,
                                itemMenu: 'graficoAgenda'
                            }
                        ]
                    }
                ]
            }";
echo $menu;