import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CircleHelp } from "lucide-react";
import { type PropsWithChildren } from "react";
import { IoLogoGithub } from "react-icons/io5";

interface BoxCardProps extends PropsWithChildren {
  href?: string;
  title?: string;
  description?: string;
  image?: string;
  icon?: JSX.Element;
  github?: string;
  stack?: Array<{
    icon: JSX.Element | string;
    name: string;
    href: string;
  }>;
}

const BoxCard = ({
  children,
  description,
  href,
  title,
  image,
  icon,
  github,
  stack,
}: BoxCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn({
        group: href,
      })}
    >
      <Card className="transition-all duration-300 size-full border border-border/50 hover:border-purple-500/30 group-hover:shadow-lg group-hover:shadow-purple-500/10 group-hover:bg-primary/5 group-focus-within:bg-primary/5">
        <div className="overflow-hidden w-full size-full">
          <CardHeader>
            <div className="flex flex-row items-center w-full gap-4 overflow-hidden">
              <div className="flex  size-12 rounded-lg shadow-sm">
                {icon ? (
                  <div className="*:size-full text-purple-500 shrink-0 grow-0">
                    {icon}
                  </div>
                ) : image ? (
                  <img
                    className="object-cover overflow-hidden rounded-md size-full"
                    src={image}
                    alt={title}
                  />
                ) : (
                  <CircleHelp className="text-red-500 size-full" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold transition-all line-clamp-1 group-hover:text-purple-400 group-hover:underline underline-offset-2 group-focus-within:underline">
                  {title}
                </h2>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="overflow-hidden text-sm text-muted-foreground line-clamp-4 mt-2">
              {description}
            </p>
            {children && <div className="mt-4">{children}</div>}
          </CardContent>

          <CardFooter>
            <div className="flex items-center justify-between w-full truncate">
              {github && (
                <div className="flex items-center justify-start">
                  <a
                    href={github}
                    target="_blank"
                    className="relative flex flex-row items-center gap-2 overflow-hidden text-sm hover:underline underline-offset-2 focus-within:underline group/github"
                  >
                    <IoLogoGithub className="relative z-10 size-6" />
                    <p className="relative transition-all opacity-0 -left-5 group-focus-within/github:opacity-100 group-hover/github:left-0 group-hover/github:opacity-100 z-2">
                      Github
                    </p>
                  </a>
                </div>
              )}

              {/* Stack */}
              <div className="flex flex-row items-end justify-end flex-1 w-full gap-2 truncate">
                {stack?.map((stack, i) => {
                  return (
                    <Tooltip key={i}>
                      <TooltipTrigger asChild>
                        <a
                          href={stack.href}
                          target="_blank"
                          className="flex flex-row items-center text-sm group"
                        >
                          <span className="hover:text-purple-400 focus-within:text-purple-400">
                            {typeof stack.icon === "string" ? (
                              <img
                                className="object-cover overflow-hidden rounded-md size-4 sm:size-5"
                                src={stack.icon}
                                alt={stack.name}
                              />
                            ) : (
                              <span className="*:text-inherit *:size-4 sm:*:size-5">
                                {stack.icon}{" "}
                              </span>
                            )}
                          </span>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent asChild>
                        <p>{stack.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
    </a>
  );
};

export default BoxCard;
