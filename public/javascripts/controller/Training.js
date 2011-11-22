
Ext.ns("Talho.TALHO.controller");

Talho.TALHO.controller.Training = Ext.extend(Ext.util.Observable, {
  constructor: function(config){
    var panel = new Talho.TALHO.view.training.Training({});
    this.getPanel = function(){return panel;}
  }
});


Talho.ScriptManager.reg('Talho.TALHO.controller.Training', Talho.TALHO.controller.Training, function(config){
  var ctrl = new Talho.TALHO.controller.Training(config);
  return ctrl.getPanel();
});