export function atualizarAnalise(fluxo, parametros) {
    const lucro_total = fluxo.reduce((sum, item) => sum + item['Saldo Mensal'], 0);
    const margem = (lucro_total / parametros.vgv) * 100;
    const exposicao_maxima = -Math.min(...fluxo.map(item => item['Saldo Acumulado']));
    
    const mes_payback = fluxo.findIndex(item => item['Saldo Acumulado'] > 0) + 1;
