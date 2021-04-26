/* eslint-disable no-undef */
$(document).ready(() => {
  console.log(WiseAPI);

  const v4hapi = new WiseAPI();

  v4hapi.setup({
    baseUrl: 'https://session-manager.homolog.v4h.cloud/api',
    domain: 'conf.homolog.v4h.cloud',
    login: 'usuario', // change this
    senha: 'senha' // change this
  }).then(async () => {

    const session = await v4hapi.session.create({
      profile: 'DEFAULT',
      skin: 'DEFAULT',
      org: 'organizacao', // change this
      orgUnit: 'geral', // change this
      joinPolicy: 'PUBLIC',
      listPolicy: 'PUBLIC',
    });

    v4hapi.session.startConference(session.short, {
      parentNode: document.getElementById('meet'),
      startWithAudioMuted: true,
      userInfo: { displayName: 'Leoberto' },
      shareLink: 'https://v4h.cloud/teste',
      buttons: ['microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'invite', 'feedback'],
    });

  });
});
