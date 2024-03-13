import React from "react";

function Modal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-scblue p-5 rounded">
        <h2 className="text-xl mb-4">Submit a Photo</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label>Image URL</label>
            <input type="text" name="src" required className="border rounded p-2 w-full" />
          </div>
          <div>
            <label>Credit</label>
            <input type="text" name="credit" required className="border rounded p-2 w-full" />
          </div>
          <div>
            <label>Organization</label>
            <input type="text" name="organization" required className="border rounded p-2 w-full" />
          </div>
          <div className="mt-4 flex justify-end">
            <button type="button" onClick={onClose} className="mr-2">Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
