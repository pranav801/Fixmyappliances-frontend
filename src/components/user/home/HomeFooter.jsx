import React from 'react'
import img from '../../../assets/logo.png'

function HomeFooter() {
    return (
        <div>

            <div className="container-fluid text-dark pt-0 w-full">
                <hr />
                <div className="flex flex-col md:flex-row px-5 pt-5 md:px-10 w-full">
                    <div className="md:w-8/12 mb-5 md:pr-5 w-full">
                        <a href="#" className="text-decoration-none">
                            <div className="logo-img overflow-hidden">
                            </div>
                        </a>
                        <p className="mt-3 md:mt-5 ">Get your home appliances running like new again with our professional repair services. Trust Fixmyappliances for all your home appliance fixing needs. We look forward to serving you and ensuring your appliances work seamlessly, making your home a more comfortable place to live."</p>
                        <br />
                        <p className="mb-2"><i className="fa-solid text-primary fa-location-dot mr-3"></i>Kinfra,kakanchery Malappuram 657577</p>
                        <p className="mb-2"><a href="mailto:wearin.indiapvtltd@gmail.com"><i className="fa fa-envelope text-primary mr-3"></i>fixmyappliances.kerala@gmail.com</a></p>
                        <p className="mb-0"><a href="tel:+919048543167"><i className="fa-solid fa-phone text-primary mr-3 "></i>+919048543167</a></p>
                    </div>
                    <div className="md:w-4/12">
                        {/* <div className="newquick">
                        <div className="md:flex md:flex-col md:justify-start">
                            <a href="#" className="mb-2"><i className="fa fa-angle-right mr-2"></i>Home</a>
                            <a href="#" className="mb-2"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</a>
                            <a href="#" className="mb-2"><i className="fa fa-angle-right mr-2"></i>Contact Us</a>
                        </div>
                        </div> */}
                    </div>
                </div>
                <div className="md:flex border-t border-light mx-5 md:mx-10 py-4">
                    <div className="md:w-6/12 px-0">
                        <p className="mb-0 text-center md:text-left text-dark">
                            &copy; <a className="text-dark font-semibold" href="#">Fixmyappliances</a>. All Rights Reserved.
                        </p>
                    </div>
                    <div className="me-0">
                        {/* <img className="w-5 " src={img} alt="" /> */}
                    </div>
                </div>
            </div>
        </div>


    )
}

export default HomeFooter