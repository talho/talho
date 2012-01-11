
Ext.ns('Talho.TALHO.view.forms');

Talho.TALHO.view.forms.HelpDeskTicket = Ext.extend(Ext.Panel, {
  title: 'Help Desk Ticket Request Form',
  closable: true,
  padding: 10,

  initComponent: function(){
    this.items = [{xtype: 'form', itemId: 'form', border: false, labelAlign: 'top', width: 360, monitorValid: true, method: 'POST', url: '/talho/help_request',
      items: [
        {xtype: 'textfield', itemId: 'name', fieldLabel: 'Name', name: 'form[requester][name]', allowBlank: false},
        {xtype: 'textfield', fieldLabel: 'Health Department', name: 'form[requester][depart]', allowBlank: false},
        {xtype: 'textfield', itemId: 'phone', fieldLabel: 'Phone', name: 'form[requester][phone]', allowBlank: false, vtype: 'phone'},
        {xtype: 'textfield', itemId: 'email', fieldLabel: 'Email', name: 'form[requester][email]', allowBlank: false, vtype: 'email'},
        {xtype: 'textarea', fieldLabel: 'Describe Technical Issue', name: 'form[issue][description]', width: 340, allowBlank: false}
      ],
      buttons: [{text: 'Submit', formBind: true, scope: this, handler: function(btn){btn.ownerCt.ownerCt.getForm().submit();}}]
    }];

    Talho.TALHO.view.forms.HelpDeskTicket.superclass.initComponent.apply(this, arguments);
  },

  setCoordinator: function(name,phone,email){
    if (name){ this.getComponent('form').getComponent('name').setValue(name); }
    if (phone){ this.getComponent('form').getComponent('phone').setValue(phone); }
    if (email){ this.getComponent('form').getComponent('email').setValue(email); }
  }

});

Ext.reg('talho.helpdeskticket', Talho.TALHO.view.forms.HelpDeskTicket);
