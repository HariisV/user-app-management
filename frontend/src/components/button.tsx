import { IconLoader2 } from '@tabler/icons-react';
import { MouseEventHandler, FormEventHandler, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onSubmit?: FormEventHandler;
  onClick?: MouseEventHandler;
  customSpacing?: string;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isNotRounded?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
};

export default function Button({
  children,
  onClick,
  isLoading = false,
  type,
  disabled,
  className,
  containerClassName,
}: ButtonProps) {
  return (
    <div
      className={`${containerClassName} ${
        isLoading ? 'flex items-center justfy-center text-center' : ''
      }`}
    >
      <button
        onClick={onClick}
        disabled={isLoading || disabled}
        type={type}
        className={`${isLoading ? 'opacity-50' : ''} ${
          disabled
            ? 'cursor-not-allowed bg-white border text-[#000] border-[#DDDDDD]'
            : 'cursor-pointer '
        } flex justify-center py-2.5 px-2 gap-1.5  text-center w-full shadow-md bg-primary rounded-md text-white  ${className}`}
      >
        {isLoading && <IconLoader2 className="animate-spin" />}
        {children}
      </button>
    </div>
  );
}
