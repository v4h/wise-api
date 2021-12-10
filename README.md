# Wise API

[![npm version](https://img.shields.io/npm/v/wise-api)](https://www.npmjs.com/package/wise-api)
[![NPM](https://img.shields.io/npm/l/wise-api)](https://www.npmjs.com/package/wuise-api)
[![npm](https://img.shields.io/npm/dm/wise-api)](https://www.npmjs.com/package/wise-api)
[![npm bundle size](https://img.shields.io/bundlephobia/min/wise-api)](https://www.npmjs.com/package/wise-api)

Biblioteca para o serviço de vídeoconferência segura para saúde (V4H - Video for Health), essa aplicação permite colocar em um sistema web já existente vídeo chamadas além de um controle de acesso complexo, onde você é possível delimitar ações dos usuários dependendo do seu papel. Para mais informações clique [aqui](https://v4h.cloud).

## Sumário

  - [Features](#features)
  - [Instalação](#instalação)
  - [Example](#example)
  - [Client API](#client-api)
    - [Sessões](#Sessões)
    - [Organicação](#organização)
    - [Unidade Organizacional](#unidade-organizacional)


## Features

- Controle de organizações e unidades organizacionais
- Controle de usuários
- Funcionalidades dentro da conferências configuráveis
- Customização de interface configurável
- Gravação da videoconferência client-side e server-side
- Storage de vídeos gravados
- Criação de um manifesto de todas as ações ocorridas dentro da conferência
- Manifesto salvo em blockchain
- Integração com serviços de blockchain privadas
- Armazenamento de arquivos

## Instalação

Usando npm:

```bash
$ npm install wise-api
```

Usando yarn:

```bash
$ yarn add wise-api
```

Usando jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/v4h/wise-api@0.5.8/wiseapi.min.js"></script>
```

## Client API

A client API deve ser definida da seguinte forma para ser utilizada:

```javascript
const v4h = new WiseAPI();
v4h.setup(options);
```

Options:
- baseUrl: [opcional] url do servidor da API
- token: [opcional] token de acesso
- domain: [opcional] servidor de videoconferência
- login: [opcional] string de identificação para login no sistema
- password: [opcional] senha para login no sistema

Após o setup você estará disponível para accessar as classes que serão descritas abaixo.

### Sessão de videoconferência

Classe com os métodos de sessões de videoconferência.

  - [Requisitar videoconferência](#Requisitar-videoconferência)
  - [Listar videoconferências](#Listar-videoconferências)
  - [Recuperar videoconferência](#Recuperar-videoconferência)
  - [Atualizar videoconferência](#Atualizar-videoconferência)
  - [Deletar videoconferência](#Deletar-videoconferência)
  - [Iniciar videoconferência](#Inicar-videoconferência)
  - [Encerrar videoconferência](#Encerrar-videoconferência)

#### ``Requisitar videoconferência``

Método responsável por criar uma sessão de 

```javascript
const wiseAPI = new WiseAPI();
v4h.setup({ login: 'usuario', senha: 'senha' });

const data = {
  profile: 'basico',
  skin: 'basico',
  org: 'org',
  orgUnit: 'orgUnit',
  joinPolicy: 'PUBLIC',
  listPolicy: 'PUBLIC'
}

cosnt session = wiseAPI.session.create(data).then((response) => {
  console.log(response);
});
```

data: 
- org: Identificador da organização
- orgUnit: Identificador da unidade organizacional
- profile: Identificador do profile
- skin: Identificador do skin da conferência
- joinPolicy: [opcional] Para acessar (entrar), as seguintes políticas podem ser usadas:
  - ORG:  indica que a sessão somente pode acessada por algum usuário da organização
  - ORGUNIT:  somente pode acessada por usuários das unidades organizacionais listadas no atributo allowJoinOu
  - RESTRICT:  indica que a sessão somente pode ser acessada por usuários previamente cadastrados
  - PUBLIC: Indica que o acesso à sessão não requer um usuário credenciado 
  - SESSIONPWD: entra apenas informando a password da sessão
- listPolicy: [opcional] Define como a sessão é enxergada por usuários cadastrados ou públicos na internet. 
  - PUBLIC: a sessão pode aparecer em uma lista pública
  - SHARED: a sessão pode aparecer em uma lista apenas para usuários da organização
  - PRIVATE: a sessão nunca aparece em listas, exceto com autenticação de usuários e permissão verificada para listar
- password: [opcional] senha de acesso da sessão
- allowJoinOu: [opcional] array de unidades organizacionais

Retorno: 

```javascript
{
  id: 1
}
```

#### ``Listar videoconferências``

Método responsável por recuperar todas as sessões criadas.

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

v4h.session.list().then((sessions) => {
  console.log(sessions);
});
```

Retorno:

```javascript
[{
  id: 2,
  profile: 1,
  skin: 1,
  org: 1,
  orgUnit: 1,
  status: 'READY',
  firstJoin: null,
  started: null,
  finished: null,
  short: 'sks3lf6lhxqt2a1j',
  joinPolicy: 'PUBLIC',
  listPolicy: 'PUBLIC',
  allowJoinOu: null
}]
```

#### ``Recuperar videoconferência``

Método responsável por recuperar informações de uma única sessão.

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

const sessionId = 1;

v4h.session.find(sessionId).then((session) => {
  console.log(session);
});
```

Retorno:

```javascript
{
  id: 2,
  profile: 1,
  skin: 1,
  org: 1,
  orgUnit: 1,
  status: 'READY',
  firstJoin: null,
  started: null,
  finished: null,
  short: 'sks3lf6lhxqt2a1j',
  joinPolicy: 'PUBLIC',
  listPolicy: 'PUBLIC',
  allowJoinOu: null
}
```

#### ``Atualizar videoconferência``

Método responsável por atualizar informações de uma sessão pelo identificador único da sessão.

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

const sessionName = 'skjdhfsjhbfw3fs';

const data = {
  listPolicy: 'PUBLIC',
};

v4h.session.update(sessionId, data).then((response) => {
  console.log(response);
});
```

data: 
- orgUnit: [opcional] Identificador da unidade organizacional
- profileId: [opcional] Identificador do profile
- skinId: [opcional] Identificador do skin da conferência
- joinPolicy: [opcional] Para acessar (entrar), as seguintes políticas podem ser usadas:
  - ORG:  indica que a sessão somente pode acessada por algum usuário da organização
  - ORGUNIT:  somente pode acessada por usuários das unidades organizacionais listadas no atributo allowJoinOu
  - RESTRICT:  indica que a sessão somente pode ser acessada por usuários previamente cadastrados
  - PUBLIC: Indica que o acesso à sessão não requer um usuário credenciado 
  - SESSIONPWD: entra apenas informando a password da sessão
- listPolicy: [opcional] Define como a sessão é enxergada por usuários cadastrados ou públicos na internet. 
  - PUBLIC: a sessão pode aparecer em uma lista pública
  - SHARED: a sessão pode aparecer em uma lista apenas para usuários da organização
  - PRIVATE: a sessão nunca aparece em listas, exceto com autenticação de usuários e permissão verificada para listar
- password: [opcional] senha de acesso da sessão
- allowJoinOu: [opcional] array de unidades organizacionais


Retorno: 

```javascript
true or false
```

#### ``Deletar videoconferência``

Método responsável por deletar uma sessão.

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

const sessionId = 1;

v4h.session.delete(sessionId).then((response) => {
  console.log(response);
});
```

Retorno: 

```javascript
true or false
```

#### ``Iniciar videoconferência``

Método para iniciar a conferência em uma div do sistema que está sendo utilizado, esse método não está disponível se for executado utilizando node.

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

const sessionName = 'skjdhfsjhbfw3fs';

const options = {
  parentNode: document.getElementById('meet'), 
  userInfo: { 
    displayName: 'Leoberto' 
  }
}

v4h.session.startConference(sessionName, options).then((response) => {
  console.log(response);
});
```

options
- parentNode: div html onde deverá ser colocado o v4h
- width: [opcional] tamanho em pixels da largura da tela de vídeo conferência
- height: [opcional] tamanho em pixels da altura tela de vídeo conferência
- startWithAudioMuted [opcional] booleano para iniciar com audio habilitado ou desabilitado
- startWithVideoMuted [opcional] booleano para iniciar com video habilitado ou desabilitado
- shareLink [opcional] link que será inserido no botão de compartilhar
- buttons [opcional] array de botões que serão exibidos na tela
- userInfo: [opcional] objeto com informações do usuário
  - displayName: [opcional] nome do usuário que será mostrado na tela
- onLoad [opcional] callback que será executado na abertura da sessão
- onClose [opcional] callback que será executado no encerramento da sessão

#### ``Encerrar videoconferência``

Método para encerrrar uma conferência, esse método não está disponível se for executado utilizando node e só terá efeito quando a conferência já estiver aberta.

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

v4h.session.stopConference().then(() => {
  console.log('ok');
});
```

### Organização

Sessões de conferência são criadas por usuários de uma organização. Esta entidade é a base que permite especialização futura para pessoa física ou pessoa jurídica. 

#### ``create(data)``

Método responsável por criar uma organização

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

const data = {
  shortname: "organização",
  planId: 1,
  fullname: "organizacao LTDA",
  alias: "organizacao de teste",
  admin: 1,
  type: "J",
  reg: "12345678912"
};

cosnt org = v4h.org.create(data).then((response) => {
  console.log(org);
});
```

data: 
- shortname: Nome curto – usado para ocasiões com pouco espaço
- planId: O plano ao qual a organização está vinculada
- fullName: Nome completo ou razão social
- alias: [opcional] Nome de fantasia
- admin: id do usuário administrador da organização
- type: Pessoa física ou jurídica
- reg: Identificador do registro (CNPJ ou CPF)
- logo: [opcional] URL externa para logo

Retorno: 

```javascript
{
  id: 1
}
```

#### ``getAll()``

Método responsável por recuperar todas as organizações criadas

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

v4h.org.getAll().then((org) => {
  console.log(org);
});
```

Retorno:

```javascript
[{
  id: 1,
  shortname: "organização",
  planId: 1,
  fullname: "organizacao LTDA",
  alias: "organizacao de teste",
  admin: 1,
  type: "J",
  reg: "12345678912",
  logo: null
}]
```

#### ``get(orgId)``

Método responsável por recuperar informações de uma única organiação pela identificador único da organização.

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

const orgId = 1;

v4h.org.get(orgId).then((org) => {
  console.log(org);
});
```

Retorno:

```javascript
{
  id: 1,
  shortname: "organização",
  planId: 1,
  fullname: "organizacao LTDA",
  alias: "organizacao de teste",
  admin: 1,
  type: "J",
  reg: "12345678912",
  logo: null
}
```

#### ``update(orgId, data)``

Método responsável por atualizar informações de uma organiação pelo identificador único da organização.

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

const orgId = 1;

const data = {
  alias: "organizacao de teste",
};

v4h.org.update(orgId, data).then((response) => {
  console.log(response);
});
```

data: 
- shortname: [opcional] Nome curto – usado para ocasiões com pouco espaço
- planId: [opcional] O plano ao qual a organização está vinculada
- fullName: [opcional] Nome completo ou razão social
- alias: [opcional] Nome de fantasia
- admin: [opcional] id do usuário administrador da organização
- type: [opcional] Pessoa física ou jurídica
- reg: [opcional] Identificador do registro (CNPJ ou CPF)
- logo: [opcional] URL externa para logo

Retorno: 

```javascript
true or false
```

#### ``delete(orgId)``

Método responsável por deletar uma organização.

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

const orgId = 1;

v4h.org.delete(orgId).then((response) => {
  console.log(response);
});
```

Retorno: 

```javascript
true or false
```

#### ``getAllSessions(orgId)``

Método responsável por recuperar todas as sessões de uma organização

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

v4h.org.getAllSessions().then((sessions) => {
  console.log(sessions);
});
```

retorno: 

```javascript
[{
  id: 1,
  orgId: 1,
  ouId: 1,
  profileId: 1,
  skinId: 1,
  finished: null,
  firstJoin: null,
  started: null,
  status: "READY"
}]
```

### Unidade organizacional

Organizações maiores podem ter unidades organizacionais (departamentos) ou centros de custo ou projetos que usam o serviço.

#### ``create(data)``

Método responsável por criar uma unidade organização

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

const data = {
  name: "unidade_organização",
  orgId: 1,
  descr: "unidade organização de teste",
  admin: 1,
};

cosnt org = v4h.orgUnit.create(data).then((response) => {
  console.log(orgUnit);
});
```

data: 
- name: Nome curto da unidade organizacional
- orgId: Identificador único da organização a qual essa orgUnit pertencerá
- descr: [opcional] Descrição da unidade organizacional
- admin: id do usuário administrador da unidade organização
- logoUrl: [opcional] URL externa para logo
- parent: [opcional] Identificador de outra unidade organizacional na qual essa será submissa.

Retorno: 

```javascript
{
  id: 1
}
```

#### ``getAll()``

Método responsável por recuperar todas as unidades organizações

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

v4h.orgUnit.getAll().then((orgUnits) => {
  console.log(orgUnits);
});
```

Retorno:

```javascript
[{
  id: 1,
  name: "unidade_organização",
  orgId: 1,
  descr: "unidade organização de teste",
  admin: 1,
  parent: null,
  logoUrl: null
}]
```

#### ``get(ouId)``

Método responsável por recuperar informações de uma única unidade organizacional pelo seu identificador único.

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

const ouId = 1;

v4h.orgUnit.get(ouId).then((orgUnit) => {
  console.log(orgUnit);
});
```

Retorno:

```javascript
{
  id: 1,
  name: "unidade_organização",
  orgId: 1,
  descr: "unidade organização de teste",
  admin: 1,
  parent: null,
  logoUrl: null
}
```

#### ``update(ouId, data)``

Método responsável por atualizar informações de uma unidade organizacional.

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

const ouId = 1;

const data = {
  descr: "organizacao de teste",
};

v4h.org.update(ouId, data).then((response) => {
  console.log(response);
});
```

data: 
- name: [opcional] Nome curto da unidade organizacional
- descr: [opcional] Descrição da unidade organizacional
- admin: [opcional] id do usuário administrador da unidade organização
- logoUrl: [opcional] URL externa para logo
- parent: [opcional] Identificador de outra unidade organizacional na qual essa será submissa.

Retorno: 

```javascript
true or false
```

#### ``delete(ouId)``

Método responsável por deletar uma unidade organizacional.

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

const ouId = 1;

v4h.orgUnit.delete(ouId).then((response) => {
  console.log(response);
});
```

Retorno: 

```javascript
true or false
```

#### ``getAllSessions(orgId)``

Método responsável por recuperar todas as sessões de uma organização

```javascript
const v4h = new V4HApi();
v4h.setup({ login: 'usuario', senha: 'senha' });

v4h.org.getAllSessions().then((sessions) => {
  console.log(sessions);
});
```

retorno: 

```javascript
[{
  id: 1,
  orgId: 1,
  ouId: 1,
  profileId: 1,
  skinId: 1,
  finished: null,
  firstJoin: null,
  started: null,
  status: "READY"
}]
```
