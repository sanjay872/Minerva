import { ConnectButton } from "web3uikit";
import React from "react";
import styles from './Header.module.css'
import Link from 'next/link';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Minerva
          <img src="/owl.svg" alt="owl" className={styles.owlImage}></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link href="/">
                    <a className="nav-link">Home</a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/components/ViewCourses">
                    <a className="nav-link">View Courses</a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/components/UploadCourse">
                    <a className="nav-link">Upload Course</a>
                </Link>
            </li>
          </ul>
          <div className="d-flex">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
