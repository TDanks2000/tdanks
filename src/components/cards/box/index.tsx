import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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
}

const BoxCard: FC<BoxCardProps> = ({ children, description, href, title, image, icon, github }) => {
  return (
    <a
      href={href}
      className={cn({
        group: href,
      })}
    >
      <Card className="group-hover:bg-primary/5 transition-all group-focus-within:bg-primary/5">
        <div className="max-w-80 min-w-52 h-60 min-h-16 overflow-hidden">
          <CardHeader>
            <div className="flex flex-row gap-4 items-end w-full h-11 overflow-hidden">
              <div className="size-10">
                {icon ? (
                  <div className="*:size-full">{icon}</div>
                ) : image ? (
                  <img
                    className="size-full rounded-md overflow-hidden object-cover"
                    src={image}
                    alt={title}
                  />
                ) : (
                  <CircleHelp className="size-full text-red-500" />
                )}
              </div>
              <div>
                <h2 className="line-clamp-1 group-hover:underline group-focus-within:underline transition-all">
                  {title}
                </h2>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm overflow-hidden line-clamp-4">{description}</p>
            <p>{children}</p>
          </CardContent>

          {github && (
            <CardFooter>
              <div className="flex items-center justify-start w-full">
                <a
                  href={github}
                  target="_blank"
                  className="text-sm flex flex-row gap-2 items-center hover:underline focus-within:underline"
                >
                  <IoLogoGithub className="size-6" />
                  <p>Github</p>
                </a>
              </div>
            </CardFooter>
          )}
        </div>
      </Card>
    </a>
  );
};

export default BoxCard;
