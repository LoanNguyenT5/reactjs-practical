import React, { useState, useEffect } from "react";
import { Phone } from "../data-types"; 

interface AddPhoneFormProps {
  initialData: Phone[];
  setUserData: React.Dispatch<React.SetStateAction<any>>; 
}

const AddPhoneForm: React.FC<AddPhoneFormProps> = ({ initialData, setUserData }) => {

  const [phoneForms, setPhoneForms] = useState<Phone[]>([]);

  useEffect(() => {
    setPhoneForms(initialData);
  }, [initialData]);

  // Xử lý thay đổi phone
  const handlePhoneChange = (index: number, value: string) => {
    const updatedPhones = [...phoneForms];
    updatedPhones[index].phone = value;
    setPhoneForms(updatedPhones);
    setUserData((prevState: any) => ({
      ...prevState,
      phone: updatedPhones,
    }));
  };

  const handlePreferredChange = (index: number, value: string) => {
    const updatedPhones = [...phoneForms];
    updatedPhones[index].preferred = value;
    setPhoneForms(updatedPhones);
    setUserData((prevState: any) => ({
      ...prevState,
      phone: updatedPhones,
    }));
  };

  const handleTypeChange = (index: number, value: string) => {
    const updatedPhones = [...phoneForms];
    updatedPhones[index].type = value;
    setPhoneForms(updatedPhones);
    setUserData((prevState: any) => ({
      ...prevState,
      phone: updatedPhones,
    }));
  };

  const handleAddPhone = () => {
    setPhoneForms((prev) => [
      ...prev,
      { phone: "", preferred: "", type: "" },
    ]);
  };

  return (
    <div>
      {phoneForms.map((phoneForm, index) => (
        <div key={index} className="phone-form mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor={`phone-${index}`}
                className="block text-sm font-medium mb-2"
              >
                Phone #{index + 1}
              </label>
              <input
                id={`phone-${index}`}
                type="tel"
                value={phoneForm.phone}
                onChange={(e) => handlePhoneChange(index, e.target.value)}
                placeholder="Enter phone"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              />
            </div>
            <div>
              <label
                htmlFor={`preferred-${index}`}
                className="block text-sm font-medium mb-2"
              >
                Preferred
              </label>
              <select
                id={`preferred-${index}`}
                value={phoneForm.preferred}
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
              htmlFor={`type-${index}`}
              className="block text-sm font-medium mb-2"
            >
              Type
            </label>
            <select
              id={`type-${index}`}
              value={phoneForm.type}
              onChange={(e) => handleTypeChange(index, e.target.value)}
              className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
            >

              <option value="work">Work</option>
              <option value="personal">Personal</option>
            </select>
          </div>
        </div>

      ))}
      <button className="btn-primary px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600" onClick={handleAddPhone}>Add Phone</button>
    </div>
  );
};

export default AddPhoneForm;
