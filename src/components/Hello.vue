<template>
  <div class="hello">
    <h1>Star Wars API</h1>
    <!--<select aria-label="Type of entity" v-model="selectedEntity">
      <option v-for="entity in entities" :value="entity.value" :selected="entity.selected">
        {{entity.text}}
      </option>
    </select>-->
	<b>Pesquise o Nome e Gênero do Personagem:</b><br>
    <input aria-label="Enter search query" placeholder="Pesquise o Personagem" v-model="query"/>
	
	<br>
	<br>
	
	 <!--<select aria-label="Type of entitys" v-model="selectedEntitys">
      <option v-for="entitys in entities" :value="entitys.value" :selected="entitys.selected">
        {{entitys.text}}
      </option>
    </select>-->
	<b>Pesquise o Titulo do Filme:</b><br>
    <input aria-label="Enter searchfilms querys" placeholder="Pesquise o Filme" v-model="querys"/>
	
    <p v-if="results.length">{{results.count}} results</p>
    <div class="info-container">
      <div :class="{ expand: !selectedResult }">
        <ul>
          <li v-for="result in results.results">
             <a @click="selectResult(result)">
               {{getName(result)}}
             </a>
          </li>
        </ul>
      </div>
      <div :class="{ collapse: !selectedResult }">
        <template v-if="selectedResult">
          <h2>{{getName(selectedResult)}}</h2>
          <p v-for="characteristic in extractRedableCharacteristics(selectedResult)">
            {{capitalise(characteristic.name)}}: {{characteristic.value}}
          </p>
		  <br>
          <!--<p><small>Ultima atualização {{selectedResult.edited}}</small></p>-->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _debounce from 'lodash.debounce'

export default {
  name: 'hello',
  data () {
    return {
      results: [],
      entities: [],
      selectedResult: '',
      selectedEntity: '',
      selectedEntitys: '',
      query: '',
      querys: '',
    }
  },
  methods: {
    search: _debounce(function () {
      this.results = []

      const query = this.query
      const querys = this.query
      const entity = this.selectedEntity
      const entitys = this.selectedEntitys


	  //axios.get('https://swapi.dev/api/${entity}/?search=${query}').then(res => {11
	  axios.get('https://swapi.dev/api/people/?search=').then(res => {11
        this.results = res.data
      }, 
	  err => {
        throw err
      })
	  /* axios.get('https://swapi.dev/api/films/?search=').then(res => {11
        this.results = res.data
      }, 
	  err => {
        throw err
      })*/
    }, 500),
	  searchfilms: _debounce(function () {
      this.results = []

      const query = this.query
      const entity = this.selectedEntity


	  /*axios.get('https://swapi.dev/api/${entity}/?search=${query}').then(res => {11
	  axios.get('https://swapi.dev/api/people/?search=').then(res => {11
        this.results = res.data
      }, 
	  err => {
        throw err
      })*/
	  axios.get('https://swapi.dev/api/films/?search=').then(res => {11
        this.results = res.data
      }, 
	  err => {
        throw err
      })
    }, 500),
    capitalise (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    getName (obj) {
      return obj.name || obj.title
    },
    extractRedableCharacteristics (obj) {
      const blacklist = ['created', 'edited', 'url', 'name']
      const permittedTypes = ['string', 'number', 'object']

      const attrs = Object.keys(obj).filter(key => {
        const value = obj[key]

        /*if (blacklist.indexOf(key) !== -1) return false
        if (permittedTypes.indexOf(typeof value) === -1) return false
        if (value.indexOf('http') !== -1) return false*/

        return true
      }).map(key => {
        const name = this.capitalise(key.replace(/_/g, ' '))

        let value = obj[key]
        if (typeof value === 'object' && value.length !== undefined) value = value.length

        return { name, value }
      })

      return attrs
    },
    selectResult (result) {
      this.selectedResult = result
    },
    clearResults () {
      this.selectedResult = null
      this.query = null
      this.results = []
    },
    handleKeydown (e) {
      if (e.keyCode === 27) { // esc
        this.clearResults()
      }
    }
  },
  created () {
    document.addEventListener('keydown', this.handleKeydown)

    axios.get('https://swapi.dev/api/?format=json').then(res => {
      this.entities = Object.keys(res.data).map(key => {
        return {
          value: key,
          text: this.capitalise(key)
        }
      })

      this.selectedEntity = this.entities[0].value
    }, err => {
      throw err
    })
  },
  watch: {
    query (value) {
      if (value) this.search()
      else this.clearResults()
    },
    selectedEntity () {
      if (this.query) this.search()
    },
	 querys (value) {
      if (value) this.searchfilms()
      else this.clearResults()
    },
    selectedEntitys () {
      if (this.querys) this.search()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
input, select {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: .5em;
  width: 80%;
  font-size: 1em;
  padding: 0.5em 1em;
  -webkit-appearance: none;
  background-color: #fff;
  border: 1px solid #ececec;
  border-radius: 4px;
}

h1, h2 {
  font-weight: normal;
}

.info-container {
  overflow: hidden;
  display: block;
  width: 100%;
}

.info-container div {
  float: left;
  width: 100%;
  transition: all .5s;
  display: inline-block;
}

div.collapse {
  display: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
}

a {
  cursor: pointer;
  color: #35495E;
}

p {
  margin: .2em;
}

@media only screen and (min-width: 768px) {
  input, select {
    display: inline-block;
    margin-bottom: 0;
    width: initial;
  }

  .info-container div {
    width: 50%;
  }

  div.collapse {
    width: 0;
    display: inline-block;
  }

  div.expand {
    width: 100%;
  }
}

.visually-hidden {
  display: none;
}
</style>
