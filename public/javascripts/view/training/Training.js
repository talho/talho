
Ext.ns('Talho.TALHO.view.training');

Talho.TALHO.view.training.Training = Ext.extend(Ext.Panel, {
  title: 'Training',
  closable: true,
  initComponent: function(){
    this.items = [{html: 'hi', border: false}];
    Talho.TALHO.view.training.Training.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg('talho.training', Talho.TALHO.view.training.Training)
