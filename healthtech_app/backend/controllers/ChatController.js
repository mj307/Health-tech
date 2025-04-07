const Chat = require('../models/Chat');

// Get all chats for the authenticated user
exports.getChats = async (req, res) => {
  try {
    const userId = req.user.id; // assuming req.user is set by auth middleware
    const chats = await Chat.find({ participants: userId }).populate('participants', 'name');
    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Get a specific chat by ID
exports.getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id).populate('participants', 'name');
    if (!chat) return res.status(404).json({ msg: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Add a new message to a chat
exports.addMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ msg: 'Chat not found' });

    const newMessage = {
      sender: req.user.id,
      text,
    };

    chat.messages.push(newMessage);
    await chat.save();

    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
