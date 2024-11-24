"use client";
import { useState } from 'react';
import Layout from "@/components/Layout";
import files from "@/data/files";
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
// Define allowed document types with descriptions
const ALLOWED_DOCUMENTS = {
  '.pdf': { name: 'PDF Document', mimeTypes: ['application/pdf'] },
  '.docx': { name: 'Word Document', mimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'] },
  '.xlsx': { name: 'Excel Spreadsheet', mimeTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'] },
  '.pptx': { name: 'PowerPoint Presentation', mimeTypes: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'] },
  '.jpg': { name: 'JPEG Image', mimeTypes: ['image/jpeg'] },
  '.jpeg': { name: 'JPEG Image', mimeTypes: ['image/jpeg'] },
  '.pbix': { name: 'Power BI File', mimeTypes: ['application/octet-stream'] },
  '.mp4': { name: 'Video File', mimeTypes: ['video/mp4'] },
  '.mp3': { name: 'Audio File', mimeTypes: ['audio/mpeg'] }
};

// Helper function to check if file type is allowed
const isFileTypeAllowed = (file) => {
  const extension = '.' + file.name.split('.').pop().toLowerCase();
  const fileType = ALLOWED_DOCUMENTS[extension];
  return fileType && fileType.mimeTypes.includes(file.type);
};

// First, organize your categories into two arrays
const leftCategories = [
  "Intermediate Result1",
  "Intermediate Result2",
  "Intermediate Result3",
  "Gender youth",
  "LME",
  "Cross Cutting",
  "Somali",
  "Afar"
];

const rightCategories = [
  "Oromia",
  "Amhara",
  "Tigray",
  "South",
  "South-west",
  "Sidama",
  "Centeral"
];

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(files)[0]);
  const [fileList, setFileList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [fileToDelete, setFileToDelete] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
    setSearchTerm('');
    setSelectedLetter('');
  };

  const downloadFile = (file) => {
    const filePath = file.link;
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    // Handle different file types
    switch(fileExtension) {
      case 'pdf':
        // Open PDFs in a new window
        window.open(filePath, '_blank', 'noopener,noreferrer');
        break;
        
      case 'jpg':
      case 'jpeg':
        window.open(filePath, '_blank', 'noopener,noreferrer');
        break;
        
      case 'mp4':
      case 'mp3':
        const mediaWindow = window.open('', '_blank');
        if (mediaWindow) {
          mediaWindow.document.write(`
            <html>
              <head>
                <title>${file.name}</title>
                <style>
                  body { margin: 0; padding: 0; background: black; height: 100vh; display: flex; justify-content: center; align-items: center; }
                  video, audio { max-width: 100%; max-height: 100%; }
                </style>
              </head>
              <body>
                ${fileExtension === 'mp4' 
                  ? `<video controls><source src="${filePath}" type="video/mp4"></video>`
                  : `<audio controls><source src="${filePath}" type="audio/mpeg"></audio>`
                }
              </body>
            </html>
          `);
          mediaWindow.document.close();
        }
        break;
        
      default:
        // For all other file types (including Office documents), download directly
        const link = document.createElement('a');
        link.href = filePath;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  const initiateDelete = (file, category) => {
    setFileToDelete(file);
    setDeleteCategory(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const authResponse = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: adminPassword }),
      });

      if (!authResponse.ok) {
        toast.error('Invalid admin password', {
          duration: 3000,
          position: 'top-center',
          style: { background: '#FF4719', color: '#fff' },
        });
        return;
      }

      const response = await fetch('/api/file/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: fileToDelete.name, category: deleteCategory, adminPassword }),
      });

      if (response.ok) {
        toast.success(`${fileToDelete.name} deleted successfully!`, {
          duration: 3000,
          position: 'top-center',
          style: { background: '#4CAF50', color: '#fff' },
        });
        setShowDeleteModal(false);
        setAdminPassword('');
        setFileToDelete(null);
        setDeleteCategory(null);
      } else {
        toast.error('Failed to delete file', {
          duration: 3000,
          position: 'top-center',
          style: { background: '#FF4719', color: '#fff' },
        });
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Error occurred while deleting file', {
        duration: 3000,
        position: 'top-center',
        style: { background: '#FF4719', color: '#fff' },
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!isFileTypeAllowed(file)) {
      toast.error(
        <div>
          <p>Invalid file type!</p>
          <p className="text-sm mt-1">Allowed types:</p>
          <ul className="text-sm">
            {Object.entries(ALLOWED_DOCUMENTS).map(([ext, info]) => (
              <li key={ext}>{info.name} ({ext})</li>
            ))}
          </ul>
        </div>,
        {
          duration: 4000,
          position: 'top-center',
          style: { background: '#FF4719', color: '#fff', maxWidth: '300px' },
        }
      );
      e.target.value = '';
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File is too large. Maximum size is 10MB.', {
        duration: 3000,
        position: 'top-center',
        style: { background: '#FF4719', color: '#fff' },
      });
      e.target.value = '';
      return;
    }

    setFileList([file]);
  };

  const handleUpload = async (file, category) => {
    if (!file) return;

    try {
      // Check for duplicate file name in the selected category
      const isDuplicate = files[category].some(
        existingFile => existingFile.name.toLowerCase() === file.name.toLowerCase()
      );

      if (isDuplicate) {
        toast.error(
          <div>
            <p className="font-medium">Upload Failed!</p>
            <p className="text-sm mt-1">A file with the same name already exists in this category.</p>
            <p className="text-sm">Please rename the file or choose a different one.</p>
          </div>,
          {
            duration: 4000,
            position: 'top-center',
            style: { background: '#FF4719', color: '#fff' },
          }
        );
        return;
      }

      setUploadingFile(true);
      const loadingToast = toast.loading('Uploading file...', { position: 'top-center' });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      const response = await fetch('/api/file/upload', {
        method: 'POST',
        body: formData,
      });

      toast.dismiss(loadingToast);

      if (response.ok) {
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        const fileType = ALLOWED_DOCUMENTS[fileExtension]?.name || 'Document';

        toast.success(
          <div>
            <p className="font-medium">{fileType} uploaded successfully!</p>
            <p className="text-sm mt-1">{file.name}</p>
          </div>,
          {
            duration: 3000,
            position: 'top-center',
            style: { background: '#4CAF50', color: '#fff' },
            icon: '📄',
          }
        );

        setShowUploadModal(false);
        setFileList([]);
      } else {
        const errorData = await response.json();
        console.error('Upload failed:', errorData);
        throw new Error(errorData.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Error uploading file. Please try again.', {
        duration: 3000,
        position: 'top-center',
        style: { background: '#FF4719', color: '#fff' },
      });
    } finally {
      setUploadingFile(false);
    }
  };

  const closeModal = () => {
    setFileList([]);
    setSelectedCategory(Object.keys(files)[0]);
    setShowUploadModal(false);
  };

  const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  const getFilteredFiles = (category) => {
    let filteredFiles = [...files[category]];
    
    // Sort alphabetically
    filteredFiles.sort((a, b) => a.name.localeCompare(b.name));
    
    // Filter by search term (case insensitive)
    if (searchTerm) {
      filteredFiles = filteredFiles.filter(file => 
        file.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }
    
    // Filter by selected letter (case insensitive)
    if (selectedLetter) {
      filteredFiles = filteredFiles.filter(file => 
        file.name.charAt(0).toLowerCase() === selectedLetter.toLowerCase()
      );
    }
    
    return filteredFiles;
  };

  return (
    <Layout>
      <Toaster />
      <main className='flex flex-col w-full min-h-[100vh] pb-32'>
        <div className='flex md:flex-row flex-col gap-7 justify-between items-center w-full px-10 py-20 bg-[#FF4719] text-white'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-5xl md:text-5xl font-bold'>Resources</h1>
          </div>
          
          <button className='flex gap-2 items-center text-xl font-semibold' onClick={() => setShowUploadModal(true)}>
            <svg className="w-[45px] h-[45px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd"/>
            </svg>
            Upload
          </button>
        </div>
        
        <div className='flex md:flex-row flex-col gap-8 justify-center w-full px-10 py-10'>
          {/* Left Column */}
          <div className='flex flex-col gap-4 w-full max-w-[600px]'>
            {leftCategories.map((category) => (
              <div key={category} className='flex flex-col gap-2'>
                <h2
                  className='cursor-pointer text-2xl font-bold flex gap-2 items-center'
                  onClick={() => toggleCategory(category)}
                >
                  {category} {activeCategory === category ? 
                    <svg className="w-[24px] h-[24px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"/>
                    </svg> :
                    <svg className="w-[24px] h-[24px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
                    </svg>
                  }
                </h2>
                {activeCategory === category && (
                  <>
                    <div className='mb-4'>
                      <input
                        type="text"
                        placeholder="Search files..."
                        className="p-2 border rounded w-full mb-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="flex flex-wrap gap-2">
                        {alphabet.map((letter) => (
                          <button
                            key={letter}
                            onClick={() => setSelectedLetter(selectedLetter === letter ? '' : letter)}
                            className={`px-2 py-1 text-sm rounded ${
                              selectedLetter === letter 
                                ? 'bg-[#FF4719] text-white' 
                                : 'border hover:bg-gray-100'
                            }`}
                          >
                            {letter}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <ul className='pl-4 flex flex-col gap-2 w-full'>
                      {getFilteredFiles(category).map((file, index) => (
                        <li key={index} className='flex items-center text-lg w-full'>
                          <button 
                            className='hover:underline flex items-center gap-2 text-left flex-1' 
                            onClick={() => downloadFile(file)}
                          >
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            <span className="truncate">{file.name}</span>
                          </button>
                          <div className="flex gap-4 flex-shrink-0">
                            <a 
                              href={file.link} 
                              download
                              className="text-blue-600 hover:text-blue-800"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                              </svg>
                            </a>
                            <button className='text-[#D03000]' onClick={() => initiateDelete(file, category)}>
                              <svg className="w-[24px] h-[24px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
                              </svg>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className='flex flex-col gap-4 w-full max-w-[600px]'>
            {rightCategories.map((category) => (
              <div key={category} className='flex flex-col gap-2'>
                <h2
                  className='cursor-pointer text-2xl font-bold flex gap-2 items-center'
                  onClick={() => toggleCategory(category)}
                >
                  {category} {activeCategory === category ? 
                    <svg className="w-[24px] h-[24px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"/>
                    </svg> :
                    <svg className="w-[24px] h-[24px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
                    </svg>
                  }
                </h2>
                {activeCategory === category && (
                  <>
                    <div className='mb-4'>
                      <input
                        type="text"
                        placeholder="Search files..."
                        className="p-2 border rounded w-full mb-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="flex flex-wrap gap-2">
                        {alphabet.map((letter) => (
                          <button
                            key={letter}
                            onClick={() => setSelectedLetter(selectedLetter === letter ? '' : letter)}
                            className={`px-2 py-1 text-sm rounded ${
                              selectedLetter === letter 
                                ? 'bg-[#FF4719] text-white' 
                                : 'border hover:bg-gray-100'
                            }`}
                          >
                            {letter}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <ul className='pl-4 flex flex-col gap-2 w-full'>
                      {getFilteredFiles(category).map((file, index) => (
                        <li key={index} className='flex items-center text-lg w-full'>
                          <button 
                            className='hover:underline flex items-center gap-2 text-left flex-1' 
                            onClick={() => downloadFile(file)}
                          >
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            <span className="truncate">{file.name}</span>
                          </button>
                          <div className="flex gap-4 flex-shrink-0">
                            <a 
                              href={file.link} 
                              download
                              className="text-blue-600 hover:text-blue-800"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                              </svg>
                            </a>
                            <button className='text-[#D03000]' onClick={() => initiateDelete(file, category)}>
                              <svg className="w-[24px] h-[24px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
                              </svg>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {showUploadModal && (
          <div 
            className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
            style={{ 
              backdropFilter: 'blur(5px)',
              zIndex: 40  // Lower z-index than header
            }}
            onClick={() => !uploadingFile && setShowUploadModal(false)}
          >
            <div 
              className='bg-white p-4 md:w-[500px] w-full h-auto flex flex-col gap-4 rounded-xl shadow-lg'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex flex-row-reverse'>
                <button className='text-[#293745]' onClick={closeModal}>
                  <svg className="w-[32px] h-[32px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                  </svg>
                </button>
              </div>
              <h1 className='text-2xl text-center font-bold mb-4'>Upload File</h1>
              
              <div 
                className='w-full h-[200px] flex flex-col gap-2 justify-center items-center border-2 hover:border-[#FF4719] rounded-lg cursor-pointer'
                onDrop={(e) => {
                  e.preventDefault();
                  const newFiles = Array.from(e.dataTransfer.files).filter(file => 
                    !file.type.startsWith('video/') && 
                    !file.type.startsWith('image/') && 
                    !file.type.startsWith('audio/')
                  );
                  setFileList((prevFiles) => [...prevFiles, ...newFiles]);
                  if (newFiles.length > 0) {
                    handleFileChange({ target: { files: [newFiles[0]] } });
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <input 
                  type="file"
                  className="mb-4 hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept={Object.entries(ALLOWED_DOCUMENTS)
                    .map(([ext, info]) => info.mimeTypes.concat(ext))
                    .flat()
                    .join(',')}
                />
                <h1>Drag & drop files to upload</h1>
                <label htmlFor='file-upload' className='py-2 px-4 rounded cursor-pointer border-2'>
                  Choose Files
                </label>
                {fileList.map((file, index) => <span key={index}>{file.name}</span>)}
              </div>

              <select 
                className='mb-4 p-2 border w-full rounded hover:border-black active:border-[#FF4719] bg-white'
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {Object.keys(files).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <div className='flex justify-between items-center'>
                <button 
                  className='rounded px-6 py-2 border-2'
                  onClick={() => !uploadingFile && setShowUploadModal(false)}
                  disabled={uploadingFile}
                >
                  Cancel
                </button>
                <button 
                  className={`px-6 py-2 rounded ${
                    uploadingFile 
                      ? 'bg-gray-400' 
                      : 'bg-[#D03000] hover:bg-[#FF4719]'
                  } text-white`}
                  onClick={() => handleUpload(fileList[0], selectedCategory)}
                  disabled={uploadingFile || fileList.length === 0}
                >
                  {uploadingFile ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div 
            className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
            style={{ 
              backdropFilter: 'blur(5px)',
              zIndex: 40  // Lower z-index than header
            }}
          >
            <div 
              className='bg-white p-6 rounded-lg shadow-lg w-auto h-auto  flex flex-col justify-between  gap-6 px-20'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex flex-col gap-4 items-center '>
                <Image src="/icon/delete.png" alt="Delete Icon" width={50} height={50} />
                <div className='flex flex-col gap-2'>
                  <h2 className='text-3xl font-bold text-center'>Confirm Delete</h2>
                  <p className='font-semibold text-center'>{fileToDelete?.name}</p>
                </div>
                <input
                  type='password'
                  className='w-full p-2 border rounded '
                  placeholder='Enter Admin Password'
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>
              <div className='flex justify-between'>
                <button 
                  className='px-4 py-2 border rounded'
                  onClick={() => {
                    setShowDeleteModal(false);
                    setAdminPassword('');
                    setFileToDelete(null);
                    setDeleteCategory(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className='px-4 py-2 bg-[#D03000] text-white rounded'
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
