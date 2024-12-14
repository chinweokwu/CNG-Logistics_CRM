import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "@/lib/store";
import { AuthPage } from "@/pages/Auth";
import { AdminPage } from "@/pages/admin";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/AuthProvider";
// import { MainNav } from "@/components/navigation/MainNav";
import { DriversManagement } from "@/components/drivers";
import { TripsManagement } from "@/components/trips";
import { MaintenanceManagement } from "@/components/maintenance";
import { IssuesManagement } from "@/components/issues";
import { ReportsManagement } from "@/components/reports";
import { Settings } from "@/components/settings";
import { Dashboard } from "@/components/dashboard";
import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <ThemeProvider defaultTheme="dark" storageKey="cng-logistics-theme">
            {/* <MainNav /> */}
            <Layout>
              <div className="">
                <Routes>
                  <Route path="/auth" element={<AuthPage />} />
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute>
                        <AdminPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/*"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  {/* Protecting all other routes */}
                  <Route
                    path="/drivers"
                    element={
                      <ProtectedRoute>
                        <DriversManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/trips"
                    element={
                      <ProtectedRoute>
                        <TripsManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/maintenance"
                    element={
                      <ProtectedRoute>
                        <MaintenanceManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/issues"
                    element={
                      <ProtectedRoute>
                        <IssuesManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute>
                        <ReportsManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  {/* Redirect to dashboard if accessing root */}
                  {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
                </Routes>
              </div>
            </Layout>
            <Toaster />
          </ThemeProvider>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
