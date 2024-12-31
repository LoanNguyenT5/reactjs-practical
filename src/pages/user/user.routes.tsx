import { RouteObject } from "react-router";
import PersonalInformation from "./personal-information/personal-information";
import UserKYC from "./kyc/kyc";
import User from "./user";
import PersonalInformationEdit from "./personal-information/personal-infor-edit";
import ClientList from "./list/client-list";
import KYCSubmission from "./kyc/kyc-submission";
import ProtectedRoute from "../../shared/ProtectedRoute";

const userRoutes: RouteObject[] = [
  {
    path: "user",
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ":id/pi",
        element: (
          <ProtectedRoute>
            <PersonalInformation />
          </ProtectedRoute>
        ),
      },
      {
        path: ":id/pi-edit",
        element: (
         
            <PersonalInformationEdit />
         
        ),
      },
      {
        path: ":id/kyc",
        element: (
          <ProtectedRoute>
            <UserKYC />
          </ProtectedRoute>
        ),
      },
      {
        path: ":kyc-preview",
        element: (
          <ProtectedRoute>
            <KYCSubmission />
          </ProtectedRoute>
        ),
      },

    //   {
    //     path: ":client-list",
    //     element: (
    //         <ProtectedRoute>
    //         <ClientList />
    //         </ProtectedRoute>
    //     ),
    //   },
    ],
  },
];

export default userRoutes;
