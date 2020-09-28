<template>
  <div id="app">
    <header>
      <span>Star Wars API Vue js</span>
    </header>
    <main>
      <img src="./assets/logo.png" alt="SWAPI PWA">
      <router-view></router-view>
    </main>
    <footer>
      <span>Criado por Heitor Machado Vargas, usando a API <a href="https://swapi.dev/">Star Wars API</a>.</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    title: 'Star Wars API Vue js',
    meta: [
      { name: 'descrição', content: 'Web App desenvolvido com Vue e apoiado por dados da API Star Wars.', vmid: 'descrição' },
      { name: 'og:descrição', content: 'Web App desenvolvido com Vue e apoiado por dados da API Star Wars.', vmid: 'og:descrição' }
    ]
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-size: 18px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

main {
  text-align: center;
  flex: 1 0 auto;
}

header, footer {
  background-color: #000000;
  color: #ffffff;
}

header, footer {
  font-size: 1.5em;
  padding: 0.5em 1em;
  min-height: 2em;
}

header span,
footer span {
  display: block;
  line-height: 1;
  letter-spacing: .02em;
  box-sizing: border-box;
}

footer {
  flex-shrink: 0;
  padding: 1em 1.5em;
  font-size: 1em;
  text-align: center;
}

footer span:first-of-type {
  margin-bottom: .5em;
}

footer a {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}

</style>
