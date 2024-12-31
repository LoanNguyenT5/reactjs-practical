export interface KycSubmission {
    submissionId: string;
    submissionDate: string;
    approvalStatus: boolean;
    personalInformation: {
      basicInformation: {
        firstName: string;
      };
    };
  }
  
  export interface ApiResponse {
    kycSubmissions: KycSubmission[];
  }