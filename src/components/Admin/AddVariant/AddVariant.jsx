'use client';

import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2, CheckCircle } from 'lucide-react';

// Generate variant combinations grouped by primary (parent) level
const generateGroupedCombinations = (options) => {
  const confirmedOptions = options.filter(opt => opt.confirmed && opt.name && opt.values.length > 0);

  if (confirmedOptions.length === 0) return [];

  const levels = confirmedOptions.map(opt => ({
    name: opt.name,
    values: opt.values.filter(v => v.trim()),
  }));

  if (levels.length === 1) {
    return levels[0].values.map(val => ({
      parentLabel: val,
      parentVariant: { [levels[0].name]: val },
      children: [],
    }));
  }

  const [primaryLevel, ...restLevels] = levels;

  return primaryLevel.values.map((primaryVal) => {
    const parentVariant = { [primaryLevel.name]: primaryVal };

    const buildChildren = (levelIndex, prefix = {}, labelPrefix = '') => {
      if (levelIndex >= restLevels.length) {
        return [{
          key: labelPrefix.slice(3),
          variant: { ...prefix, ...parentVariant }
        }];
      }

      const currentLevel = restLevels[levelIndex];
      return currentLevel.values.flatMap((val) =>
        buildChildren(
          levelIndex + 1,
          { ...prefix, [currentLevel.name]: val },
          `${labelPrefix} / ${val}`
        )
      );
    };

    return {
      parentLabel: primaryVal,
      parentVariant,
      children: buildChildren(0),
    };
  });
};

export default function ProductVariants({ onVariantsChange }) {
  const [options, setOptions] = useState([]);
  const [variantData, setVariantData] = useState({});
  const [variantImages, setVariantImages] = useState({});


  const addOption = () => {
    if (options.length >= 3) return;
    setOptions([...options, { name: '', values: [''], confirmed: false }]);
  };

  const handleNameChange = (index, value) => {
    const updated = [...options];
    updated[index].name = value;
    setOptions(updated);
  };


  const handleImageChange = (key, file) => {
    const imageUrl = URL.createObjectURL(file);
    setVariantImages(prev => ({
      ...prev,
      [key]: imageUrl,
    }));
  };

  



  const handleValueChange = (optIdx, valIdx, newValue) => {
    const updated = [...options];
    updated[optIdx].values[valIdx] = newValue;

    if (valIdx === updated[optIdx].values.length - 1 && newValue.trim()) {
      updated[optIdx].values.push('');
    }

    setOptions(updated);
  };

  const handleDeleteValue = (optIdx, valIdx) => {
    const updated = [...options];
    updated[optIdx].values.splice(valIdx, 1);
    if (updated[optIdx].values.length === 0) updated[optIdx].values.push('');
    setOptions(updated);
  };

  const confirmOption = (index) => {
    const updated = [...options];
    updated[index].confirmed = true;
    setOptions(updated);
  };

  const deleteOption = (index) => {
    const updated = [...options];
    updated.splice(index, 1);
    setOptions(updated);
  };

  const handleVariantChange = (key, field, value) => {
    setVariantData(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [field]: value,
      },
    }));
  };

  const variantLabels = ['Primary Variant (e.g., Size)', 'Secondary (e.g., Color)', 'Tertiary (e.g., Material)'];
  const placeholderLabels = ['Size', 'Color', 'Material'];

  const confirmedOptions = options.filter(opt => opt.confirmed);
  const groupedCombinations = generateGroupedCombinations(confirmedOptions);

  useEffect(() => {
  onVariantsChange({
    groupedCombinations,
    variantData,
    variantImages,
  });
}, [groupedCombinations, variantData, variantImages, onVariantsChange]);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">Variants</h3>

      {/* Variant Setup */}
      {options.map((option, index) => (
        <div key={index} className="rounded-md p-4 mb-4 bg-gray-50 dark:bg-gray-700">
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
            {variantLabels[index]}
          </label>
          <input
            type="text"
            value={option.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            disabled={option.confirmed}
            placeholder={placeholderLabels[index]}
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
                placeholder={`e.g., ${placeholderLabels[index] === 'Size' ? 'Medium' : placeholderLabels[index] === 'Color' ? 'Black' : 'Rubber'}`}
                className="flex-1 px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
              />
              {!option.confirmed && option.values.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteValue(index, valIdx)}
                  className="ml-2 text-red-500 hover:text-red-700"
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
          Add {['Primary', 'Secondary', 'Tertiary'][options.length]} Variant
        </button>
      )}

      {options.length === 3 && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Maximum of 3 variant types supported.
        </p>
      )}

      {/* Variant Output Table */}
      {groupedCombinations.length > 0 && (
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
              {groupedCombinations.map(({ parentLabel, children }, groupIdx) => {
                const parentKey = `parent-${parentLabel}`;

                return (
                  <React.Fragment key={groupIdx}>
                    {/* Parent Row */}
                    <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-gray-800 dark:text-white">
                      <td className="p-2 flex items-center space-x-4">
                        <div className="relative w-10 h-10">
                          {variantImages[parentKey] ? (
                            <img
                              src={variantImages[parentKey]}
                              alt="Parent Variant"
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <label className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 cursor-pointer">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3m6-6h-2a2 2 0 01-2-2V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v2a2 2 0 01-2 2H3" />
                              </svg>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(parentKey, e.target.files[0])}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                        <span>{parentLabel}</span>
                      </td>
                      <td className="p-2" colSpan={1}></td>
                      <td className="p-2 text-xs text-gray-500 dark:text-gray-400">
                        {children.length} variant{children.length !== 1 ? 's' : ''}
                      </td>
                    </tr>

                    {/* Children Rows */}
                    {children.length > 0 ? (
                      children.map((child, idx) => {
                        const childKey = `child-${parentLabel}-${child.key}`;

                        return (
                          <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                            <td className="p-2">
                              <div className="flex items-center space-x-2">
                                <div className="relative w-10 h-10">
                                  {variantImages[childKey] ? (
                                    <img
                                      src={variantImages[childKey]}
                                      alt="Child Variant"
                                      className="w-10 h-10 object-cover rounded"
                                    />
                                  ) : (
                                    <label className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 cursor-pointer">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3m6-6h-2a2 2 0 01-2-2V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v2a2 2 0 01-2 2H3" />
                                      </svg>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(childKey, e.target.files[0])}
                                        className="hidden"
                                      />
                                    </label>
                                  )}
                                </div>
                                <span className="text-gray-800 dark:text-gray-200 text-sm">{child.key}</span>
                              </div>
                            </td>

                            <td className="p-2">
                              <input
                                type="number"
                                value={variantData[childKey]?.price || ''}
                                onChange={(e) => handleVariantChange(childKey, 'price', e.target.value)}
                                className="w-full px-2 py-1 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                                placeholder="Rs"
                              />
                            </td>

                            <td className="p-2">
                              <input
                                type="number"
                                value={variantData[childKey]?.stock || ''}
                                onChange={(e) => handleVariantChange(childKey, 'stock', e.target.value)}
                                className="w-full px-2 py-1 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                                placeholder="0"
                              />
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="border-t border-gray-200 dark:border-gray-600">
                        <td className="p-2 text-gray-800 dark:text-gray-200">{parentLabel}</td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={variantData[parentKey]?.price || ''}
                            onChange={(e) => handleVariantChange(parentKey, 'price', e.target.value)}
                            className="w-full px-2 py-1 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                            placeholder="Rs"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={variantData[parentKey]?.stock || ''}
                            onChange={(e) => handleVariantChange(parentKey, 'stock', e.target.value)}
                            className="w-full px-2 py-1 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
