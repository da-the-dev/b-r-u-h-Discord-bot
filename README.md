## b r u h Disord bot

> #### QUICK WARNINGS
>
> 1. THIS BOT REPLIES IN RUSSIAN. ENGLISH SUPPORT WILL ARRIVE SOON.

#### What is this thing?

Simple question, really. It's one of my many bots for Discord that I created for fun/educational purposes. It can analyze different commands entered by users on a Discord server. Down below you will see them and how to use them. It is the first project I take seriously and I plan to work hard on it. <br>
The current goal of this bot is for me to learn to code, share my code with the Internet and hopefully turn this project into something great.

#### What can it do?

It does some things. These are some of the commands I've implemented:

-   `!test` will reply a message if the bot is online.
-   `!ping` will reply a message with the ping of the bot.
-   `!help` will reply a message in DM with all of the commands.
-   `!mkgrp {name} {@users[]}` will create a grop of a voice and a text channel with names `{name}` and give rights to see and iteract with these channels to the author of the message and the people mentioned in `{@users[]}`. <br>
    > Example:
    >
    > ```
    > !mkgrp coolgang @bro @bruh @supercooldaniel
    > ```
    >
    > This will create a voice channel 'coolgang' and a text channel 'coolgang' and allow only you, user @bro, user @bruh and user @supercooldaniel to use them.
-   `!delgrp` will delete the created group.
-   `!sign` will set an _'owner'_ of the bot on the server. This user aquires access to commands such as `!settings`, etc.
-   `!trade` requieres a channel to be selected with `!settings` _(do `!sign` beforehand _(owners only)_)_ . This command lets users trade with each other. Just send a trade link in a trade channel and now you can be selected to trade by other users with `!trade @user`. This opens a browser tab with a trade. Links don't expire as long as the trade channel is valid. You can update your trade link by just sending a new one.
-   `!settings` ⏤ the ultimate command only given to owners. It is in work right now, but you already can do some stuff with it. Bot replies with a cool-looking message and reactions to it. Pick one option are react with appropriate letter. The bot will execute your command. No one can interfere while you are changing the settings.
-   `!tournament`. Work-in-progress command. You can now start a tournament on your DS server. Type `!tournament create {name} @mentions` to create the tournament called `{name}` with players `@mentions`. Keep in mind that the number of players should be a power of two (2, 4, 8, 16, 32, 64).

#### OK, the commands are nice, how do I use them?

Just enter the command in chat.

#### Does it work 24/7?

Yes, I'm hosting the bot on Heroku 24/7

#### Can I use this bot?

Not yet. I removed the link for a while. Multiple language support is a tricky thing to do and it takes some time and thinking. It's a big task that might I hope that one day b r u h Discord bot would be popular.

#### Can I use your code?

You can freely use any code.
