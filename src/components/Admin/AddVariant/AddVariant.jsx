'use client';

import { useState } from 'react';
import { PlusCircle, Trash2, CheckCircle } from 'lucide-react';

// Generate variant combinations for up to 3 levels
const generateCombinations = (options) => {
  const confirmed = options.filter((opt) => opt.confirmed && opt.name && opt.values.length > 0);
  if (confirmed.length === 0) return [];

  const [a, b, c] = confirmed;
  const valA = a?.values?.filter((v) => v.trim()) || [];
  const valB = b?.values?.filter((v) => v.trim()) || [];
  const valC = c?.values?.filter((v) => v.trim()) || [];

  if (confirmed.length === 1) {
    return valA.map((va) => ({
      key: `${a.name}: ${va}`,
      variant: { [a.name]: va },
    }));
  }

  if (confirmed.length === 2) {
    return valA.flatMap((va) =>
      valB.map((vb) => ({
        key: `${a.name}: ${va} / ${b.name}: ${vb}`,
        variant: { [a.name]: va, [b.name]: vb },
      }))
    );
  }

  return valA.flatMap((va) =>
    valB.flatMap((vb) =>
      valC.map((vc) => ({
        key: `${a.name}: ${va} / ${b.name}: ${vb} / ${c.name}: ${vc}`,
        variant: {
          [a.name]: va,
          [b.name]: vb,
          [c.name]: vc,
        },
      }))
    )
  );
};

export default function ProductVariants() {
  const [options, setOptions] = useState([]);
  const [variantData, setVariantData] = useState({});

  const addOption = () => {
    if (options.length >= 3) return;
    setOptions([
      ...options,
      {
        name: '',
        values: [''],
        confirmed: false,
      },
    ]);
  };

  const handleDeleteValue = (optIdx, valIdx) => {
    const updated = [...options];
    updated[optIdx].values.splice(valIdx, 1);

    // Ensure there's always at least one input
    if (updated[optIdx].values.length === 0) {
      updated[optIdx].values.push('');
    }

    setOptions(updated);
  };

  const handleNameChange = (index, value) => {
    const updated = [...options];
    updated[index].name = value;
    setOptions(updated);
  };

  const handleValueChange = (optIdx, valIdx, newValue) => {
    const updated = [...options];
    updated[optIdx].values[valIdx] = newValue;

    const isLast = valIdx === updated[optIdx].values.length - 1;
    if (isLast && newValue.trim()) {
      updated[optIdx].values.push('');
    }

    setOptions(updated);
  };

  const deleteOption = (index) => {
    const updated = [...options];
    updated.splice(index, 1);
    setOptions(updated);
  };

  const confirmOption = (index) => {
    const updated = [...options];
    updated[index].confirmed = true;
    setOptions(updated);
  };

  const confirmedOptions = options.filter((opt) => opt.confirmed);
  const combinations = generateCombinations(confirmedOptions);

  const handleVariantChange = (key, field, value) => {
    setVariantData((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [field]: value,
      },
    }));
  };

  const variantLabel = (index) => {
    if (index === 0) return 'Primary Variant (e.g., Size)';
    if (index === 1) return 'Secondary Variant (optional, e.g., Color)';
    return 'Tertiary Variant (optional, e.g., Material)';
  };

  const placeholderLabel = (index) => {
    if (index === 0) return 'Size';
    if (index === 1) return 'Color';
    return 'Material';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">Variants</h3>

      {options.map((option, index) => (
        <div key={index} className=" rounded-md p-4 mb-4 bg-gray-50 dark:bg-gray-700">
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
            {variantLabel(index)}
          </label>
          <input
            type="text"
            value={option.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            disabled={option.confirmed}
            placeholder={placeholderLabel(index)}
            className="w-full mb-3 px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
          />

          <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">Values</label>
          {option.values.map((val, valIdx) => (
            <div key={valIdx} className="flex items-center mb-2">
              <input
                type="text"
                value={val}
                onChange={(e) => handleValueChange(index, valIdx, e.target.value)}
                disabled={option.confirmed}
                placeholder={`e.g., ${placeholderLabel(index) === 'Size' ? 'Medium' : placeholderLabel(index) === 'Color' ? 'Black' : 'Cotton'}`}
                className="flex-1 px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
              />
              {!option.confirmed && option.values.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteValue(index, valIdx)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  title="Remove this value"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}


          <div className="flex space-x-4 mt-3">
            {!option.confirmed && (
              <button
                onClick={() => confirmOption(index)}
                className="flex items-center text-sm text-green-600 hover:underline"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Confirm
              </button>
            )}
            <button
              onClick={() => deleteOption(index)}
              className="flex items-center text-sm text-red-600 hover:underline"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      ))}

      {options.length < 3 && (
        <button
          onClick={addOption}
          className="flex items-center text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          <PlusCircle className="w-4 h-4 mr-1" />
          Add {['Primary', 'Secondary (Optional)', 'Tertiary (Optional)'][options.length]} Variant
        </button>
      )}

      {options.length === 3 && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Maximum of 3 variant types supported.
        </p>
      )}

      {/* Combinations Table */}
      {combinations.length > 0 && (
        <div className="mt-6">
          <table className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-md">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-2 text-left">Variant</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Stock</th>
              </tr>
            </thead>
            <tbody>
              {combinations.map(({ key }, idx) => (
                <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                  <td className="p-2 text-gray-800 dark:text-gray-200">{key}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={variantData[key]?.price || ''}
                      onChange={(e) => handleVariantChange(key, 'price', e.target.value)}
                      className="w-full px-2 py-1 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                      placeholder="Rs"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={variantData[key]?.stock || ''}
                      onChange={(e) => handleVariantChange(key, 'stock', e.target.value)}
                      className="w-full px-2 py-1 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Total stock: {Object.values(variantData).reduce((sum, v) => sum + Number(v.stock || 0), 0)} units
          </p>
        </div>
      )}
    </div>
  );
}
