import { IoIosMail } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io5";
import { SiAnilist, SiKofi } from "react-icons/si";
import SocialLink from "@/components/socials/social";

const SocailsComponent = () => {
	return (
		<div className="flex flex-row items-center gap-3.5">
			<SocialLink
				href="https://github.com/tdanks2000"
				icon={<IoLogoGithub />}
				label="GitHub"
			/>

			<SocialLink
				href={"mailto:tommydanks2000@outlook.com"}
				icon={<IoIosMail />}
				label="Email"
			/>

			<SocialLink
				href="https://anilist.co/user/TDanks2000/"
				icon={<SiAnilist />}
				label="AniList"
			/>

			<SocialLink
				href="https://ko-fi.com/tdanks2000"
				icon={<SiKofi />}
				label="Ko-fi"
			/>
		</div>
	);
};

export default SocailsComponent;
