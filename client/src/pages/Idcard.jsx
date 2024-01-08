import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Auth } from "../context/Usercontext";
import { MdHexagon } from "react-icons/md"
import { useReactToPrint } from 'react-to-print';

const Idcard = () => {
    const [User, setUser] = useState({});
    // console.log(User);
    // const PF = "http://31.220.58.235:8080/images/";
    const PF = "http://31.220.58.235:8080/images/";
    const [user, setIsId] = Auth();

    // const userId = user._id;
    // console.log(userId)

    const componentRef = useRef();

    const getIdCard = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/user/getuser/${user._id}`);
            if (data) {
                setUser(data.employee.idCard[0]);
                console.log("Idcard Data", data.employee.idCard[0]);
                localStorage.setItem("isId", JSON.stringify(data.employee));
                setIsId(data.employee);
            }
        } catch (error) {
            // message.error(error.response.data.message);
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
                        <div id="bg" className="h-[400px] flex flex-col items-center justify-center w-full">
                            <div className="flex mt-8 mx-3">
                                <img
                                    src={ PF + User.photo }
                                    className="rounded-full border-2 border-yellow-500 flex items-center justify-center"
                                    width={ 150 }
                                    height={ 150 }
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-yellow-500">User Id : </span>
                                    <h1 className="font-semibold mx-2 text-gray-600">{ User.userId }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-yellow-500">Full Name : </span>
                                    <h1 className="font-semibold mx-2 text-gray-600">{ User.fullName }</h1>
                                </div>
                                <div className="flex my-2" items-start>
                                    <span className="font-semibold text-yellow-500">
                                        Blood Group :{ " " }
                                    </span>
                                    <h1 className="font-semibold mx-2 text-gray-600">{ User.bloodGroup }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-yellow-500">DOB : </span>
                                    <h1 className="font-semibold mx-2 text-gray-600">{ User.DOB }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-yellow-500">
                                        Contact Number1 :{ " " }
                                    </span>
                                    <h1 className="font-semibold mx-2 text-gray-600">+91 { User.contactNumber1 }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-yellow-500">
                                        Contact Number2 :{ " " }
                                    </span>
                                    <h1 className="font-semibold mx-2 text-gray-600">+91 { User.contactNumber2 }</h1>
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
