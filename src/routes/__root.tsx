import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navBar";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div>
			<NavBar />
			<Outlet />
			<Footer />
		</div>
	);
}
