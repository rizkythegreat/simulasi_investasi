import { useEffect, useState } from "react";
import { formatRupiah, parseRupiah } from "../../utils/format";

interface InputFieldProps {
  id: string;
  label: string;
  type: 'number' | 'currency' | 'percentage';
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  min,
  max,
  step = 1,
  onChange,
  prefix,
  suffix,
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
  if (!isFocused) {
    setDisplayValue(
      type === 'currency' 
        ? formatRupiah(value)
        : type === 'percentage'
        ? value.toFixed(1).replace('.', ',')
        : value.toString()
    );
  }
}, [value, isFocused, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    let parsedValue: number;

    if (type === 'currency') {
      // Hanya izinkan angka dan koma untuk input uang
      rawValue = rawValue.replace(/[^\d,]/g, '');
      parsedValue = parseRupiah(rawValue) || 0;
    } else if (type === 'percentage') {
      rawValue = rawValue.replace(/[^\d,.]/g, '')
        .replace(',', '.');
      const parts = rawValue.split('.');
      if (parts.length > 1) {
        rawValue = parts[0] + '.' + parts[1].replace(/\./g, '');
      }
      parsedValue = parseFloat(rawValue) || 0;
    } else {
      // Hanya izinkan angka untuk input bilangan bulat
      rawValue = rawValue.replace(/\D/g, '');
      parsedValue = parseInt(rawValue) || 0;
    }

    // Validasi min/max
    if (min !== undefined && parsedValue < min) parsedValue = min;
    if (max !== undefined && parsedValue > max) parsedValue = max;

    setDisplayValue(rawValue);
    onChange(parsedValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setDisplayValue(value.toString());
  };

  const handleBlur = () => {
    setIsFocused(false);
    setDisplayValue(formatRupiah(value));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      onChange(Math.min(max || Infinity, (value || 0) + step));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(Math.max(min || -Infinity, (value || 0) - step));
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          type="text"
          inputMode="decimal"
          id={id}
          name={id}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`input-field ${prefix ? 'pl-9' : ''} ${suffix ? 'pr-7' : ''}`}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;