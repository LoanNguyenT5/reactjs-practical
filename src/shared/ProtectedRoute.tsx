import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticatedContext } from "./Authenticated";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Lấy context, và nếu context là null thì xử lý an toàn
  const authContext = useContext(AuthenticatedContext);

  if (!authContext || !authContext.user) {
    // Nếu context là null hoặc user không có, chuyển hướng đến trang đăng nhập
    return <Navigate to="/pages/auth/login" />;
  }

  // Nếu đã đăng nhập, hiển thị nội dung
  return <>{children}</>;
};

export default ProtectedRoute;
