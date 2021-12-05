import React from 'react'
import { useStore } from './store'

const ChatList = () => {
  const [chats] = useStore.messages()
  const listRef = React.useRef()

  React.useEffect(() => {
    listRef.current?.lastChild?.scrollIntoView()
  }, [chats])

  return (
    <div
      className="overflow-y-auto flex flex-col flex-1 space-y-2 p-4"
      ref={listRef}
    >
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`max-w-1/2 bg-gradient-to-tr ${
            chat.user === 'me'
              ? 'from-yellow-400 via-red-400 to-pink-500 self-end'
              : 'from-blue-400 via-indigo-500 to-indigo-600 self-start'
          } border-none rounded-md shadow px-2 py-1 text-white`}
        >
          {chat.text}
        </div>
      ))}
    </div>
  )
}

export default ChatList
