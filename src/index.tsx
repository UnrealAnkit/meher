import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Mehr } from "./screens/Mehr";
import { AboutPage } from "./pages/AboutPage";
import { ProgramsPage } from "./pages/ProgramsPage";
import { BlogsPage } from "./pages/BlogsPage";
import { ContactPage } from "./pages/ContactPage";
import { CalendarPage } from "./pages/CalendarPage";
import { GalleryPage } from "./pages/GalleryPage";
import { LearningPage } from "./pages/LearningPage";
import { RejuvenationPage } from "./pages/RejuvenationPage";
import { RejuvenationPackagePage } from "./pages/RejuvenationPackagePage";
import { YogaTeacherTrainingPage } from "./pages/YogaTeacherTrainingPage";
import { AerialYogaTeacherTrainingPage } from "./pages/AerialYogaTeacherTrainingPage";
import { BookYourStayPage } from "./pages/BookYourStayPage";
import { PaymentSuccessfulPage } from "./pages/PaymentSuccessfulPage";
import { PaymentFailedPage } from "./pages/PaymentFailedPage";
import { TermsAndConditionsPage } from "./pages/TermsAndConditionsPage";
import { RefundPolicyPage } from "./pages/RefundPolicyPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboardOverview } from "./pages/admin/AdminDashboardOverview";
import { AdminEventsPage } from "./pages/admin/AdminEventsPage";
import { AdminClassesPage } from "./pages/admin/AdminClassesPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminBookingsPage } from "./pages/admin/AdminBookingsPage";
import { AdminBlogsPage } from "./pages/admin/AdminBlogsPage";
import { supabase } from "./lib/supabase";

const AdminWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      setLoading(false);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg [font-family:'Poppins',Helvetica]">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? (
    <>
      {children}
    </>
  ) : (
    <Navigate to="/admin/login" />
  );
};

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mehr />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/rejuvenation" element={<RejuvenationPage />} />
        <Route path="/rejuvenate" element={<RejuvenationPage />} />
        <Route path="/rejuvenation/package" element={<RejuvenationPackagePage />} />
        <Route path="/yoga-teacher-training" element={<YogaTeacherTrainingPage />} />
        <Route path="/aerial-yoga-teacher-training" element={<AerialYogaTeacherTrainingPage />} />
        <Route path="/book-your-stay" element={<BookYourStayPage />} />
        <Route path="/book-stay" element={<BookYourStayPage />} />
        <Route path="/payment/success" element={<PaymentSuccessfulPage />} />
        <Route path="/payment/failed" element={<PaymentFailedPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Policy Pages */}
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        
        {/* Admin Routes */}
        <Route
          path="/admin/login"
          element={
            <AdminLoginPage
              onLoginSuccess={() => {
                setShowAdmin(true);
                window.location.href = "/admin/dashboard";
              }}
            />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminWrapper>
              <AdminLayout
                onLogout={async () => {
                  await supabase.auth.signOut();
                  setShowAdmin(false);
                  window.location.href = "/";
                }}
              >
                <AdminDashboardOverview />
              </AdminLayout>
            </AdminWrapper>
          }
        />
        <Route
          path="/admin/events"
          element={
            <AdminWrapper>
              <AdminLayout
                onLogout={async () => {
                  await supabase.auth.signOut();
                  setShowAdmin(false);
                  window.location.href = "/";
                }}
              >
                <AdminEventsPage />
              </AdminLayout>
            </AdminWrapper>
          }
        />
        <Route
          path="/admin/classes"
          element={
            <AdminWrapper>
              <AdminLayout
                onLogout={async () => {
                  await supabase.auth.signOut();
                  setShowAdmin(false);
                  window.location.href = "/";
                }}
              >
                <AdminClassesPage />
              </AdminLayout>
            </AdminWrapper>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminWrapper>
              <AdminLayout
                onLogout={async () => {
                  await supabase.auth.signOut();
                  setShowAdmin(false);
                  window.location.href = "/";
                }}
              >
                <AdminUsersPage />
              </AdminLayout>
            </AdminWrapper>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <AdminWrapper>
              <AdminLayout
                onLogout={async () => {
                  await supabase.auth.signOut();
                  setShowAdmin(false);
                  window.location.href = "/";
                }}
              >
                <AdminBookingsPage />
              </AdminLayout>
            </AdminWrapper>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <AdminWrapper>
              <AdminLayout
                onLogout={async () => {
                  await supabase.auth.signOut();
                  setShowAdmin(false);
                  window.location.href = "/";
                }}
              >
                <AdminBlogsPage />
              </AdminLayout>
            </AdminWrapper>
          }
        />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
