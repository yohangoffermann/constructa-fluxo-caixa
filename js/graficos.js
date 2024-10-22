console.log("graficos.js carregado");

export function mostrarGraficos(fluxoCaixa) {
    console.log("mostrarGraficos chamado com:", fluxoCaixa);
    const ctx = document.getElementById('fluxoCaixaChart').getContext('2d');
    
    new Chart(ctx, {
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
                },
                {
                    label: 'Saldo Mensal',
                    data: fluxoCaixa.map(item => item.saldoMensal),
                    borderColor: 'rgba(41, 176, 157, 0.7)',
                    fill: false
                },
                {
                    label: 'Saldo Acumulado',
                    data: fluxoCaixa.map(item => item.saldoAcumulado),
                    borderColor: 'rgba(255, 171, 171, 0.7)',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Mês'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor (R$)'
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}
