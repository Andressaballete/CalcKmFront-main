<template>
  <form @submit.prevent="login">

  <h2>Login</h2>

  <p>
    <label for="username"></label>
    <input type="text" id="username" required autofocus v-model="nome" placeholder="Usuário">
  </p>

  <p>
    <label for="inputPassword"></label>
    <input type="password" id="inputPassword" required v-model="senha" placeholder="Senha"> 
  </p>
  <button type="submit">Ok</button>
  </form>

</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import setAuthHeader from '../utils/HeaderAuth';
export default {
  name: 'Home',
  data(){
    return {
      nome:'',
      senha:''
    }
  },
  methods:{
    ...mapMutations([
      'setUsuario',
      'setSenha'
    ]),
    login(){
      axios.post('login',
      { username: this.nome, password: this.senha} )
      .then(res => {
        console.log(res);
        localStorage.setItem('jwtToken',res.data.token);
        setAuthHeader(res.data.token);
        localStorage.setItem('username',res.data.username);
        localStorage.setItem('role',res.data.autorizacao);
        this.sucesso();
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          console.log('Usuário ou senha inválidos');
        }
        else {
          this.sucesso();
        }
      });
    },
    sucesso() {
      this.setUsuario(this.nome);
      this.setSenha(this.senha);
      this.$router.push('/formulario');
    }
  }
}
</script>>