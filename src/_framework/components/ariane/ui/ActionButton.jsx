/**
 * @component ActionButton
 * @description Secondary/tertiary buttons with icon support.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Button/ActionButton.tsx
 * @styles maze-monorepo/packages/ariane/src/components/Button/Button.styled.ts
 */
import { forwardRef, cloneElement, isValidElement } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { VisuallyHidden } from './VisuallyHidden';

/**
 * ActionButton variants using CVA
 * Secondary and tertiary emphasis buttons with icon support
 */
const actionButtonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center relative',
    'rounded-[8px] font-semibold',
    'transition-all duration-150',
    'outline-none',
    'disabled:cursor-not-allowed',
    'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
  ],
  {
    variants: {
      emphasis: {
        secondary: [
          // Default state - white background with border
          'bg-white text-blue-500',
          'shadow-[inset_0px_0px_0px_0.5px_rgba(5,104,253,0.28)]',
          // Hover
          'hover:bg-blue-100 hover:text-blue-600',
          'hover:shadow-[inset_0px_0px_0px_0.5px_rgba(5,104,253,0.4)]',
          // Active
          'active:bg-blue-200 active:text-blue-700',
          'active:shadow-[inset_0px_0px_0px_0.5px_rgba(5,104,253,0.5)]',
          // Disabled
          'disabled:bg-neutral-100 disabled:text-neutral-400',
          'disabled:shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]',
        ],
        tertiary: [
          // Default state - white background with secondary text color
          'bg-white text-[#535A74]',
          'shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]',
          // Hover
          'hover:text-blue-600',
          'hover:shadow-[inset_0px_0px_0px_0.5px_rgba(5,104,253,0.4)]',
          // Active
          'active:bg-blue-100 active:text-blue-700',
          'active:shadow-[inset_0px_0px_0px_0.5px_rgba(5,104,253,0.5)]',
          // Disabled
          'disabled:bg-neutral-100 disabled:text-neutral-400',
          'disabled:shadow-[inset_0px_0px_0px_0.5px_rgba(108,113,140,0.28)]',
        ],
      },
      size: {
        MD: [
          'min-w-[96px] min-h-[48px]',
          'px-[15px] py-[11px]',
          'text-[16px] leading-[24px]',
          'gap-2',
        ],
        SM: [
          'min-w-[64px] min-h-[32px]',
          'px-2 py-[6px]',
          'text-[14px] leading-[20px]',
          'gap-1',
        ],
      },
      destructive: {
        true: '',
        false: '',
      },
      active: {
        true: '',
        false: '',
      },
      iconOnly: {
        true: 'min-w-0 !px-0',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit flex-shrink-0',
      },
      borderless: {
        true: 'shadow-none hover:shadow-none',
        false: '',
      },
    },
    compoundVariants: [
      // Destructive secondary
      {
        emphasis: 'secondary',
        destructive: true,
        className: [
          'text-red-500',
          'shadow-[inset_0px_0px_0px_0.5px_rgba(204,63,77,0.28)]',
          'hover:bg-red-100 hover:text-red-600',
          'hover:shadow-[inset_0px_0px_0px_0.5px_rgba(204,63,77,0.4)]',
          'active:bg-red-200 active:text-red-700',
          'active:shadow-[inset_0px_0px_0px_0.5px_rgba(204,63,77,0.5)]',
        ],
      },
      // Destructive tertiary
      {
        emphasis: 'tertiary',
        destructive: true,
        className: [
          'text-red-500',
          'hover:text-red-600',
          'hover:shadow-[inset_0px_0px_0px_0.5px_rgba(204,63,77,0.4)]',
          'active:bg-red-100 active:text-red-700',
        ],
      },
      // Active secondary
      {
        emphasis: 'secondary',
        active: true,
        className: [
          'bg-blue-200 text-blue-700',
          'shadow-[inset_0px_0px_0px_0.5px_rgba(5,104,253,0.5)]',
        ],
      },
      // Active tertiary
      {
        emphasis: 'tertiary',
        active: true,
        className: [
          'bg-blue-100 text-blue-700',
          'shadow-[inset_0px_0px_0px_0.5px_rgba(5,104,253,0.5)]',
        ],
      },
      // Icon-only MD size - square 48x48
      {
        iconOnly: true,
        size: 'MD',
        className: 'w-[48px] h-[48px] min-w-[48px] min-h-[48px]',
      },
      // Icon-only SM size - square 32x32
      {
        iconOnly: true,
        size: 'SM',
        className: 'w-[32px] h-[32px] min-w-[32px] min-h-[32px]',
      },
    ],
    defaultVariants: {
      emphasis: 'secondary',
      size: 'MD',
      destructive: false,
      active: false,
      iconOnly: false,
      fullWidth: false,
      borderless: false,
    },
  }
);

