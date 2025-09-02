interface DataPreviewProps {
  data: Record<string, any>[];
  columns: string[];
}

export default function DataPreview({ data, columns }: DataPreviewProps) {
  if (!data.length || !columns.length) {
    return null;
  }

  const previewData = data.slice(0, 10);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Data Preview</h3>
        <p className="text-gray-600 mt-1">First 10 rows of your data</p>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, index) => (
                <tr key={index} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                  {columns.map((column) => (
                    <td key={column} className="border border-gray-200 px-4 py-2 text-sm text-gray-900">
                      {row[column]?.toString() || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
