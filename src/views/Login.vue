<template>
    <div>
        <div class="main-content">
            <div class="row justify-content-start">
                <div class="col-3" v-for="estoque in estoques">
                    <div class="row justify-content-center" style="height: 100%!important;">
                        <div class="col-8 mt-2 py-2 text-center card card-body">
                            <div class="row justify-content-center">
                                <div class="col-12 card-img-top">
                                    <img :src="estoque.icone" style="max-height: 20vh; min-height: 20vh;">
                                </div>
                                <div class="col-12">
                                    <br><b>{{ estoque.nome }}</b><br><br>
                                </div>
                                <div class="col-md-4">
                                    <button class="btn btn-danger" style="border-radius: 100px;" @click="retira(estoque.id)" v-if="estoque.quantidade"><i class="fas fa-minus"></i></button>
                                </div>
                                <div class="col-md-4 text-center">
                                    <span style="font-size: 18pt;" :style="(estoque.quantidade < estoque.quantidade_minima) ? 'color: #ff6666;': ''">{{ estoque.quantidade }}</span>
                                </div>
                                <div class="col-md-4">
                                    <button class="btn btn-success" style="border-radius: 100px;" @click="adiciona(estoque.id)"><i class="fas fa-plus"></i></button>
                                </div>
                            </div>
                        </div>      
                    </div>
                </div>
                <div class="col-3">
                    <div class="row justify-content-center" style="height: 100%!important;">
                        <div class="col-8 mt-2 text-center card card-body justify-content-center" data-toggle="modal" data-target="#modalAdd">
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <button class="btn mb-1" style="font-size: 4vh; border: 2px solid #555; border-radius: 120px; height: 13vh; width: 13vh;">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <div class="col-12">
                                    <h4>Adicionar item</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="exameModalLabel" aria-hidden="true">
                    <div class="modal-lg modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Adicionar item</h5>
                                <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label>Nome</label>
                                        <input type="text" class="form-control" v-model="estoque_form.nome"/>
                                    </div>
                                    <div class="col-md-3">
                                        <label>Quantidade</label>
                                        <input type="number" min="0" class="form-control" v-model="estoque_form.quantidade"/>
                                    </div>
                                    <div class="col-md-3">
                                        <label>Quantidade minima</label>
                                        <input type="number" min="1" class="form-control" v-model="estoque_form.quantidade_minima"/>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Icone</label>
                                        <vSelect :options="icones" :reduce="(icones) => icones.link" :label="'nome'" class="vselect" v-model="estoque_form.icone"/>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="salvaProduto">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BaseCrud from "../layouts/Base/BaseCrud";
import vSelect from "vue-select";

export default {
  name: "imageUpload",
  data() {
    return {
        estoques: [],
        estoque_form: {},
        icones: [
            {
                nome: "Lata",
                link: "lata.png",
            },
            {
                nome: "Caixa",
                link: "caixa.png",
            },
            {
                nome: "Saco",
                link: "saco.png",
            },
        ],
    };
  },
  computed: {},
  methods: {
    salvaProduto: function () {
      const self = this;
      let api = self.$store.state.api + "estoques";

      self.$http
        .post(api, self.estoque_form)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          self.getEstoque();
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getEstoque: function () {
      const self = this;
      const api = self.$store.state.api + "estoques?orderByAsc=nome";

      self.$http
        .get(api)
        .then((response) => {
          self.estoques = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    adiciona: function(id){
        const self = this;
        let api = self.$store.state.api + "adiciona/" + id;

        self.$http
        .post(api)
        .then((response) => {
            self.getEstoque();
        })
            .catch((error) => {
            self.$message(null, error.response.data, "error");
        });
    },
    retira: function(id){
        const self = this;
        let api = self.$store.state.api + "retira/" + id;

        self.$http
        .post(api)
        .then((response) => {
            self.getEstoque();
        })
            .catch((error) => {
            self.$message(null, error.response.data, "error");
        });
    }
  },
  mounted: function () {
    const self = this;
    self.getEstoque();
  
  },
  components: {
    BaseCrud,
    vSelect,
  },
};
</script>
<style scoped>
.profile_user {
  text-align: center;
}
.photo {
  display: block;
  margin-left: 5px;
  width: 18%;
  border-radius: 10px;
  max-width: 400px;
  max-height: 400px;
  object-fit: cover;
}
.btn-user:hover,
.btn-user[aria-expanded="true"] {
  background: linear-gradient(to right, #000, #666);
  color: #fff !important ;
}
.photo-title {
  color: #000;
  font-size: 18px;
  display: block;
  margin-left: 5px;
  width: 18%;
}
