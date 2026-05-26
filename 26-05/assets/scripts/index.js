const btn = document.getElementById("gerar-piada");
const jokeGeneral = document.getElementById("piada-geral");
const jokeChuck = document.getElementById("piada-chuck");

btn.addEventListener("click", async () => {
    try {
        // tente pegar os dados da api
        const responseChuck = await fetch("https://api.chucknorris.io/jokes/random");
        const responseJoke = await fetch("https://v2.jokeapi.dev/joke/Any");
        const dataChuck = await responseChuck.json(); // converte a resposta para um objeto javascript, assim nosso código pode ler
        const dataGeneral = await responseJoke.json();
        // insere a resposta formatada num elemento
        jokeChuck.textContent = `Chuck Norris: ${dataChuck.value}`;
        jokeGeneral.textContent = `${dataGeneral.setup} \n ${dataGeneral.delivery}`;
    } catch (error) { // se der erro, mostre a mensagem
        console.log("Erro: " + error);
    }
});