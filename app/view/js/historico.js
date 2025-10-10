let partidas = [
                    {
                        "dimensoes": "8 × 8",
                        "modo": "Clássico",
                        "tempo": "Não se aplica",
                        "movimentos": 43,
                        "resultado": "Vitória",
                        "data": "2025-08-22",
                        "hora": "14:03"
                    },
                    {
                        "dimensoes": "4 × 4",
                        "modo": "Contra o tempo",
                        "tempo": "18min 15s",
                        "movimentos": 12,
                        "resultado": "Derrota",
                        "data": "2025-08-21",
                        "hora": "21:10"
                    },
                    {
                        "dimensoes": "2 × 2",
                        "modo": "Contra o tempo",
                        "tempo": "2min",
                        "movimentos": 3,
                        "resultado": "Vitória",
                        "data": "2025-08-20",
                        "hora": "19:24"
                    },
                    {
                        "dimensoes": "2 × 2",
                        "modo": "Clássico",
                        "tempo": "Não se aplica",
                        "movimentos": 3,
                        "resultado": "Vitória",
                        "data": "2025-08-20",
                        "hora": "19:20"
                    },
                    {
                        "dimensoes": "2 × 2",
                        "modo": "Contra o tempo",
                        "tempo": "4min",
                        "movimentos": 3,
                        "resultado": "Vitória",
                        "data": "2025-08-20",
                        "hora": "19:13"
                    },
                    {
                        "dimensoes": "8 × 8",
                        "modo": "Clássico",
                        "tempo": "Não se aplica",
                        "movimentos": 45,
                        "resultado": "Vitória",
                        "data": "2025-08-20",
                        "hora": "18:30"
                    }
                ];

let tbody = document.querySelector('tbody');

let partida;
for (let i = 0; i < partidas.length; i++) {
    let partida = partidas[i];

    let linha = document.createElement("tr");

    let informacoes = ["dimensoes", "modo", "tempo", "movimentos", "resultado", "data", "hora"];

    for (let propriedade of informacoes) {
        let celula = document.createElement("td");

        if ((propriedade === "tempo" || propriedade === "data" || propriedade === "hora") && partida["modo"] === "Contra o tempo") {
            let tagTime = document.createElement("time");
            tagTime.textContent = partida[propriedade];
            celula.appendChild(tagTime);
        }else{
            celula.textContent = partida[propriedade];
        }
        
        linha.appendChild(celula);
    }

    tbody.appendChild(linha);
}
