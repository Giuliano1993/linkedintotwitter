
import './App.css'
import axios from 'axios';
import { useState } from 'react';
/*import dotenv from 'dotenv';
const process = dotenv.config();*/


interface Errors {
  post: string|boolean,
  langFrom: string|boolean,
  langTo: string|boolean
}
function App() {

  const [post, setPost] = useState();
  const [langFrom, setLangFrom] = useState("Italian");
  const [langTo, setLangTo] = useState("English");
  const [errors, setErrors] = useState<Errors>({
    post : false,
    langFrom: false,
    langTo: false
  });
  const sendToWebhook = function(){

    console.log(import.meta.env)
    if(!post){
      const actualErrors = {...errors}
      actualErrors.post = "There is no post"
      setErrors(actualErrors);
      return
    }
    axios.post(import.meta.env.VITE_WEBHOOK,
      {
        'Text': post ,
        'LangFrom': langFrom,
        'LangoTo': langTo
      }
    ).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.error(err);
    })
  }

  const handlePostChange = function(e){
    setPost(e.target.value);
  }

  const languages = [
    "Mandarin Chinese",
    "Spanish",
    "English",
    "Hindi/Urdu",
    "Arabic",
    "Bengali",
    "Portuguese",
    "Russian",
    "Japanese",
    "German",
    "Javanese",
    "Punjabi",
    "Wu",
    "French",
    "Telugu",
    "Vietnamese",
    "Marathi",
    "Korean",
    "Tamil",
    "Italian",
    "Turkish",
    "Cantonese/Yue"
  ]

  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col px-5">
        <div className='flex items-center justify-around'>
          <div>
            <label htmlFor="langFrom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language From</label>  
            <select id="langFrom" onChange={(e)=>setLangFrom(e.target.value)}>
              {languages.map((val)=>{
                const selected = val === langFrom; 
                return <option value={val} selected={selected}>{val.charAt(0).toUpperCase() + val.slice(1)  }</option>
              })}
            </select>
          </div>
          <div>
            <label htmlFor="langTo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language To</label>  
            <select id="langTo" onChange={(e)=>setLangTo(e.target.value)}>
              {languages.map((val)=>{
                const selected = val === langTo; 
                return <option value={val} selected={selected}>{val.charAt(0).toUpperCase() + val.slice(1)
                }</option>
              })}
            </select>
          </div>
        </div>
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your long post</label>
        <textarea value={post} onChange={event => handlePostChange(event)} id="message" rows="10" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." />
        {errors.post ? (
          <p className="text-red-800">{errors.post}</p>
        ):("")}
        <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={event => sendToWebhook(event)}>Invia</button>
      </div>
    </>
  )
}

export default App
