document.addEventListener("DOMContentLoaded", () => {
    const buttonGerar = document.getElementById("button");
    
    function calculatePoissonPMF(lambda, x) {
        const pmf = Math.pow(Math.E, -lambda) * Math.pow(lambda, x) / factorial(x);
        return pmf * 100;
    }
    
    function calculatePoissonCDF(lambda, x) {
        let cdf = 0;
        for (let i = 0; i <= x; i++) {
            cdf += Math.pow(Math.E, -lambda) * Math.pow(lambda, i) / factorial(i);
        }
        return cdf * 100;
    }    
    
    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }
    
    function createChart(chartId, label, data) {
        const ctx = document.getElementById(chartId).getContext("2d");
        return new Chart(ctx, {
            type: "bar",
            data: {
                labels: [""],
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: ["rgba(54, 162, 235, 0.5)"],
                    borderWidth: 1,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                    },
                },
            },
        });
    }

    buttonGerar.addEventListener("click", () => {
        const lambda = parseFloat(document.getElementById("lambda").value);
        const x = parseInt(document.getElementById("x").value);
        
        if (isNaN(lambda) || isNaN(x)) {
            alert("Por favor, insira valores válidos para λ e x.");
            return;
        }
        
        const pmfData = calculatePoissonPMF(lambda, x);
        const cdfData = calculatePoissonCDF(lambda, x);
        
        createChart("pmfChart", "Função de Massa de Probabilidade (PMF)", pmfData);
        createChart("cdfChart", "Função de Probabilidade Acumulada (CDF)", cdfData);

    });
});
