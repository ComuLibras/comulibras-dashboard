import { queryClient } from "@/application/shared/clients/query-client";
// import { ThemeProvider } from "@/application/shared/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Router } from "./routes/router";

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient} >
      {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
        <Router />
        <Toaster position="bottom-right" richColors />
      {/* </ThemeProvider> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
};
