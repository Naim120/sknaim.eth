This is a portfolio that reflects the web3 balance of a

## Getting Started

1. **Clone the repository**:

    ```sh
    git clone https://github.com/Naim120/sknaim.eth.git
    cd sknaim.eth
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Set up environment variables**:

    Change the `.env.sample` file to `.env.local` and add your environment variables. Here is an example:

    ```sh
    INFURA_PROJECT_ID=your_infura_project_id
    COINGECKO_API3=your_coingecko_api_key
    COINGECKO_API4=your_another_coingecko_api_key
    BSCSCAN_API_KEY=your_bscscan_apikey
    
    ```
4. **Run the development server**:
   * Open `app/page.js` file in Vscode.
   * Change the wallet address from <span style="background-color: #808080; padding: 1px; border: 1px solid black;">0xBA2bf37711917b963a245906Ad290aD79Bc27B69</span> to your EVM wallet address on line 50, line 212, line 215, line 269, line 270.
     
5. **Run the development server**:

    ```sh
    npm run dev
    ```

## Usage

Provide instructions and examples for using your project. Include screenshots if applicable.

```sh
npm start


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Credit for the frontend design - https://github.com/codewithsadee/vcard-personal-portfolio
