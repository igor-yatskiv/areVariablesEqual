function areVariablesEqual(variableOne, variableTwo) {
  const variablesType = typeof variableOne;

  // Return false if primitive types does not match
  if (variablesType !== typeof variableTwo) {
    return false;
  }

  // From this point we can be sure that both variables has same type

  // Always consider functions as equal.
  if (variablesType === 'function') {
    return true;
  }

  if (variablesType === 'string') {
    return variableOne === variableTwo;
  }

  if (variablesType === 'number') {
    // NaN comparison. Consider NaN values to be equal.
    if (Number.isNaN(variableOne) || Number.isNaN(variableTwo)) {
      return Number.isNaN(variableOne) && Number.isNaN(variableTwo);
    }

    return variableOne === variableTwo;
  }

  // TODO: Implement Symbol comparison

  if (variablesType === 'object') {
    // null comparison
    if (variableOne === null || variableTwo === null) {
      return variableOne === variableTwo;
    }

    // TODO: Implement Set and Map comparison loops

    // Arrays shallow comparison
    if (Array.isArray(variableOne) || Array.isArray(variableTwo)) {
      if (!Array.isArray(variableOne) || !Array.isArray(variableTwo)) {
        return false;
      }

      if (variableOne.length !== variableTwo.length) {
        return false;
      }

      const length = variableOne.length;

      for (let i = 0; i < length; i++) {
        const areEqual = areVariablesEqual(variableOne[i], variableTwo[i]);

        // Break loop on very first difference
        if (!areEqual) {
          return false;
        }
      }

      // Both arrays are the same
      return true;
    }

    // Objects shallow compare
    // TODO: Should I bother by key names comparison to prevent cases when:
    //       obj1[key] has value "undefined" and obj2[key] never set.
    //       But obj2 has an extra key to compensate length.
    const objectKeys = Object.keys(variableOne);

    if (objectKeys.length !== Object.keys(variableTwo).length) {
      return false;
    }

    for (let i = 0; i < objectKeys.length; i++) {
      const key = objectKeys[i];
      const arePropsEqual = areVariablesEqual(variableOne[key], variableTwo[key]);

      if (!arePropsEqual) {
        return false;
      }
    }

    return true;
  }

  // Use built in strict compare for all other primitive types
  return variableOne === variableTwo;
}

export default areVariablesEqual;