/**
 * Icon sizes mapped to button sizes
 */
const ICON_SIZES = {
  MD: '16px',
  SM: '16px',
};

/**
 * Check if icon is a React element (SVG)
 */
const iconIsSvg = (icon) => isValidElement(icon);

/**
 * Check if icon is an SVG data URL string
 */
const iconIsSvgUrl = (icon) => 
  typeof icon === 'string' && icon.startsWith('data:image/svg+xml');

/**
 * ActionButton component - Icon buttons with secondary/tertiary emphasis
 * 
 * @param {object} props - Component props
 * @param {boolean} [props.active=false] - Whether the button displays in an active/selected state
 * @param {'secondary' | 'tertiary'} [props.emphasis='secondary'] - Button emphasis level
 * @param {'MD' | 'SM'} [props.size='MD'] - Button size
 * @param {boolean} [props.destructive=false] - Whether the button is for destructive actions
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {boolean} [props.waiting=false] - Whether the button is in a loading state
 * @param {React.ReactNode | string} [props.icon] - Icon element, icon name, or SVG data URL
 * @param {boolean} [props.iconOnly=false] - Whether to show only icon with visually hidden text
 * @param {boolean} [props.fullWidth=false] - Whether button should fill container width
 * @param {boolean} [props.borderless=false] - Whether to hide the border/shadow
 * @param {string} [props.href] - If provided, renders as a link
 * @param {boolean} [props.asChild=false] - Whether to render as child element
 * @param {React.ReactNode} props.children - Button label
 */
const ActionButton = forwardRef(function ActionButton(
  {
    active = false,
    children,
    destructive = false,
    disabled = false,
    emphasis = 'secondary',
    icon,
    iconOnly = false,
    size = 'MD',
    type = 'button',
    waiting = false,
    fullWidth = false,
    borderless = false,
    asChild = false,
    href,
    className,
    ...props
  },
  ref
) {
  const iconSize = ICON_SIZES[size];
  
  // Process icon
  let iconElement = null;
  if (icon) {
    if (iconIsSvg(icon)) {
      // Clone the SVG element with proper sizing
      iconElement = cloneElement(icon, {
        'aria-hidden': true,
        style: { width: iconSize, height: iconSize, flexShrink: 0 },
      });
    } else if (iconIsSvgUrl(icon)) {
      // Render as image
      iconElement = (
        <img 
          src={icon} 
          alt="" 
          aria-hidden 
          style={{ width: iconSize, height: iconSize, flexShrink: 0 }} 
        />
      );
    } else if (typeof icon === 'string') {
      // Icon name - render a placeholder or use lucide-react
      // For now, we'll show a simple placeholder
      iconElement = (
        <span 
          aria-hidden 
          style={{ 
            width: iconSize, 
            height: iconSize, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {/* Icon placeholder - integrate with your icon system */}
          <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </span>
      );
    }
  }

  const buttonClasses = cn(
    actionButtonVariants({
      emphasis,
      size,
      destructive,
      active: active || waiting,
      iconOnly: iconOnly && !!icon,
      fullWidth,
      borderless,
    }),
    className
  );

  // Handle link rendering
  if (href) {
    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={buttonClasses}
        aria-disabled={disabled}
        {...props}
      >
        {iconElement}
        {iconOnly ? (
          <VisuallyHidden>{children}</VisuallyHidden>
        ) : (
          <span className="flex items-center justify-center gap-2">{children}</span>
        )}
      </a>
    );
  }

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      disabled={disabled || waiting}
      className={buttonClasses}
      {...props}
    >
      {iconElement}
      {iconOnly ? (
        <VisuallyHidden>{children}</VisuallyHidden>
      ) : (
        <span className="flex items-center justify-center gap-2">{children}</span>
      )}
      {waiting && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </span>
      )}
    </Comp>
  );
});

ActionButton.displayName = 'ActionButton';

export { ActionButton, actionButtonVariants };

