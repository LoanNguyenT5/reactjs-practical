import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserData, Email, Phone } from './data-types';
import { useNavigate } from "react-router-dom";

const PersonalInformation = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    console.log("User userId:", id);

    const handleEditClick = () => {
        console.log("click edit");
        navigate(`/pages/user/${id}/pi-edit`);
    };
    const handleKYCClick = () => {
        console.log("click edit");
        navigate(`/pages/user/${id}/kyc`);
    };

    const [userData, setUserData] = useState<UserData | null>(null);
    useEffect(() => {
        if (id) {
            fetch(`https://dummyjson.com/user/${id}`)
                .then(response => response.json())
                .then((data: UserData) => {
                    console.log("User data:", data);

                    setUserData(data);
                })
                .catch(error => console.error("Error fetching user data:", error));
        }
    }, [id]);

const normalizeEmailData = (email: string | Email[]): Email[] => {
  if (Array.isArray(email)) {
    return email;
  }

  return email
    ? [
        {
          email,
          preferred: 'yes',
          type: 'personal',
        },
      ]
    : [];
};

const normalizePhoneData = (phone: string | Phone[]): Phone[] => {
    if (Array.isArray(phone)) {
      return phone;  
    }
    return phone
      ? [
          {
            phone,
            preferred: 'yes',
            type: 'personal', 
          },
        ]
      : [];
  };
  
  const normalizedUserData = userData
  ? {
      ...userData,
      email: normalizeEmailData(userData.email), 
      phone: normalizePhoneData(userData.phone),  
    }
  : { email: [], phone: [] };  

    return (
        <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
            <div className="mb-4 col-span-full xl:mb-2">
                <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                        <li className="inline-flex items-center">
                            <a href="#"
                                className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                </svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <a href="#"
                                    className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Users</a>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                                    aria-current="page">Personal Information</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Personal Information</h1>
            </div>
            <div
                className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                    <img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                        src="/images/users/bonnie-green-2x.png" alt="Jese picture" />
                    <div>
                        <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Profile
                            picture</h3>
                        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            JPG, GIF or PNG. Max size of 800K
                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="button"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                                    <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                                </svg>
                                Upload picture
                            </button>
                            <button type="button"
                                className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">General information</h3>
                <form>
                    <fieldset disabled={false}>
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first-name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                                    Name</label>
                                <input type="text" name="first-name" id="first-name"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={userData ? userData.firstName : ''} required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="last-name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                                    Name</label>
                                <input type="text" name="last-name" id="last-name"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={userData ? userData.lastName : ''} required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="country"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                                <input type="text" name="country" id="country"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={userData?.address
                                        ? (Array.isArray(userData.address) ? userData.address : [userData.address])[0]?.city || ''
                                        : ''} required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="city"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                <input type="text" name="city" id="city"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={userData?.address
                                        ? (Array.isArray(userData.address) ? userData.address : [userData.address])[0]?.city || ''
                                        : ''} required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="address"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" name="address" id="address"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={userData?.address
                                        ? (Array.isArray(userData.address) ? userData.address : [userData.address])[0]?.address || ''
                                        : ''} required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={normalizedUserData.email[0]?.email || ''} required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="phone-number"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone
                                    Number</label>
                                <input type="text" name="phone-number" id="phone-number"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={normalizedUserData.phone[0]?.phone || ''} required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="birthday"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                                <input type="date" name="birthday" id="birthday"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={userData?.birthDate ? formatDate(userData.birthDate) : ''}
                                    required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="organization"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization</label>
                                <input type="text" name="organization" id="organization"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={userData?.company
                                        ? (Array.isArray(userData.company) ? userData.company : [userData.company])[0]?.name || ''
                                        : ''} required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="role"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                                <input type="text" name="role" id="role"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={userData ? userData.role : ''} required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="department"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                <input type="text" name="department" id="department"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={userData?.company
                                        ? (Array.isArray(userData.company) ? userData.company : [userData.company])[0]?.department || ''
                                        : ''} required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="zip-code"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip/postal
                                    code</label>
                                <input type="number" name="zip-code" id="zip-code"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={userData?.address
                                        ? (Array.isArray(userData.address) ? userData.address : [userData.address])[0]?.postalCode || ''
                                        : ''} required />
                            </div>
                            <div className="col-span-6 sm:col-full">
                                <button
                                    className={`text-white ${userData?.role === 'user' ? 'bg-primary-700 hover:bg-primary-800' : 'bg-gray-400 cursor-not-allowed'
                                        } focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                                    type="button"
                                    disabled={userData?.role !== 'user'}
                                    onClick={handleEditClick}>
                                    Edit
                                </button>
                                <button
                                    className={`ml-1 text-white ${userData?.role === 'user'
                                        ? 'bg-primary-700 hover:bg-primary-800'
                                        : 'bg-gray-400 cursor-not-allowed'
                                        } focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                                    type="submit"
                                    disabled={userData?.role !== 'user'}
                                    onClick={handleKYCClick}>KYC
                                </button>
                            </div>
                        </div>
                    </fieldset>

                </form>
            </div>
        </div>
    );
}
const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    const formattedMonth = month.padStart(2, '0'); // Thêm số 0 nếu cần
    const formattedDay = day.padStart(2, '0'); // Thêm số 0 nếu cần
    return `${year}-${formattedMonth}-${formattedDay}`;
};

export default PersonalInformation;