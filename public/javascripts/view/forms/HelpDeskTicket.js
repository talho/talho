
Ext.ns('Talho.TALHO.view.forms');

Talho.TALHO.view.forms.HelpDeskTicket = Ext.extend(Ext.Panel, {
  title: 'Help Desk Ticket Request Form',
  closable: true,
  initComponent: function(){
    this.items = [{html: 'hi', border: false}];
    Talho.TALHO.view.forms.HelpDeskTicket.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg('talho.helpdeskticket', Talho.TALHO.view.forms.HelpDeskTicket)
