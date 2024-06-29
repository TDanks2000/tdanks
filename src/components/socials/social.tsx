import { FC } from 'react';

interface SocialLinkProps {
  href: string;
  icon: JSX.Element;
}

const SocialLink: FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <a
      href={href}
      target="_blank"
      className="*:size-9 hover:text-purple-400 group-focus-within:text-purple-400"
    >
      {icon}
    </a>
  );
};

export default SocialLink;
