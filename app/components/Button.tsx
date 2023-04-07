import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

function PrimaryButton({ className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        'bg-indigo-900 text-white font-montserrat rounded-md py-2 px-4 hover:bg-indigo-800 font-bold',
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
        'bg-teal-500 text-black font-montserrat rounded-md py-2 px-4 hover:bg-teal-400 font-semibold',
        className
      )}
      {...rest}
    />
  );
}

export { PrimaryButton, SecondaryButton };
