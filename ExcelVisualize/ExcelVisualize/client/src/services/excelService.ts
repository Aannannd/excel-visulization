import * as XLSX from 'xlsx';

export interface ParsedExcelData {
  data: Record<string, any>[];
  columns: string[];
  rowCount: number;
}

export class ExcelService {
  static async parseFile(file: File): Promise<ParsedExcelData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Get the first worksheet
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          if (jsonData.length === 0) {
            throw new Error('No data found in the Excel file');
          }
          
          // First row contains headers
          const headers = jsonData[0] as string[];
          const rows = jsonData.slice(1) as any[][];
          
          // Convert to array of objects
          const parsedData = rows.map(row => {
            const obj: Record<string, any> = {};
            headers.forEach((header, index) => {
              obj[header] = row[index] || '';
            });
            return obj;
          });
          
          resolve({
            data: parsedData,
            columns: headers,
            rowCount: parsedData.length,
          });
        } catch (error) {
          reject(new Error(`Failed to parse Excel file: ${error}`));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  }
  
  static validateFile(file: File): { isValid: boolean; error?: string } {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    
    if (file.size > maxSize) {
      return { isValid: false, error: 'File size exceeds 50MB limit' };
    }
    
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'Only .xls and .xlsx files are supported' };
    }
    
    return { isValid: true };
  }
  
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}
