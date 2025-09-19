import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const LeadDetail = ({ isOpen, lead, onClose, onSave, updating }) => {
  const [edits, setEdits] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (lead) {
      setEdits({ status: lead.status, email: lead.email });
      setErrors({});
    }
  }, [lead]);

  if (!lead) return null;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSave = () => {
    const newErrors = {};
    if (!validateEmail(edits.email)) {
      newErrors.email = "Invalid email format";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(lead.id, edits);
    onClose();
  };

  const handleCancel = () => {
    setEdits({ status: lead.status, email: lead.email });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black opacity-25" />
      <div className="fixed inset-0 sm:right-0 sm:inset-y-0 w-full sm:w-96 bg-white p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Lead Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Name
            </label>
            <p className="mt-1 block text-gray-700">{lead.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Company
            </label>
            <p className="mt-1 block text-gray-700">{lead.company}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              value={edits.email || ""}
              onChange={(e) => setEdits({ ...edits, email: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-gray-900"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Source
            </label>
            <p className="mt-1 block text-gray-700">{lead.source}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Score
            </label>
            <p className="mt-1 block text-gray-700">{lead.score}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Status
            </label>
            <select
              value={edits.status || ""}
              onChange={(e) => setEdits({ ...edits, status: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-gray-900"
            >
              <option value="new">New</option>
              <option value="qualified">Qualified</option>
              <option value="disqualified">Disqualified</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button onClick={handleCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={updating}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updating ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default LeadDetail;
