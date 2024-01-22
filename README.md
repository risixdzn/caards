# Caards

Welcome to Caards, an AI-powered flashcard application built with Next.js, Prisma, and NextAuth. Study with ease by creating flashcards with the power of AI.

## Features

-   **AI-powered Flashcards:** Utilize the OpenAI API with ChatGPT 3.5 Turbo to generate flashcards based on user-provided prompts.

-   **Organize Flashcards in Decks:** Group your flashcards into decks for better organization and efficient studying.

-   **Color-Coded Decks:** Easily identify and distinguish decks with color-coded labels for a visually intuitive experience.

-   **Import Flashcards from CSV:** Quickly import existing flashcards from CSV files to streamline the process of building your card collection.

-   **Difficulty Classification:** Classify flashcards with different difficulty levels such as easy, medium, and hard to tailor your study sessions.

-   **Dynamic Prompts:** Create flashcards with prompts that can be anything, allowing for a diverse range of learning content.

## Technologies Used

-   **Next.js:** A React framework for building web applications with a focus on developer experience and performance.

-   **Prisma:** A database toolkit that provides a type-safe and auto-generated query builder for Node.js and TypeScript.

-   **NextAuth:** Authentication library for Next.js applications, providing easy integration with various authentication providers.

-   **OpenAI API with ChatGPT 3.5 Turbo:** Leverage the power of advanced natural language processing for dynamic flashcard generation.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/caards-web-app.git
    ```

2. Install dependencies:

    ```bash
    cd caards-web-app
    npm install
    ```

3. Set up your environment variables. Create a `.env.local` file in the root of your project and add the necessary variables.

    ```env
    NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
    DATABASE_URL=your-database-url
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Contributing

We welcome contributions! If you have ideas for new features or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy studying with Caards! 🧠🔗
