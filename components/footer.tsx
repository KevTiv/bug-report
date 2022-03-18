import React from 'react'
import Image from 'next/image'
import styles from '../styles/Component.module.scss'

const Footer = () => {
  return (
    <>
        <footer className="p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6">
            <span className="text-sm text-black sm:text-center dark:text-white">© 2022 <a href="https://flowbite.com">Kevin Tivert</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-black dark:text-white sm:mt-0">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">Repository</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Github</a>
                </li>
            </ul>
        </footer>
    </>
  )
}

export default Footer