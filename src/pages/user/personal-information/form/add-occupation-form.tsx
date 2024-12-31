import React, { useState, useEffect } from "react";
import { Occupations } from "../data-types";

interface AddOccupationFormProps {
  initialData: Occupations[];
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

const AddOccupationForm: React.FC<AddOccupationFormProps> = ({
  initialData = [{ occupation: "unemployed", fromDate: "", toDate: "" }],
  setUserData,
}) => {
  const [occupationForms, setOccupationForms] = useState<Occupations[]>([]);

  useEffect(() => {
    setOccupationForms(initialData.length ? initialData : [
      { occupation: "unemployed", fromDate: "", toDate: "" },
    ]);
  }, [initialData]);

  const handleOccupationChange = (index: number, field: keyof Occupations, value: string) => {
    const updatedForms = [...occupationForms];
    updatedForms[index][field] = value;
    setOccupationForms(updatedForms);


    setUserData((prevState: any) => ({
      ...prevState,
      occupations: updatedForms,
    }));
  };


  const handleAddOccupation = () => {
    const newOccupation = { occupation: "unemployed", fromDate: "", toDate: "" };
    const updatedForms = [...occupationForms, newOccupation];
    setOccupationForms(updatedForms);

    setUserData((prevState: any) => ({
      ...prevState,
      occupations: updatedForms,
    }));
  };

  return (
    <div>
      {occupationForms.map((form, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor={`occupation-${index}`} className="block text-sm font-medium">
              Occupation #{index + 1}
            </label>
            <select
              id={`occupation-${index}`}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              value={form.occupation}
              onChange={(e) =>
                handleOccupationChange(index, "occupation", e.target.value)
              }
              required
            >
              <option value="unemployed">Unemployed</option>
              <option value="engineer">Engineer</option>
              <option value="teacher">Teacher</option>
              <option value="doctor">Doctor</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div>
            <label htmlFor={`occupation-from-${index}`} className="block text-sm font-medium">
              From Date
            </label>
            <input
              type="date"
              id={`occupation-from-${index}`}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              value={form.fromDate}
              onChange={(e) =>
                handleOccupationChange(index, "fromDate", e.target.value)
              }
              required
            />
          </div>
          <div>
            <label htmlFor={`occupation-to-${index}`} className="block text-sm font-medium">
              To Date
            </label>
            <input
              type="date"
              id={`occupation-to-${index}`}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              value={form.toDate}
              onChange={(e) =>
                handleOccupationChange(index, "toDate", e.target.value)
              }
              required
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddOccupation}
        className="btn-primary px-4 py-2 rounded-md"
      >
        Add Occupation
      </button>
    </div>
  );
};

export default AddOccupationForm;
