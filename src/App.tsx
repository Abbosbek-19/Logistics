import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Vehicles from "@/pages/vehicles";
import Drivers from "@/pages/drivers";
import Shipments from "@/pages/shipments";
import Routes from "@/pages/routes";
import Reports from "@/pages/reports";
import FuelPage from "@/pages/fuel";
import MaintenancePage from "@/pages/maintenance";
import SettingsPage from "@/pages/settings";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "wouter";

function PageBreadcrumb() {
  const [location] = useLocation();

  const breadcrumbMap: Record<string, { label: string; parent?: { path: string; label: string } }> = {
    "/": { label: "Boshqaruv paneli" },
    "/vehicles": { label: "Avtoparklar" },
    "/drivers": { label: "Haydovchilar" },
    "/shipments": { label: "Jo‘natmalar" },
    "/routes": { label: "Marshrutlar" },
    "/reports": { label: "Hisobotlar" },
    "/fuel": { label: "Yoqilg‘i", parent: { path: "/reports", label: "Hisobotlar" } },
    "/maintenance": { label: "Texnik xizmat", parent: { path: "/reports", label: "Hisobotlar" } },
    "/settings": { label: "Sozlamalar" },
  };

  const current = breadcrumbMap[location] || { label: "Sahifa" };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Bosh sahifa</BreadcrumbLink>
        </BreadcrumbItem>
        {current.parent && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={current.parent.path}>{current.parent.label}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {location !== "/" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{current.label}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/vehicles" component={Vehicles} />
      <Route path="/drivers" component={Drivers} />
      <Route path="/shipments" component={Shipments} />
      <Route path="/routes" component={Routes} />
      <Route path="/reports" component={Reports} />
      <Route path="/fuel" component={FuelPage} />
      <Route path="/maintenance" component={MaintenancePage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3.5rem",
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="transport-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <SidebarInset className="flex flex-col flex-1 overflow-hidden">
                <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sticky top-0 z-50">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
                    <Separator orientation="vertical" className="h-6" />
                    <PageBreadcrumb />
                  </div>
                  <ThemeToggle />
                </header>
                <main className="flex-1 overflow-auto">
                  <AppRouter />
                </main>
              </SidebarInset>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
