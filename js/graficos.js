export function atualizarAnalise(fluxoCaixa, parametros) {
    console.log("atualizarAnalise chamado com:", fluxoCaixa, parametros);
    const lucroTotal = fluxoCaixa.reduce((sum, item) => sum + item.saldoMensal, 0);
    const margem = (lucroTotal / parametros.vgv) * 100;
    const exposicaoMaxima = Math.min(...fluxoCaixa.map(item => item.saldoAcumulado));
    
    const mesPagamento = fluxoCaixa.findIndex(item => item.saldoAcumulado > 0) + 1;
    const valorPayback = mesPagamento ? fluxoCaixa[mesPagamento - 1].saldoAcumulado : null;

    const metricas = document.getElementById('metricas');
    metricas.innerHTML = `
        <h3>Métricas do Projeto</h3>
        <p>VGV: R$ ${parametros.vgv.toFixed(2)} milhões</p>
        <p>Custo
