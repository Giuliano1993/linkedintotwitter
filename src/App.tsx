
import './App.css'
import axios from 'axios';
import { useState } from 'react';
/*import dotenv from 'dotenv';
const process = dotenv.config();*/


function App() {

  const [post, setPost] = useState();

  const sendToWebhook = function(e){
    console.log('ciao')
    console.log(post)
    console.log(import.meta.env)
    axios.post(import.meta.env.VITE_WEBHOOK,
      {
        'Text': post 
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

  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col px-5">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your long post</label>
        <textarea value={post} onChange={event => handlePostChange(event)} id="message" rows="10" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." />
        <button onClick={event => sendToWebhook(event)}>Invia</button>
      </div>
    </>
  )
}

export default App
