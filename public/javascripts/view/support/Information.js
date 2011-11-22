
Ext.ns('Talho.TALHO.view.support');

Talho.TALHO.view.support.Information = Ext.extend(Ext.Panel, {
  title: 'Support Information',
  closable: true,
  initComponent: function(){
    this.items = [{html: 'hi', border: false}];
    Talho.TALHO.view.support.Information.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg('talho.information', Talho.TALHO.view.support.Information)
