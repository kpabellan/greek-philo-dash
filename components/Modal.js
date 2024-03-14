import React from "react";
import { useToast } from '../context/Toast';

function Modal({ isOpen, onClose }) {
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
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
          showToast('Photo submitted successfully', 'success');
          onClose();
        } else {
          throw new Error('The response does not contain a URL');
        }
      })
      .catch((error) => {
        console.error('Upload failed', error);
        showToast('Error submitting photo', 'error');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-scblue p-5 rounded">
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

            <div className="mt-4 flex justify-end">
              <button type="button" onClick={onClose} className="mr-2">Cancel</button>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;