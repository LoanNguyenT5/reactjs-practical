import React, { useState, useEffect } from "react";
import { Address } from "../data-types";

interface AddressFormProps {
  initialData?: Address[]; 
  setUserData: React.Dispatch<React.SetStateAction<any>>; 
}

const AddressForm: React.FC<AddressFormProps> = ({ initialData = [], setUserData }) => {
  const [addressForms, setAddressForms] = useState<Address[]>(
    initialData.map((address) => ({
      ...address,
      type: 'mailing',
    }))
  );
  

  useEffect(() => {
    setAddressForms(initialData);
  }, [initialData]);

  const handleInputChange = (
    index: number,
    field: keyof Address,
    value: string | number
  ) => {
    const updatedAddressForms = addressForms.map((address, i) =>
      i === index ? { ...address, [field]: value } : address
    );
    setAddressForms(updatedAddressForms);
    
    setUserData((prevState: any) => ({
      ...prevState,
      address: updatedAddressForms, 
    }));
  };

  const handleAddAddress = () => {
    setAddressForms((prev) => [
      ...prev,
      { address: "", city: "", state: "", stateCode: "", postalCode: "", coordinates: { lat: 0, lng: 0 }, country: "", type: "mailing" }, // Giá trị mặc định type là "mailing"
    ]);
  };

  return (
    <div>
      {addressForms.map((address, index) => (
        <div key={index} className="address-form mb-6">
          <h4 className="text-md font-semibold mb-4">Address #{index + 1}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`country-${index}`}
                className="block text-sm font-medium"
              >
                Country
              </label>
              <input
                type="text"
                id={`country-${index}`}
                value={address.country}
                onChange={(e) =>
                  handleInputChange(index, "country", e.target.value)
                }
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Enter country"
                required
              />
            </div>
            <div>
              <label
                htmlFor={`city-${index}`}
                className="block text-sm font-medium"
              >
                City
              </label>
              <input
                type="text"
                id={`city-${index}`}
                value={address.city}
                onChange={(e) =>
                  handleInputChange(index, "city", e.target.value)
                }
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Enter city"
                required
              />
            </div>
            <div>
              <label
                htmlFor={`street-${index}`}
                className="block text-sm font-medium"
              >
                Street
              </label>
              <input
                type="text"
                id={`street-${index}`}
                value={address.address}
                onChange={(e) =>
                  handleInputChange(index, "address", e.target.value)
                }
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Enter street"
                required
              />
            </div>
            <div>
              <label
                htmlFor={`postal-code-${index}`}
                className="block text-sm font-medium"
              >
                Postal Code
              </label>
              <input
                type="text"
                id={`postal-code-${index}`}
                value={address.postalCode}
                onChange={(e) =>
                  handleInputChange(index, "postalCode", e.target.value)
                }
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Enter postal code"
              />
            </div>
            <div>
              <label
                htmlFor={`address-type-${index}`}
                className="block text-sm font-medium"
              >
                Type
              </label>
              <select
                id={`address-type-${index}`}
                value={address.type}
                onChange={(e) =>
                  handleInputChange(index, "type", e.target.value)
                }
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              >
                <option value="mailing">Mailing</option>
                <option value="work">Work</option>
              </select>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddAddress}
        className="btn-primary px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
      >
        Add Address
      </button>
    </div>
  );
};

export default AddressForm;
