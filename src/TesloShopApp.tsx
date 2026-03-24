import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from 'sonner'
import type { PropsWithChildren } from "react"
import { CheckAuthAction } from "./auth/actions/check-auth.action"
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading"

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: CheckAuthAction,
        retry: false,
        refetchInterval: 1000 * 60 * 1.5, // Revalidar la sesión 1 hora y media después
        refetchOnWindowFocus: true
    });

    if (isLoading) return <CustomFullScreenLoading />

    return children;
}

export const TesloShopApp = () => {



    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <CheckAuthProvider>
                <RouterProvider router={appRouter} />

            </CheckAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
