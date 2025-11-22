"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  StudentHeader,
  StudentWelcomeSection,
  StudentProgressStats,
  StudentSubjectsGrid,
  StudentQuickActions,
  StudentFooter,
  LoadingScreen,
} from "@/components";

export default function StudentDashboard() {
  const { student, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !student) {
      router.push("/login/estudante");
    }
  }, [student, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading) {
    return <LoadingScreen message="Carregando sua área..." />;
  }

  if (!student) {
    return null;
  }

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <StudentHeader student={student} onLogout={handleLogout} />

      {/* Main Content */}
      <main style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <div className="container-logiclike">
          <StudentWelcomeSection studentName={student.name} />
          <StudentProgressStats />
          <StudentSubjectsGrid />
          <StudentQuickActions />
        </div>
      </main>

      <StudentFooter />
    </div>
  );
}
