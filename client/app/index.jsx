import React from 'react'
import Slider from 'react-input-slider'
import ChatForm from './chat-form'
import ChatList from './chat-list'

const App = () => {
  const [value, setValue] = React.useState(95)

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-64 h-full p-4 text-white overflow-auto bg-gradient-to-tr from-blue-400 via-indigo-500 to-indigo-600 self-start">
        <h1 className="font-bold text-3xl">Double Entendre Chat</h1>
        <p className="mt-4">by Siddharth Borderwala</p>
        <div className="mt-auto font-mono">
          <p>Threshold - {value}%</p>
          <Slider axis="x" x={value} onChange={({ x }) => setValue(x)} />
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col bg-red-50">
        <ChatList />
        <ChatForm threshold={value} />
      </div>
    </div>
  )
}

export default App
