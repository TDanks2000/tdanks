interface SocialLinkProps {
  href: string;
  icon: JSX.Element;
}

const SocialLink = ({ href, icon }: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      className="flex items-center justify-center p-2 transition-all duration-300 rounded-full bg-card/50 hover:bg-purple-500/20 hover:text-purple-400 focus:bg-purple-500/20 focus:text-purple-400 focus:outline-hidden focus:ring-2 focus:ring-purple-400/50"
      rel="noopener noreferrer"
      aria-label="Social media link"
    >
      <span className="*:size-6">{icon}</span>
    </a>
  );
};

export default SocialLink;
