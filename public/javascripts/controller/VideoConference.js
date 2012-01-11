
Ext.ns("Talho.TALHO.controller");

Talho.TALHO.controller.VideoConference = Ext.extend(Ext.util.Observable, {
  constructor: function(config){
	
    var panel = new Talho.TALHO.view.forms.VideoConference({});
    this.getPanel = function(){return panel;};

    panel.on('render', function() {
      this.loadMask = new Ext.LoadMask(panel.getEl(), {msg: 'Loading...'});
      this.loadMask.show();
    }, this, {delay: 1});

    Ext.Ajax.request({ url: "/users/" + Application.current_user + "/profile.json", method: "GET",
      failure: function() {
        this.loadMask.hide();
      },
      success: function(response) {
        var userdata = Ext.decode(response.responseText).userdata;
        var contacts = userdata.contacts;
        var phone;
        for (var i=0; i<contacts.length; i++){
          if (contacts[i]['type'] == 'office_phone'){
            phone = contacts[i]['address'];
            break;
          }
          phone = null;
        }
        this.getPanel().setCoordinator(userdata.display_name, phone);
        this.loadMask.hide();
      },
      scope: this });

  }
});

Talho.ScriptManager.reg('Talho.TALHO.controller.VideoConference', Talho.TALHO.controller.VideoConference, function(config){
  var ctrl = new Talho.TALHO.controller.VideoConference(config);
  return ctrl.getPanel();
});