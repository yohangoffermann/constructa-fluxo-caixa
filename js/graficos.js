export function mostrarGraficos(fluxoCaixa) {
    const ctx = document.getElementById('fluxoCaixaChart').getContext('2d');
    
    // Definir cores personalizadas
    const cores = {
        receitas: 'rgba(75, 192, 192, 0.7)',
        custos: 'rgba(255, 99, 132, 0.7)',
        saldoMensal: 'rgba(54, 162, 235, 0.7)',
        saldoAcumulado: 'rgba(255, 206, 86, 0.7)'
    };

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: fluxoCaixa.map(item => `Mês ${item.mes}`),
            datasets: [
                {
                    label: 'Receitas',
                    data: fluxoCaixa.map(item => item.receitas),
                    borderColor: cores.receitas,
                    backgroundColor: cores.receitas.replace('0.7', '0.1'),
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Custos',
                    data: fluxoCaixa.map(item => item.custos),
                    borderColor: cores.custos,
                    backgroundColor: cores.custos.replace('0.7', '0.1'),
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Saldo Mensal',
                    data: fluxoCaixa.map(item => item.saldoMensal),
                    borderColor: cores.saldoMensal,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Saldo Acumulado',
                    data: fluxoCaixa.map(item => item.saldoAcumulado),
                    borderColor: cores.saldoAcumulado,
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Fluxo de Caixa do Projeto',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
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
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Mês',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor (R$)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
                        }
                    }
                }
            }
        }
    });
}
