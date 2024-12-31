import '../../../App.css';
import React, { useState, useEffect } from "react";

import AddressForm from "./form/add-address-form";
import AddEmailForm from "./form/add-email-form";
import AddPhoneForm from "./form/add-phone-form";
import AddIdentificationForm from "./form/add-Identification-form";
import AddOccupationForm from "./form/add-occupation-form";
import { useParams } from 'react-router-dom';
import { UserData, Identifications, Address } from './data-types';
import { useNavigate } from "react-router-dom";

const PersonalInformationEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [addressForms, setAddressForms] = useState([1]);

    const convertToInputFormat = (date: string): string => {
        const parts = date.split("-");
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }
        return ""; 
    };

    const convertToMMDDYYYY = (date: string): string => {
        const parts = date.split("-");
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
        }
        return ""; 
    };



    useEffect(() => {
        if (id) {
            fetch(`https://dummyjson.com/user/${id}`)
                .then(response => response.json())
                .then((data: UserData) => {
                    console.log("User data:", data);

                    const addresses: Address[] = Array.isArray(data)
                        ? data.map((item) => ({
                            ...item,
                            type: item.type || "mailing", 

                        }))
                        : [
                            {
                                ...data.address,
                                type: "mailing", 
                            },
                        ];

                    setUserData({
                        firstName: data.firstName || "",
                        lastName: data.lastName || "",
                        maidenName: data.maidenName || "",
                        age: data.age || 0,
                        birthDate: data.birthDate || "",
                        email: Array.isArray(data.email)
                            ? data.email
                            : [
                                {
                                    email: typeof data.email === "string" ? data.email : "",
                                    preferred: "yes",
                                    type: "work",
                                },
                            ],
                        phone: Array.isArray(data.phone)
                            ? data.phone
                            : [
                                {
                                    phone: typeof data.phone === "string" ? data.phone : "",
                                    preferred: "yes",
                                    type: "work",
                                },
                            ],
                        address: addresses,
                        occupations: data.occupations || [],
                        identifications: (data.identifications || []).map((id: any) => ({
                            type: id.type || "",
                            expiryDate: id.expiryDate || "",
                            file: id.file instanceof File ? id.file : null,
                        })),
                    });
                })
                .catch(error => console.error("Error fetching user data:", error));
        }
    }, [id]);

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        maidenName: "",
        age: 10,
        birthDate: "",
        email: [
            {
                email: "",
                preferred: "yes",
                type: "work",
            },
        ],
        phone: [
            {
                phone: "",
                preferred: "yes",
                type: "work",
            },
        ],
        address: [
            {
                address: "",
                city: "",
                state: "",
                stateCode: "",
                postalCode: "",
                coordinates: { lat: 0, lng: 0 },
                country: "",
                type: "mailing",
            },
        ],
        occupations: [
            {
                occupation: "",
                fromDate: "",
                toDate: "",
            },
        ],
        identifications: [
            {
                type: "",
                expiryDate: "",
                file: new File([], "example.txt"),
            },
        ],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const formData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            maidenName: userData.maidenName,
            age: userData.age,
            birthDate: userData.birthDate, 
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            occupations: userData.occupations,
            identifications: userData.identifications,
        };
    
        console.log("Form data:", formData);
        
        try {
            const response = await fetch(`https://dummyjson.com/user/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
       
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
    
            const data = await response.json();
    
            alert('Update successful!');
            console.log(data);
        } catch (error) {
            alert('An error occurred: ' + (error instanceof Error ? error.message : 'Unknown error'));
            console.error("Error submitting form:", error);
        }
    };
    
    return (
        <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md py-10">

                <div className="flex justify-center">
                    <h1 className="text-dark-blue font-bold">
                        Personal Information
                    </h1>
                </div>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    {/* Basic Information Section */}
                    <div className="border panel rounded-md p-4">
                        <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first-name" className="text-sm font-medium">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="first-name"
                                    name="firstName"
                                    value={userData.firstName}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                                    placeholder="Enter your first name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="last-name"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                                    placeholder="Enter your last name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="middle-name" className="block text-sm font-medium">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    id="middle-name"
                                    name="maidenName"
                                    value={userData.maidenName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                                    placeholder="Enter your middle name"
                                />
                            </div>
                            <div>
                                <label htmlFor="dob" className="block text-sm font-medium">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    value={convertToInputFormat(userData.birthDate)}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={userData.age}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                                    placeholder="Enter your age"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="border panel rounded-md p-4">
                        <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>
                            Contact Information
                        </h3>

                        {/* Addresses Panel */}
                        <div className="panel mb-6">
                            <AddressForm initialData={userData.address} setUserData={setUserData} />
                        </div>

                        {/* Emails Panel */}
                        <div className="panel mb-6">
                            <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>Emails</h3>
                            <AddEmailForm initialData={userData.email} setUserData={setUserData} />
                        </div>

                        {/* Phones Panel */}
                        <div className="panel mb-6">
                            <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>Phones</h3>
                            <AddPhoneForm initialData={userData.phone} setUserData={setUserData} />
                        </div>

                        {/* AddIdentificationForm Section */}
                        <div className="panel mb-6">
                            <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>
                                Identification Documents
                            </h3>
                            <AddIdentificationForm initialData={userData.identifications} setUserData={setUserData} />
                        </div>
                        {/* Occupations Section */}
                        <div className="panel mb-6">
                            <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>
                                Occupations
                            </h3>
                            <AddOccupationForm initialData={userData.occupations} setUserData={setUserData} />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn-primary px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonalInformationEdit;
