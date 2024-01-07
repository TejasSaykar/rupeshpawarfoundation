import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Auth } from "../context/Usercontext";
import { MdHexagon } from "react-icons/md"
import { useReactToPrint } from 'react-to-print';

const Idcard = () => {
    const [User, setUser] = useState({});
    console.log(User);
    const PF = "http://31.220.58.235:8080/images/";
    const [user] = Auth();

    const componentRef = useRef();

    const getIdCard = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/user/getcard/${JSON.parse(
                    localStorage.getItem("cardId")
                )}`
            );
            if (data) {
                setUser(data.employee);
                console.log("Idcard Data", data.employee);
            }
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getIdCard();
    }, [user.fullName]);


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    return (
        <>
            <div className="flex justify-center w-full h-[90vh]">
                <div ref={ componentRef } id="print" className="flex justify-center w-full h-[90vh]">
                    <div id="print" className="relative w-full sm:w-1/3 lg:w-1/4 m-auto flex flex-col items-center justify-center  border border-gray-500 rounded-lg">
                        <div id="bg" className="relative flex flex-col items-center justify-center w-full">
                        {/* <div id="overlay" className="rounded-lg"></div> */}
                            <div className="py-4 h-28 bg-slate-800 text-lg text-gray-300 font-bold md:flex md:items-centermd:justify-center md:text-center right-8 mb-2 rounded-t-lg items-center justify-center">
                                <h2 className="text-center" style={ { letterSpacing: "2px" } }>
                                    Shri Rupesh Pawar Foundation
                                </h2>
                            </div>
                            <img
                                src={ PF + User.photo }
                                className="rounded-full border-2 border-red-400 flex items-center justify-center"
                                width={ 150 }
                                height={ 150 }
                                alt=""
                            />
                            <div className="flex flex-col">
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-gray-400">User Id : </span>
                                    <h1 className="font-semibold mx-2 text-gray-200">{ User.userId }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-gray-400">Full Name : </span>
                                    <h1 className="font-semibold mx-2 text-gray-200">{ User.fullName }</h1>
                                </div>
                                <div className="flex my-2" items-start>
                                    <span className="font-semibold text-gray-400">
                                        Blood Group :{ " " }
                                    </span>
                                    <h1 className="font-semibold mx-2 text-gray-200">{ User.bloodGroup }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-gray-400">DOB : </span>
                                    <h1 className="font-semibold mx-2 text-gray-200">{ User.DOB }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-gray-400">
                                        Contact Number1 :{ " " }
                                    </span>
                                    <h1 className="font-semibold mx-2 text-gray-600">{ User.contactNumber1 }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-gray-400">
                                        Contact Number2 :{ " " }
                                    </span>
                                    <h1 className="font-semibold mx-2 text-gray-600">{ User.contactNumber2 }</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center mb-5">
                <button onClick={ handlePrint } className="bg-blue-400 py-2 px-4 rounded-lg">Print</button>
            </div>

        </>
    );
};

export default Idcard;
