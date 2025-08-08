import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface SocialLinkProps {
	href: string;
	icon: JSX.Element;
	label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					asChild
					variant="ghost"
					size="icon"
					className="rounded-full bg-card/50 hover:text-primary hover:bg-accent/50 focus-visible:ring-primary/40"
					aria-label={label}
					title={label}
				>
					<a href={href} target="_blank" rel="noopener noreferrer">
						<span className="*:size-6">{icon}</span>
					</a>
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>{label}</p>
			</TooltipContent>
		</Tooltip>
	);
};

export default SocialLink;
