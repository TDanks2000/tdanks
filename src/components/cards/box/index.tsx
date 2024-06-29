import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { CircleHelp } from 'lucide-react';
import { type FC, type PropsWithChildren } from 'react';
import { IoLogoGithub } from 'react-icons/io5';

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

const BoxCard: FC<BoxCardProps> = ({ children, description, href, title, image, icon, github, stack }) => {
  return (
    <a
      href={href}
      className={cn({
        group: href,
      })}
    >
      <Card className="transition-all group-hover:bg-primary/5 group-focus-within:bg-primary/5">
        <div className="overflow-hidden w-full sm:max-w-[340px] min-w-52 h-60 min-h-16">
          <CardHeader>
            <div className="flex flex-row items-end w-full gap-4 overflow-hidden h-11">
              <div className="size-10">
                {icon ? (
                  <div className="*:size-full">{icon}</div>
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
                <h2 className="transition-all line-clamp-1 group-hover:underline group-focus-within:underline">
                  {title}
                </h2>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="overflow-hidden text-sm line-clamp-4">{description}</p>
            <p>{children}</p>
          </CardContent>

          <CardFooter>
            <div className="flex items-center justify-between w-full truncate">
              {github && (
                <div className="flex items-center justify-start">
                  <a
                    href={github}
                    target="_blank"
                    className="flex flex-row items-center gap-2 text-sm hover:underline focus-within:underline"
                  >
                    <IoLogoGithub className="size-6" />
                    <p>Github</p>
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
                            {typeof stack.icon === 'string' ? (
                              <img
                                className="object-cover overflow-hidden rounded-md size-4"
                                src={stack.icon}
                                alt={stack.name}
                              />
                            ) : (
                              <span className="*:text-inherit *:size-4">{stack.icon} </span>
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
