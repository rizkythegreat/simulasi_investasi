interface InputFieldProps {
  id: string;
  label: string;
  type: 'number' | 'text';
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
  tooltip
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === '') {
      onChange(NaN);
      return;
    }
    const newValue = parseFloat(raw);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        {tooltip && (
          <div className="group relative">
            <span className="cursor-help text-gray-400 text-sm">ⓘ</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 bg-gray-800 text-white text-xs rounded p-2 -right-2 -top-1 transform -translate-y-full w-48">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          className={`input-field ${prefix ? 'pl-9' : ''} pr-1`}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-5 pr-1 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;