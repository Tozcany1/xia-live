'use client'

import { useChat } from 'ai/react'
import { Send } from 'lucide-react'

type ChatProps = {
  modelId: string;
}

export default function Chat({ modelId }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: {
      modelId: modelId
    }
  })

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.length > 0
        ? messages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap mb-4">
              <span className="font-bold">
                {m.role === 'user' ? 'Tú: ' : 'Shia: '}
              </span>
              {m.content}
            </div>
          ))
        : <div className="text-center text-gray-400">Dile algo a Shia...</div>
      }

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md p-2 mb-8 bg-white">
        <div className="flex">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={input}
            placeholder="Escribe aquí..."
            onChange={handleInputChange}
          />
          <button type="submit" className="p-2 ml-2 border rounded">
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}
