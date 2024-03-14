"use client";

import React, { createContext, useContext, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const showToast = useCallback((message, type) => {

    const options = {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    }

    if (type === 'success') {
      return toast.success(message, options);
    } else if (type === 'error') {
      return toast.error(message, options);
    }
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};
