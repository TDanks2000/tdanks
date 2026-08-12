import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Box, Github } from "lucide-react";
import { type PropsWithChildren } from "react";

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
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border border-border/60 bg-card/70 shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardHeader className="space-y-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-background/70 shadow-sm">
            {icon ? (
              <div className="flex size-7 items-center justify-center text-primary *:size-full">
                {icon}
              </div>
            ) : image ? (
              <img
                className="size-8 object-contain"
                src={image}
                alt={title ? `${title} logo` : "Project logo"}
              />
            ) : (
              <Box className="size-6 text-muted-foreground" />
            )}
          </div>

          <div className="flex items-center gap-2">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title ?? "Project"} on GitHub`}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <Github className="size-4" />
              </a>
            ) : null}

            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${title ?? "project"}`}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
        </div>

        <div>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block max-w-full"
            >
              <h3 className="break-words text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                {title}
              </h3>
            </a>
          ) : (
            <h3 className="break-words text-xl font-semibold tracking-tight">{title}</h3>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col pt-0">
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        {children ? <div className="mt-4">{children}</div> : null}
      </CardContent>

      <CardFooter className="mt-auto flex flex-wrap gap-2 border-t border-border/50 pt-5">
        {stack?.map((stackItem) => (
          <a
            key={stackItem.name}
            href={stackItem.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
          >
            {typeof stackItem.icon === "string" ? (
              <img
                className="size-3.5 rounded-sm object-contain"
                src={stackItem.icon}
                alt=""
              />
            ) : (
              <span className="flex size-3.5 items-center justify-center *:size-full">
                {stackItem.icon}
              </span>
            )}
            <span>{stackItem.name}</span>
          </a>
        ))}
      </CardFooter>
    </Card>
  );
};

export default BoxCard;
