<template>
    <div>
        <form @submit.prevent="cadastrar">
            <h2>Trabalho</h2>
            <p>
                <label for="titulo">Título</label>
                <input type="text" id="titulo" 
                required autofocus 
                v-model="titulo">
            </p>
            <p>
                <label for="localArquivo">Local do arquivo</label>
                <input type="text" id="localArquivo" 
                required 
                v-model="localArquivo">
            </p>
            <button type="submit">Salvar</button>
        </form>

        <br>

        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Título</th>
                    <th>Local do Arquivo</th>
                    <th>Data/hora</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="trab in trabalhos" :key="trab.id">
                    <td>{{ trab.id }}</td>
                    <td>{{ trab.titulo }}</td>
                    <td>{{ trab.localArquivo }}</td>
                    <td>{{ trab.dataHoraEntrega }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: 'anotacoes',
    data(){
        return {
            titulo: '',
            localArquivo: '',
            trabalhos: []
        }
    },
    computed: {
        ...mapState([
            'usuario',
            'senha'
        ])
    },
    methods: {
        cadastrar() {
            axios.post('trabalho',
            {
                titulo: this.titulo,
                dataHoraEntrega: new Date(),
                localArquivo: this.localArquivo
            },
            {
                auth: {
                    username: this.usuario,
                    password: this.senha
                }
            }
            )
            .then(res => {
                console.log(res);
                this.titulo = '';
                this.localArquivo = '';
                this.trabalhos.push(res.data);
            })
            .catch(error => console.log(error))
        }
    }
}
</script>
