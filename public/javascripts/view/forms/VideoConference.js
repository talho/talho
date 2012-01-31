Ext.ns('Talho.TALHO.view.forms');

Talho.TALHO.view.forms.VideoConference = Ext.extend(Ext.Panel, {
  title: 'Video Conference Request Form',
  closable: true,
  padding: 10,
  initComponent: function(){

    var Participant = Ext.data.Record.create([
      {name: 'name',     type: 'string'},
      {name: 'location', type: 'string'},
      {name: 'email',    type: 'string'},
      {name: 'phone',    type: 'string'},
      {name: 'video',    type: 'string'},
      {name: 'teleconf', type: 'string'}
    ]);
    this.participantStore = new Ext.data.Store({reader: new Ext.data.ArrayReader( {idIndex: 0}, Participant ) });
    var part_editor = new Ext.ux.grid.RowEditor({listeners: {
      canceledit: function(row_editor){
        row_editor.ownerCt.getStore().remove(row_editor.ownerCt.getSelectionModel().getSelected());
      }
    }});

    this.items = [{
      xtype: 'form',
      itemId: 'form',
      border: false,
      labelAlign: 'top',
      width: 604,
      monitorValid: true,
      method: 'POST',
      url: '/talho/video_conference',
      defaults: {
        width: 200
      },
      style:{
        margin: '0px auto'
      },
      items: [
        {xtype: 'textfield', fieldLabel: 'Conference Title', name: 'form[title]', allowBlank: false},
        {xtype: 'datefield', fieldLabel: 'Date', name: 'form[date]', allowBlank: false, minValue: (new Date())},

        {xtype: 'timefield', fieldLabel: 'Start Time', itemId: 'start', name: 'form[start]', allowBlank: false, vtype: 'timerange', endTimeField: 'vidtotime', id: 'vidfromtime' },
        {xtype: 'timefield', fieldLabel: 'End Time', itemId: 'end', name: 'form[end]', allowBlank: false, vtype: 'timerange', startTimeField: 'vidfromtime', id: 'vidtotime'},

        {xtype: 'textfield', fieldLabel: 'Assigned Site Coordinator Name', itemId: 'name', name: 'form[coord_name]', allowBlank: false},
        {xtype: 'textfield', fieldLabel: 'Assigned Site Coordinator Phone', itemId: 'phone', name: 'form[coord_phone]', allowBlank: false, vtype: 'phone'},
        {xtype: 'grid', fieldLabel: 'Participant', itemId: 'grid', store: this.participantStore, plugins: [part_editor], width: 604, height: 200, stripeRows: true,
          columns: [
            {header: 'Contact Name',      dataIndex: 'name',     editor: new Ext.form.TextField({allowBlank: false})},
            {header: 'Physical Location', dataIndex: 'location', editor: new Ext.form.TextField({allowBlank: false})},
            {header: 'Email',             dataIndex: 'email',    editor: new Ext.form.TextField({allowBlank: false, vtype: 'email'})},
            {header: 'Phone',             dataIndex: 'phone',    editor: new Ext.form.TextField({allowBlank: false, vtype: 'phone'})},
            {header: 'Video',             dataIndex: 'video',    editor: new Ext.form.TextField()},
            {header: 'TeleConf',          dataIndex: 'teleconf', editor: new Ext.form.TextField()}
          ],
          tbar: [
            {
              text   : "+",
              handler: function(btn) {
                var grid = btn.findParentByType('grid');
                var row = grid.store.getCount();
                if(row == 0 || (row > 0 && part_editor.isValid())) {
                  part_editor.stopEditing();
                  grid.store.insert(row, new grid.store.recordType());
                  grid.getView().refresh();
                  grid.getSelectionModel().selectRow(row);
                  part_editor.startEditing(row);
                  if (grid.store.getCount() > 0) {btn.ownerCt.getComponent('remove_btn').show()}
                }
              }
            },
            {
              text   : "-",
              handler: function(btn) {
                var grid = btn.findParentByType('grid');
                grid.store.remove(grid.getSelectionModel().getSelected());
                if (grid.store.getCount() < 1) {btn.hide()}
              }
              ,itemId: 'remove_btn', hidden: true
            }
          ]
        }
      ],
      buttonAlign: 'left',
      buttons: [{
        text: 'Submit',
        formBind: true,
        scope: this,
        handler: function(btn){
          this.videoConfMask = new Ext.LoadMask(btn.ownerCt.ownerCt.ownerCt.getEl(), {msg:"Please wait..."});
          this.videoConfMask.show();
          var params = btn.ownerCt.ownerCt.getForm().getValues();
          Object.keys(params).forEach(function(key) {
            if (/^ext/.test(key)) {delete params[key]}
          });
          var par_idx = 0;
          btn.ownerCt.ownerCt.getComponent('grid').getStore().each(function(r){
            Object.keys(r.data).forEach(function(key) {
              params['form[participant]['+par_idx+']['+key+']'] = r.data[key];
            });
            par_idx++;
          }, this);
          if(par_idx > 0 && params['form[participant][0][name]']){
            Ext.Ajax.request({
               url: '/talho/video_conference',
               method: 'POST',
               scope:  this,
               params: params,
               success: function(){
                  this.videoConfMask.hide();
                  Ext.Msg.alert(
                    'Success',
                    'Successfully sent video conference request.  You will receive a confirmation email in your inbox.',
                    function(){
                      this.destroy();
                    }, this);
               },
               failure: function(){
                 this.videoConfMask.hide();
                 Ext.Msg.alert(
                  'Alert',
                  'There was an issue sending your request and we have been notified.  Please try again later.',
                  function(){
                    this.destroy();
                  }, this);
               }
            });
          }else{
            this.videoConfMask.hide();
            Ext.Msg.alert('Notice','You must add at least one conference participant.  Please try again');
          }

        },
        style:{
          position: 'relative',
          left: '-7px'
        }
      }]
    }];

    Talho.TALHO.view.forms.VideoConference.superclass.initComponent.apply(this, arguments);
  },

  setCoordinator: function(name,phone){
    if (name){ this.getComponent('form').getComponent('name').setValue(name); }
    if (phone){ this.getComponent('form').getComponent('phone').setValue(phone); }
  }

});

Ext.reg('talho.videoconference', Talho.TALHO.view.forms.VideoConference);



