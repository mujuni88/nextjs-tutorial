'use client';
import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={clsx(
        'border-2 rounded-md p-2 bg-gray-200 focus:bg-gray-50',
        className
      )}
      {...rest}
    />
  );
}
