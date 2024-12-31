import React, { useState, useEffect } from "react";
import { Identifications } from "../data-types";

interface AddIdentificationFormProps {
  initialData?: Identifications[] | Identifications; 
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

const AddIdentificationForm: React.FC<AddIdentificationFormProps> = ({
  initialData = [{ type: "", expiryDate: "", file: null }],
  setUserData,
}) => {

  const [idForms, setIdForms] = useState<Identifications[]>(
    Array.isArray(initialData)
      ? initialData.length === 0
        ? [{ type: "national-id", expiryDate: "", file: null }] 
        : initialData
      : initialData
      ? [initialData]
      : [{ type: "national-id", expiryDate: "", file: null }] 
  );

  useEffect(() => {

    if (!Array.isArray(initialData)) {
      console.error("initialData is not an array:", initialData);
      setIdForms(initialData ? [initialData] : [{ type: "national-id", expiryDate: "", file: null }]); 
    } else if (initialData.length === 0) {
      setIdForms([{ type: "national-id", expiryDate: "", file: null }]);
    } else {
      setIdForms(initialData); 
    }
  }, [initialData]);


  const handleIdChange = (
    index: number,
    field: keyof Identifications,
    value: string | File | null
  ) => {
    const updatedForms = idForms.map((id, i) =>
      i === index ? { ...id, [field]: value } : id
    );
    setIdForms(updatedForms);


    setUserData((prevState: any) => ({
      ...prevState,
      identifications: updatedForms,
    }));
  };

  const handleAddIdentification = () => {
    const newIdentification: Identifications = { type: "national-id", expiryDate: "", file: null };
    const updatedForms = [...idForms, newIdentification];
    setIdForms(updatedForms);
    setUserData((prevState: any) => ({
      ...prevState,
      identifications: updatedForms, 
    }));
  };

  return (
    <div>
      {idForms.map((form, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor={`id-type-${index}`} className="block text-sm font-medium">
              Type #{index + 1}
            </label>
            <select
              id={`id-type-${index}`}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              value={form.type}
              onChange={(e) => handleIdChange(index, "type", e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="national-id">National ID Card</option>
              <option value="driver-license">Driver License</option>
            </select>
          </div>
          <div>
            <label htmlFor={`id-expired-${index}`} className="block text-sm font-medium">
              Expiry Date
            </label>
            <input
              type="date"
              id={`id-expired-${index}`}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              value={form.expiryDate}
              onChange={(e) => handleIdChange(index, "expiryDate", e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor={`id-file-${index}`} className="block text-sm font-medium">
            Upload Document
            </label>
            <input
              type="file"
              id={`id-file-${index}`}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                handleIdChange(index, "file", file); 
              }}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddIdentification}
        className="btn-primary px-4 py-2 rounded-md"
      >
        Add Identification Document
      </button>
    </div>
  );
};

export default AddIdentificationForm;
