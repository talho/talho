
Ext.ns("Talho.TALHO.controller");

Talho.TALHO.controller.VideoConference = Ext.extend(Ext.util.Observable, {
  constructor: function(config){
    var panel = new Talho.TALHO.view.forms.VideoConference({});
    this.getPanel = function(){return panel;}
  }
});


Talho.ScriptManager.reg('Talho.TALHO.controller.VideoConference', Talho.TALHO.controller.VideoConference, function(config){
  var ctrl = new Talho.TALHO.controller.VideoConference(config);
  return ctrl.getPanel();
});