export const filterVariantsByAttributes = (variants: any, attributes: any) => {
  const validAttributeOptions = attributes.reduce((acc: any, attr: any) => {
    acc[attr.title] = attr.options
      .filter((v: string) => !!v && v !== '')
      .map((v: string) => v?.toLowerCase());
    return acc;
  }, {});

  const isValidCombination = (combination: any) => {
    return Object.keys(combination).every(
      key =>
        validAttributeOptions[key] &&
        validAttributeOptions[key].includes(combination[key])
    );
  };

  const isVariantValid = (variant: any) => {
    const variantValue = variant.value;
    const attributeKeysInVariant = Object.keys(variantValue);
    return (
      attributeKeysInVariant.length === attributes.length &&
      isValidCombination(variantValue) &&
      attributeKeysInVariant.every((key: string) => {
        return (
          attributes.some(
            (attr: any) => attr.title?.toLowerCase() === key?.toLowerCase()
          ) &&
          attributes
            .find((attr: any) => attr.title.toLowerCase() === key.toLowerCase())
            .options.map((v: string) => (v !== '' ? v?.toLowerCase() : ''))
            .includes(
              !!variantValue[key] && variantValue[key] !== ''
                ? variantValue[key].toLowerCase()
                : ''
            )
        );
      })
    );
  };

  const filteredVariants = variants?.filter((variant: any) => {
    return (
      isVariantValid(variant) &&
      Object.keys(variant.value).length === attributes.length
    );
  });

  return removeDuplicateVariants(filteredVariants);
};

export const removeDuplicateVariants = (variants: any) => {
  const seenValues = new Set();

  return variants?.filter((variant: any) => {
    const variantValueString = JSON.stringify(variant.value);

    // If the value is not seen before, add it to the set and keep the variant
    if (!seenValues.has(variantValueString)) {
      seenValues.add(variantValueString);
      return true;
    }

    // If the value is seen before, only keep the variant with an ID
    return variant.id !== undefined && variant.id !== null;
  });
};

export const isHexColor = (str: string) => {
  // Hex color code pattern
  const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

  // Check if the string matches the pattern
  return hexColorRegex.test(str);
};

export const generateVariantGroup = (
  generatedVariants: any,
  selectedVariants: string = ''
) => {
  let attributeTitles = [];
  if (!generatedVariants.variants || !generatedVariants?.attributes) {
    return [];
  }
  if (!!selectedVariants) {
    attributeTitles = generatedVariants?.attributes
      ?.filter((data: any) =>
        selectedVariants ? data?.title === selectedVariants : true
      )
      ?.map((attr: any) => attr.title);
  }

  if (!selectedVariants) {
    attributeTitles = generatedVariants?.attributes?.map(
      (attr: any) => attr.title
    );
  }

  const groupedVariants: any = attributeTitles?.reduce(
    (acc: any, title: any) => {
      acc[title] = {};
      return acc;
    },
    {}
  );

  generatedVariants.variants.forEach((variant: any) => {
    Object.entries(variant.value).forEach(([attr, value]: any) => {
      if (groupedVariants[attr]) {
        if (!groupedVariants[attr][value]) {
          groupedVariants[attr][value] = {
            value: [],
            checked: false,
            inputFields: true
          };
        }
        groupedVariants[attr][value].value.push(variant);
      }
    });
  });

  return groupedVariants;
};

export const groupVariantsByValueKey = (array: any, key: string) => {
  // Use reduce to group items by the specified key (color, material, etc.)
  const grouped = array?.reduce((result: any, item: any) => {
    const groupKey = item.value[key];

    if (!result[groupKey]) {
      // Initialize a new group if it doesn't exist
      result[groupKey] = {
        title: groupKey,
        children: [], // Store all items under this group
        img: null, // Can be updated if needed
        price: 0, // Aggregate price or initial value
        qte: 0, // Quantity
        sku: 0 // SKU or any other initial value
      };
    }

    // Add the item to the respective group's children array
    result[groupKey].children.push(item);

    return result;
  }, {});

  // Convert the grouped object back to an array
  return Object.values(grouped);
};

export const setLowestPriceAsDefault = (array: any[]): any[] => {
  if (array.length === 0) return array; // Return empty array if no elements

  // Find the lowest price in the array
  let lowestPrice = array[0].price;

  // Loop through the array to find the lowest price
  array.forEach(item => {
    if (item.price < lowestPrice) {
      lowestPrice = item.price;
    }
  });

  // Set `isDefault` to true for the first occurrence of the lowest price
  let lowestPriceSet = false;
  return array.map(item => {
    if (item.price === lowestPrice && !lowestPriceSet) {
      lowestPriceSet = true; // Mark that we have set the first lowest price element
      return { ...item, isDefault: true };
    }
    return { ...item, isDefault: false };
  });
};
