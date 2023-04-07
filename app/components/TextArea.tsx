'use client';
import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface TextAreaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function TextArea({ className, ...rest }: TextAreaProps) {
  return (
    <textarea
      rows={6}
      className={clsx(
        'border-2 rounded-md p-2 bg-gray-100 focus:bg-gray-50',
        className
      )}
      {...rest}
    />
  );
}
