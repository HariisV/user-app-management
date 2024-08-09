import { useEffect } from 'react';

interface InputProps {
  register?: (name: string, validation?: any) => void;
  name: string;
  validation?: any;
  errors?: any;
  [key: string]: any;
  title?: string;
  className?: string;
  containerClass?: string;
  type?: ('text' | 'password' | 'email') | undefined;
  onChange?: (e: any) => void;
  key?: any;
}

export default function Input({
  register,
  trigger,
  name,
  errors,
  validation,
  title,
  className,
  containerClass,
  getValues,
  setValue,
  type = 'text',
  onChange,
  labelStyle,
  key,
  ...rest
}: InputProps) {
  const registration =
    type === 'password' && register && !validation
      ? register(
          name,
          type === 'password'
            ? {
                required: 'Password cannot be empty',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                validate: {
                  hasLowerCase: (value: string) =>
                    /[a-z]/.test(value) ||
                    'Password must contain at least one lowercase letter',
                  hasUpperCase: (value: string) =>
                    /[A-Z]/.test(value) ||
                    'Password must contain at least one uppercase letter',
                  hasDigit: (value: string) =>
                    /\d/.test(value) ||
                    'Password must contain at least one digit',
                  hasSpecialChar: (value: string) =>
                    /[\W_]/.test(value) ||
                    'Password must contain at least one special character',
                },
              }
            : validation
        )
      : register
      ? validation
        ? register(name, validation)
        : register(name)
      : {};

  useEffect(() => {
    const value = getValues?.(name);
    if (value?.length > 0) trigger(name);
  }, [getValues?.(name)]);

  const getInput = () => {
    const commonProps = {
      ...registration,
      ...rest,
      id: name,
      name: name,
      onChange: (e: any) => {
        trigger(name);
        setValue(name, e.target.value);
        if (onChange) onChange(e);
      },
      className: `pl-3 pr-3 block w-full rounded-lg py-1.5 text-gray-900 shadow-sm ring-inset border-2 border-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
        className || ''
      } ${errors && errors[name] ? 'border-red-600' : ''}`,
    };

    return <input {...commonProps} type={type} />;
  };

  return (
    <div className={containerClass}>
      {title && (
        <label
          htmlFor={name}
          className={`block text-sm leading-6 font-semibold text-gray-900 ${labelStyle}`}
        >
          {title}
        </label>
      )}
      <div className={`${title && 'mt-0'} z-50`}>
        {getInput()}
        {errors && errors[name] && (
          <p className="text-xs text-red-600" id="email-error">
            {errors[name].message}
          </p>
        )}
      </div>
    </div>
  );
}
