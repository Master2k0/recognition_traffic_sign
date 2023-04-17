import './App.css';

import { useEffect, useState } from 'react';

import PredictApi from '@/api/demoAPI';

function App() {
  const [fileImage, setFileImage] = useState<Blob>();
  const [nameSign, setNameSign] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      const data = await PredictApi.test();
    };
    fetchData();
  }, []);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      setFileImage(e.target.files[0]);
    }
  }

  const handleSubmit = async () => {
    if (fileImage) {
      const formData = new FormData();
      formData.append('image', fileImage, fileImage?.name);
      const data = await PredictApi.postPredict(formData);
      setNameSign(data.data);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    // eslint-disable-next-line prefer-destructuring
    const files = e.dataTransfer.files;
    console.log(files);
    if (files.length) {
      setFileImage(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  return (
    <div className="App flex flex-col justify-center items-center">
      {/* <input type="file" name="image" accept="image/*" onChange={handleImage} /> */}
      {/* {fileImage && (
        <img
          alt="preview image"
          src={URL.createObjectURL(fileImage)}
          className="w-[200px] h-[200px] object-contain"
        />
      )} */}
      <div className="max-w-xl">
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          htmlFor="uploadImage"
          className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
        >
          {fileImage ? (
            <img
              alt="preview image"
              src={URL.createObjectURL(fileImage)}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="font-medium text-gray-600">
                Drop files to Attach, or
                <span className="text-blue-600 underline">browse</span>
              </span>
            </span>
          )}
          <input
            id="uploadImage"
            type="file"
            name="file_upload"
            className="hidden"
            accept="image/*"
            onChange={handleImage}
            hidden
          />
        </label>
      </div>
      <p>{nameSign}</p>
      <button
        type="submit"
        onClick={() => {
          handleSubmit();
        }}
        disabled={!fileImage}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
