import bugImageUrl from '../../images/bug.svg'
import ideaImageUrl from '../../images/idea.svg'
import thoughtImageUrl from '../../images/thought.svg'

import { useState } from 'react'
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSucessStep } from './Steps/FeedbackSucessStep'

export const feedbackTypes = {
  BUG:{
    title: 'Problema',
    image:{
      source: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA:{
    title: 'Ideia',
    image:{
      source: ideaImageUrl,
      alt: 'Imagem de uma lampada'
    }
  },
  OTHER:{
    title: 'Outro',
    image:{
      source: thoughtImageUrl,
      alt: 'imagem de um balão de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm(){
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback(){
    setFeedbackSent(false)
    setFeedbackType(null)
  }


  return (
    <div className='bg-zinc-900 p-4 relative rounded-2xl mb-3 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto ' >
      
      { feedbackSent ? (
        <FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedback} /> 
      ) : (
        <> 
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} /> 
          ) : (
            <FeedbackContentStep 
              feedbackType={feedbackType} 
              onFeedbackRestartRequested={handleRestartFeedback} 
              onFeedbackSent={() => setFeedbackSent(true)}
            />
        )}
        </>
       )}

      <footer>
        Feito com ♥ 
        por <a className='underline underline-offset-1' href="https://christianlima.live">Clima</a>
      </footer>
    </div>

  )
}