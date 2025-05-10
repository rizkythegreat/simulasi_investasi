export const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const parseRupiah = (formattedValue: string): number => {
  // Hapus semua karakter non-digit kecuali koma
  const cleaned = formattedValue.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};