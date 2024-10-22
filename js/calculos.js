export function calcularFluxoAutoFinanciado(vgv, custoConstrucao, prazoMeses, 
                                            percentualInicio, percentualMeio, percentualFim,
                                            percentualLancamento, percentualBaloes, percentualParcelas,
                                            prazoParcelas) {
    const fluxo = [];
    
    const custos = new Array(prazoMeses).fill(0);
    const tercioObra = Math.floor(prazoMeses / 3);
    for (let i = 0; i < tercioObra; i++) {
        custos[i] = custoConstrucao * percentualInicio / 100 / tercioObra;
    }
    for (let i = tercioObra; i < 2 * tercioObra; i++) {
        custos[i] = custoConstrucao * percentualMeio / 100 / tercioObra;
    }
    for (let i = 2 * tercioObra; i < prazoMeses; i++) {
        custos[i] = custoConstrucao * percentualFim / 100 / (prazoMeses - 2 * tercioObra);
    }
    
    const receitas = new Array(prazoMeses).fill(0);
    receitas[0] += vgv * percentualLancamento / 100;
    
    const valorBaloes = vgv * percentualBaloes / 100;
    const numBaloes = 3;
    for (let i = 1; i <= numBaloes; i++) {
        const mesBalao = Math.floor(i * prazoMeses / (numBaloes + 1));
        receitas[mesBalao] += valorBaloes / numBaloes;
    }
    
    const valorParcelas = vgv * percentualParcelas / 100;
    const parcelaMensal = valorParcelas / Math.min(prazoParcelas, prazoMeses);
    for (let i = 0; i < Math.min(prazoParcelas, prazoMeses); i++) {
        receitas[i] += parcelaMensal;
    }
    
    let saldoAcumulado = 0;
    for (let mes = 0; mes < prazoMeses; mes++) {
        const saldoMensal = receitas[mes] - custos[mes];
        saldoAcumulado += saldoMensal;
        fluxo.push({
            mes: mes + 1,
            receitas: receitas[mes],
            custos: custos[mes],
            saldoMensal: saldoMensal,
            saldoAcumulado: saldoAcumulado
        });
    }
    
    return fluxo;
}
