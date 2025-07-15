'use client';

import { useState } from 'react';
import { PlusCircle, Trash2, CheckCircle } from 'lucide-react';

export default function ProductVariants() {
  const [options, setOptions] = useState([]);

  // Add a new option block (limit: 3)
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

  const handleNameChange = (index, value) => {
    const updated = [...options];
    updated[index].name = value;
    setOptions(updated);
  };

  const handleValueChange = (optIdx, valIdx, newValue) => {
    const updated = [...options];
    updated[optIdx].values[valIdx] = newValue;

    // Auto-add empty input at the end
    const isLast = valIdx === updated[optIdx].values.length - 1;
    if (isLast && newValue.trim() !== '') {
      updated[optIdx].values.push('');
    }

    setOptions(updated);
  };

  const deleteOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const confirmOption = (index) => {
    const updated = [...options];
    updated[index].confirmed = true;
    setOptions(updated);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">Variants</h3>

      {options.map((option, index) => (
        <div
          key={index}
          className="border rounded-md p-4 mb-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
        >
          {/* Option Name */}
          <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">Option Name</label>
          <input
            type="text"
            value={option.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            disabled={option.confirmed}
            placeholder="e.g. Size"
            className="w-full mb-3 px-3 py-2 border rounded-md text-sm text-gray-700 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          />

          {/* Option Values */}
          <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">Option Values</label>
          {option.values.map((val, valIdx) => (
            <input
              key={valIdx}
              type="text"
              value={val}
              onChange={(e) => handleValueChange(index, valIdx, e.target.value)}
              disabled={option.confirmed}
              placeholder="e.g. Red, Large"
              className="w-full mb-2 px-3 py-2 border rounded-md text-sm text-gray-700 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          ))}

          {/* Actions */}
          <div className="flex space-x-4 mt-3">
            {!option.confirmed && (
              <button
                onClick={() => confirmOption(index)}
                className="flex items-center text-sm text-green-600 hover:underline"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Done
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

      {/* Add Button */}
      {options.length < 3 && (
        <button
          onClick={addOption}
          className="flex items-center text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          <PlusCircle className="w-4 h-4 mr-1" />
          Add options like size or color
        </button>
      )}

      {/* Message when max reached */}
      {options.length === 3 && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          You can add up to 3 option types only.
        </p>
      )}
    </div>
  );
}
