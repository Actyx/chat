# Events and Tags overview


| Event                              | Description                                                            | Related Tags                                      |
|------------------------------------|------------------------------------------------------------------------|---------------------------------------------------|
| UserAddedEvent                     | User was added after sign-up                                           | user-catalog, user:id                             |
| UserProfileEditedEvent             | User profile was edited after sign-in                                  | user-catalog, user:id                             |
|                                    |                                                                        |                                                   |
| ChannelAddedEvent                  | New channel was added                                                  | channel-catalog, channel:id, user:id              |
| ChannelProfileEditedEvent          | Channel profile was edited                                             | channel-catalog, channel:id, user:id              |
| ChannelArchivedEvent               | Channel was archived                                                   | channel-catalog, channel:id, user:id              |
| ChannelUnarchiveEvent              | Channel was unarchived                                                 | channel-catalog, channel:id, user:id              |
| ChannelAssociatedUserEvent         | User was associated/joined a channel                                   | channel-catalog, channel:id, user:id              |
| ChannelDissociatedUserEvent        | User was dissociated from a channel                                    | channel-catalog, channel:id, user:id              |
|                                    |                                                                        |                                                   |
| PublicMessageAddedEvent            | New public message was added to a channel                              | message-catalog, channel:id, message:id, user:id, |
| MessageHiddenEvent                 | Message was hidden from a channel or private conversation              | message-catalog, channel:id, message:id, user:id  |
| MessageContentEditedEvent          | Message content was edited, from a channel or private conversation     | message-catalog, channel:id, message:id, user:id  |
| PublicMessageRecipientsEditedEvent | Public message recipients were edited from a message                   | message-catalog, channel:id, message:id, user:id  |
| MessageMediumEdited                | Message attachments were edited from a channel or private conversation | message-catalog, channel:id, message:id, user:id  |
|                                    |                                                                        |                                                   |

| Tag             | Description                                          | Fish               |
|-----------------|------------------------------------------------------|--------------------|
| user-catalog    | Get all operations for sign-up, sign-in and profiles | UserCatalogFish    |
| user:id         | Get all operations for a specific user               | UserCatalogFish    |
|                 |                                                      |                    |
| channel-catalog | Get all operations for channels                      | ChannelCatalogFish |
| channel:id      | Get all operations for a specific channel            | mkChannelFish      |
|                 |                                                      |                    |
| message-catalog | Get all operations on messages                       | mkChannelFish      |
| message:id      | Get all operations for a specific message            | *for future usage* |
|                 |                                                      |                    |
