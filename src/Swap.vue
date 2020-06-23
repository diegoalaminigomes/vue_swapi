<template>
  <div class="offset">
    <form @submit.prevent="getPersons">
      <ul class="grid">
        <li style="width:80%">
          <v-text-field label="Person name.." v-model="searchFilter" single-line solo >
          </v-text-field>
        </li>
        <li style="width:18%">
          <button class="findbutton" v-on:click="getPersons">
            Find            
          </button>
        </li>
      </ul>
    </form>
    <br/>
    <div v-if="persons.length == 0" style="text-align: center">
      <p class="not_found" style="padding-bottom:10px" >
            Person you not found, try again you can!
      </p>
      <img style="width:40%" src="not_found.png"/>
    </div>

    <div v-for="person in persons" :key="person.name">
      <v-card class="card">
        <v-card-text>
          <p class="card_title" style="padding-bottom:10px" >
            {{person.name}}
          </p>
          <ul class="grid">
            <li>
              <p class="card_subtitle">
                Birth year:
              </p>
            </li>
            <li>
            <p class="card_info">
              {{person.birth_year.toUpperCase()}}
            </p>
            </li>
          </ul>
          <ul class="grid">
            <li>
              <p class="card_subtitle">
                Gender:
              </p>
            </li>
            <li>
            <p class="card_info">
              {{person.gender.toUpperCase()}}
            </p>
            </li>
          </ul>
          <ul class="grid">
            <li>
              <p class="card_subtitle">
                Eye color:
              </p>
            </li>
            <li>
            <p class="card_info">
              {{person.eye_color.toUpperCase()}}
            </p>
            </li>
          </ul>
          <p style="padding-top:10px" class="card_subtitle">
            Films
          </p>
          <v-divider/>
          <div v-for="film in person.films" :key="film.title">
            {{film.title}} ({{film.formattedDate}})
          </div>
        </v-card-text>
      </v-card>
      <br/>
    </div>
    <div style="text-align: center;">
      <button 
        type="button" 
        class="button"
        v-for="pageNumber in pages" :key="pageNumber" 
        @click="setPage(pageNumber)"> 
        {{pageNumber}} 
      </button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'Swap',
    data() {
      return { searchFilter: '', persons: [], count: 0, page: 1, perPage: 10, pages: [], }
    },
    methods:{
      getPersons(){
        fetch("https://swapi.dev/api/people/?search=" + this.searchFilter + "&page=" + this.page)
        .then(response => response.json())
        .then(data=>{
          this.page = 1; 
          this.count = data.count;
          this.persons = data.results;
          this.persons.forEach(person => {
            let films=[];
            person.films.forEach(urlFilm => {
              fetch(urlFilm)
              .then(response => response.json())
              .then(data=>{
                data.formattedDate = moment(data.release_date).format('YYYY');
                films.push(data);
              })
              .then();
            });
            person.films = films;
          })
        })
      },
      setPage(pageNumber){
        this.page = pageNumber;
        this.getPersons();
        window.scrollTo(0,0);
      },
      setPages () {
        this.pages = [];
        let numberOfPages = Math.ceil(this.count / 10);
        for (let index = 1; index <= numberOfPages; index++) {
          this.pages.push(index);
        }
      },
    },
    watch: {
      persons () {
        this.setPages();
      }
    },
    created(){
      this.getPersons();
    },
  }
</script>

<style>
  .offset{
    width: 100% !important;
    padding: 20px;
    font-family:'Roboto'
  }

  .card_title{
    color: #FFE81F;
    font-size: large;
    font-weight: bold;
  }

  .not_found{
    color: #FFE81F;
    font-size: large;
  }

  .card_subtitle{
    color: #616161;
    font-weight: bold;
  }

  .card_info{
    color: #616161;
  }

  .card{
    max-width: none;
  }

  .grid {
    text-align: justify;
  }

  .grid li {
    display: inline-block;
    margin-right: 1%;
  }

  .button{
    padding: 12px;
    color: #FFE81F !important;
  }

  .findbutton{
    width:100%;
    background: #FFE81F; 
    font-weight: bold;
    border-radius: 3px;  
    padding: 12px;
  }

</style>

})