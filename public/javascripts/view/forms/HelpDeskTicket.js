Ext.ns('Talho.TALHO.view.forms');

Talho.TALHO.view.forms.HelpDeskTicket = Ext.extend(Ext.Panel, {
  title:         'Help Desk Ticket Request Form',
  closable:      true,
  padding:       10,
  initComponent: function(){
    this.items = [{
      xtype:        'form',
      itemId:       'form',
      border:       false,
      labelAlign:   'top',
      width:        360,
      monitorValid: true,
      method:       'POST',
      url:          '/talho/help_request',
      defaults:     {width: 200},
      style:        {margin: '0px auto'},
      items: [
        {xtype: 'textfield', itemId: 'name', fieldLabel: 'Name', name: 'form[requester][name]', allowBlank: false},
        {xtype: 'textfield', fieldLabel: 'Health Department', name: 'form[requester][depart]', allowBlank: false},
        {xtype: 'textfield', itemId: 'phone', fieldLabel: 'Phone', name: 'form[requester][phone]', allowBlank: false, vtype: 'phone'},
        {xtype: 'textfield', itemId: 'email', fieldLabel: 'Email', name: 'form[requester][email]', allowBlank: false, vtype: 'email'},
        {xtype: 'textarea', fieldLabel: 'Describe Technical Issue', name: 'form[issue][description]', width: 340, allowBlank: false}
      ],
      listeners:{
        scope:          this,
        actioncomplete: function(this_form, this_action){
          this.helpDeskMask.hide();
          Ext.Msg.alert(
            'Success',
            'Successfully sent help desk request.  You will receive a confirmation email in your inbox.',
            function(){
              this.destroy();
            }, this);
        },
        actionfailed: function(this_form, this_action){
          this.helpDeskMask.hide();
          Ext.Msg.alert(
            'Alert',
            'There was an issue sending your request and we have been notified.  Please try again later.',
            function(){
              this.destroy();
            }, this);
        }
      },
      buttonAlign: 'left',
      buttons:     [{
        text:     'Submit',
        formBind: true,
        scope:    this,
        handler: function(btn){
          this.helpDeskMask = new Ext.LoadMask(btn.ownerCt.ownerCt.ownerCt.getEl(), {msg:"Please wait..."});
          this.helpDeskMask.show();
          btn.ownerCt.ownerCt.getForm().submit();
        },
        style:{position: 'relative',left: '-7px'}
      }]
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
