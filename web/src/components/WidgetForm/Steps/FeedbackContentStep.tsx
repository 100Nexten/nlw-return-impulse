import { FormEvent, useState } from "react";
import { ArrowLeft } from 'phosphor-react'
import { FeedbackType, feedbackTypes } from '..'
import { CloseButton } from "../../CloseButton"
import { ScreenshotButton } from "../ScreenshotButton";
import { api } from "../../../lib/api";
import { Loading } from "../../Loading";

interface FeedbackContentStepProps{
  feedbackType: FeedbackType;
  onFeedbackSent: () => void;
  onFeedbackRestartRequested: () => void;
}

export function FeedbackContentStep({feedbackType, onFeedbackRestartRequested, onFeedbackSent}:FeedbackContentStepProps){
  const feedbackTypesInfo = feedbackTypes[feedbackType]
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState<string>('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)


  async function handleSubmitFeedback(event :FormEvent){
    event.preventDefault();

    setIsSendingFeedback(true)
    await api.post('/feedbacks',{
      type: feedbackType,
      comment,
      screenshot
    })
    
    setIsSendingFeedback(false);
    onFeedbackSent()
  }

  return (    
    <>
      <header >
        <button 
          onClick={onFeedbackRestartRequested} 
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft className="" weight="bold"/>
        </button>

        <span className='text-xl leading-6 flex items-center gap-2'>
          <img className='w-6 h-6' src={feedbackTypesInfo.image.source} alt={feedbackTypesInfo.image.alt} />
          {feedbackTypesInfo.title}
        </span>
        
        <CloseButton />
      </header>

      <form className='my-4 w-full' onSubmit={handleSubmitFeedback}>
        <textarea 
          
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:outline-none focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin "
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}
        />

        <footer className='flex gap-2 mt-2'>
          <ScreenshotButton 
            screenshot={screenshot!}
            onScreenshotTook={setScreenshot}
          />
          
          
            

          <button 
            disabled={comment.length === 0 || isSendingFeedback}
            type='submit' 
            className="bg-brand-500 p-1 rounded-md border-transparent flex-1 flex justify-center items-center text-sm 
              hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 
              focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            { isSendingFeedback ? <Loading /> : "Enviar Feedback"}
          </button>
        

        </footer>
      </form>
    </>
  )
}