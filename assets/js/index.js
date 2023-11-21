const inputButton = document.querySelector("#inputButton");
let values = [];
let chartArray = [];

inputButton.addEventListener("click", () => {
    const probability = document.querySelector("#probability").value;
    const attempsNumber = document.querySelector("#attempsNumber").value;
    const sucessNumber = document.querySelector("#sucessNumber").value;

    if (probability && attempsNumber && sucessNumber) {
        values = [probability, attempsNumber, sucessNumber];

        destroyChartsBeforeCreate();
        calculateDistribution(probability, attempsNumber, sucessNumber);

        document.querySelector("#probability").value = '';
        document.querySelector("#attempsNumber").value = '';
        document.querySelector("#sucessNumber").value = '';
    }

});

function calculateDistribution(p, n, x) {
    const vectorX = [];
    const vectorXAcumulated = [];
    let sum = 0;

    for (let i = 0; i <= n; i++) {
        //Distribuição normal
        let coefBinomial = binomialCoefficient(n, i);
        let probab = coefBinomial * Math.pow(p, i) * Math.pow(1 - p, n - i);
        vectorX.push(probab);
        //Acumulada
        sum += probab;
        vectorXAcumulated.push(sum);
    }

    const valuesId = document.querySelector("#valuesId");
    const tilteInfo = document.createElement("h3");
    const info1 = document.createElement("p");
    const info2 = document.createElement("p");
    const info3 = document.createElement("p");




    valuesId.innerHTML = `Probabilidade de sucesso: ${p} <br> Número de tentativas: ${n} <br> Chance de obter ${x} sucessos: ${vectorX[values[2]].toFixed(5)}`;

    plotGraph(vectorX, "Gráfico da distribuição binomial", "pmfChart");
    plotGraph(vectorXAcumulated, "Gráfico da distribuição binomial acumulada", "cdfChart");
    console.log(vectorX);
    console.log(vectorXAcumulated);
}

// Função para calcular o coeficiente binomial
function binomialCoefficient(n, k) {
    bin = (factorial(n)) / ((factorial(k)) * (factorial(n - k)));
    return bin;
}

// Função de fatorial, apenas para não confundir muito a função de cima
function factorial(num) {
    if (num == 1 || num == 0) return 1;
    return num * factorial(num - 1);
}


function plotGraph(xValues, title, id) {
    const ctx = document.getElementById(id).getContext('2d');


    chartArray.push(new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: xValues.length }, (_, i) => i),
            datasets: [{
                label: title,
                data: xValues,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 0.5)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        stepSize: 1, // Configura o espaçamento entre os rótulos no eixo x para 1
                        precision: 0, // Configura a precisão dos rótulos para 0 (sem casas decimais)
                    }
                },
                y: {
                    min: 0,
                    max: 1
                }
            }
        }
    }));
}

function destroyChartsBeforeCreate() {
    if (chartArray.length > 0) {
        chartArray.forEach(element => {
            element.destroy()
        });
    }

}