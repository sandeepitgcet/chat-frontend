import { useState, useEffect, Dispatch, SetStateAction } from "react";

// Define a custom hook for saving data object in local storage
const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  // Retrieve the value from local storage if it exists, otherwise use the initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error retrieving data from local storage:", error);
      return initialValue;
    }
  });

  // Save the value to local storage whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  }, [key, storedValue]);

  // Function to update the value of the data object
  const updateStoredValue: Dispatch<SetStateAction<T>> = (
    value: SetStateAction<T>
  ) => {
    try {
      setStoredValue((prevState: T) => {
        // If the value is a function, call it with the previous state
        return typeof value === "function"
          ? (value as (prevState: T) => T)(prevState)
          : value;
      });
    } catch (error) {
      console.error("Error updating stored value:", error);
    }
  };

  // Return the stored value and the function to update it
  return [storedValue, updateStoredValue];
};

export default useLocalStorage;
