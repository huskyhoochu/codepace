export function generateHorizontalActivityChart(
  data: number[],
  width: number,
  height: number,
  elapsedMinutes: number,
): string {
  const maxValue = Math.max(...data, 1);
  const chart: string[][] = Array(height)
    .fill(0)
    .map(() => Array(width).fill(' '));

  for (let x = 0; x < Math.min(data.length, width); x++) {
    const normalizedValue = Math.floor((data[x] / maxValue) * (height - 1));
    for (let y = 0; y < normalizedValue; y++) {
      chart[height - 1 - y][x] = '█';
    }
  }

  const yAxis = Array(height)
    .fill(0)
    .map((_, i) =>
      ((maxValue * (height - 1 - i)) / (height - 1))
        .toFixed(0)
        .padStart(3, ' '),
    );

  const xAxis = generateXAxis(width, elapsedMinutes);

  const chartRows = chart
    .map((row, i) => `${yAxis[i]} |${row.join('')}`)
    .join('\n');
  return `${chartRows}\n    ${'-'.repeat(width)}\n${xAxis}`;
}

function generateXAxis(width: number, elapsedMinutes: number): string {
  const xAxis = Array(width + 4).fill(' ');
  const interval = Math.max(1, Math.floor(width / 6)); // 최대 6개의 시간 표시

  for (let i = 0; i <= width; i += interval) {
    const minutes = Math.floor((i * elapsedMinutes) / width);
    const time = formatTime(minutes);
    xAxis[i + 4] = '|';
    for (let j = 0; j < time.length && i + j + 4 < xAxis.length; j++) {
      xAxis[i + j + 4] = time[j];
    }
  }

  return xAxis.join('');
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h${mins.toString().padStart(2, '0')}m`;
  } else {
    return `${mins}m`;
  }
}
