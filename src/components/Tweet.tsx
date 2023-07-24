import { useState } from 'react';

type TweetProps = {
    tweet: string
}

function Tweet(props: TweetProps) {
    const [savedText, setSavedText ]  = useState("");
    const [shownText, setShownText ]  = useState(props.tweet);

    const copyTweet = function(){
        navigator.clipboard.writeText(props.tweet)
        setSavedText(props.tweet)
        console.log(savedText);
        setShownText("Copied")
        console.log(shownText);

        setTimeout(() => {
            setShownText(props.tweet);
            setSavedText("");
            console.log(shownText);
        }, 1500);
    }
    return(
        <li  className={`pb-3 sm:pb-4 cursor-pointer px-2 py-2 hover:bg-indigo-100 ${savedText.length > 0 ? "text-green-700" : ""}`} onClick={()=>copyTweet()}>{shownText}</li>
    )
}


export default Tweet