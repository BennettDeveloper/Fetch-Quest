# Deal The Game 🎮💸

## What is this?

**Deal The Game** is a centralized hub for tracking video game deals across the internet. It pulls in real-time pricing data and combines it with game metadata so you can quickly see where a game is cheapest, how good the deal actually is, and whether it’s worth buying right now.

Instead of jumping between multiple storefronts, this app brings everything into one clean interface where you can discover deals, search for games, and dive into detailed pricing breakdowns.

---

## APIs Used

This project integrates multiple public APIs to combine pricing + metadata:

* **CheapShark API** (Primary deal + pricing data)
  https://apidocs.cheapshark.com/

* **RAWG API** (Game metadata such as genres, publishers, and descriptions)
  https://rawg.io/apidocs

* *(Planned / Future Enhancements)*

  * IGDB API
  * IsThereAnyDeal API

---

  I'd also want to add these key features to further spice up the web-application.

  🔥 1. “Hidden Gems on Sale”

Filter for:

high rating
low popularity
big discount

🎲 2. “Deal Roulette”

Button:

🎲 “Find me a random good deal”

Instant engagement.

🧠 3. “Mood-Based Discovery”

User picks:

“Chill”
“Competitive”
“Story-heavy”

You map to genres + ratings + deals.

4. Multiple pages
Right now it's only one page of games but in the future I'd like you to be able to scroll through multiple games.



## Running the Project Locally

Follow these steps to get everything running on your machine:

1. Clone the repository:

```bash
git clone https://github.com/your-username/deal-the-game.git
```

2. Navigate into the project folder:

```bash
cd deal-the-game
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add your RAWG API key:

```bash
VITE_RAWG_API_KEY=your_api_key_here
```

5. Start the development server:

```bash
npm run dev
```

6. Open your browser and go to:

```bash
http://localhost:5173
```

---

## Technical Challenge

One of the biggest challenges during this project came from how API requests were being handled.

I often co-develop with AI, making sure I understand each line of code before integrating it. However, some important implementation details slipped through, specifically around how URLs were being constructed for API requests. Some requests were using relative paths when absolute URLs were required, which caused runtime errors and failed fetch calls.

On top of that, the number of API requests being made (both from my own logic and AI-generated code) exceeded rate limits from CheapShark. This temporarily blocked access to the API and forced cooldown periods of up to 30–40 minutes, slowing development significantly.

There were also smaller issues tied to data flow, such as props being passed into components before they were fully defined, resulting in `undefined` or `null` errors during rendering.

To resolve these issues, I:

* Corrected URL construction by ensuring proper base paths were used
* Implemented safer data handling using optional chaining and fallback values
* Reduced unnecessary API calls and began planning caching strategies
* Improved component guards to prevent rendering before data was ready

These changes made the application more stable, more efficient, and easier to scale moving forward.

---

## Final Thoughts

This project was built to simulate a real-world development workflow: integrating APIs, handling edge cases, debugging unexpected issues, and continuously refining both UI and data flow.

More features are planned, including smarter deal insights, filtering systems, and personalized tracking.

Stay tuned 👀
