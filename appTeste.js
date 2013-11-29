/**
 * Ext JS Library 4.0.2
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 * 
 */
Ext.Loader.setPath('Ext', 'extjs/src');
Ext.Loader.setPath('EIA', 'app');

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true
});

Ext.require([
    'Ext.tree.*',
    'Ext.data.*',
    'Ext.tip.*',
	'Ext.chart.*'
    ]);
    
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);
  
Ext.onReady(function(){
 
    var store = Ext.create('EIA.store.Agendas');
    var agenda = store.load(); 	
	
	console.dir(agenda.data);	
		
 //   store.sync();
});

