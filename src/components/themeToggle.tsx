import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
	if (typeof document !== "undefined") {
		return document.documentElement.classList.contains("dark") ? "dark" : "light";
	}

	return "light";
};

export const ThemeToggle = () => {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);
	const isDark = theme === "dark";

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", isDark);
		root.style.colorScheme = theme;
		window.localStorage.setItem("theme", theme);
	}, [isDark, theme]);

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			title={isDark ? "Switch to light mode" : "Switch to dark mode"}
			className="grid size-9 shrink-0 place-items-center rounded-[7px] border border-neutral-900/15 bg-white/50 text-neutral-800 transition-colors hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10"
		>
			{isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
		</button>
	);
};
