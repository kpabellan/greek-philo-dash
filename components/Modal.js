import React from "react";

function Modal({ isOpen, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');

    formData.append('file', fileField.files[0]);

    fetch(`/api/photos`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.secure_url) {
          console.log('Upload successful', data.secure_url);
          onClose();
        }
      })
      .catch((error) => {
        console.error('Upload failed', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-scblue p-5 rounded">
        <h2 className="text-xl mb-4">Submit a Photo</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Image File</label>
            <input type="file" name="file" required className="border rounded p-2 w-full bg-white text-black" />
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