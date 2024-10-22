console.log("graficos.js carregado");

export function mostrarGraficos(fluxoCaixa) {
    console.log("mostrarGraficos chamado com:", fluxoCaixa);
    const canvas = document.getElementById('fluxoCaixaChart');
    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }
    const ctx = canvas.getContext('2d');
    
    // Destruir o gráfico existente, se houver
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    try {
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: fluxoCaixa.map(item => `Mês ${item.mes}`),
                datasets: [
                    {
                        label: 'Receitas',
                        data: fluxoCaixa.map(item => item.receitas),
                        borderColor: 'rgba(0, 104, 201, 0.7)',
                        backgroundColor: 'rgba(0, 104, 201, 0.1)',
                        fill: true
                    },
                    {
                        label: 'Custos',
                        data: fluxoCaixa.map(item => item.custos),
                        borderColor: 'rgba(255, 43, 43, 0.7)',
                        backgroundColor: 'rgba(255, 43, 43, 0.1)',
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        console.log("Gráfico criado com sucesso");
    } catch (error) {
        console.error("Erro ao criar o gráfico:", error);
    }
}
