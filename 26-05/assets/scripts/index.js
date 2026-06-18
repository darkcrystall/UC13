const btn = document.getElementById("gerar-piada");
const jokeGeneral = document.getElementById("piada-geral");
const jokeChuck = document.getElementById("piada-chuck");
const erroPiada = document.getElementById("erro-piada");

btn.addEventListener("click", async () => {
    erroPiada.classList.add("is-hidden");
    btn.disabled = true;
    btn.textContent = "Gerando...";

    try {
        // dispara as duas requisições em paralelo
        const [responseChuck, responseJoke] = await Promise.all([
            fetch("https://api.chucknorris.io/jokes/random"),
            fetch("https://v2.jokeapi.dev/joke/Any"),
        ]);

        const dataChuck = await responseChuck.json();
        const dataGeneral = await responseJoke.json();

        jokeChuck.textContent = `${dataChuck.value}`;
        jokeGeneral.textContent =
            dataGeneral.type === "twopart"
                ? `${dataGeneral.setup}\n${dataGeneral.delivery}`
                : dataGeneral.joke;
    } catch (error) {
        erroPiada.classList.remove("is-hidden");
        console.log("Erro: " + error);
    } finally {
        btn.disabled = false;
        btn.textContent = "Gerar Piada";
    }
});