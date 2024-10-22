let chart;

function inicializarGrafico() {
    const ctx = document.getElementById('fluxoCaixaChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Receitas',
                    data: [],
                    borderColor: 'green',
                    fill: false
                },
                {
                    label: 'Custos',
                    data: [],
                    borderColor: 'red',
                    fill: false
                },
                {
                    label: 'Saldo Acumulado',
                    data: [],
                    borderColor: 'blue',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Fluxo de Caixa do Empreendimento'
            }
        }
    });
}

function atualizarGrafico(dados) {
    chart.data.labels = dados.meses;
    chart.data.datasets[0].data = dados.receitas;
    chart.data.datasets[1].data = dados.custos;
    chart.data.datasets[2].data = dados.saldoAcumulado;
    chart.update();
}

function atualizarFluxoCaixa() {
    const params = {
        // Obter valores dos inputs
    };

    const fluxoCaixa = new FluxoCaixa(params);
    const dados = fluxoCaixa.calcular();

    atualizarGrafico(dados);
    atualizarMetricas(dados);
}

function atualizarMetricas(dados) {
    // Atualizar as métricas na página
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarGrafico();
    // Adicionar event listeners aos inputs
    document.getElementById('atualizarButton').addEventListener('click', atualizarFluxoCaixa);
});
