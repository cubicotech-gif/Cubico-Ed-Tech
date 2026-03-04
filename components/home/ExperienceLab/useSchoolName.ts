'use client';

import { useState, useCallback, useRef, useMemo } from 'react';

export function useSchoolName() {
  const [schoolName, setSchoolName] = useState('');
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isComplete = schoolName.trim().length >= 6;

  const handleChange = useCallback(
    (value: string) => {
      if (!hasStartedTyping && value.length > 0) {
        setHasStartedTyping(true);
      }
      setSchoolName(value);
    },
    [hasStartedTyping]
  );

  const reset = useCallback(() => {
    setSchoolName('');
    // hasStartedTyping stays true — demos stay visible after first interaction
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Memoized slug — only recomputes when schoolName changes
  const schoolSlug = useMemo(
    () =>
      schoolName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
    [schoolName]
  );

  // Fallback displayName when empty
  const displayName = schoolName.trim() || 'Your School';

  return {
    schoolName,
    displayName,
    schoolSlug,
    hasStartedTyping,
    isComplete,
    handleChange,
    reset,
    inputRef,
  };
}
