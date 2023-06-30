
import './App.css'
import axios from 'axios';
import { useState } from 'react';
import Tweet from './components/Tweet';
import LanguageSelect from './components/LanguageSelect';

interface Errors {
  post: string|boolean,
  langFrom: string|boolean,
  langTo: string|boolean
}


interface SingleTweet{
  columns: Array<string>
}
function App() {

  const [post, setPost] = useState("");
  const [langFrom, setLangFrom] = useState("Italian");
  const [langTo, setLangTo] = useState("English");
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    post : false,
    langFrom: false,
    langTo: false
  });
  const sendToWebhook = function(){
    if(!post){
      const actualErrors = {...errors}
      actualErrors.post = "There is no post"
      setErrors(actualErrors);
      return
    }
    setIsLoading(true);
    axios.post(import.meta.env.VITE_WEBHOOK,
      {
        'Text': post ,
        'LangFrom': langFrom,
        'LangoTo': langTo
      }
    ).then((res )=>{
      setIsLoading(false);

      const loadedTweets = res.data.map((el: SingleTweet)=>{
        
        return el.columns[0]
      })
      console.log(loadedTweets)
      setTweets(loadedTweets)
      console.log(tweets)
    }).catch((err)=>{
      console.error(err);
      setIsLoading(false);
    })
  }


  const handlePostChange = function(e: React.ChangeEvent<HTMLTextAreaElement>){
    setPost(e.target.value);
  }

  return (
    <>
      <div className="flex items-center justify-center h-[90vh] flex-col px-5   bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
          

        <div className="flex">
            <img src="https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg" width="40px"/>
              <h1 className="mb-4 mx-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Linkedin Posts to Tweets</h1>
            <img src="https://cdn.worldvectorlogo.com/logos/twitter-6.svg" width="40px"/>
          </div>
            <p>Convert your long Linkedin posts into many small tweets you can use <b>anytime</b></p>
        <div className='flex items-center justify-around w-full mt-2 mb-2'>
          <LanguageSelect fieldLabel="Language From" fieldName='langFrom' defaultLang={langFrom} changeHandler={setLangFrom}/>
          <LanguageSelect fieldLabel="Language To" fieldName='langTo' defaultLang={langTo} changeHandler={setLangTo}/>
        </div>
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your long post</label>
        <textarea value={post} onChange={event => handlePostChange(event)} id="message" rows={10} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." />
        {errors.post ? (
          <p className="text-red-800">{errors.post}</p>
        ):("")}
        { isLoading ? (
          <div role="status" className='mt-3'>
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
        ) : (
          <div className="mt-3">
            <button className='bg-white transition-all duration-200 mr-3 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={() => sendToWebhook()}>Invia</button>
            <a className='bg-white transition-all duration-200 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' href="./blueprint.json" download rel="noopener noreferrer" target="_blank"> Download Make Blueprint </a>
          </div>
        ) }
        { tweets.length > 0 ? (
          <div>
            <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded bg-white mt-3">
            {
              [...tweets].map((t,i)=><Tweet key={i} tweet={t}/>)
            }
            </ul>
          </div>
        ) : ("")}
        
      </div>
    </>
  )
}

export default App
