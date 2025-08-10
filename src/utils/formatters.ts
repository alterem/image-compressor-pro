export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatCompressionRatio = (ratio: number): string => {
  return (ratio * 100).toFixed(1) + '%';
};

export const formatSavings = (originalSize: number, compressedSize: number): string => {
  const savings = originalSize - compressedSize;
  const percentage = (savings / originalSize) * 100;
  return `节省 ${formatFileSize(savings)} (${percentage.toFixed(1)}%)`;
};

export const parseTargetSize = (input: string): number | null => {
  const cleanInput = input.trim().toLowerCase();
  
  // Remove common units and normalize
  const value = cleanInput.replace(/[^0-9.]/g, '');
  const unit = cleanInput.replace(/[0-9.]/g, '').trim();
  
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) return null;
  
  // Convert to KB
  switch (unit) {
    case 'b':
    case 'byte':
    case 'bytes':
      return numValue / 1024;
    case 'kb':
    case 'kilobyte':
    case 'kilobytes':
      return numValue;
    case 'mb':
    case 'megabyte':
    case 'megabytes':
      return numValue * 1024;
    case 'gb':
    case 'gigabyte':
    case 'gigabytes':
      return numValue * 1024 * 1024;
    default:
      // Default to KB if no unit specified
      return numValue;
  }
};