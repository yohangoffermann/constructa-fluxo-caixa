function atualizarAnalise(fluxo, parametros) {
    const lucro_total = fluxo.reduce((sum, item) => sum + item['Saldo Mensal'], 0);
    const margem = (lucro_total / parametros.vgv) * 100;
    const exposicao_maxima = -Math.min(...fluxo.map(item => item['Saldo Acumulado']));
    
    const mes_payback = fluxo.findIndex(item => item['Saldo Acumulado'] > 0) + 1;
    const valor_payback = mes_payback ? fluxo[mes_payback - 1]['Saldo Acumulado'] : null;

    const metricas = document.getElementById('metricas');
    metricas.innerHTML = `
        <h3
