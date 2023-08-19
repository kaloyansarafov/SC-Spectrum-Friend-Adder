# SC-Spectrum-Friend-Adder

## What is this?  
This is a script made to add friends in bulk using RSI's Spectrum API.  

## How does it work?  
Using the credentials you input into the env after logging in to spectrum, it sends 2 requests to the spectrum API, one which gets the ID of the user, and another which sends a friend request to the user with the given ID.  
You can find the required credentials by opening the network tab in your browser's devtools, and, after reloading the page, finding the list request and looking at the request headers, the names should be self-explanatory.  
Once you have the credentials inputted, you can put the names of the users you'd like to add into the input.txt separated with spaces (`name1 name2...`)  
When that's ready, running the program is as simple as typing `node index.js` into your terminal

## Requirements  
- A Star Citizen / Spectrum account
- [Node.Js](https://nodejs.org/en/download/) 
