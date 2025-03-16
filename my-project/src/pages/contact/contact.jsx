import React from 'react';
import { Instagram, Mail } from 'lucide-react';

const Contact = () => {
    return (
        <div>
            <div 
                className="w-full h-[50vh] bg-cover bg-[position:left_0px_top_-100px]"
                style={{ backgroundImage: 'url(http://mrtaba.ir/image/bg2.jpg)' }}
            />
            <div className="p-5">
                <h1 className="text-3xl font-bold mt-12">Getting in touch is easy!</h1>    
                <h2 className="text-xl text-gray-500 mt-12">
                    Reach out to me on 
                    <a 
                        href="https://www.instagram.com/codeforinterview/" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-block mx-2 text-gray-500 hover:text-gray-700"
                    >
                        <Instagram className="inline" />
                    </a>
                    or send me an Email
                    <a 
                        href="mailto:codeforinterview@gmail.com?Subject=This is a subject" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-block mx-2 text-gray-500 hover:text-gray-700"
                    >
                        <Mail className="inline" />
                    </a>.
                </h2>
            </div>
        </div>
    );
}

export default Contact;