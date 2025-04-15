interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export const MessageBubble = ({ role, content, timestamp }: MessageBubbleProps) => {
  return (
    <div className={`flex items-start max-w-[80%] gap-4 ${
      role === 'user' ? 'message-out' : 'message-in'
    }`}>
      {role === 'assistant' && (
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur group-hover:blur-md transition-all duration-300 opacity-50"></div>
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:scale-110 transition-all duration-300">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      )}
      
      <div className={`relative group rounded-2xl p-4 shadow-lg transform transition-all duration-300 hover:scale-[1.02] ${
        role === 'user'
          ? 'glass-dark text-white'
          : 'glass hover:bg-white/90'
      }`}>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          <div className="whitespace-pre-wrap">{content}</div>
          {timestamp && (
            <div className={`text-xs mt-2 flex items-center gap-1 ${
              role === 'user' ? 'text-blue-100' : 'text-gray-500'
            }`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {timestamp.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      {role === 'user' && (
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-600 rounded-full blur group-hover:blur-md transition-all duration-300 opacity-50"></div>
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:scale-110 transition-all duration-300">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
