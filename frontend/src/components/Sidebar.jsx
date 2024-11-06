const chats = [
    {
        username: 'John Doe',
    },
    {
        username: 'Jane Doe',
    },
    {
        username: 'John Smith',
    },
    {
        username: 'Jane Smith',
    },
];

const Sidebar = ({ sidebarOpen, toggleSidebar, setActiveChat }) => {

    const handleClick = (username) => {
        setActiveChat(username);
        toggleSidebar();
    };

    const chatList = chats.map((chat, index) => {
        return (
            <button 
                key={index} 
                className="w-full p-2 my-2 border-b-2 border-b-black text-left"
                onClick={() => handleClick(chat.username)}
            >
                {chat.username}
            </button>
        );
    });

    return (
        <div className={`flex flex-col h-full w-full xl:w-96 bg-black bg-opacity-40 p-3 ${sidebarOpen && 'xl:border-r-2 xl:border-r-black'}`}>
            <button
                className="w-full p-1 bg-accent rounded-md text-lg"
            >
                New Chat
            </button>
            <div className="w-full h-full overflow-y-auto mt-5">
                {chatList}
            </div>
        </div>
    );
};

export default Sidebar;