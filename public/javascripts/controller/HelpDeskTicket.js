
Ext.ns("Talho.TALHO.controller");

Talho.TALHO.controller.HelpDeskTicket = Ext.extend(Ext.util.Observable, {
  constructor: function(config){
    var panel = new Talho.TALHO.view.forms.HelpDeskTicket({});
    this.getPanel = function(){return panel;}
  }
});


Talho.ScriptManager.reg('Talho.TALHO.controller.HelpDeskTicket', Talho.TALHO.controller.HelpDeskTicket, function(config){
  var ctrl = new Talho.TALHO.controller.HelpDeskTicket(config);
  return ctrl.getPanel();
});