export function mostrarGraficos(fluxoCaixa) {
    const ctx = document.getElementById('fluxoCaixaChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: fluxoCaixa.map(item => item.mes),
            datasets: [
                {
                    label: 'Receitas',
                    data: fluxoCaixa.map(item => item.receitas),
                    borderColor: '#0068c9',
                    backgroundColor: 'rgba(0, 104, 201, 0.1)',
                    fill: true
                },
                {
                    label: 'Custos',
                    data: fluxoCaixa.map(item => item.custos),
                    borderColor: '#ff2b2b',
                    backgroundColor: 'rgba(255, 43, 43, 0.1)',
                    fill: true
                },
                {
                    label: 'Saldo Mensal',
                    data: fluxoCaixa.map(item => item.saldoMensal),
                    borderColor: '#29b09d',
                    fill: false
                },
                {
                    label: 'Saldo Acumulado',
                    data: fluxoCaixa.map(item => item.saldoAcumulado),
                    borderColor: '#ffabab',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Fluxo de Caixa do Projeto'
            },
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
                        text: 'Valor (milhões R$)'
                    }
                }
            }
        }
    });
}
