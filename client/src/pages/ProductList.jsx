import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ProductList = () => {

    const [productList, setProductList] = useState([]);

    const PF = "http://31.220.58.235:8082/images/";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/product/get-products`);
                if (data) {
                    // console.log(data.products);
                    setProductList(data.products)
                }


            } catch (error) {
                console.log(error);
                message.error("Something went wrong")
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className='w-full overflow-auto'>
            <div className="p-8 w-full flex flex-col justify-center items-center">
                <h2 className='text-3xl mb-5 font-bold'>Product Details</h2>
                <table className="table-auto border" border={ 1 }>
                    <thead>
                        <tr>
                            <th className="font-bold py-3 px-8 border-2 border-gray-300  text-left ">Product Name</th>
                            <th className="font-bold py-3 px-8 border-2 border-gray-300  text-left">Purchaser Name</th>
                            <th className="font-bold py-2 px-4 border-2 border-gray-300  text-left ">Purchaser Mobile</th>
                            <th className="font-bold py-2 px-4 border-2 border-gray-300  text-left ">Purchaser Email</th>
                            <th className="font-bold py-2 px-4 border-2 border-gray-300  text-left ">Payment Screenshot</th>

                        </tr>
                    </thead>
                    <tbody>
                        { productList?.map((product) => (
                            <tr className='odd:bg-gray-100' key={ product._id }>
                                <td className="py-3 px-8 border-2 border-gray-300 text-left">{ product.productName }</td>
                                <td className="py-3 px-8 border-2 border-gray-300 text-left">{ product.purchaserName }</td>
                                <td className="py-2 px-4 border-2 border-gray-300 text-left">+91 { product.purchaserMobile }</td>
                                <td className="py-2 px-4 border-2 border-gray-300 text-left">{ product.purchaserEmail }</td>
                                <td className="py-2 px-4 flex flex-col items-center justify-center border-2 border-gray-300 text-left">
                                    <img src={ PF + product.screenshot } width={ 150 } height={ 80 } alt="" />
                                    <a className='text-center flex items-center justify-center bg-gray-300 py-1 px-3 mt-2 rounded-md' href={PF + product.screenshot} download>See Screenshot</a>
                                </td>
                            </tr>
                        )) }
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductList
