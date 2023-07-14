import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from 'axios';
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    
    type HookContext = {
        post: string,
        langFrom: string,
        langTo: string
    }

    if (!event.body ||!process.env.VITE_WEBHOOK) {
        return;
      }
   
      const { post, langFrom, langTo } = JSON.parse(event.body) as HookContext;
      const res = await axios.post(process.env.VITE_WEBHOOK,
        {
          'Text': post ,
          'LangFrom': langFrom,
          'LangoTo': langTo
        }
      )
      const data = await res.data;
      console.log(data)
    return {
        statusCode: 200,
        body: JSON.stringify(data),
      };

};

export { handler };