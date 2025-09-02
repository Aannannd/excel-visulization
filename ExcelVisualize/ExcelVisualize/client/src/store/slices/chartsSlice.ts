import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chart } from '@shared/schema';

interface ChartsState {
  charts: Chart[];
  currentChart: Chart | null;
  chartType: string;
  is3D: boolean;
  isGenerating: boolean;
}

const initialState: ChartsState = {
  charts: [],
  currentChart: null,
  chartType: 'line',
  is3D: false,
  isGenerating: false,
};

const chartsSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    setCharts: (state, action: PayloadAction<Chart[]>) => {
      state.charts = action.payload;
    },
    addChart: (state, action: PayloadAction<Chart>) => {
      state.charts.push(action.payload);
    },
    setCurrentChart: (state, action: PayloadAction<Chart>) => {
      state.currentChart = action.payload;
    },
    setChartType: (state, action: PayloadAction<string>) => {
      state.chartType = action.payload;
    },
    set3D: (state, action: PayloadAction<boolean>) => {
      state.is3D = action.payload;
    },
    setGenerating: (state, action: PayloadAction<boolean>) => {
      state.isGenerating = action.payload;
    },
  },
});

export const { setCharts, addChart, setCurrentChart, setChartType, set3D, setGenerating } = chartsSlice.actions;
export default chartsSlice.reducer;
