"use client"

import { useState, useRef, useEffect } from "react"

interface AskRickProps {
  initialQuestion?: string
}

interface Message {
  question: string
  answer: string
  typing?: boolean
}

export function AskRick({ initialQuestion = "" }: AskRickProps) {
  const [question, setQuestion] = useState("")  
  const [history, setHistory]   = useState<Message[]>([])
  const [loading, setLoading]   = useState(false)

  const externalTriggerRef = useRef(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const q = initialQuestion.trim()
    if (q) {
      externalTriggerRef.current = true
      sendQuestion(q)
    }
  }, [initialQuestion])

  useEffect(() => {
    if (externalTriggerRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
      externalTriggerRef.current = false
    }
  }, [history])

  const sendQuestion = async (q: string) => {
    setHistory(prev => [
      ...prev,
      { question: q, answer: "Рик набирает ответ...", typing: true }
    ])
    setLoading(true)

    try {
      const res = await fetch("http://localhost:8000/ask-rick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      })
      const { answer } = await res.json()

      setHistory(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = { question: q, answer }
        return copy
      })
    } catch {
      setHistory(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = {
          question: q,
          answer: "Что-то пошло не так. Рик взорвался 🧨"
        }
        return copy
      })
    } finally {
      setLoading(false)
      setQuestion("")
    }
  }

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const q = question.trim()
    if (!q || loading) return
    sendQuestion(q)
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded shadow-sm bg-card flex h-[80vh] flex-col">
      <h2 className="text-2xl font-bold text-center">Чат с Риком 🧪</h2>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-end">
              <div className="bg-primary text-white dark:text-black p-3 rounded-lg rounded-br-none shadow max-w-[80%]">
                {item.question}
              </div>
            </div>
            <div className="flex justify-start">
              <div
                className={`p-3 rounded-lg rounded-bl-none shadow max-w-[80%] ${
                  item.typing ? "bg-muted text-muted-foreground italic" : "bg-muted text-foreground"
                }`}
              >
                {item.answer}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSubmit} className="flex gap-2 pt-4">
        <input
          type="text"
          placeholder="Например: Что ты думаешь о Джерри?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit(e)}
          className="flex-1 p-2 border rounded bg-background text-foreground"
        />
        <button
          type="button"
          onClick={() => onSubmit()}
          disabled={loading}
          className="px-4 py-2 text-black dark:text-black bg-primary text-white rounded hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "..." : "Отправить"}
        </button>
      </form>
    </div>
  )
}
