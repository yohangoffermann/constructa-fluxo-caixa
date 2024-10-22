export function atualizarAnalise(fluxoCaixa, parametros) {
    const lucroTotal = fluxoCaixa.reduce((sum, item) => sum + item.saldoMensal, 0);
    const margem = (lucroTotal / parametros.vgv) * 100;
    const exposicaoMaxima = Math.min(...fluxoCaixa.map(item => item.saldoAcumulado));
    
    const mesPagamento = fluxoCaixa.findIndex(item => item.saldoAcumulado > 0) + 1;
    const valorPayback = mesPagamento ? fluxoCaixa[mesPagamento - 1].saldoAcumulado : null;

    const metricas = document.getElementById('metricas');
    metricas.innerHTML = `
        <h3>Métricas do Projeto</h3>
        <p>VGV: R$ ${parametros.vgv.toFixed(2)} milhões</p>
        <p>Custo de Construção: R$ ${(parametros.vgv * parametros.custoConstrucaoPercentual / 100).toFixed(2)} milhões</p>
        <p>Lucro Total: R$ ${lucroTotal.toFixed(2)} milhões</p>
        <p>Margem: ${margem.toFixed(2)}%</p>
        <p>Exposição Máxima de Caixa: R$ ${Math.abs(exposicaoMaxima).toFixed(2)} milhões</p>
        <p>Mês de Payback: ${mesPagamento || 'Não atingido'} ${mesPagamento ? `(R$ ${valorPayback.toFixed(2)} milhões)` : ''}</p>
    `;

    const analiseDetalhada = document.getElementById('analiseDetalhada');
    analiseDetalhada.innerHTML = `
        <h3>Análise Detalhada</h3>
        <p>No modelo auto financiado:</p>
        <ul>
            <li>O incorporador recebe R$ ${(parametros.vgv * parametros.percentualLancamento / 100).toFixed(2)} milhões no lançamento.</li>
            <li>R$ ${(parametros.vgv * parametros.percentualBaloes / 100).toFixed(2)} milhões são recebidos em 3 balões ao longo do projeto.</li>
            <li>R$ ${(parametros.vgv * parametros.percentualParcelas / 100).toFixed(2)} milhões são recebidos em ${parametros.prazoParcelas} parcelas mensais.</li>
            <li>Os custos de construção são distribuídos da seguinte forma:
                <ul>
                    <li>${parametros.percentualInicio}% no início da obra</li>
                    <li>${parametros.percentualMeio}% no meio da obra</li>
                    <li>${parametros.percentualFim}% no final da obra</li>
                </ul>
            </li>
            <li>A exposição máxima de caixa é de R$ ${Math.abs(exposicaoMaxima).toFixed(2)} milhões, o que representa o momento de maior necessidade de capital no projeto.</li>
            <li>O projeto atinge o ponto de equilíbrio (payback) no mês ${mesPagamento || 'não atingido'}${mesPagamento ? `, com um saldo positivo de R$ ${valorPayback.toFixed(2)} milhões` : ''}.</li>
            <li>A margem final do projeto é de ${margem.toFixed(2)}%.</li>
        </ul>
    `;
}
