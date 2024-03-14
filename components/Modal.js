import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useToast } from '../context/Toast';

function Modal({ isOpen, onClose }) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();

    if (isOpen) {
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      resetStates();
    }

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      resetStates();
    };
  }, [isOpen]);

  const resetStates = () => {
    setLoading(false);
    setSuccess(false);
    setFail(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    const nameField = document.querySelector('input[name="name"]');
    const organizationField = document.querySelector('select[name="orgs"]');

    formData.append('file', fileField.files[0]);

    fetch(`/api/photos`, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.url) {
          console.log('Upload successful');
          setSuccess(true);
          setTimeout(() => {
            onClose();
            resetStates();
          }, 1000);
          showToast('Photo submitted successfully', 'success');
        } else {
          throw new Error('The response does not contain a URL');
        }
      })
      .catch((error) => {
        console.error('Upload failed', error);
        setFail(true);
        setTimeout(() => {
          resetStates();
        }, 3000);
        showToast('Error submitting photo', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-scblue p-5 rounded-lg overflow-hidden w-10/12 md:w-1/4 z-15">
        <h2 className="text-xl mb-4">Submit a Photo</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>Image File</label>
              <input type="file" name="file" required className="border rounded p-2 w-full h-12 bg-white text-black" />
            </div>

            <div>
              <label>Name</label>
              <input type="text" name="name" required className="border rounded p-2 w-full h-12 text-xl  bg-white text-black" />
            </div>

            <div>
              <label>Organization</label>
              <select id="orgs" name="orgs" className="border rounded p-2 w-full h-12 text-xl bg-white text-black" required>
                <option value="" disabled selected>Select your organization</option>
                <option value="Delta Delta Delta">ΔΔΔ</option>
                <option value="Delta Gamma">ΔΓ</option>
                <option value="Kappa Kappa Gamma">ΚΚΓ</option>
                <option value="Phi Mu">ΦΜ</option>
                <option value="Theta Tau">ΘΤ</option>
                <option value="Delta Sigma Pi">ΔΣΠ</option>
                <option value="Alpha Kappa Psi">ΑΚΨ</option>
                <option value="Alpha Phi Omega">ΑΦΩ</option>
                <option value="Delta Epsilon Mu">ΔΕΜ</option>
                <option value="Phi Alpha Delta">ΦΑΔ</option>
                <option value="Phi Delta Epsilon">ΦΔΕ</option>
                <option value="Pi Kappa Phi">ΠΚΦ</option>
                <option value="Kappa Sigma">ΚΣ</option>
                <option value="Lambda Theta Nu">ΛΘΝ</option>
                <option value="Sigma Theta Psi">ΣΘΨ</option>
                <option value="Kappa Delta Chi">ΚΔΧ</option>
              </select>
            </div>

            <div className="mt-4 flex justify-between">
              <button type="button" onClick={onClose} className='w-24 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ring-1 ring-white'>
                <p>Cancel</p>
              </button>
              {loading ? (
                <button className='w-24 bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ring-1 ring-white' type='submit' disabled={loading}>
                  <AiOutlineLoading3Quarters className='inline-block w-6 h-6 animate-spin' />
                </button>
              ) : success ? (
                <button className='w-24 bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ring-1 ring-white' type='submit' disabled={success}>
                  <AiOutlineCheckCircle className='inline-block w-6 h-6' />
                </button>
              ) : fail ? (
                <button className='w-24 bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ring-1 ring-white' type='submit' disabled={fail}>
                  <AiOutlineCloseCircle className='inline-block w-6 h-6' />
                </button>
              ) : (
                <button className='w-24 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ring-1 ring-white' type='submit'>
                  <p>Submit</p>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;