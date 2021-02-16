# Events and Tags overview

| Event                              | Description                                                            | Related Tags                                       |
|------------------------------------|------------------------------------------------------------------------|----------------------------------------------------|
| UserAddedEvent                     | User was added after sign-up                                           | users-catalog, user:id                             |
| UserProfileEditedEvent             | User profile was edited after sign-in                                  | users-catalog, user:id                                            |
|                                    |                                                                        |                                                    |
| ChannelAddedEvent                  | New channel was added                                                  | channels-catalog, channel:id, user:id              |
| ChannelProfileEditedEvent          | Channel profile was edited                                             | channels-catalog, channel:id, user:id              |
| ChannelArchivedEvent               | Channel was archived                                                   | channels-catalog, channel:id, user:id              |
| ChannelUnarchiveEvent              | Channel was unarchived                                                 | channels-catalog, channel:id, user:id              |
| ChannelAssociatedUserEvent         | User was associated/joined a channel                                   | channels-catalog, channel:id, user:id              |
| ChannelDissociatedUserEvent        | User was dissociated from a channel                                    | channels-catalog, channel:id, user:id              |
|                                    |                                                                        |                                                    |
| PublicMessageAddedEvent            | New public message was added to a channel                              | messages-catalog, channel:id, message:id, user:id, |
| MessageHiddenEvent                 | Message was hidden from a channel or private conversation              | channel:id, message:id, user:id                    |
| MessageContentEditedEvent          | Message content was edited, from a channel or private conversation     | channel:id, message:id, user:id                    |
| PublicMessageRecipientsEditedEvent | Public message recipients were edited from a message                   | channel:id, message:id, user:id                    |
| MessageMediumEdited                | Message attachments were edited from a channel or private conversation | channel:id, message:id, user:id                    |
|                                    |                                                                        |                                                    |

| Tag              | Description                               |
|------------------|-------------------------------------------|
| users-catalog    | Get all signed-up users                   |
| user:id          | Get all operations for a specific user    |
|                  |                                           |
| channels-catalog | Get all operations for channels-catalog       |
| channel:id       | Get all operations for a specific channel |
|                  |                                           |
| message-catalog  | Get all added messages                    |
| message:id       | Get all operations for a specific message |
|                  |                                           |
