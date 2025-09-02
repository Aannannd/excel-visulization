import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { File } from '@shared/schema';

interface DataState {
  currentFile: File | null;
  files: File[];
  selectedColumns: {
    xAxis: string;
    yAxis: string;
  };
  previewData: Record<string, any>[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DataState = {
  currentFile: null,
  files: [],
  selectedColumns: {
    xAxis: '',
    yAxis: '',
  },
  previewData: [],
  isLoading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCurrentFile: (state, action: PayloadAction<File>) => {
      state.currentFile = action.payload;
      state.previewData = action.payload.data.slice(0, 10);
    },
    setFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },
    setSelectedColumns: (state, action: PayloadAction<{ xAxis: string; yAxis: string }>) => {
      state.selectedColumns = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addFile: (state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    },
  },
});

export const { setCurrentFile, setFiles, setSelectedColumns, setLoading, setError, addFile } = dataSlice.actions;
export default dataSlice.reducer;
