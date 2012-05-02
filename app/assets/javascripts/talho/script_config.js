
dominoes.property('talho', '/assets/talho');
dominoes.property('t_cont', '$(talho)/controller');
dominoes.property('t_view', '$(talho)/view');

Talho.ScriptManager.addInitializer('Talho.TALHO.controller.Training', {js: '$(t_cont)/Training.js $(t_view)/training/Training.js'});
Talho.ScriptManager.addInitializer('Talho.TALHO.controller.Teleconference', {js: '$(ext_extensions)/validations.js > $(t_cont)/Teleconference.js $(t_view)/forms/Teleconference.js'});
Talho.ScriptManager.addInitializer('Talho.TALHO.controller.VideoConference', {js: '$(ext_extensions)/RowEditor.js $(ext_extensions)/validations.js > $(t_cont)/VideoConference.js $(t_view)/forms/VideoConference.js'});
Talho.ScriptManager.addInitializer('Talho.TALHO.controller.HelpDeskTicket', {js: '$(t_cont)/HelpDeskTicket.js $(t_view)/forms/HelpDeskTicket.js'});
Talho.ScriptManager.addInitializer('Talho.TALHO.controller.Support', {js: '$(t_cont)/Support.js $(t_view)/support/Information.js'});