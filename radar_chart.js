const dscc = require('@google/dscc');

const drawChart = (data) => {
  const ctx = document.getElementById('radarChart') || document.createElement('canvas');
  ctx.id = 'radarChart';
  ctx.width = 600;
  ctx.height = 600;

  if (!document.getElementById('radarChart')) {
    document.body.appendChild(ctx);
  }

  const labels = data.tables.DEFAULT.map(row => row.dimensions[0]);
  const datasets = [];

  const metricCount = data.fields.metricIds.length;

  for (let i = 0; i < metricCount; i++) {
    const metricLabel = data.fields.metrics[i].name;
    const metricData = data.tables.DEFAULT.map(row => row.metrics[i]);

    datasets.push({
      label: metricLabel,
      data: metricData,
      fill: true,
      backgroundColor: `rgba(${100 + i * 50}, ${150 + i * 20}, 255, 0.2)`,
      borderColor: `rgba(${100 + i * 50}, ${150 + i * 20}, 255, 1)`,
      pointBackgroundColor: '#fff'
    });
  }

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Radar Chart'
        }
      }
    }
  });
};

dscc.subscribeToData(drawChart, { transform: dscc.objectTransform });
