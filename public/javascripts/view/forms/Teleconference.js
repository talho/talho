
Ext.ns('Talho.TALHO.view.forms');

Talho.TALHO.view.forms.Teleconference = Ext.extend(Ext.Panel, {
  title: 'Teleconference Request Form',
  closable: true,
  padding: 10,
  initComponent: function(){
    this.items = [{xtype: 'form', border: false, labelAlign: 'top', monitorValid: true, method: 'POST', url: '/talho/teleconference',
      items: [
        {xtype: 'textfield', fieldLabel: 'Conference Title', name: 'form[title]', allowBlank: false},
        {xtype: 'datefield', fieldLabel: 'Date', name: 'form[date]', allowBlank: false},
        {xtype: 'timefield', fieldLabel: 'Start Time', name: 'form[start]', allowBlank: false},
        {xtype: 'timefield', fieldLabel: 'End Time', name: 'form[end]', allowBlank: false},
        {xtype: 'textfield', fieldLabel: 'Assigned Site Coordinator Name', name: 'form[coord_name]', allowBlank: false},
        {xtype: 'textfield', fieldLabel: 'Assigned Site Coordinator Phone', name: 'form[coord_phone]', allowBlank: false},
        {xtype: 'numberfield', fieldLabel: 'Number of Participants', name: 'form[num_parts]', maxValue: 20, allowBlank: false}
      ],
      buttons: [{text: 'Submit', formBind: true, scope: this, handler: function(){this.getForm().submit();}}]
    }];
    Talho.TALHO.view.forms.Teleconference.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg('talho.teleconference', Talho.TALHO.view.forms.Teleconference)
