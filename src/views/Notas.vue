<template>
<div class="container">
  <h1>Notas</h1>

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

    <form @submit.prevent="editarNota(notaEditar)" v-if="editar">
      <h3>Editar una nota</h3>
      <input type="text" class="form-control my-2" placeholder="Nombre" v-model="notaEditar.nombre" >
      <input type="text" class="form-control my-2" placeholder="Descripcion" v-model="notaEditar.descripcion">
      <b-button class="btn-info my-2" type ="submit">Editar</b-button>
      <b-button class="btn-danger my-2" type ="submit" @click="editar=false">Cancelar</b-button>
    </form>
    
  <form @submit.prevent="agregarNota()" v-if="!editar">
    <h3>Agregar una nueva nota</h3>
    <input type="text" class="form-control my-2" placeholder="Nombre" v-model="nota.nombre" >
    <input type="text" class="form-control my-2" placeholder="Descripcion" v-model="nota.descripcion">
    <b-button class="btn-success my-2" type ="submit">Agregar</b-button>
  </form>

  <h2>Notas</h2>

  <table class="table">
    <thead>
      <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Descripción</th>
      <th scope="col">Fecha</th>
      <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in notas" :key="index">
      <th scope="row">{{item._id}}</th>
      <td>{{item.nombre}}</td>
      <td>{{item.descripcion}}</td>
      <td>{{item.date}}</td>
      <td>
        <b-button class="btn-danger mx-2" @click="eliminarNota(item._id)">Eliminar</b-button>
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
        notas:[],
        nota:{nombre:"",descripcion:""},
        mensaje: {color: 'success', texto: ''},
        dismissSecs: 5,
        dismissCountDown: 0,
        editar:false,
        notaEditar:{}
      };
    },
    created(){
      this.listarNotas();
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
      agregarNota(){
        this.axios.post('/nueva-nota',this.nota)
        .then(res =>{
          this.notas.push(res.data)
          this.nota.nombre="";
          this.nota.descripcion="";
          this.mensaje.color="Success";
          this.mensaje.texto="Nota Agregada";
          this.showAlert();

        }).catch(e=>{
          console.log(e.response);
        })

      },
      eliminarNota(id){
        this.axios.delete( `/nota/${id}`)
        .then(res=>{
          const index = this.notas.findIndex(item=>item._id===res.data._id);
          this.notas.splice(index,1);
          this.mensaje.color="Success";
          this.mensaje.texto="Nota Eliminada";
          this.showAlert();

        }).catch(e=>{
          console.log(e.response);
        })
      },
      activarEdicion(id){
        this.editar=true;
        this.axios.get(`/nota/${id}`)
        .then(res=>{
          this.notaEditar = res.data;

        }).catch(e=>{
          console.log(e.response);
        })
      },
      editarNota(item){
        this.axios.put(`/nota/${item._id}`,item)
        .then(res=>{
          const index=this.notas.findIndex(n=> n._id=== res.data._id);
          this.notas[index].nombre= this.data.nombre;
          this.notas[index].descripcion= this.data.descripcion;
          this.mensaje.color="Success";
          this.mensaje.texto="Nota Editada";
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