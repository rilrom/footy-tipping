import { useEffect, useState } from "react";

const PREFERENCES_KEY = "footy-tipping:preferences";

interface Preferences {
  allowLateTipping: boolean;
  hideResults: boolean;
}

interface UsePreferencesResult {
  preferences: Preferences;
  setAllowLateTipping: (enabled: boolean) => void;
  setHideResults: (enabled: boolean) => void;
}

const DEFAULT_PREFERENCES: Preferences = {
  allowLateTipping: true,
  hideResults: false,
};

function readBooleanPreference(
  value: unknown,
  fallback: boolean,
): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  return fallback;
}

function readPreferences(): Preferences {
  if (typeof window === "undefined") {
    return DEFAULT_PREFERENCES;
  }

  const raw = window.localStorage.getItem(PREFERENCES_KEY);

  if (!raw) {
    return DEFAULT_PREFERENCES;
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;

    return {
      allowLateTipping: readBooleanPreference(
        parsed.allowLateTipping,
        DEFAULT_PREFERENCES.allowLateTipping,
      ),
      hideResults: readBooleanPreference(
        parsed.hideResults,
        DEFAULT_PREFERENCES.hideResults,
      ),
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function usePreferences(): UsePreferencesResult {
  const [preferences, setPreferences] = useState<Preferences>(() =>
    readPreferences(),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      PREFERENCES_KEY,
      JSON.stringify(preferences),
    );
  }, [preferences]);

  function setAllowLateTipping(enabled: boolean) {
    setPreferences((current) => ({
      ...current,
      allowLateTipping: enabled,
    }));
  }

  function setHideResults(enabled: boolean) {
    setPreferences((current) => ({
      ...current,
      hideResults: enabled,
    }));
  }

  return {
    preferences,
    setAllowLateTipping,
    setHideResults,
  };
}
