// script.js — inicializa AOS, crea gráfico radial (radar) para avance tecnológico
document.addEventListener("DOMContentLoaded", function() {
  // AOS
  if(window.AOS) AOS.init({ duration: 700, once: true });

  // Datos ilustrativos basados en prioridades del documento (IoT, IA/Robótica, 5G/Edge, Gemelo Digital, Sostenibilidad)
  // Los porcentajes representan el "nivel esperado de adopción / prioridad hacia 2030" (0-100)
  const techLabels = [
    'IoT (sensores)', 
    'IA / Robótica', 
    '5G / Edge', 
    'Gemelo digital', 
    'Sostenibilidad (energías limpias)'
  ];

  // Valores iniciales (puedes modificarlos)
  const techValues = [85, 90, 80, 82, 75];

  // Radar chart (Chart.js)
  const ctx = document.getElementById('techRadar').getContext('2d');

  const radarData = {
    labels: techLabels,
    datasets: [{
      label: 'Nivel esperado (0-100%)',
      data: techValues,
      fill: true,
      backgroundColor: 'rgba(20,152,107,0.12)',
      borderColor: '#14986b',
      pointBackgroundColor: '#0b6b3a',
      pointBorderColor: '#fff',
      pointHoverRadius: 6,
      tension: 0.2
    }]
  };

  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20, backdropColor: 'rgba(255,255,255,0.9)' },
        grid: { color: 'rgba(0,0,0,0.06)' },
        angleLines: { color: 'rgba(0,0,0,0.06)' }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    animation: { duration: 1000, easing: 'easeOutQuart' }
  };

  let techChart = new Chart(ctx, { type: 'radar', data: radarData, options: radarOptions });

  // Animar botones
  document.getElementById('btn-animar').addEventListener('click', function(){
    // animación: simular pequeño cambio y volver
    const newVals = techValues.map(v => Math.min(100, Math.round(v * (0.9 + Math.random()*0.2))));
    techChart.data.datasets[0].data = newVals;
    techChart.update();
  });

  // Descargar imagen del lienzo
  document.getElementById('btn-descargar').addEventListener('click', function(){
    const link = document.createElement('a');
    link.download = 'avance_tecnologico_2030.png';
    link.href = document.getElementById('techRadar').toDataURL('image/png', 1.0);
    link.click();
  });

  // Smooth scroll for nav links
  $('a.nav-link').on('click', function(e){
    const href = $(this).attr('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      const offset = $(href).offset().top - 70;
      $('html, body').animate({ scrollTop: offset }, 600);
    }
  });

  // Función para actualizar valores desde fuera (ej. obtener datos reales)
  window.updateTechValues = function(newValuesArray){
    if(!Array.isArray(newValuesArray) || newValuesArray.length !== techValues.length) {
      console.warn('updateTechValues: enviar array con ' + techValues.length + ' valores.');
      return;
    }
    techChart.data.datasets[0].data = newValuesArray;
    techChart.update();
  };
});
