const cep = document.getElementById("cep");
const logradouro = document.getElementById("logradouro");
const complemento = document.getElementById("complemento");
const bairro = document.getElementById("bairro");
const localidade = document.getElementById("localidade");
const estado = document.getElementById("estado");

const error = document.getElementById("error");

cep.addEventListener("change", async (event) => {
    const campoCep = event.target.value;
        try {
            const cepLimpo = campoCep.replace("-", "");
            cep.value = cepLimpo;

            const srcApi = `https://viacep.com.br/ws/${cepLimpo}/json/`;
            const response = await fetch(srcApi);
            const data = await response.json();

            logradouro.value = data.logradouro;
            complemento.value = data.complemento;
            bairro.value = data.bairro;
            localidade.value = data.localidade;
            estado.value = data.estado;

        } catch (error) {
            console.log("Erro: " + error)
        }
});