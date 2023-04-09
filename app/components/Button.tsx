import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

function PrimaryButton({ className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        'bg-gradient-to-r from-indigo-800 to-indigo-600 text-white rounded-md py-2 px-4 hover:opacity-80 font-bold shadow-sm shadow-indigo-500/40',
        className
      )}
      {...rest}
    />
  );
}

function SecondaryButton({ className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        'bg-gradient-to-b from-indigo-600 to-indigo-400 text-transparent bg-clip-text rounded-md py-2 px-4 hover:opacity-80 font-bold shadow-sm shadow-indigo-500/40 ring-1 ring-indigo-600',
        className
      )}
      {...rest}
    />
  );
}

export { PrimaryButton, SecondaryButton };
