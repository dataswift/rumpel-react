import { useEffect, useRef, useState } from 'react';
import { isEmail, NAME_PATTERN, NUMBER_PATTERN, URL_PATTERN } from '../../utils/validations';

const debounce = require('lodash.debounce');

export const useFormValidations = (validationPatterns: Record<string, string>, values: Record<string, string>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [unmounted, setUnmounted] = useState(false);
  const validationDebounce = useRef(
    debounce((values: Record<string, string>, abort: boolean) => {
      if (abort) return;

      generateErrors(values);
    }, 600),
  ).current;

  useEffect(() => {
    return () => {
      setUnmounted(true);
    };
  }, []);

  const generateErrors = (values: Record<string, string>) => {
    if (!values) return;

    let newErrors: Record<string, string> = {};

    Object.entries(values).forEach(([key, value]) => {
      const validationArray = validationPatterns[key]?.split('|');

      if (!validationArray) return [key, value];

      for (let i = 0; i < validationArray.length; i++) {
        const pattern = validationArray[i];

        if (newErrors.hasOwnProperty(key) || (pattern.startsWith('optional') && value.trim() === '')) {
          return;
        }

        switch (true) {
          case pattern.startsWith('required'): {
            if (value.trim() === '') {
              newErrors[key] = `This field is required`;
            }
            break;
          }
          case pattern.startsWith('name'): {
            if (!NAME_PATTERN.test(value)) {
              newErrors[key] = `This is not a valid name`;
            }
            break;
          }
          case pattern.startsWith('min-length'): {
            const length = parseInt(pattern.split(':')[1]);

            if (value.length < length) {
              newErrors[key] = `The length must be bigger than ${length}`;
            }
            break;
          }
          case pattern.startsWith('max-length'): {
            const length = parseInt(pattern.split(':')[1]);

            if (value.length > length) {
              newErrors[key] = `The length must be less than ${length}`;
            }
            break;
          }
          case pattern.startsWith('options'): {
            const options = pattern.split(':')[1].split(',');

            if (options.indexOf(value) === -1) {
              newErrors[key] = `${value} is not a valid option`;
            }
            break;
          }
          case pattern.startsWith('number'): {
            if (!NUMBER_PATTERN.test(value)) {
              newErrors[key] = `This field must be a number`;
            }
            break;
          }
          case pattern.startsWith('url'): {
            if (!URL_PATTERN.test(value)) {
              newErrors[key] = `Looks like an invalid URL was entered. Please follow this format: https://example.com/`;
            }
            break;
          }
          case pattern.startsWith('email'): {
            if (!isEmail(value)) {
              newErrors[key] = `This is not a valid email`;
              break;
            }
          }
        }
      }
    });

    if (!unmounted) {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    validationDebounce(values);

    return () => {
      validationDebounce(values, true);
    };
  }, [values, validationDebounce]);

  return { errors };
};
