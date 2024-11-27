export const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-64 bg-gray-50 rounded-lg">
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);
