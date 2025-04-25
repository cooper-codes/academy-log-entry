
import { Toaster } from "@/components/shared/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

const App = () => (
  <ApolloProvider client={client}>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
