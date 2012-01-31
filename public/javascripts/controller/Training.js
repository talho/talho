
Ext.ns("Talho.TALHO.controller");

Talho.TALHO.controller.Training = Ext.extend(Ext.util.Observable, {
  constructor: function(config){
    Ext.apply(this, config);
    
    var panel = new Talho.TALHO.view.training.Training({id: config.id});
    this.getPanel = function(){return panel;}
    
    panel.on('afterrender', function(){
      panel.getEl().select("h5[name='"+config.section+"']").first().dom.scrollIntoView(panel.getEl());
    }, this, {delay: 1})
  }
});


Talho.ScriptManager.reg('Talho.TALHO.controller.Training', Talho.TALHO.controller.Training, function(config){
  var ctrl = new Talho.TALHO.controller.Training(config);
  return ctrl.getPanel();
});