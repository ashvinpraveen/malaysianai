import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";

export function useFormAutoSave<T extends Record<string, any>>(
  watch: UseFormWatch<T>,
  storageKey: string = "registration-form-draft"
) {
  useEffect(() => {
    const subscription = watch((data) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (error) {
        console.error("Failed to save form data to localStorage:", error);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, storageKey]);

  const loadSavedData = (): Partial<T> | null => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to load saved form data:", error);
      return null;
    }
  };

  const clearSavedData = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("Failed to clear saved form data:", error);
    }
  };

  return { loadSavedData, clearSavedData };
}
