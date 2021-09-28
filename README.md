# Matcha
## Summary
This project is about creating a dating website.
A user can subscribe and fill his personal details and preferences, in order to match another user having a similar profile.
Once 2 users matched, they are able to chat between each other thanks to a private messenger.
## Features
# User profile
A user can subscribe with a username, an email, a first name, a last name and a password. The user must be able to reset his password wether he is connected or not (with a reset email in case of forgetting). The user must be able to logout from anywhere on the website.

Once connected, the user can change his age, his gender, his sexual orientation, write a short bio, create a tag list of interests, and upload up to 5 pictures.

The user must be able to change his information at any time from his profile page.

The user must be able to see the people who liked or visited his profile.

The user must be geolocated accurately.

Each user has a popularity score based of his number of likes.
# Matches
The user has access to a list of suggestions sorted respecting some criteria:
* the sexual orientation
* the proximity
* the common interests
* the popularity score

The list can be filtered by interval or sorted by age, location, popularity and tags.

The user can visit any profile page proposed in the list. That profile page contains all the information about the user.

The user can send a like to another user. If this user sends a like back, they both match and are able to communicate with each other through the chat.

The user can block or report another user, and must be able who is online or not.

# Notifications
A user must receive notifications in real time when:
* he received a like
* he received a visit
* he received a message
* he matched with someone
* a matched user cancelled the match

## Execution
```npm start```
## Recommendations
HTML, CSS and JavaScript must be used for the client side.

The frontend is coded in React.js.

The backend is coded in Node.js and Express.

The application must be compatible at least on Firefox (>= 41) and Chrome (>= 46).

The database used must be of type relational or graph. I used a MySQL database for this project.

The project must NOT contain an extern library proposing:
* an ORM (or ODM)
* a data validator
* a user accounts manager
* a database manager

The website must fit on a mobile phone.

Every forms have to have correct validations (client and server side).

The overall website must be secure (passwords encoded, prevent SQL injections, etc.).
