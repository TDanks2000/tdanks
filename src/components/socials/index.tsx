import SocialLink from '@/components/socials/social';
import { IoIosMail } from 'react-icons/io';
import { IoLogoGithub } from 'react-icons/io5';
import { SiAnilist, SiKofi } from 'react-icons/si';

const SocailsComponent = () => {
  return (
    <div className="flex flex-row items-center gap-3.5">
      <SocialLink
        href="https://github.com/tdanks2000"
        icon={<IoLogoGithub />}
      />

      <SocialLink
        href={'mailto:tommydanks2000@outlook.com'}
        icon={<IoIosMail />}
      />

      <SocialLink
        href="https://anilist.co/user/TDanks2000/"
        icon={<SiAnilist />}
      />

      <SocialLink
        href="https://ko-fi.com/tdanks2000"
        icon={<SiKofi />}
      />
    </div>
  );
};

export default SocailsComponent;
