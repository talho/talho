
Ext.ns("Talho.TALHO.controller");

Talho.TALHO.controller.Teleconference = Ext.extend(Ext.util.Observable, {
  constructor: function(config){
    var panel = new Talho.TALHO.view.forms.Teleconference({});
    this.getPanel = function(){return panel;}
  }
});


Talho.ScriptManager.reg('Talho.TALHO.controller.Teleconference', Talho.TALHO.controller.Teleconference, function(config){
  var ctrl = new Talho.TALHO.controller.Teleconference(config);
  return ctrl.getPanel();
});