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
    var part_editor = new Ext.ux.grid.RowEditor();

    this.items = [{xtype: 'form', itemId: 'form', border: false, labelAlign: 'top', monitorValid: true, method: 'POST', url: '/talho/video_conference',
      items: [
        {xtype: 'textfield', fieldLabel: 'Conference Title', name: 'form[title]', allowBlank: false},
        {xtype: 'datefield', fieldLabel: 'Date', name: 'form[date]', allowBlank: false, minValue: (new Date())},

        {xtype: 'timefield', fieldLabel: 'Start Time', itemId: 'start', name: 'form[start]', allowBlank: false, vtype: 'timerange', endTimeField: 'vidtotime', id: 'vidfromtime' },
        {xtype: 'timefield', fieldLabel: 'End Time', itemId: 'end', name: 'form[end]', allowBlank: false, vtype: 'timerange', startTimeField: 'vidfromtime', id: 'vidtotime'},

        {xtype: 'textfield', fieldLabel: 'Assigned Site Coordinator Name', itemId: 'name', name: 'form[coord_name]', allowBlank: false},
        {xtype: 'textfield', fieldLabel: 'Assigned Site Coordinator Phone', itemId: 'phone', name: 'form[coord_phone]', allowBlank: false, vtype: 'phone'},
        {xtype: 'grid', fieldLabel: 'Participant', itemId: 'grid', store: this.participantStore, plugins: [part_editor], width: 604, height: 200, stripeRows: true,
          columns: [
            {header: 'Contact Name',      dataIndex: 'name',     editor: new Ext.form.TextField(), allowBlank: false},
            {header: 'Physical Location', dataIndex: 'location', editor: new Ext.form.TextField()},
            {header: 'Email',             dataIndex: 'email',    editor: new Ext.form.TextField(), vtype: 'email'},
            {header: 'Phone',             dataIndex: 'phone',    editor: new Ext.form.TextField(), vtype: 'phone'},
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
                }
              }
            }
          ]
        }
      ],
      buttons: [{text: 'Submit', formBind: true, scope: this, handler: function(btn){
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
        Ext.Ajax.request({
           url: '/talho/video_conference',
           method: 'POST',
           scope:  this,
           params: params,
           success: function(){alert('Successfully sent email');},
           failure: function(){alert('Trouble with this request')}
        });
      }}]
    }];

    Talho.TALHO.view.forms.VideoConference.superclass.initComponent.apply(this, arguments);
  },

  setCoordinator: function(name,phone){
    if (name){ this.getComponent('form').getComponent('name').setValue(name); }
    if (phone){ this.getComponent('form').getComponent('phone').setValue(phone); }
  }

});

Ext.reg('talho.videoconference', Talho.TALHO.view.forms.VideoConference);



