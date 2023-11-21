document.addEventListener("DOMContentLoaded", () => {
    const reportDiv = document.querySelector("#report");
    const probabilityInput = document.querySelector("#probability");
    const attempsNumberInput = document.querySelector("#attempsNumber");
    const sucessNumberInput = document.querySelector("#sucessNumber");
    const generateButton = document.querySelector("#generateButton");

    let arrayData = [];
    let arrayChart = [];

    generateButton.addEventListener("click", () => {
        const probability = probabilityInput.value;
        const attempsNumber = attempsNumberInput.value;
        const sucessNumber = sucessNumberInput.value;

        if (probability && attempsNumber && sucessNumber) {
            if (probability >= 0 && probability <= 1 && sucessNumber <= attempsNumber) {

                arrayData = [probability, attempsNumber, sucessNumber];

                destroyChartsBeforeCreate();

                calculateDistribution(probability, attempsNumber, sucessNumber);

                probability.value = "";
                attempsNumber.value = "";
                sucessNumber.value = "";
            }
        }
    });

    function calculateDistribution(prob, num, sucess) {
        const arrayX = [];
        const arrayXAcumulator = [];
        let sum = 0;

        const factory = (value) => {
            if (value == 1 || value == 0) return 1;
            return value * factory(value -1);
        };

        const calculateDistributionCoeficient = (n, k) => {
            let bin = (factory(n)) / ((factory(k)) * (factory(n - k)))
            return bin;
        }

        for (let i = 0; i <= num; i ++) {
            const coeficiBinomil = calculateDistributionCoeficient(num, i);
            let probCase = coeficiBinomil * Math.pow(prob, i) * Math.pow(1 - prob, num - i);
            arrayX.push(probCase);

            sum += probCase;
            arrayXAcumulator.push(sum);
        }

        const tilteInfo = document.createElement("h3");
        const info1 = document.createElement("p");
        const info2 = document.createElement("p");
        const info3 = document.createElement("p");

        tilteInfo.textContent = "Relátorio";
        info1.textContent = `Probabilidade de sucesso: ${prob}`;
        info2.textContent = `Número de tentativas: ${num}`;
        info3.textContent = `Chance de obter ${sucess} sucessos: ${arrayX[arrayData[2]].toFixed(5)}`

        reportDiv.replaceChildren();

        reportDiv.appendChild(tilteInfo);
        reportDiv.appendChild(info1);
        reportDiv.appendChild(info2);
        reportDiv.appendChild(info3);

        plotGraph(arrayX, num, "Gráfico da distribuição binomial", "pmfChart");
        plotGraph(arrayXAcumulator, num, "Gráfico da distribuição binomial acumulada", "cdfChart");
        console.log(arrayX);
        console.log(arrayXAcumulator);
    }

    function plotGraph(xValues, num, title, id) {
        const ctx = document.getElementById(id).getContext('2d');
    
        arrayChart.push(new Chart(ctx, {
            type: "bar",
            data: {
                labels: Array.from({ length: num +1 }, (_, i) => i),
                datasets: [
                    {
                        label: title,
                        data: xValues,
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 0.5)",
                        borderWidth: 1
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        ticks: {
                            stepSize: 1,
                            precision: 0,
                        }
                    },
                    y: {
                        beginAtZero: true,
                    }
                }
            }
        }));
    }

    function destroyChartsBeforeCreate() {
        if (arrayChart.length > 0) {
            arrayChart.forEach(element => {
                element.destroy()
            });
        }
    }
});