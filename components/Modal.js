import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useToast } from '../context/Toast';

async function imageDataToSheets(body) {
  try {
    const response = await fetch('/api/sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error while sending data to sheets:', error);
  }
}

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
    formData.append('name', nameField.value);
    formData.append('organization', organizationField.value);

    fetch(`/api/upload`, {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.url) {
          imageDataToSheets({
            cloudinaryResult: data.url,
            name: nameField.value,
            organization: organizationField.value,
            uniqueIdentifier: data.uniqueIdentifier,
          });

          setSuccess(true);
          setTimeout(() => {
            onClose();
            resetStates();
          }, 2000);
          showToast('Image submitted successfully', 'success');
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
        showToast('Error submitting image', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 drop-shadow-md">
      <div className="bg-scblue p-5 rounded-lg overflow-hidden w-10/12 md:w-1/4 z-15">
        <h2 className="text-xl mb-4">Submit an image</h2>
        <div className="flex flex-col mb-4 text-xs md:text-sm">
          <p>Submit a landscape-oriented image for a chance to be featured and earn 50,000 points for your organization.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>Image File</label>
              <input type="file" name="file" required className="border rounded p-2 w-full h-12 bg-white text-black" />
            </div>

            <div>
              <label>Name</label>
              <input type="text" name="name" placeholder="Your Name" required className="border rounded p-2 w-full h-12 text-xl  bg-white text-black" />
            </div>

            <div>
              <label>Organization</label>
              <select id="orgs" name="orgs" className="border rounded p-2 w-full h-12 text-xl bg-white text-black" defaultValue="" required>
                <option value="" disabled>Select your organization</option>
                <option value="Delta Delta Delta">ΔΔΔ</option>
                <option value="Delta Gamma">ΔΓ</option>
                <option value="Kappa Kappa Gamma">ΚΚΓ</option>
                <option value="Phi Alpha Delta">ΦΑΔ</option>
                <option value="Phi Mu">ΦΜ</option>
                <option value="Theta Tau">ΘΤ</option>
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