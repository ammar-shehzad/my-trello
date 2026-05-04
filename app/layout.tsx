import "./globals.css"
import  {Toaster} from 'react-hot-toast'
// "use client"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/js/bootstrap.bundle.min.js"
// import "bootstrap/dist/js/bootstrap.bundle.min.js"
// import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   useEffect(() => {
  //   require('bootstrap/dist/js/bootstrap.bundle.min.js')
  // }, []);
  return (
    <html
      lang="en"
  
    >
<head>
        
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />

</head>

      <body className="min-h-full flex flex-col bg-linear-to-r from-[#50428A] to-[#974F83]
      ">
        <Toaster position="top-right"/>
        {children}
        </body>

    </html>
  );
}
