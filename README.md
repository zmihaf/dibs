# Dibs

*Dibs is currently on RFC phase, and is a side project maintained by [@zmihaf](https://github.com/zmihaf) on his free time. Issue or Pull Request is highly welcomed since this is still so far from being completed*

```staging server: https://dibs.test.tvlk.cloud```

> I call dibs!

**Dibs is a websocket server built on top of [socket.io](https://socket.io/) which main purpose is to handle internal tools real time front end features.**

## Background

At first, Dibs is a proposed solution to ops team's problem that they need to eliminate racing condition when two or more ops accidentally do the same action to a booking, e.g. rebook, refund, etc.

Other possible solution is to handle the racing condition on backend, by doing the rejection on API call, on a simple action that would be pretty harmless, but on an action that needs a large form to be filled first to be submitted, that would be gruesome since ops will see their action is rejected only after they wasted a large amount of time filling the form.

But other needs of websocket on internal tools is always welcomed, e.g. live monitoring of urgent bookings, notification when there is a new urgent booking, etc.

## How it works

Currently Dibs simply records a single `pageVisitorInfo` object containing a map of webpages that connects to Dibs and the webpage's `window.location` and the client's `visitTimestamp`. This `pageVisitorInfo` object will be transmitted to all connected clients (not utilizing namespace as of now) on every client connection/disconnection/navigation.

## Sample use case
```
10.30: Ops A goes to https://ebitool.traveloka.com/transaction-detail?id=309208537 to rebook the problematic booking
10.31: Ops A clicks the rebook button
10.32: Unknowingly, Ops B also goes to https://ebitool.traveloka.com/transaction-detail?id=309208537 to do rebook
10.33: Both on Ops A and Ops B's screen will appear a popup that notifies that there are also other people currently viewing the page (later this can be improved maybe by disabling the rebook button on Ops B)
```

## Install & Local Setup

Currently there is no fancy build system for dibs 😅 so you can directly edit & run `node index.js` or `yarn start`

```
git clone git@github.com:traveloka/dibs.git
cd dibs
yarn
yarn start
```

## Client setup

### React
Go to [react-dibs's repository](https://github.com/traveloka/react-dibs) for plugging in Dibs to your react app (p.s. it's one render props away 🙂)
