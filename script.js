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

// Parâmetros do projeto
const params = {
    vgv: 35.0,
    custoConstrucaoPercentual: 70,
    prazoMeses: 48,
    percentualInicio: 30,
    percentualMeio: 40,
    percentualFim: 30,
    percentualLancamento: 20,
    percentualBaloes: 30,
    percentualParcelas: 50,
    prazoParcelas: 48
};

// Calcular o fluxo de caixa
const fluxo = calcularFluxoAutoFinanciado(
    params.vgv, params.custoConstrucaoPercentual, params.prazoMeses,
    params.percentualInicio, params.percentualMeio, params.percentualFim,
    params.percentualLancamento, params.percentualBaloes, params.percentualParcelas,
    params.prazoParcelas
);

// Especificação do gráfico Vega-Lite
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

// Renderizar o gráfico
vegaEmbed('#vis', spec);

// Calcular e exibir métricas
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
