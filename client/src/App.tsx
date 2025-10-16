// src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "@/contexts/BookingContext";
import { HelmetProvider } from 'react-helmet-async';
import TrialBookingDialog from "@/components/booking/TrialBookingDialog";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LocationPage from "./pages/LocationPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
    },
});

const App = () => (
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <BookingProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            {/* Homepage */}
                            <Route path="/" element={<Index />} />

                            {/* Blog Routes */}
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:slug" element={<BlogPost />} />

                            {/* Location-specific routes for local SEO */}
                            <Route path="/dog-walking-bandra" element={<LocationPage location="bandra" />} />
                            <Route path="/dog-walking-andheri" element={<LocationPage location="andheri" />} />
                            <Route path="/dog-walking-powai" element={<LocationPage location="powai" />} />
                            <Route path="/dog-walking-worli" element={<LocationPage location="worli" />} />
                            <Route path="/dog-walking-juhu" element={<LocationPage location="juhu" />} />
                            <Route path="/dog-walking-thane" element={<LocationPage location="thane" />} />
                            <Route path="/dog-walking-lower-parel" element={<LocationPage location="lower-parel" />} />
                            <Route path="/dog-walking-colaba" element={<LocationPage location="colaba" />} />

                            {/* 404 - MUST BE LAST */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                    <TrialBookingDialog />
                </BookingProvider>
            </TooltipProvider>
        </QueryClientProvider>
    </HelmetProvider>
);

export default App;