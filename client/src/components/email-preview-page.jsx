const EmailPreviewPage = ({ emailData }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Preview Email</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Target Company Name:</label>
          <input
            type="text"
            name="targetCompanyName"
            value={emailData.targetCompanyName}
            // onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email Content:</label>
          <textarea
            name="emailContent"
            value={emailData.emailTemplate}
            // onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            rows="10"
          />
        </div>
        <button
          type="button"
          // onClick={handleSaveChanges}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EmailPreviewPage;
