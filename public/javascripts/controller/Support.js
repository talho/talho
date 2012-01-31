
Ext.ns("Talho.TALHO.controller");

Talho.TALHO.controller.Support = Ext.extend(Ext.util.Observable, {
  constructor: function(config){
    var panel = new Talho.TALHO.view.support.Information({id: config.id});
    this.getPanel = function(){return panel;}
  }
});


Talho.ScriptManager.reg('Talho.TALHO.controller.Support', Talho.TALHO.controller.Support, function(config){
  var ctrl = new Talho.TALHO.controller.Support(config);
  return ctrl.getPanel();
});