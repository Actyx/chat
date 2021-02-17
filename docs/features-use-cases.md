# Use cases

## FEATURES OVERVIEW

### Distributed

Communication between clients is possible without a central server.

**Authentication**\
Users can signup and login without using any third party

**Channels**\
A central space for conservations, users can communicate openly in these spaces.

**Search**\
Find messages among channels.

**Direct messages**\
Users can communicate privately outside Channels.

**Messaging**\
Users can send plain text messages. Users can edit/delete their messages.

**Mentions**\
Users can see a list of messages where he was mentioned as a recipient across channels.

## Use cases details

### Authentication

- [ ] A user sign-up to the system providing a display name and email, if the email provided is not already in the system, the system will register the user and return him a unique identifier, the user will automatically sign-in. If the email already exists in the system the user won't be able to sign-up
- [x] - A user can sign-in to the system proving a unique identifier, if the identifier is recorded in the system user will sign-in and will be redirected to the main channel, if the identifier provided does not exist in the system the user won't be able to sign-in

User profile

- [x] A user display name is always visible in the app bar
- [x] A user can edit its display name
- [x] A user can sign out from the chat

Notes:

- The unique identifier cannot be deleted or changed, recovery credentials are out of scope now

### Channels

- [x] The system, when initiated, creates a default channel called "main", this channel cannot be deleted, renamed, or archived
- [x] A user can create a channel providing a unique name and an optional description, if the name is already present in the system, the user is notified
- [x] A user can create a channel and he will automatically join it
- [x] Any users can edit the channel name and description, information on when and who made the last edit are shown to every user
- [ ] Only the user who created the channel can archive it, when archived the channel won't be visible as active channels
- [ ] Only the user who created the channel can activate/unarchived a channel
- [ ] A user can browse all channels in ascending order
- [ ] A user can see the users joined to a channel
- [ ] A user can join a channel
- [ ] A user can leave channel
- [ ] A user can enter a new message into a channel
- [ ] A channel display all its messages in simple ascending order, the latest are always visible at the bottom

### Messaging

- [x] A message displays textual content, sender, and date/time
- [x] A user can edit his messages only
- [x] A user can delete his messages only
- [x] A user can delete a message in a channel, when deleted the message is not visible in the channel
- [ ] A user can delete a message in a direct conversation, when deleted the message is not visible in the direct conversation

- [ ] A user can edit the textual content of a message, when edited the message is marked as edited
- [ ] A user can add to a message multiple recipients
- [ ] A user can edit/remove multiple recipients from a message

### Search

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
