"use client";
import DashboardLayout from "./DashBoardLayout";
const SessionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
};
export default SessionLayout;
