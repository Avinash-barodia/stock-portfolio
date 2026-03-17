// Calculate Simple Moving Average
export const calculateSMA = (data, period) => {
  const smaData = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      continue; // Not enough data points
    }
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j].close;
    }
    smaData.push({ time: data[i].time, value: sum / period });
  }
  return smaData;
};

// Calculate Relative Strength Index (RSI)
export const calculateRSI = (data, period) => {
  const rsiData = [];
  let gains = 0;
  let losses = 0;

  for (let i = 1; i < data.length; i++) {
    const change = data[i].close - data[i - 1].close;
    if (i <= period) {
      if (change > 0) gains += change;
      else losses -= change;

      if (i === period) {
        let rs = gains / losses;
        let rsi = losses === 0 ? 100 : 100 - (100 / (1 + rs));
        rsiData.push({ time: data[i].time, value: rsi });
      }
    } else {
      const currentGain = change > 0 ? change : 0;
      const currentLoss = change < 0 ? -change : 0;

      gains = ((gains * (period - 1)) + currentGain) / period;
      losses = ((losses * (period - 1)) + currentLoss) / period;

      let rs = gains / losses;
      let rsi = losses === 0 ? 100 : 100 - (100 / (1 + rs));
      rsiData.push({ time: data[i].time, value: rsi });
    }
  }
  return rsiData;
};
