// Função para calcular o fluxo de caixa
function calcularFluxoAutoFinanciado(vgv, custoConstrucaoPercentual, prazoMeses, 
                                     percentualInicio, percentualMeio, percentualFim,
                                     percentualLancamento, percentualBaloes, percentualParcelas,
                                     prazoParcelas) {
    let fluxo = [];
    let custosConstrucao = vgv * custoConstrucaoPercentual / 100;
    let tercioObra = Math.floor(prazoMeses / 3);

    for (let mes = 0; mes < prazoMeses; mes++) {
        let receitas = 0;
        let custos = 0;

        // Cálculo dos custos
        if (mes < tercioObra) {
            custos = custosConstrucao * percentualInicio / 100 / tercioObra;
        } else if (mes < 2 * tercioObra) {
            custos = custosConstrucao * percentualMeio / 100 / tercioObra;
        } else {
            custos = custosConstrucao * percentualFim / 100 / (prazoMeses - 2 * tercioObra);
        }

        // Cálculo das receitas
        if (mes === 0) {
            receitas += vgv * percentualLancamento / 100;
        }

        // Balões
        if (mes === Math.floor(prazoMeses / 4) || mes === Math.floor(prazoMeses / 2) || mes === Math.floor(3 * prazoMeses / 4)) {
            receitas += vgv * percentualBaloes / 300;
        }

        // Parcelas
        if (mes < prazoParcelas) {
            receitas += vgv * percentualParcelas / 100 / prazoParcelas;
        }

        fluxo.push({
            mes: mes + 1,
            receitas: receitas,
            custos: custos,
            saldoMensal: receitas - custos,
            saldoAcumulado: (fluxo[mes-1] ? fluxo[mes-1].saldoAcumulado : 0) + receitas - custos
        });
    }

    return fluxo;
}

// Função para atualizar o fluxo de caixa
function atualizarFluxoCaixa() {
    const params = {
        vgv: parseFloat(document.getElementById('vgv').value),
        custoConstrucaoPercentual: parseInt(document.getElementById('custoConstrucaoPercentual').value),
        prazoMeses: parseInt(document.getElementById('prazoMeses').value),
        percentualInicio: parseInt(document.getElementById('percentualInicio').value),
        percentualMeio: parseInt(document.getElementById('percentualMeio').value),
        percentualFim: parseInt(document.getElementById('percentualFim').value),
        percentualLancamento: parseInt(document.getElementById('percentualLancamento').value),
        percentualBaloes: parseInt(document.getElementById('percentualBaloes').value),
        percentualParcelas: parseInt(document.getElementById('percentualParcelas').value),
        prazoParcelas: parseInt(document.getElementById('prazoParcelas').value)
    };

    const fluxo = calcularFluxoAutoFinanciado(
        params.vgv, params.custoConstrucaoPercentual, params.prazoMeses,
        params.percentualInicio, params.percentualMeio, params.percentualFim,
        params.percentualLancamento, params.percentualBaloes, params.percentualParcelas,
        params.prazoParcelas
    );

    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "Fluxo de Caixa do Empreendimento",
        "width": "container",
        "height": 400,
        "data": { "values": fluxo },
        "layer": [
            {
                "mark": {"type": "area", "opacity": 0.7, "color": "#0068C9"},
                "encoding": {
                    "x": {"field": "mes", "type": "quantitative", "title": "Mês"},
                    "y": {"field": "receitas", "type": "quantitative", "title": "Valor (R$)"}
                }
            },
            {
                "mark": {"type": "area", "opacity": 0.7, "color": "#FF8700"},
                "encoding": {
                    "x": {"field": "mes", "type": "quantitative"},
                    "y": {"field": "custos", "type": "quantitative"}
                }
            },
            {
                "mark": {"type": "line", "color": "#29B09D"},
                "encoding": {
                    "x": {"field": "mes", "type": "quantitative"},
                    "y": {"field": "saldoAcumulado", "type": "quantitative"}
                }
            }
        ]
    };

    vegaEmbed('#vis', spec);

    const lucroTotal = fluxo[fluxo.length - 1].saldoAcumulado;
    const margem = (lucroTotal / params.vgv) * 100;
    const exposicaoMaxima = -Math.min(...fluxo.map(f => f.saldoAcumulado));
    const mesPayback = fluxo.findIndex(f => f.saldoAcumulado > 0) + 1;

    document.getElementById('metricas').innerHTML = `
        <div class="metrica">
            <h3>VGV</h3>
            <p>R$ ${params.vgv.toFixed(2)} milhões</p>
        </div>
        <div class="metrica">
            <h3>Custo de Construção</h3>
            <p>R$ ${(params.vgv * params.custoConstrucaoPercentual / 100).toFixed(2)} milhões</p>
        </div>
        <div class="metrica">
            <h3>Lucro Total</h3>
            <p>R$ ${lucroTotal.toFixed(2)} milhões</p>
        </div>
        <div class="metrica">
            <h3>Margem</h3>
            <p>${margem.toFixed(2)}%</p>
        </div>
        <div class="metrica">
            <h3>Exposição Máxima de Caixa</h3>
            <p>R$ ${exposicaoMaxima.toFixed(2)} milhões</p>
        </div>
        <div class="metrica">
            <h3>Mês de Payback</h3>
            <p>${mesPayback}</p>
        </div>
    `;
}

// Função para atualizar os valores exibidos dos sliders
function atualizarValoresSliders() {
    document.getElementById('custoConstrucaoPercentualValue').textContent = document.getElementById('custoConstrucaoPercentual').value + '%';
    document.getElementById('percentualInicioValue').textContent = document.getElementById('percentualInicio').value + '%';
    document.getElementById('percentualMeioValue').textContent = document.getElementById('percentualMeio').value + '%';
    document.getElementById('percentualFimValue').textContent = document.getElementById('percentualFim').value + '%';
    document.getElementById('percentualLancamentoValue').textContent = document.getElementById('percentualLancamento').value + '%';
    document.getElementById('percentualBaloesValue').textContent = document.getElementById('percentualBaloes').value + '%';
    document.getElementById('percentualParcelasValue').textContent = document.getElementById('percentualParcelas').value + '%';
}

// Adicionar event listeners para atualizar os valores dos sliders em tempo real
document.getElementById('custoConstrucaoPercentual').addEventListener('input', atualizarValoresSliders);
document.getElementById('percentualInicio').addEventListener('input', atualizarValoresSliders);
document.getElementById('percentualMeio').addEventListener('input', atualizarValoresSliders);
document.getElementById('percentualFim').addEventListener('input', atualizarValoresSliders);
document.getElementById('percentualLancamento').addEventListener('input', atualizarValoresSliders);
document.getElementById('percentualBaloes').addEventListener('input', atualizarValoresSliders);
document.getElementById('percentualParcelas').addEventListener('input', atualizarValoresSliders);

// Inicializar o fluxo de caixa
atualizarFluxoCaixa();
