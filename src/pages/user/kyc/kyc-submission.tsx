import React, { useEffect, useState } from "react";

import { KycSubmission, ApiResponse } from './kyc-data-types';

const KYCSubmission: React.FC = () => {
  const [kycSubmissions, setKycSubmissions] = useState<KycSubmission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/c/adba-92a4-4224-8038');
        const data: ApiResponse = await response.json();
        setKycSubmissions(data.kycSubmissions || []); // Nếu kycSubmissions không có, trả về mảng rỗng
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 


  const approveSubmission = (submissionId: string) => {
    alert(`Approval action for submission: ${submissionId}`);
  };


  const rejectSubmission = (submissionId: string) => {
    alert(`Rejection action for submission: ${submissionId}`);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          KYC Submission
        </h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {kycSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center px-6 py-4">
                    No submissions found.
                  </td>
                </tr>
              ) : (
                kycSubmissions.map((submission) => (
                  <tr key={submission.submissionId} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-6 py-4">{submission.personalInformation.basicInformation.firstName}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium leading-tight ${
                          submission.approvalStatus
                            ? "text-green-700 bg-green-100"
                            : "text-red-700 bg-red-100"
                        } rounded-full`}
                      >
                        {submission.approvalStatus ? "Active" : "Pendding"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{submission.submissionDate}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => approveSubmission(submission.submissionId)}
                        className="text-green-600 dark:text-green-500 hover:underline"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectSubmission(submission.submissionId)}
                        className="text-red-600 dark:text-red-500 hover:underline ml-4"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KYCSubmission;
