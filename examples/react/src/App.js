import React from 'react';
import WiseAPI from 'wise-api';

const App = () => {

  var v4hapi = new WiseAPI();

  v4hapi.setup({
    baseUrl: 'https://session-manager.dev.v4h.cloud/api',
    domain: 'conf.dev.v4h.cloud',
  });

  onclose = async () => {
    console.log('ON CLOSE');
  }

  const start = async (e) => {
    const session = await v4hapi.session.create({
      profile: 'DEFAULT',
      skin: 'DEFAULT',
      org: 'wisecare',
      orgUnit: 'geral',
      joinPolicy: 'PUBLIC',
      listPolicy: 'PUBLIC',
    });

    v4hapi.session.startConference(session.short, {
      parentNode: document.getElementById('meet'),
      startWithAudioMuted: true,
      userInfo: { displayName: 'Leoberto' },
      width: 1280,
      hieght: 960,
      shareLink: 'https://v4h.cloud/teste',
      buttons: ['microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'feedback', 'participants-pane'],
    });
  }

  const stopCall = () => {
    v4hapi.session.stopConference();
  }

  return (
    <div>
      <h1>V4H Integreation - React</h1>
      <div style={{ flex: 1, 'flexDirection': 'row' }}>
        <button style={{ 'margin': '0px 30px 20px 0px' }} onClick={(e) => { e.stopPropagation(); start(); }}>Iniciar conferência</button>
        <button onClick={stopCall}>Encerrar</button>
      </div>
      <div>
        <div id="meet"/>
      </div>
    </div>
  );


}

export default App;
