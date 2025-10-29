// src/App.tsx

import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "@/contexts/BookingContext";
import { HelmetProvider } from 'react-helmet-async';
import TrialBookingDialog from "@/components/booking/TrialBookingDialog";

// Lazy load route components for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

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
                        <Suspense fallback={<PageLoader />}>
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
                                <Route path="/dog-walking-versova" element={<LocationPage location="versova" />} />
                                <Route path="/dog-walking-malad" element={<LocationPage location="malad" />} />
                                <Route path="/dog-walking-borivali" element={<LocationPage location="borivali" />} />
                                <Route path="/dog-walking-kandivali" element={<LocationPage location="kandivali" />} />
                                <Route path="/dog-walking-santacruz" element={<LocationPage location="santacruz" />} />
                                <Route path="/dog-walking-khar" element={<LocationPage location="khar" />} />
                                <Route path="/dog-walking-byculla" element={<LocationPage location="byculla" />} />
                                <Route path="/dog-walking-dadar" element={<LocationPage location="dadar" />} />
                                <Route path="/dog-walking-matunga" element={<LocationPage location="matunga" />} />
                                <Route path="/dog-walking-kurla" element={<LocationPage location="kurla" />} />
                                <Route path="/dog-walking-chembur" element={<LocationPage location="chembur" />} />
                                <Route path="/dog-walking-ghatkopar" element={<LocationPage location="ghatkopar" />} />
                                <Route path="/dog-walking-mulund" element={<LocationPage location="mulund" />} />
                                <Route path="/dog-walking-navi-mumbai" element={<LocationPage location="navi-mumbai" />} />
                                <Route path="/dog-walking-vile-parle" element={<LocationPage location="vile-parle" />} />
                                <Route path="/dog-walking-goregaon" element={<LocationPage location="goregaon" />} />

                                {/* 404 - MUST BE LAST */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                    <TrialBookingDialog />
                </BookingProvider>
            </TooltipProvider>
        </QueryClientProvider>
    </HelmetProvider>
);

export default App;