const LogoUpload = ({ handleFileChange, previewUrl, handleRemoveFile }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="logoUpload" className="cursor-pointer">
        <span className="rounded-full overflow-hidden w-16 h-16 bg-gray-200 flex items-center justify-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-gray-400 text-4xl">+</span>
          )}
        </span>
        <input
          id="logoUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      {previewUrl && (
        <button
          type="button"
          className="text-red-500 hover:text-red-700 focus:outline-none"
          onClick={handleRemoveFile}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default LogoUpload;
