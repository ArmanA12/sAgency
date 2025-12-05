
import React from 'react';

const Footer: React.FC = () => {

    const socials = [
        { name: "LinkedIn", link: "https://www.linkedin.com/in/arman-shekh12/" },
        { name: "Twitter", link: "https://x.com/shekh_md72383" },
        { name: "Instagram", link: "https://www.instagram.com/arman_aishakar/" },
        { name: "Github", link: "https://github.com/ArmanA12" },
    ];

    return (
        <footer className="bg-[#030305] pt-20 pb-12 border-t border-white/5 relative overflow-hidden">

            {/* Animated Gradient Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#211740] to-[#171741] blur-[150px] opacity-40 rounded-full pointer-events-none animate-pulse-slow"></div>

            {/* Footer Bottom Grid */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-10 relative z-10">

                <div className="col-span-1 lg:col-span-2">
                    <a href="mailto:itsarmanshekh@gmail.com" className="block text-3xl font-display font-medium text-white hover:text-[#FFBDFF] transition-colors mb-4">
                        itsarmanshekh@gmail.com
                    </a>
                    <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">Main Agency Website</span>
                </div>

                <div>
                    <h5 className="text-white font-bold mb-4">Socials</h5>
                    <ul className="space-y-2 text-gray-500 text-sm">
                        {socials.map(({ name, link }) => (
                            <li key={name}>
                                <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-[#215BFE] transition-colors">
                                    {name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h5 className="text-white font-bold mb-4">Legal</h5>
                    <ul className="space-y-2 text-gray-500 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Imprint</a></li>
                    </ul>
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-xs text-gray-700 font-mono">
                    <p>&copy; 2024 X-METHOD DIGITAL.</p>
                    <p>DESIGNED IN BERLIN.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
