

type LangProps = {
    fieldLabel: string,
    fieldName: string,
    defaultLang: string,
    changeHandler: (lang:string)=>void
}
function LanguageSelect(props: LangProps){


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
      ];
    return(
        <div>
            <label htmlFor={props.fieldName} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.fieldLabel}</label>  
            <select id={props.fieldName} onChange={(e)=>props.changeHandler(e.target.value )} defaultValue={props.defaultLang}>
              {languages.map((val)=>{
                
                return <option key={'from'+val} value={val} >{val.charAt(0).toUpperCase() + val.slice(1)  }</option>
              })}
            </select>
          </div>
    )
}

export default LanguageSelect