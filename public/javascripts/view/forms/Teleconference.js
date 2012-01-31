Ext.ns('Talho.TALHO.view.forms');

Talho.TALHO.view.forms.Teleconference = Ext.extend(Ext.Panel, {
  title:         'Teleconference Request Form',
  closable:      true,
  padding:       10,
  initComponent: function(){
    this.items = [{
      xtype: 'form',
      itemId: 'form',
      border: false,
      labelAlign: 'top',
      width: 360,
      monitorValid: true,
      method: 'POST',
      url: '/talho/teleconference',
      defaults: {
        width: 200  
      },
      style:{
        margin: '0px auto'
      },
      items: [
        {xtype: 'textfield', fieldLabel: 'Conference Title', name: 'form[title]', allowBlank: false},
        {xtype: 'datefield', fieldLabel: 'Date', name: 'form[date]', allowBlank: false, minValue: (new Date())},

        {xtype: 'timefield', fieldLabel: 'Start Time', itemId: 'start', name: 'form[start]', allowBlank: false, vtype: 'timerange', endTimeField: 'teletotime', id: 'telefromtime' },
        {xtype: 'timefield', fieldLabel: 'End Time', itemId: 'end', name: 'form[end]', allowBlank: false, vtype: 'timerange', startTimeField: 'telefromtime', id: 'teletotime'},

        {xtype: 'textfield', itemId: 'name', fieldLabel: 'Assigned Site Coordinator Name', name: 'form[coord_name]', allowBlank: false},
        {xtype: 'textfield', itemId: 'phone',fieldLabel: 'Assigned Site Coordinator Phone', name: 'form[coord_phone]', allowBlank: false, vtype: 'phone'},
        {xtype: 'numberfield', fieldLabel: 'Number of Participants', name: 'form[num_parts]', maxValue: 20, allowBlank: false}
      ],
      listeners:{
        scope:          this,
        actioncomplete: function(this_form, this_action){
          this.teleConfMask.hide();
          Ext.Msg.alert(
            'Success',
            'Successfully sent teleconference request.  You will receive a confirmation email in your inbox.',
            function(){
              this.destroy();
            }, this);
        },
        actionfailed: function(this_form, this_action){
          this.teleConfMask.hide();
          Ext.Msg.alert(
            'Alert',
            'There was an issue sending your request and we have been notified.  Please try again later.',
            function(){
              this.destroy();
            }, this);
        }
      },
      buttonAlign: 'left',
      buttons: [{
        text: 'Submit',
        formBind: true,
        scope: this,
        handler: function(btn){
          this.teleConfMask = new Ext.LoadMask(btn.ownerCt.ownerCt.ownerCt.getEl(), {msg:"Please wait..."});
          this.teleConfMask.show();
          btn.ownerCt.ownerCt.getForm().submit();
        },
        style:{
          position: 'relative',
          left: '-7px'
        }
      }]
    }];
    Talho.TALHO.view.forms.Teleconference.superclass.initComponent.apply(this, arguments);
  },

  setCoordinator: function(name,phone){
    if (name){ this.getComponent('form').getComponent('name').setValue(name); }
    if (phone){ this.getComponent('form').getComponent('phone').setValue(phone); }
  }

});

Ext.reg('talho.teleconference', Talho.TALHO.view.forms.Teleconference);
