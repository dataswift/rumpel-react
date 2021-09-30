import { useState, useEffect } from 'react';
import isSameDay from 'date-fns/isSameDay';
import { useRibbonContext } from '@dataswift/shared';
import { fetchNotification } from '../services/NotificationService';

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const readValue = () => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
    } catch (error) {
      // TODO: Error handling
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setValue];
};

export const useDataswiftNotification = (manual: boolean = false) => {
  const [storedValue, setValue] = useLocalStorage('dataswift-notification-pda', '');
  const { openRibbon, component } = useRibbonContext();

  useEffect(() => {
    const checkNotifications = async () => {
      const now = new Date(Date.now());
      if (storedValue && isSameDay(new Date(storedValue), now)) return;

      setValue(now.toISOString());

      try {
        const notification = await fetchNotification();
        if (!notification) return;

        openRibbon({
          message: notification.title,
          onClick: () => {
            if (notification.link) window.open(notification.link);
          },
          customStyles: {
            theme: 'custom',
          },
          manual,
        });
      } catch (error) {
        // TODO: Error handling
      }
    };

    checkNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return component;
};
