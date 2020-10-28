var app = new Vue({
  el: '#app',
  data: {
    errorMsg: "",
    successMsg: "",
    showModal: false,
    editModal: false,
    deleteModal: false,
    pessoas: [],
    newPessoa: { nome: "", ano: "" },
    currentPessoa: {},
  },
  mounted: function () {
    this.getAllPessoas();
  },
  methods: {
    getAllPessoas() {
      axios.get("http://localhost/Projeto%20DG%20Solutions/system.php?action=read")
        .then(function (response) {
          if (response.data.error) {
            app.errorMsg = response.data.message;
          }
          else {
            app.pessoas = response.data.pessoas;
          }
        });
    },
    //Adiciona Pessoa
    addPessoa() {
      const formData = app.toFormData(app.newPessoa);
      axios.post("http://localhost/Projeto%20DG%20Solutions/system.php?action=create", formData).then(function (response) {
        app.newPessoa = { nome: "", ano: "" };
        if (response.data.error) {
          app.errorMsg = response.data.message;
        }
        else {
          app.successMsg = response.data.message;
          app.getAllPessoas();
        }
      });
    },//fim de addPessoa

    //atualizando dados
    updatePessoa() {
      const formData = app.toFormData(app.currentPessoa);
      axios.post("http://localhost/Projeto%20DG%20Solutions/system.php?action=update", formData).then(function (response) {
        app.currentPessoa = {};
        if (response.data.error) {
          app.errorMsg = response.data.message;
        }
        else {
          app.successMsg = response.data.message;
          app.getAllPessoas();
        }
      });
    },//fim atualizando dados

    //Deletando dados
    deletePessoa() {
      const formData = app.toFormData(app.currentPessoa);
      axios.post("http://localhost/Projeto%20DG%20Solutions/system.php?action=delete", formData).then(function (response) {
        app.currentPessoa = {};
        if (response.data.error) {
          app.errorMsg = response.data.message;
        }
        else {
          app.successMsg = response.data.message;
          app.getAllPessoas();
        }
      });
    },//fim Deletando dados

    toFormData(obj) {
      const fd = new FormData();
      for (var i in obj) {
        fd.append(i, obj[i]);
      }
      return fd;
    },
    selectPessoa(pessoas) {
      app.currentPessoa = pessoas;
    },

  }
});