
import type { AppProps } from "next/app";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
 import { ConfirmProvider } from "material-ui-confirm";
 import MuiThemeProvider from "../mui-theme/MuiThemeProvider";

// Create a client
const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  return <>
  <ConfirmProvider>
    <MuiThemeProvider>
   <QueryClientProvider client={queryClient}>
   
  <ToastContainer/>
  <Component {...pageProps} />
 
  </QueryClientProvider>
  </MuiThemeProvider>
  </ConfirmProvider>
  </>;
}
