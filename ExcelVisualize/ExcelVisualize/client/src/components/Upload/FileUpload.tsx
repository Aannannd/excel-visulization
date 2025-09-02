import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ExcelService } from "@/services/excelService";
import { setCurrentFile, setLoading, setError, addFile } from "@/store/slices/dataSlice";
import { File } from "@shared/schema";

interface FileUploadProps {
  onFileUploaded?: (file: File) => void;
}

export default function FileUpload({ onFileUploaded }: FileUploadProps) {
  const dispatch = useDispatch();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFile = useCallback(async (file: globalThis.File) => {
    // Validate file
    const validation = ExcelService.validateFile(file);
    if (!validation.isValid) {
      dispatch(setError(validation.error || 'Invalid file'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      // Parse Excel file
      const parsedData = await ExcelService.parseFile(file);
      
      // Create file object
      const fileObj: File = {
        id: Date.now(), // Mock ID
        userId: 1, // Mock user ID
        filename: file.name,
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
        columns: parsedData.columns,
        rowCount: parsedData.rowCount,
        data: parsedData.data,
        createdAt: new Date(),
      };

      setUploadedFile(fileObj);
      dispatch(setCurrentFile(fileObj));
      dispatch(addFile(fileObj));
      
      if (onFileUploaded) {
        onFileUploaded(fileObj);
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to parse file'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, onFileUploaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const removeFile = () => {
    setUploadedFile(null);
    dispatch(setCurrentFile(null as any));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Upload Excel File</h3>
        <p className="text-gray-600 mt-1">Upload your .xls or .xlsx file to start analyzing</p>
      </div>
      <div className="p-6">
        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
              isDragOver 
                ? 'border-primary bg-blue-50' 
                : 'border-gray-300 hover:border-primary hover:bg-blue-50'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-cloud-upload-alt text-primary text-2xl"></i>
            </div>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Drop your Excel file here</h4>
            <p className="text-gray-500 mb-4">or click to browse files</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Choose File
            </button>
            <input
              type="file"
              accept=".xls,.xlsx"
              className="hidden"
              id="fileInput"
              onChange={handleFileInput}
            />
            <p className="text-xs text-gray-400 mt-4">Supports .xls and .xlsx files up to 50MB</p>
          </div>
        ) : (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <i className="fas fa-file-excel text-green-600"></i>
                <div>
                  <p className="font-medium text-green-800">{uploadedFile.originalName}</p>
                  <p className="text-sm text-green-600">
                    {ExcelService.formatFileSize(uploadedFile.size)} • {uploadedFile.rowCount} rows • {uploadedFile.columns.length} columns
                  </p>
                </div>
              </div>
              <button 
                onClick={removeFile}
                className="text-green-600 hover:text-green-800"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
