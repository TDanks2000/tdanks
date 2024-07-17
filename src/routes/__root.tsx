import '../styles/globals.css';

import Background from '@/components/bg';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="game-tracking-app-theme"
    >
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <Background />
          <Outlet />
          {/* <TanStackRouterDevtools /> */}
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  ),
});
