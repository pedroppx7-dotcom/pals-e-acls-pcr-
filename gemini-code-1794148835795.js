// 1. Registrar Service Worker (PWA Offline)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('PWA Offline pronto!'))
      .catch((err) => console.error('Erro no SW:', err));
  });
}

// 2. Wake Lock: Manter a tela sempre acesa durante a PCR
let wakeLock = null;
async function ativarTelaSempreAcesa() {
  if ('wakeLock' in navigator) {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Tela bloqueada para não apagar durante a RCP.');
    } catch (err) {
      console.warn('Wake Lock não pôde ser ativado:', err);
    }
  }
}

// Reativa se o usuário minimizar e voltar para o app
document.addEventListener('visibilitychange', () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    ativarTelaSempreAcesa();
  }
});

// Chame ativarTelaSempreAcesa() junto com o botão de "Iniciar PCR / Metrônomo"