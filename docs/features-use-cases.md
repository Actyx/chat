# Use cases

## FEATURES OVERVIEW

### Distributed

Communication between clients is possible without a central server.

**Authentication**\
Users can signup and login without using any third party

**Channels**\
A central space for conservations, users can communicate openly in these spaces.

**Messaging**\
Users can send plain text messages. Users can edit/delete their messages.

**Search [LATER]**\
Find messages among channels.

**Direct messages [LATER]**\
Users can communicate privately outside Channels.

**Mentions [LATER]**\
Users can see a list of messages where he was mentioned as a recipient across channels.

## Use cases details

### Authentication

- [x] A user sign-up to the system providing a display name and email, if the email provided is not already in the system, the system will register the user and return him a unique identifier. If the email already exists in the system the user won't be able to sign-up
- [x] A user can sign-in to the system proving a unique identifier, if the identifier is recorded in the system user can sign-in and visit the main channel, if the identifier provided does not exist in the system the user won't be able to sign-in

User profile

- [x] A user display name is always visible in the app bar
- [x] A user can edit its display name
- [x] A user can sign-out from the chat

Notes:

- The unique identifier cannot be deleted or changed, recovery credentials are out of scope for now

### Channels

- [x] The system, when initiated, creates a default channel called "main", this channel cannot be deleted or archived but can be renamed
- [x] A user can create a channel providing a unique name and an optional description, if the channel name is already present in the system, the user is notified and the new channel cannot be created
- [x] A user can create a channel and he will automatically join it
- [x] Any users can edit the channel name and description, information on when and who made the last edit are shown to every users
- [x] Only the user who created a channel can archive it, when archived the channel won't be visible as in the sidebar as active channels for all users in the chat
- [x] Only the user who created a channel can unarchived it
- [x] A user can browse all channels in alphabetical ascending order
- [x] A user can see all users joined to a channel
- [x] A user can join a channel
- [x] A user can leave a channel
- [x] A user can enter a new message into a channel
- [x] A user can view all related messages in a channel
- [x] A channel display all its messages in simple ascending order, the latest are always visible at the bottom

Notes: it is not possible to really delete a channel only to archive it

### Messaging

- [x] A message displays textual content, sender, and date/time
- [x] A user can copy and paste emojis
- [x] A user can edit his messages only
- [x] A user can delete his messages only
- [x] A user can delete a message in a channel, when deleted the message is not visible in the channel
- [x] A user can edit the textual content of a message, when edited the message is marked as edited
- [ ] A user can delete a message in a direct conversation, when deleted the message is not visible in the direct conversation [LATER]
- [ ] A user can add to a message multiple recipients [LATER]
- [ ] A user can edit/remove multiple recipients from a message [LATER]

### Search [LATER]

- [ ] A user can search for any text included in the messages textual contents
- [ ] A user can view a search result composed of a list of messages, each message is associated with its channel, messages associated with an archived channel are not displayed in the search result
- [ ] A user can visit a specific message in its channel by selection

### Direct messages [LATER]

- [ ] A user is presented with a list of other users in the system
- [ ] A user can send a direct message to another user outside a channel by selecting a single user from the list
- [ ] Direct messages can involve only two users

### Mentions [LATER]

- [ ] A user can see a list of messages in which he was associated as a recipient, each message is associated with its channel
- [ ] A user can visit a specific message in its channel by selection
