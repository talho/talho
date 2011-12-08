
Ext.ns('Talho.TALHO.view.training');

Talho.TALHO.view.training.Training = Ext.extend(Ext.Panel, {
  title: 'Training',
  itemId: 'training',
  closable: true,
  style: {
    padding: '5px'
  },
  initComponent: function(){
    this.items = [{tpl: [
      '<tpl for=".">',
        '<div class="t_boot well well_training">',
          '<h5 name="{short_name}">{name}</h5>',
          '<tpl for="info">',
            '<div style="height:32px;"><div style="position:relative;top:-2px;" class="ux-image-display-field documents-folder-item-{type}-icon"></div><a href="{url}" target="_blank">{name}</a></div>',
          '</tpl>',
        '</div>',
      '</tpl>'
    ], border: false, data: [
      {name: 'Real-time Outbreak and Disease Surveillance (RODS)', short_name: 'RODS', info:[
        {name: 'RODS Demo (Video)', url: "http://webcast.talho.org/1/watch/115.aspx", type: 'video'}
      ]},
      {name: 'Electronic Surveillance System for the Early Notification of Community-based Epidemics (ESSENCE)', short_name: 'ESSENCE', info:[
        {name: 'Program Walkthroughs and Advanced Features (Videos)', url: "http://bioterrorism.dhmh.state.md.us/Pages/Programs/Biosurveillance/ESSENCE/Training-Videos/Default.aspx", type: 'video'}
      ]},
      {name: 'Mobile Tactical Units', short_name: 'trailer', info: [
        {name: 'Communication and Response Trailer 2009-2010 (Manual)', url: '/training/talho/2009-2010 CRT.pdf', type: 'doc'},
        //{name: 'Communication and Response Trailer 2011 (Manual)', url: '/training/talho/2011 CRT.pdf', type: 'doc'},
        {name: 'Power Trailer (Manual)', url: '/training/talho/2011-09 Power Trailer Manual.pdf', type: 'doc'}
      ]},
      {name: 'Video Conferencing', short_name: 'video', info:[
        {name: 'Video Conferencing Etiquette (Manual)', url: '/training/talho/Video Conferencing Etiquette.docx', type: 'doc'},
        {name: 'Viewstation Set-up Diagrams (Manual)', url: '/training/talho/Viewstation Diagrams.pdf', type: 'doc'}
      ]}
    ]}];
    Talho.TALHO.view.training.Training.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg('talho.training', Talho.TALHO.view.training.Training)
