import React, { useState, useEffect } from "react";
import { Email } from "../data-types";


interface AddEmailFormProps {
  initialData: Email[];
  setUserData: React.Dispatch<React.SetStateAction<any>>; 
}

const AddEmailForm: React.FC<AddEmailFormProps> = ({ initialData, setUserData }) => {
  const [emailForms, setEmailForms] = useState<Email[]>([]);

  useEffect(() => {
    setEmailForms(initialData);
  }, [initialData]);

  const handleEmailChange = (index: number, value: string) => {
    const updatedEmails = [...emailForms];
    updatedEmails[index].email = value;
    setEmailForms(updatedEmails);
    setUserData((prevState: any) => ({
      ...prevState,
      email: updatedEmails,
    }));
  };

  const handlePreferredChange = (index: number, value: string) => {
    const updatedEmails = [...emailForms];
    updatedEmails[index].preferred = value;
    setEmailForms(updatedEmails);
    setUserData((prevState: any) => ({
      ...prevState,
      email: updatedEmails,
    }));
  };

  const handleTypeChange = (index: number, value: string) => {
    const updatedEmails = [...emailForms];
    updatedEmails[index].type = value;
    setEmailForms(updatedEmails);
    setUserData((prevState: any) => ({
      ...prevState,
      email: updatedEmails,
    }));
  };

  const handleAddEmail = () => {
    setEmailForms((prev) => [
      ...prev,
      { email: "", preferred: "", type: "" },
    ]);
  };

  return (
    <div>
      {emailForms.map((emailForm, index) => (
        <div key={index} className="address-form mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor={`email-${index}`}
                className="block text-sm font-medium mb-2"
              >
                Email #{index + 1}
              </label>
              <input
                id={`email-${index}`}
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                value={emailForm.email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div>
              <label
                htmlFor={`preferred-email-${index}`}
                className="block text-sm font-medium mb-2"
              >
                Preferred
              </label>
              <select
                id={`preferred-email-${index}`}
                value={emailForm.preferred}
                onChange={(e) => handlePreferredChange(index, e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor={`type-email-${index}`}
              className="block text-sm font-medium mb-2"
            >
              Type
            </label>
            <select
              id={`type-email-${index}`}
              value={emailForm.type}
              onChange={(e) => handleTypeChange(index, e.target.value)}
              className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
            </select>
          </div>

        </div>
      ))}
      <button className="btn-primary px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        onClick={handleAddEmail}>Add Email</button>
    </div>
  );
};

export default AddEmailForm;
