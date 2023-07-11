// Crea un pequeño juego que consista en adivinar palabras en un número máximo de intentos:
//   - El juego comienza proponiendo una palabra aleatoria incompleta
//   - Por ejemplo "m_ur_d_v", y el número de intentos que le quedan
//   - El usuario puede introducir únicamente una letra o una palabra (de la misma longitud que la palabra a adivinar)
//   - Si escribe una letra y acierta, se muestra esa letra en la palabra. Si falla, se resta uno al número de intentos
//   - Si escribe una resolución y acierta, finaliza el juego, en caso contrario, se resta uno al número de intentos
//   - Si el contador de intentos llega a 0, el jugador pierde
//   - La palabra debe ocultar de forma aleatoria letras, y nunca puede comenzar
//   ocultando más del 60%
//   - Puedes utilizar las palabras que quieras y el número de intentos que consideres

const words = ["perro", "cazar", "recomendar", "estado", "telefono", "futbol"];

function hangman(list_of_words) {
    var selected_word =
        list_of_words[Math.floor(Math.random() * list_of_words.length)];
    let hidden_letters = Math.floor(selected_word.length * 0.6);
    var hidden_positions = [];
    var hidden_word = "";

    while (hidden_positions.length < hidden_letters) {
        let random_index = Math.floor(Math.random() * selected_word.length);
        hidden_positions.push(random_index);
    }

    for (let i = 0; i < selected_word.length; i++) {
        hidden_word =
            hidden_positions.indexOf(i) !== -1
                ? (hidden_word += "_")
                : (hidden_word += selected_word[i]);
    }
    // return hidden_word;

    let attempts = 3;
    let attemps_total = attempts;
    let letras_usadas = [];
    let input = prompt(
        "Adivina la palabra: \n" +
            hidden_word +
            "\n\nTienes " +
            attempts +
            " vidas...\n\nIntroduce una letra o la solucion completa: "
    );
    while (attempts > 0) {
        if (input.length === 1) {
            letras_usadas.push(input);
            let new_hidden_word = "";
            let success = false;
            for (let index = 0; index < hidden_word.length; index++) {
                if (
                    input === selected_word[index] &&
                    hidden_word[index] === "_"
                ) {
                    new_hidden_word += input;
                    success = true;
                } else {
                    new_hidden_word += hidden_word[index];
                }
            }
            hidden_word = new_hidden_word;
            if (success) {
                if (selected_word === hidden_word) {
                    alert(
                        "¡Has acertado! La palabra oculta era: " +
                            selected_word.toUpperCase() +
                            "\n\nHas gastado " +
                            (attemps_total - attempts) +
                            " vidas"
                    );
                } else {
                    input = prompt(
                        "¡Has acertado la letra!\n" +
                            input.toUpperCase() +
                            "\n\nSigue adivinando. La palabra es:\n" +
                            hidden_word +
                            "\n\nTienes " +
                            attempts +
                            " vidas" +
                            "\n\nY estas son las letras que has usado: " +
                            letras_usadas
                    );
                }
            } else {
                attempts--;
                input = prompt(
                    "Letra no encontrada o ya visible.\n" +
                        input.toUpperCase() +
                        "\n\nSigue adivinando. La palabra es:\n" +
                        hidden_word +
                        "\n\nTienes " +
                        attempts +
                        " vidas" +
                        "\n\nY estas son las letras que has usado: " +
                        letras_usadas
                );
            }
        } else if (input.length === selected_word.length) {
            if (input === selected_word) {
                prompt(
                    "Ganaste! la palabra era: " +
                        selected_word.toUpperCase() +
                        "\n\n Has gastado " +
                        (attemps_total - attempts) +
                        " vidas"
                );
            } else {
                attempts--;
                input = prompt(
                    "Palabra incorrecta. Vuelve a intentarlo: " +
                        hidden_word +
                        "\n\nTienes " +
                        attempts +
                        " vidas" +
                        "\n\nY estas son las letras que has usado: " +
                        letras_usadas
                );
            }
        } else {
            input = prompt(
                "Texto invalido. Vuelve a intentarlo: " +
                    hidden_word +
                    "\n\nTienes " +
                    attempts +
                    " vidas" +
                    "\n\nY estas son las letras que has usado: " +
                    letras_usadas
            );
        }
    }
    if (attempts === 0) {
        alert("Has perdido. La palabra oculta era " + selected_word);
    }
}

hangman(words);
