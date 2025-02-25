import React from 'react';
import { BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import Link from "next/link";

const TopNavbar = () => {
    return (
       <div className="bg-blue-500 py-3 px-4 flex justify-between items-center w-full">
        <p className='text-md text-white'>Consultancy | Logistics</p>
<div className="flex justify-center gap-2">
<a href="tel:+919220452221" id="phone">+919220452221</a>
<p>hello@exportseese.com</p>
</div>
<div className="flex justify-center gap-3">
    <Link href=""> <BsYoutube className='h-6 w-6 '/> </Link>
    <Link href=""> <BsInstagram className='h-5 w-5 '/> </Link>
    <Link href=""> <BsLinkedin className='h-5 w-5 '/>  </Link>
    <Link href=""> <FaFacebook className='h-5 w-5 '/>  </Link>
    <Link href=""> <BsTwitter className='h-5 w-5 '/>  </Link>

</div>
</div>
    );
};

export default TopNavbar;