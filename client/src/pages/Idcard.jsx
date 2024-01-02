import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { message } from 'antd'
import {Auth} from "../context/Usercontext"

const Idcard = () => {
    const [User, setUser] = useState({})
    console.log(User)
    const PF = "http://localhost:8080/images/"
    const [user] = Auth();


    const getIdCard = async () => {
        try {
            const { data } = await axios.get(`/api/user/getcard/${JSON.parse(localStorage.getItem("cardId"))}`);
            if (data) {
                setUser(data.employee);
                console.log("Idcard Data", data.employee)
            }
        } catch (error) {
            // console.log(error);
            message.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getIdCard();
    }, [user.fullName])

    // console.log(user.photo);

    return (
        <div className='flex justify-center w-full h-[90vh]'>
            <div className='bg-fuchsia-100 w-full mx-2 sm:w-1/3 lg:w-1/3 m-auto px-4 flex flex-col items-center justify-center py-4 shadow-md rounded-md'>
                <h2 className='absolute text-3xl left-10 text-gray-300 -z-5 -rotate-45 font-bold' style={{letterSpacing: "2px"}}>Shri Rupesh Pawar Foundation</h2>
                <div className='flex flex-col items-center justify-center z-10'>
                    <img src={ PF + User.photo } className='rounded-full border-2 border-red-400 flex items-center justify-center' width={ 150 } height={ 150 } alt="" />
                    <div className='flex flex-col'>
                        <div className='flex my-2 items-start'>
                            <span className='font-semibold text-gray-600'>Full Name : </span>
                            <h1 className='font-semibold mx-2'>{ User.fullName }</h1>
                        </div>
                        <div className='flex my-2' items-start>
                            <span className='font-semibold text-gray-600'>Blood Group : </span>
                            <h1 className='font-semibold mx-2'>{ User.bloodGroup }</h1>
                        </div>
                        <div className='flex my-2 items-start'>
                            <span className='font-semibold text-gray-600'>DOB : </span>
                            <h1 className='font-semibold mx-2'>{ User.DOB }</h1>
                        </div>
                        <div className='flex my-2 items-start'>
                            <span className='font-semibold text-gray-600'>Contact Number1 : </span>
                            <h1 className='font-semibold mx-2'>{ User.contactNumber1 }</h1>
                        </div>
                        <div className='flex my-2 items-start'>
                            <span className='font-semibold text-gray-600'>Contact Number2 : </span>
                            <h1 className='font-semibold mx-2'>{ User.contactNumber2 }</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Idcard
