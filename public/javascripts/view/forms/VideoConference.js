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
      itemId: 'video_form',
      border: false,
      labelAlign: 'top',
      width: 604,
      monitorValid: true,
      method: 'POST', url: '/talho/video_conference',
      defaults: { width: 200 },
      style: { margin: '0px auto' },
      items: [
        {xtype: 'textfield', fieldLabel: 'Conference Title', name: 'form[title]', allowBlank: false},
        {xtype: 'datefield', fieldLabel: 'Date', name: 'form[date]', allowBlank: false, minValue: (new Date())},

        {xtype: 'timefield', fieldLabel: 'Start Time', itemId: 'start', name: 'form[start]', allowBlank: false, vtype: 'timerange', endTimeField: 'vidtotime', id: 'vidfromtime' },
        {xtype: 'timefield', fieldLabel: 'End Time', itemId: 'end', name: 'form[end]', allowBlank: false, vtype: 'timerange', startTimeField: 'vidfromtime', id: 'vidtotime'},

        {xtype: 'textfield', fieldLabel: 'Assigned Site Coordinator Name', itemId: 'name', name: 'form[coord_name]', allowBlank: false, id: 'video_coord_name'},
        {xtype: 'textfield', fieldLabel: 'Assigned Site Coordinator Phone', itemId: 'phone', name: 'form[coord_phone]', allowBlank: false, vtype: 'phone', id: 'video_coord_phone'},
        {xtype: 'hidden', validateValue: function(){ //requires an valid store entry with all validate-required fields validated
          var count = 0;
          this.ownerCt.ownerCt.participantStore.data.each(function(r){
            if (r.data['name']) {count++;}
            });
          return (count > 0);
        }},
        {xtype: 'grid', fieldLabel: 'Participant', itemId: 'grid', store: this.participantStore, plugins: [part_editor], width: 604, height: 200, stripeRows: true,
          columns: [
            {header: 'Contact Name',      dataIndex: 'name',     editor: {xtype:'textfield',id:'participant-name',    allowBlank:false}},
            {header: 'Physical Location', dataIndex: 'location', editor: {xtype:'textfield',id:'participant-location',allowBlank:false}},
            {header: 'Email',             dataIndex: 'email',    editor: {xtype:'textfield',id:'participant-email',allowBlank:false,vtype: 'email'}},
            {header: 'Phone',             dataIndex: 'phone',    editor: {xtype:'textfield',id:'participant-phone',allowBlank:false,vtype: 'phone'}},
            {header: 'Video',             dataIndex: 'video',    editor: {xtype:'textfield',id:'participant-video',allowBlank:true}},
            {header: 'TeleConf',          dataIndex: 'teleconf', editor: {xtype:'textfield',id:'participant-teleconf',allowBlank:true}}
          ],
          tbar: [
            {
              text   : "Add Participant",
              iconCls: 'icon-user-add',
              handler: function(btn) {
                var grid = btn.findParentByType('grid');
                var row = grid.store.getCount();
                if(row == 0 || (row > 0 && part_editor.isValid())) {
                  part_editor.stopEditing();
                  grid.store.insert(row, new grid.store.recordType());
                  grid.getView().refresh();
                  grid.getSelectionModel().selectRow(row);
                  part_editor.startEditing(row);
                  if (grid.store.getCount() > 0) {btn.ownerCt.getComponent('remove_btn').enable()}
                }
              }
            },'-',
            {
              text   : "Remove Participant",
              iconCls: 'icon-user-delete',
              handler: function(btn) {
                var grid = btn.findParentByType('grid');
                grid.store.remove(grid.getSelectionModel().getSelected());
                if (grid.store.getCount() < 1) {btn.disable()}
              }
              ,itemId: 'remove_btn', disabled: true
            }
          ]
        }
      ],
      buttonAlign: 'left',
      buttons: [{
        text: 'Submit', formBind: true, scope: this,
        handler: function(btn){
          this.videoConfMask = new Ext.LoadMask(btn.ownerCt.ownerCt.ownerCt.getEl(), {msg:"Please wait..."});
          this.videoConfMask.show();
          btn.ownerCt.ownerCt.getForm().submit();
          this.videoConfMask.hide();
        },
        style:{ position: 'relative', left: '-7px' }
        },
        {text: 'Cancel', scope: this, handler: function() {win.close();}              }
      ],
      listeners: {
        beforeaction: function(form,action){
          if (action.type == 'submit'){
            action.options.params = {};
            var index = 0;
            this.ownerCt.participantStore.data.each(function(r){ // reform into html-form parameters
              Object.keys(r.data).forEach(function(key){
                action.options.params['form[participant][' + index + '][' + key + ']'] = r.data[key];
              });
              index++;
            });
//            video_form.items.each(function(e){ // destroy grid row editor fields so not to effect params
//              if (/^participant-/.test(e.id)) {e.destroy();}
//              if (/^ext-/.test(e.id)) {e.destroy();}
//            });
          }
        },
        actioncomplete: function(){
          Ext.Msg.alert('Success',
            'Successfully sent video conference request.  You will receive a confirmation email in your inbox.',
            function(){this.destroy();}, this
          );
        },
        actionfailed: function(){
          Ext.Msg.alert('Alert',
           'There was an issue sending your request and we have been notified.  Please try again later.',
           function(){this.destroy();}, this
          );
        }
      }
    }];

    Talho.TALHO.view.forms.VideoConference.superclass.initComponent.apply(this, arguments);
  },

  setCoordinator: function(name,phone){
    if (name){ this.getComponent('video_form').getComponent('name').setValue(name); }
    if (phone){ this.getComponent('video_form').getComponent('phone').setValue(phone); }
  }

});

Ext.reg('talho.videoconference', Talho.TALHO.view.forms.VideoConference);



