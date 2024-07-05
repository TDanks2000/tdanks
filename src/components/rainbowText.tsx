import { cn } from '@/lib/utils';
import { FC, HtmlHTMLAttributes, PropsWithChildren } from 'react';

interface RainbowTextProps extends HtmlHTMLAttributes<HTMLSpanElement> {}

const RainbowText: FC<PropsWithChildren<RainbowTextProps>> = ({ children: text, className, ...rest }) => {
  return (
    <span
      className={cn([
        'text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text',
        className,
      ])}
      {...rest}
    >
      {text}
    </span>
  );
};

export default RainbowText;
