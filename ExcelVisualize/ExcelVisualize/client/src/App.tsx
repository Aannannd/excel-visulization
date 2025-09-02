import { Switch, Route } from "wouter";
import { Provider } from "react-redux";
import { store } from "./store";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/Layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import UploadAnalyze from "@/pages/UploadAnalyze";
import AnalysisHistory from "@/pages/AnalysisHistory";
import MyCharts from "@/pages/MyCharts";
import UserManagement from "@/pages/UserManagement";
import PlatformAnalytics from "@/pages/PlatformAnalytics";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/upload" component={UploadAnalyze} />
        <Route path="/history" component={AnalysisHistory} />
        <Route path="/charts" component={MyCharts} />
        <Route path="/admin/users" component={UserManagement} />
        <Route path="/admin/analytics" component={PlatformAnalytics} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
