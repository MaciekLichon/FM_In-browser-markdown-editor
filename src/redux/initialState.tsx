export type IDocumentId = string;

export interface IDocument {
  id: IDocumentId;
  createdAt: string;
  name: string;
  content: string;
}

export interface IState {
  documents: IDocument[];
  selectedDocumentId: IDocumentId;
}

const browserData = localStorage.getItem("documentsState");

const initialState: IState =
  browserData !== null
    ? {
        documents: JSON.parse(browserData).documents,
        selectedDocumentId: JSON.parse(browserData).selectedDocumentId,
      }
    : {
        documents: [
          {
            id: "0",
            createdAt: "01-12-2023",
            name: "welcome.md",
            content:
              "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
          },
          {
            id: "1",
            createdAt: "02-12-2023",
            name: "untitled-document.md",
            content: "",
          },
        ],
        selectedDocumentId: "0",
      };


export default initialState;
