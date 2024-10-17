import { modificationsRegex } from '~/utils/diff';
import { Markdown } from './Markdown';
import { useState } from 'react';

interface UserMessageProps {
  content: string;
  data?:any;
}

export function UserMessage({ content, data }: UserMessageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <div className="overflow-hidden pt-[4px]">
        <div style={{display:"flex"}}>
      {
        data?.map((item:any)=>{
          return(
          <span style={{padding:"5px", cursor:'pointer'}}   onClick={() => handleImageClick(item?.url)} >
             <img src={item?.url} style={{width:"130px", height:"120px"}} />
          </span>
           
         
          )
        })
      }
         </div>
   
      <Markdown limitedMarkdown>{sanitizeUserMessage(content)}</Markdown>
      {selectedImage && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
       
          <img
            src={selectedImage}
            alt="Selected Preview"
            style={{ width: 'auto', height: 'auto' }}
          />
          <div>
            <button onClick={() => setSelectedImage(null)} style={{marginTop:"10px", background:"red", color:'#ffff', padding:"5px", borderRadius:"5px"}}>Close Preview</button>
          </div>
        </div>
      )}
    </div>
  );
}

function sanitizeUserMessage(content: string) {
  return content.replace(modificationsRegex, '').trim();
}
