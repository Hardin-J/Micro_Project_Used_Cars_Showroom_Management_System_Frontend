import React from 'react'
import { FaCar } from "react-icons/fa";
import { RiSteeringFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

function Feature() {
    const features = [
        {
            icon:
                <FaCar size={"2rem"} />,
            title: "Select Your Car",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius."
        },
        {
            icon:
                <RiSteeringFill size={"2rem"} />,
            title: "Take It for A Spin",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius."
        },
        {
            icon:

                <TbTruckDelivery size={"2rem"} />,
            title: "Get It Delivered",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius."
        },
    ]
    const nav = useNavigate();
    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="relative max-w-2xl mx-auto sm:text-center">
                    <div className="relative z-10">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            The New Ways to Buy A Used Car
                        </h3>
                        <p className="mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.
                        </p>
                    </div>
                    <div className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}></div>
                </div>
                <div className="relative mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="bg-white space-y-3 p-4 border rounded-lg">
                                    <div className="text-indigo-600 pb-3">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg text-gray-800 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p>
                                        {item.desc}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div><br /><br />
                <form>
                    <center>
                        <button className='btn btn-primary' onClick={() => { nav('/browseCars') }}>
                            View All Cars
                        </button>
                    </center>
                </form>
            </div>
        </section>
    )
}

export default Feature;