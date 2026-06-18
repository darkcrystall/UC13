const cep = document.getElementById("cep");
const logradouro = document.getElementById("logradouro");
const complemento = document.getElementById("complemento");
const bairro = document.getElementById("bairro");
const localidade = document.getElementById("localidade");
const estado = document.getElementById("estado");

const error = document.getElementById("error");
const loading = document.getElementById("loading");

cep.addEventListener("change", async (event) => {
    const campoCep = event.target.value;
    const cepLimpo = campoCep.replace("-", "");
    cep.value = cepLimpo;

    error.classList.add("is-hidden");
    loading.classList.remove("is-hidden");

    try {
        const srcApi = `https://viacep.com.br/ws/${cepLimpo}/json/`;
        const response = await fetch(srcApi);
        const data = await response.json();

        if (data.erro) throw new Error("CEP não encontrado");

        logradouro.value = data.logradouro ?? "";
        complemento.value = data.complemento ?? "";
        bairro.value = data.bairro ?? "";
        localidade.value = data.localidade ?? "";
        estado.value = data.estado ?? "";
    } catch (err) {
        error.classList.remove("is-hidden");
        console.log("Erro: " + err);
    } finally {
        loading.classList.add("is-hidden");
    }
});