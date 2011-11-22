
Ext.ns('Talho.TALHO.view.forms');

Talho.TALHO.view.forms.VideoConference = Ext.extend(Ext.Panel, {
  title: 'Video Conference Request Form',
  closable: true,
  initComponent: function(){
    this.items = [{html: 'hi', border: false}];
    Talho.TALHO.view.forms.VideoConference.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg('talho.videoconference', Talho.TALHO.view.forms.VideoConference)
