let translateBtn=document.querySelector("button");
let selectTag=document.querySelectorAll("select");
selectTag.forEach(tag=>{
    for(const countrycode in countries){
        let selected=false;
        if(tag.id=="select0" && countrycode=="en-GB")
            selected=true;
        else if(tag.id=="select1" && countrycode=="hi-IN")
            selected=true;
        let option=`<option value="${countrycode}" ${selected?'selected':''}>${countries[countrycode]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);
    }
})
translateBtn.addEventListener("click",async()=>{
    let fromLang=selectTag[0].value;
    let toLang=selectTag[1].value;
    let fromText=document.querySelector("#from").value;
    let toText=document.querySelector("#to");
    let url=`https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLang}|${toLang}`;
    let response=await fetch(url);
    let x=await response.json();
    toText.value=x.responseData.translatedText;
})
let exchange=document.querySelector(".fa-solid.fa-arrow-right-arrow-left");
exchange.addEventListener("click",()=>{
    let temp=selectTag[0].value;
    selectTag[0].value=selectTag[1].value;
    selectTag[1].value=temp;
    let t=document.querySelector("#from").value;
    document.querySelector("#from").value=document.querySelector("#to").value;
    document.querySelector("#to").value=t;
})
let copyElements=document.querySelectorAll(".fa-solid.fa-copy");
copyElements.forEach(ele=>{
    ele.addEventListener("click",()=>{
        if(ele.id=="fromCopy")
            navigator.clipboard.writeText(document.querySelector("#from").value);
        else
            navigator.clipboard.writeText(document.querySelector("#to").value);
    })
})
let voiceElements=document.querySelectorAll(".fa-solid.fa-volume-high");
voiceElements.forEach(ele=>{
    ele.addEventListener("click",()=>{
        let utterance;
        if(ele.id=="fromVol"){
            utterance=new SpeechSynthesisUtterance(document.querySelector("#from").value);
            utterance.lang=selectTag[0].value;
        }
        else{
            utterance=new SpeechSynthesisUtterance(document.querySelector("#to").value);
            utterance.lang=selectTag[1].value;
        }
        speechSynthesis.speak(utterance);
    })
})