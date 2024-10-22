import { calcularFluxoAutoFinanciado } from './calculos.js';
import { mostrarGraficos } from './graficos.js';
import { atualizarAnalise } from './analise.js';

document.addEventListener('DOMContentLoaded', () => {
    const parametros = {
        vgv: 35,
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

    function atualizarFluxoCaixa() {
        const custoConstrucao = parametros.vgv * parametros.custoConstrucaoPercentual / 100;
        const fluxoCaixa = calcularFluxoAutoFinanciado(
            parametros.vgv,
            custoConstrucao,
            parametros.prazoMeses,
            parametros.percentualInicio,
            parametros.percentualMeio,
            parametros.percentualFim,
            parametros.percentualLancamento,
            parametros.percentualBaloes,
            parametros.percentualParcelas,
            parametros.prazoParcelas
        );

        mostrarGraficos(fluxoCaixa);
        atualizarTabelaFluxoCaixa(fluxoCaixa);
        atualizarAnalise(fluxoCaixa, parametros);
    }

    function atualizarTabelaFluxoCaixa(fluxoCaixa) {
        const tabela = document.getElementById('fluxoCaixaTable');
        tabela.innerHTML = `
            <tr>
                <th>Mês</th>
                <th>Receitas</th>
                <th>Custos</th>
                <th>Saldo Mensal</th>
                <th>Saldo Acumulado</th>
            </tr>
            ${fluxoCaixa.map(item => `
                <tr>
                    <td>${item.mes}</td>
                    <td>${item.receitas.toFixed(2)}</td>
                    <td>${item.custos.toFixed(2)}</td>
                    <td>${item.saldoMensal.toFixed(2)}</td>
                    <td>${item.saldoAcumulado.toFixed(2)}</td>
                </tr>
            `).join('')}
        `;
    }

    // Adicionar event listeners para os inputs
    document.getElementById('vgv').addEventListener('change', (e) => {
        parametros.vgv = parseFloat(e.target.value);
        atualizarFluxoCaixa();
    });

    document.getElementById('custoConstrucaoPercentual').addEventListener('change', (e) => {
        parametros.custoConstrucaoPercentual = parseFloat(e.target.value);
        atualizarFluxoCaixa();
    });

    document.getElementById('prazoMeses').addEventListener('change', (e) => {
        parametros.prazoMeses = parseInt(e.target.value);
        atualizarFluxoCaixa();
    });

    // Adicione mais event listeners para outros inputs

    // Inicialização
    atualizarFluxoCaixa();
});
