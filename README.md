# Music chatroom with Astro, Spotify and websockets 

## To do list
- Spotify authentication - need to be able to login and then the app controls their Spotify player.
    - [x] Copy from the `music-researcher` app.
    - [x] Set up new app in Spotify developer dashboard.
    - [x] Set env variables
    - [x] Set correct authentication scopes so that we can control the player.
- Database setup?
    - [x] Copy basic sqlite stuff from `music-researcher` app. initialise-db script, simple db schema.
    - [x] Rooms
    - [x] Users (linked to spotify user IDs?)
    - Room admins (who can control queue)
    - [x] need to be able to see list of rooms
- Websockets chatrooms
    - need to be able to join
    - When you join the room, the app needs to control your Spotify player. Needs to be able to access the user's cookies to get the spotify auth token
    - users need to be able to see what's in the queue
    - admins need to be able to queue up a new song
    - maybe users can 'request' a song and admins can approve it?

```
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
