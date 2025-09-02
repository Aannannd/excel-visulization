import { Chart } from 'chart.js/auto';

export interface ChartConfig {
  type: string;
  data: any;
  options: any;
}

export class ChartService {
  static generateChartConfig(
    chartType: string,
    data: Record<string, any>[],
    xAxis: string,
    yAxis: string
  ): ChartConfig {
    const labels = data.map(row => row[xAxis]);
    const values = data.map(row => {
      const value = row[yAxis];
      return typeof value === 'number' ? value : parseFloat(value) || 0;
    });

    const baseColors = [
      'hsl(207, 90%, 54%)',
      'hsl(24, 70%, 56%)',
      'hsl(142, 76%, 47%)',
      'hsl(38, 92%, 50%)',
      'hsl(271, 76%, 53%)',
      'hsl(184, 77%, 34%)',
    ];

    const config: ChartConfig = {
      type: chartType,
      data: {
        labels,
        datasets: [{
          label: yAxis,
          data: values,
          borderColor: baseColors[0],
          backgroundColor: chartType === 'pie' || chartType === 'doughnut' 
            ? baseColors.slice(0, labels.length)
            : `${baseColors[0]}20`,
          tension: chartType === 'line' ? 0.4 : 0,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: `${yAxis} by ${xAxis}`,
          },
        },
        scales: chartType === 'pie' || chartType === 'doughnut' ? {} : {
          y: {
            beginAtZero: true,
            grid: {
              color: 'hsl(0, 0%, 90%)',
            },
          },
          x: {
            grid: {
              color: 'hsl(0, 0%, 90%)',
            },
          },
        },
      },
    };

    return config;
  }

  static downloadChart(canvas: HTMLCanvasElement, filename: string, format: 'png' | 'pdf' = 'png') {
    if (format === 'png') {
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
    // PDF download would require additional library like jsPDF
  }

  static getChartTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      line: 'fas fa-chart-line',
      bar: 'fas fa-chart-bar',
      pie: 'fas fa-chart-pie',
      scatter: 'fas fa-braille',
      doughnut: 'fas fa-chart-pie',
    };
    return icons[type] || 'fas fa-chart-bar';
  }
}
