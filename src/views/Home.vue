<template>
  <div class="row">
    <h1>Notas / libros</h1>
      <div class="container">
        <b-row>
          <b-col>
            <b-card title="Notas">
            <b-row>
            <table class="table">
              <thead>
                <tr>
                <!-- <th scope="col">#</th> -->
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in notas" :key="index">
                <!-- <th scope="row">{{item._id}}</th> -->
                <td>{{item.nombre}}</td>
                <td>{{item.descripcion}}</td>
                <td>{{item.date}}</td>
                </tr>
              </tbody>
            </table>
            </b-row>
            </b-card>
          </b-col>
          <b-col>
            <b-card title="Libros">
            <b-row>
              <table class="table">
                <thead>
                  <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Nombre</th>
                  <th scope="col">categoria</th>
                  <th scope="col">autor</th>
                  <!-- <th scope="col">libroId</th> -->
                  <th scope="col">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in libro" :key="index">
                  <!-- <th scope="row">{{item._id}}</th> -->
                  <td>{{item.nombre}}</td>
                  <td>{{item.categoria}}</td>
                  <td>{{item.autor}}</td>
                  <!-- <td>{{item.libroId}}</td> -->
                  <td>{{item.date}}</td>
                  </tr>
                </tbody>
              </table>
            </b-row>
            </b-card>
          </b-col>
        </b-row>
            
      </div>
  </div>
</template>

<script>
  export default {    
    data () {
      return{
        libros:[],
        libro:{nombre:"",categoria:"",autor:"",libroId:""},
        notas:[],
        nota:{nombre:"",descripcion:""}
      };
    },
    
    created(){
      this.listarNotas();
      this.listarLibros();
    },
    methods:{
      listarNotas(){
        this.axios.get('/nota')
        .then(res => {
          this.notas = res.data;
        })
        .catch((e)=>{
          console.log(e.response);
        })
      },
      listarLibros(){
        this.axios.get('/libro')
        .then(res => {
          this.libro = res.data;
        })
        .catch((e)=>{
          console.log(e.response);
        })
      }      
    }

  };

</script>
