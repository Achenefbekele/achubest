import Link from 'next/link';

export default function Resources({ resources = [] }) {
  const handleDownload = async (resource) => {
    try {
      const filePath = resource.file.replace(/^\//, '');
      
      const response = await fetch(`/api/documents?path=${encodeURIComponent(filePath)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.download = resource.title;
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download the file. Please try again.');
    }
  };

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <Link 
          href="/stories" 
          className="text-[#FF4719] hover:text-[#D03000] font-semibold"
        >
          Go to Stories
        </Link>
      </div>

      {resources.map((resource) => {
        const isOfficeDoc = /\.(docx?|pptx?|xlsx?)$/i.test(resource.file);
        
        return (
          <div key={resource.id}>
            {isOfficeDoc ? (
              <button
                onClick={() => handleDownload(resource)}
                className="text-blue-600 hover:underline"
              >
                Download {resource.title}
              </button>
            ) : (
              <a
                href={resource.file}
                download
                className="text-blue-600 hover:underline"
              >
                {resource.title}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
} 