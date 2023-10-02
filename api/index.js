const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const localStratege = require('passport-local').Strategy
const multer = require('multer');


const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())

mongoose.connect(
  "mongodb+srv://aayush91103:Aayush91103@chatapp.mstzkg7.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log("Connected to database")
}).catch((error) => {
  console.log("Error : " + error)
})

app.listen(port, () => {
  console.log(`Connected to ${port} and ready to go`)
})

app.use('/image', express.static('image'))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    //accept
    cb(null, true)
  }
  else {
    //reject
    cb(null, false)
  }
}
const uploadProfilePic = multer({
  storage: storage, limits: {
    fieldSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})


const User = require('./models/user')
const Message = require('./models/message')
console.log('Models called')

// user registration
app.post('/signup', uploadProfilePic.single('image'), (req, res) => {
  const { name, email, password } = req.body;

  // Check if an image was uploaded
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  // create a new User object
  const newUser = new User({ name, email, password, image: req.file.path });

  // save the user to the database
  newUser
    .save()
    .then(() => {
      res.status(200).json({ message: "User registered successfully" });
    })
    .catch((err) => {
      console.log("Error registering user", err);
      res.status(500).json({ message: "Error registering the user!" });
    });
})

//user login
//function to create a token for the user
const createToken = (userId) => {
  // Set the token payload
  const payload = {
    userId: userId,
  };

  // Generate the token with a secret key and expiration time
  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "12h" });

  return token;
};

//endpoint for logging in of that particular user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  //check if the email and password are provided
  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "Email and the password are required" });
  }

  //check for that user in the database
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        //user not found
        return res.status(404).json({ message: "User not found" });
      }

      //compare the provided passwords with the password in the database
      if (user.password !== password) {
        return res.status(404).json({ message: "Invalid Password!" });
      }

      const token = createToken(user._id);
      res.status(200).json({ token });
    })
    .catch((error) => {
      console.log("error in finding the user", error);
      res.status(500).json({ message: "Internal server Error!" });
    });
});

// endpoint to access all users except the one us which are logged In
app.get("/users/:userId", (req, res) => {
  const loggedInUserId = req.params.userId;

  User.find({ _id: { $ne: loggedInUserId } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log("Error retrieving users", err);
      res.status(500).json({ message: "Error retrieving users" });
    });
});

//endpoint to send a request to a user
app.post("/friend-request", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    // Update the recipient's friendRequests array (person receiving the request)
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { friendRequests: currentUserId },
    });

    // Update the sender's sentFriendRequests array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendRequest: selectedUserId },
    });

    console.log("Friend request sent successfully.");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.sendStatus(500);
  }
});

// endpoint to see all friendrequest of a particular user
app.get('/friend-req/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("friendRequests", "name email image").lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friendRequest = user.friendRequests;
    res.status(200).json(friendRequest);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error retrieving friend requests" });
  }
});

//endpoint to accept a friend-request of a particular person
app.post("/friend-request/accept", async (req, res) => {
  try {
    const { senderId, recepientId } = req.body;

    //retrieve the documents of sender and the recipient
    const sender = await User.findById(senderId);
    const recepient = await User.findById(recepientId);

    sender.friends.push(recepientId);
    recepient.friends.push(senderId);

    recepient.friendRequests = recepient.friendRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentFriendRequest = sender.sentFriendRequest.filter(
      (request) => request.toString() !== recepientId.toString
    );

    await sender.save();
    await recepient.save();

    res.status(200).json({ message: "Friend Request accepted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});