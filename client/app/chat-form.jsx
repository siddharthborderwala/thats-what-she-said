import axios from 'axios'
import React from 'react'
import { getStore } from './store'
import uuid from './uuid'

axios.defaults.baseURL = 'http://localhost:5000'

const ChatForm = ({ threshold }) => {
  const formRef = React.useRef()
  const [loading, setLoading] = React.useState(false)
  const setMessages = getStore.messages()[1]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    const msg = data.get('text').toString().trim()
    if (msg === '') {
      return
    }

    setMessages((m) => [...m, { text: msg, user: 'me', id: uuid() }])

    formRef.current.reset()
    setLoading(true)

    try {
      const response = await axios.post('/predict', data)
      const p = Number.parseFloat(response.data) * 100
      const reply = p > threshold ? `that's what she said` : 'uh huh'
      setMessages((m) => [...m, { id: uuid(), text: reply, user: 'bot' }])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    formRef.current.firstChild.focus()
  }, [])

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="px-4 py-2 flex">
      <input
        className="flex-1 bg-transparent border border-gray-600 rounded-md focus:ring outline-none p-2"
        type="text"
        placeholder="Type a message..."
        name="text"
      />
      <button
        className="ml-2 rounded-md bg-green-500 text-white px-4 focus:ring ring-green-300 outline-none"
        disabled={loading}
      >
        Send
      </button>
    </form>
  )
}

export default ChatForm
