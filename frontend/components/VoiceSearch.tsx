"use client"

import { useEffect, useRef, useState } from "react"
import { Mic2 } from "lucide-react"  // npm install lucide-react

interface VoiceSearchProps {
  onResult: (text: string) => void
}

export function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return console.warn("Web Speech API not supported")

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript.trim()
      onResult(transcript)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)

    recognitionRef.current = recognition
  }, [onResult])

  const toggleListening = () => {
    if (!recognitionRef.current) return
    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
    } else {
      recognitionRef.current.start()
      setListening(true)
    }
  }

  return (
    <button
      onClick={toggleListening}
      title={listening ? "Stop listening" : "Voice search"}
      className={`w-12 h-10 dark:bg-primary dark:text-black flex items-center justify-center ${
        listening ? "bg-red-500" : "bg-black"
      } text-white  rounded-r-lg hover:opacity-80 transition`}
    >
      <Mic2 size={20} />
    </button>
  )
}
