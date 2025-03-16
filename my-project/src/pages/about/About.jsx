import React from 'react';
import { Github, Instagram, Mail } from 'lucide-react';

const About = () => {
    return (
        <div>
            <div 
                className="w-full h-[50vh] bg-cover bg-[position:left_0px_bottom_0px]"
                style={{ backgroundImage: 'url(http://mrtaba.ir/image/bg2.jpg)' }}            />
            <div className="p-5">
                <h1 className="text-3xl font-bold mt-12">Code for Interview</h1>
                <p className="text-xl text-gray-500 mt-12">
                    I'm a Software Engineer based in India. 
                    I've built websites, desktop applications and corporate software.<br />
                    If you are interested, you can view some of my favorite projects here
                    <span className="ml-1 inline-block">
                        <a 
                            href="https://github.com/kunaltyagi9" 
                            className="text-gray-500 hover:text-gray-700" 
                            target="_blank" 
                            rel="noreferrer"
                        >
                            <Github />
                        </a>
                    </span>
                </p>
                <p className="text-xl text-gray-500 mt-12">
                    Need something built or simply want to have chat? Reach out to me on
                    <span className="ml-1 inline-block">
                        <a 
                            href="https://www.instagram.com/codeforinterview/" 
                            className="text-gray-500 hover:text-gray-700" 
                            target="_blank" 
                            rel="noreferrer"
                        >
                            <Instagram />
                        </a>
                    </span>
                    or send me an Email 
                    <a 
                        href="mailto:codeforinterview@gmail.com?Subject=This is a subject" 
                        className="ml-1 inline-block text-gray-500 hover:text-gray-700" 
                        target="_blank" 
                        rel="noreferrer"
                    >
                        <Mail />
                    </a>.
                </p>
            </div>
        </div>
    )
}

export default About;