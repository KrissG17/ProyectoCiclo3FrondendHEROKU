<template>
<div class="container">
  <h1>Libreria</h1>

  <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
    {{mensaje.texto}}
      <!-- <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress> -->
    </b-alert>

    <form @submit.prevent="editarLibro(libroEditar)" v-if="editar">
      <h3>Editar un libro</h3>
      <input type="text" class="form-control my-2" placeholder="Nombre" v-model="libroEditar.nombre" >
      <input type="text" class="form-control my-2" placeholder="categoria" v-model="libroEditar.categoria">
      <input type="text" class="form-control my-2" placeholder="autor" v-model="libroEditar.categoria">
      <input type="text" class="form-control my-2" placeholder="libroId" v-model="libroEditar.libroId">
      <b-button class="btn-info my-2" type ="submit">Editar</b-button>
      <b-button class="btn-danger my-2" type ="submit" @click="editar=false">Cancelar</b-button>
    </form>
    
  <form @submit.prevent="agregarLibro()" v-if="!editar">
    <h3>Agregar una nuevo libro</h3>
    <input type="text" class="form-control my-2" placeholder="Nombre" v-model="libro.nombre" >
    <input type="text" class="form-control my-2" placeholder="categoria" v-model="libro.categoria">
    <input type="text" class="form-control my-2" placeholder="autor" v-model="libro.autor">
    <input type="text" class="form-control my-2" placeholder="libroId" v-model="libro.libroId">
    <b-button class="btn-success my-2" type ="submit">Agregar</b-button>
  </form>

  <h2>Libros</h2>

  <table class="table">
    <thead>
      <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">categoria</th>
      <th scope="col">autor</th>
      <th scope="col">libroId</th>
      <th scope="col">Fecha</th>
      <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in libro" :key="index">
      <th scope="row">{{item._id}}</th>
      <td>{{item.nombre}}</td>
      <td>{{item.categoria}}</td>
      <td>{{item.autor}}</td>
      <td>{{item.libroId}}</td>
      <td>{{item.date}}</td>

      <td>
        <b-button class="btn-danger mx-2" @click="eliminarLibro(item._id)">Eliminar</b-button>
        <b-button class="btn btn-info mx-2" @click="activarEdicion(item._id)">Editar</b-button>
      </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
  export default {
    data () {
      return{
        libros:[],
        libro:{nombre:"",categoria:"",autor:"",libroId:""},
        mensaje: {color: 'success', texto: ''},
        dismissSecs: 5,
        dismissCountDown: 0,
        editar:false,
        libroEditar:{}
      };
    },
    created(){
      this.listarLibros();
    },
    methods:{
      listarLibros(){
        this.axios.get('/libro')
        .then(res => {
          this.libro = res.data;
        })
        .catch((e)=>{
          console.log(e.response);
        })
      },
      agregarLibro(){
        this.axios.post('/nuevo-libro',this.libro)
        .then(res =>{
          this.libros.push(res.data)
          this.libro.nombre="";
          this.libro.categoria="";
          this.libro.autor="";
          this.libro.libroId="";
          this.mensaje.color="Success";
          this.mensaje.texto="Libro Agregado";
          this.showAlert();

        }).catch(e=>{
          console.log(e.response);
        })

      },
      eliminarLibro(id){
        this.axios.delete( `/libro/${id}`)
        .then(res=>{
          const index = this.libros.findIndex(item=>item._id===res.data._id);
          this.libros.splice(index,1);
          this.mensaje.color="Success";
          this.mensaje.texto="libro Eliminados";
          this.showAlert();

        }).catch(e=>{
          console.log(e.response);
        })
      },
      activarEdicion(id){
        this.editar=true;
        this.axios.get(`/libro/${id}`)
        .then(res=>{
          this.libroEditar = res.data;

        }).catch(e=>{
          console.log(e.response);
        })
      },
      editarLibro(item){
        this.axios.put(`/libro/${item._id}`,item)
        .then(res=>{
          const index=this.libros.findIndex(n=> n._id=== res.data._id);
          this.libros[index].nombre= this.data.nombre;
          this.libros[index].categoria= this.data.categoria;
          this.libros[index].autor= this.data.autor;
          this.libros[index].libroId= this.data.libroId;
          this.mensaje.color="Success";
          this.mensaje.texto="Libro Editado";
          this.showAlert();
          this.editar=false;
        }).catch(e=>{
          console.log(e.response);
          })

      },

      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
        }
    }

  };
</script>