import React from 'react';
import { GiFoodTruck } from 'react-icons/gi';


function Footer() {
    return (

        <footer className="text-center text-lg-start fixed-bottom">
            <section className="d-flex justify-content-center  p-4 border-bottom">
                <div>

                    <a href="https://github.com/JillianA328/be-our-guest" className="me-4 fs-1">
                        <GiFoodTruck />
                    </a>

                </div>
            </section>
        </footer>
    )
}

export default Footer;