import { modificationsRegex } from '~/utils/diff';
import { Markdown } from './Markdown';

interface UserMessageProps {
  content: string;
  data?:any;
}

export function UserMessage({ content, data }: UserMessageProps) {
  return (
    <div className="overflow-hidden pt-[4px]">
      {
        data?.map((item:any)=>{
          return(
            <div style={{display:"flex"}}>
            <img src={item?.url} style={{width:"150px", height:"150px"}}/>
            </div>
          )
        })
      }
   
      <Markdown limitedMarkdown>{sanitizeUserMessage(content)}</Markdown>
    </div>
  );
}

function sanitizeUserMessage(content: string) {
  return content.replace(modificationsRegex, '').trim();
}
