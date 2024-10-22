export function atualizarAnalise(fluxo, parametros) {
    console.log("atualizarAnalise chamado com:", fluxo, parametros);
    // ... resto do código
}
export function atualizarAnalise(fluxo, parametros) {
    const lucro_total = fluxo.reduce((sum, item) => sum + item['Saldo Mensal'], 0);
    const margem = (lucro_total / parametros.vgv) * 100;
    const exposicao_maxima = -Math.min(...fluxo.map(item => item['Saldo Acumulado']));
    
    const mes_payback = fluxo.findIndex(item => item['Saldo Acumulado'] > 0) + 1;
    const valor_payback = mes_payback ? fluxo[mes_payback - 1]['Saldo Acumulado'] : null;

    const metricas = document.getElementById('metricas');
    metricas.innerHTML = `
        <h3>Métricas do Projeto</h3>
        <p>VGV: ${formatarMoeda(parametros.vgv)}</p>
        <p>Custo de Construção: ${formatarMoeda(parametros.vgv * parametros.custo_construcao_percentual / 100)}</p>
        <p>Lucro Total: ${formatarMoeda(lucro_total)}</p>
        <p>Margem: ${margem.toFixed(2)}%</p>
        <p>Exposição Máxima de Caixa: ${
