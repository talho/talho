
Ext.ns('Talho.TALHO.view.forms');

Talho.TALHO.view.forms.Teleconference = Ext.extend(Ext.Panel, {
  title: 'Teleconference Request Form',
  closable: true,
  initComponent: function(){
    this.items = [{html: 'hi', border: false}];
    Talho.TALHO.view.forms.Teleconference.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg('talho.teleconference', Talho.TALHO.view.forms.Teleconference)
