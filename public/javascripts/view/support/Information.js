
Ext.ns('Talho.TALHO.view.support');

Talho.TALHO.view.support.Information = Ext.extend(Ext.Panel, {
  title: 'Support Information',
  closable: true,
  bodyCssClass: 't_boot',
  padding: '10px',
  autoScroll: true,
  initComponent: function(){
    this.items = [{html: [
      '<div class="container">',
        '<h1>Support Information</h1>',
        '<h3>Services TALHO Provides</h3>',
        '<p>Talho can provide a number of IT services to our members including:',
          '<ul>',
            '<li>Teleconference</li>',
            '<li>Videoconference</li>',
          '</ul>',
        '</p>',
        '<h3>How to Contact Us</h3>',
        '<p>Email: <a href="mailto:admins@texashan.org">TALHO Admins</a></p>',
        '<p>Phone: 512-814-2546 option 4</p>',
      '</div>'
    ], border: false}];
    Talho.TALHO.view.support.Information.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg('talho.information', Talho.TALHO.view.support.Information)
