import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { ComponentProps } from 'react';

// Define the button variants using cva
const buttonVariants = cva(
     'inline-flex items-center justify-center rounded-lg font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
     {
         variants: {
                variant: {
                    primary: 'bg-primary text-primary-foreground hover:opacity-90 focus:ring-primary',
                    outline: 'border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground',
                },
                size: {
                    default: 'py-3 px-6',
                    sm: 'h-9 px-3 rounded-md',
                    // sm: 'px-3 py-2 text-sm',
                    // md: 'px-4 py-3 text-base',
                    // lg: 'px-6 py-4 text-lg',
                },
         },
            defaultVariants: {
                variant: 'primary',
                size: 'default',
            },
     }
);

// Define the props for our component
// It extends LinkProps and adds the variant props from CVA
export interface ButtonProps
  extends ComponentProps<typeof Link>,
    VariantProps<typeof buttonVariants> {}

// Create the component
const Button = ({
  className,
  variant,
  size,
  ...props
}: ButtonProps) => {
  return (
    <Link
      className={twMerge(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export default Button;