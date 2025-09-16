import { Link, RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { Mark } from "@tiptap/core";
import { useEffect, useState, useCallback } from "react";

// Custom mark for grammar errors
const GrammarError = Mark.create({
  name: "grammarError",

  addOptions() {
    return {
      HTMLAttributes: {
        class: "grammar-error",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-grammar-error]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      {
        ...HTMLAttributes,
        "data-grammar-error": "true",
        style:
          "background-color: #fecaca; border-bottom: 2px wavy #dc2626; cursor: pointer;",
        title: "Grammar error detected",
      },
      0,
    ];
  },

  addCommands() {
    return {
      setGrammarError:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleGrammarError:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetGrammarError:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

// Custom mark for suggestion highlighting
const SuggestionHighlight = Mark.create({
  name: "suggestionHighlight",

  addOptions() {
    return {
      HTMLAttributes: {
        class: "suggestion-highlight",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-suggestion-highlight]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      {
        ...HTMLAttributes,
        "data-suggestion-highlight": "true",
        style: `
        background-color: #dbeafe; 
        border: 1px solid #60a5fa; 
        border-radius: 2px; 
        padding: 1px 2px;
        animation: suggestionPulse 1.5s ease-in-out infinite;
      `,
      },
      0,
    ];
  },

  addCommands() {
    return {
      setSuggestionHighlight:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      unsetSuggestionHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

// Custom mark for regular highlighting
const CustomHighlight = Mark.create({
  name: "customHighlight",

  addOptions() {
    return {
      HTMLAttributes: {
        class: "custom-highlight",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-custom-highlight]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      {
        ...HTMLAttributes,
        "data-custom-highlight": "true",
        style:
          "background-color: #fef3c7; padding: 2px 4px; border-radius: 3px;",
      },
      0,
    ];
  },

  addCommands() {
    return {
      setCustomHighlight:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      unsetCustomHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

interface EditorMethods {
  highlightTextBySearch: (
    searchText: string,
    isError: boolean,
    className?: string,
  ) => void;
  highlightAllTextsBySearch: (
    searchText: string,
    isError: boolean,
    className?: string,
  ) => void;
  clearAllHighlights: () => void;
  replaceText: (originalText: string, newText: string) => void;
  editor: any;
}

interface NxRichTextEditorProps {
  loadedContent?: string;
  placeholder?: string;
  changeContentDescription: (content: string) => void;
  grammarErrors?: Array<{
    start: number;
    end: number;
    text: string;
    suggestion?: string;
  }>;
  highlightedTexts?: Array<{
    start: number;
    end: number;
    text: string;
  }>;
  onGrammarErrorClick?: (error: any) => void;
  onEditorReady?: (methods: EditorMethods) => void;
}

export const NxRichTextEditor = (props: NxRichTextEditorProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      GrammarError,
      CustomHighlight,
      SuggestionHighlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: props?.placeholder || "Enter your email description",
      }),
    ],
    content: props.loadedContent || "",
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      props.changeContentDescription(htmlContent);
    },
    onCreate: ({ editor }) => {
      setIsLoaded(true);
    },
  });

  // Function to find text positions in the editor
  const findTextPositions = useCallback(
    (searchText: string) => {
      if (!editor) return [];

      const content = editor.getText();
      const positions = [];
      let index = 0;

      while (index < content.length) {
        const foundIndex = content.indexOf(searchText, index);
        if (foundIndex === -1) break;

        // Convert to document positions (TipTap uses document positions)
        const from = editor.state.doc.content.findIndex(foundIndex + 1);
        const to = editor.state.doc.content.findIndex(
          foundIndex + searchText.length + 1,
        );

        if (from !== -1 && to !== -1) {
          positions.push({ from, to, text: searchText });
        }

        index = foundIndex + 1;
      }

      return positions;
    },
    [editor],
  );

  // Highlight only the FIRST occurrence of the search text
  const highlightTextBySearch = useCallback(
    (searchText: string, isError = false, className = "") => {
      if (!editor || !searchText) return;

      const doc = editor.state.doc;
      const searchTextLower = searchText.toLowerCase();
      let found = false;

      // Walk through the document to find the first occurrence
      doc.descendants((node, pos) => {
        if (found) return false; // Stop if already found

        if (node.isText && node.text) {
          const nodeText = node.text.toLowerCase();
          const searchIndex = nodeText.indexOf(searchTextLower);

          if (searchIndex !== -1) {
            // Found the text in this node
            const from = pos + searchIndex;
            const to = pos + searchIndex + searchText.length;

            // Apply the appropriate mark
            try {
              if (className === "suggestion-highlight") {
                editor
                  .chain()
                  .setTextSelection({ from, to })
                  .setSuggestionHighlight()
                  .run();
              } else if (isError) {
                editor
                  .chain()
                  .setTextSelection({ from, to })
                  .setGrammarError()
                  .run();
              } else {
                editor
                  .chain()
                  .setTextSelection({ from, to })
                  .setCustomHighlight()
                  .run();
              }
              found = true;
            } catch (e) {
              console.warn("Failed to highlight text:", e);
            }
            return false; // Stop traversing after first match
          }
        }
      });
    },
    [editor],
  );
  // Highlight ALL occurrences of the search text
  const highlightAllTextsBySearch = useCallback(
    (searchText: string, isError = false, className = "") => {
      if (!editor || !searchText) return;

      const content = editor.getText();
      const doc = editor.state.doc;
      let searchIndex = 0;

      // Find all instances of the search text
      while (searchIndex < content.length) {
        const foundIndex = content.indexOf(searchText, searchIndex);
        if (foundIndex === -1) break;

        // Calculate document positions
        let docPos = 1; // Start at position 1
        let textIndex = 0;

        // Walk through the document to find the correct position
        doc.descendants((node, pos) => {
          if (node.isText) {
            const nodeText = node.text || "";
            const nodeStart = textIndex;
            const nodeEnd = textIndex + nodeText.length;

            if (foundIndex >= nodeStart && foundIndex < nodeEnd) {
              const relativeStart = foundIndex - nodeStart;
              const from = pos + relativeStart;
              const to = pos + relativeStart + searchText.length;

              // Apply the appropriate mark
              try {
                if (className === "suggestion-highlight") {
                  editor
                    .chain()
                    .setTextSelection({ from, to })
                    .setSuggestionHighlight()
                    .run();
                } else if (isError) {
                  editor
                    .chain()
                    .setTextSelection({ from, to })
                    .setGrammarError()
                    .run();
                } else {
                  editor
                    .chain()
                    .setTextSelection({ from, to })
                    .setCustomHighlight()
                    .run();
                }
              } catch (e) {
                console.warn("Failed to highlight text:", e);
              }
              return false; // Stop traversing
            }

            textIndex += nodeText.length;
          }
        });

        searchIndex = foundIndex + 1;
      }
    },
    [editor],
  );

  // Clear all highlights
  const clearAllHighlights = useCallback(() => {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .selectAll()
      .unsetGrammarError()
      .unsetCustomHighlight()
      .unsetSuggestionHighlight()
      .run();

    // Deselect all text after clearing highlights
    editor.chain().blur().run();
  }, [editor]);

  // Replace text method
  const replaceText = useCallback(
    (originalText: string, newText: string) => {
      if (!editor || !originalText || !newText) return;

      const content = editor.getHTML();

      // Use regex to replace the first occurrence of the original text
      const regex = new RegExp(
        originalText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i",
      );
      const newContent = content.replace(regex, newText);

      if (newContent !== content) {
        editor.chain().setContent(newContent).run();

        // Trigger change event manually
        props.changeContentDescription(newContent);
      }
    },
    [editor, props.changeContentDescription],
  );

  // Function to highlight grammar errors using positions
  const highlightGrammarErrors = useCallback(() => {
    if (!editor || !props.grammarErrors || props.grammarErrors.length === 0)
      return;

    props.grammarErrors.forEach((error) => {
      try {
        editor
          .chain()
          .setTextSelection({ from: error.start, to: error.end })
          .setGrammarError()
          .run();
      } catch (e) {
        console.warn("Failed to highlight grammar error:", error, e);
      }
    });
  }, [editor, props.grammarErrors]);

  // Function to highlight specific texts using positions
  const highlightSpecificTexts = useCallback(() => {
    if (
      !editor ||
      !props.highlightedTexts ||
      props.highlightedTexts.length === 0
    )
      return;

    props.highlightedTexts.forEach((highlight) => {
      try {
        editor
          .chain()
          .setTextSelection({ from: highlight.start, to: highlight.end })
          .setCustomHighlight()
          .run();
      } catch (e) {
        console.warn("Failed to highlight text:", highlight, e);
      }
    });
  }, [editor, props.highlightedTexts]);

  // Update content when loadedContent changes
  useEffect(() => {
    if (editor && props.loadedContent !== undefined) {
      const currentContent = editor.getHTML();
      // Only update if content has actually changed significantly
      if (
        currentContent !== props.loadedContent &&
        editor.getText() !== editor.state.doc.textContent
      ) {
        editor.chain().setContent(props.loadedContent).run();
      }
    }
  }, [editor, props.loadedContent]);

  // Apply highlights when grammar errors or highlighted texts change
  useEffect(() => {
    if (!isLoaded || !editor) return;

    const timeoutId = setTimeout(() => {
      // Only clear and apply highlights if there are actual grammar errors or highlighted texts
      if (
        (props.grammarErrors && props.grammarErrors.length > 0) ||
        (props.highlightedTexts && props.highlightedTexts.length > 0)
      ) {
        // Clear existing highlights first
        clearAllHighlights();

        // Apply new highlights
        if (props.grammarErrors && props.grammarErrors.length > 0) {
          highlightGrammarErrors();
        }
        if (props.highlightedTexts && props.highlightedTexts.length > 0) {
          highlightSpecificTexts();
        }
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [
    isLoaded,
    editor,
    props.grammarErrors,
    props.highlightedTexts,
    highlightGrammarErrors,
    highlightSpecificTexts,
    clearAllHighlights,
  ]);

  // Add click handler for grammar errors
  useEffect(() => {
    if (!editor || !props.onGrammarErrorClick) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.hasAttribute("data-grammar-error")) {
        const text = target.textContent || "";
        props.onGrammarErrorClick?.({
          text,
          element: target,
        });
      }
    };

    const editorElement = editor.view.dom;
    editorElement.addEventListener("click", handleClick);

    return () => {
      editorElement.removeEventListener("click", handleClick);
    };
  }, [editor, props.onGrammarErrorClick]);

  // Expose methods for external use
  useEffect(() => {
    if (editor) {
      const editorMethods: EditorMethods = {
        highlightTextBySearch,
        highlightAllTextsBySearch,
        clearAllHighlights,
        replaceText,
        editor,
      };
      props.onEditorReady(editorMethods);
    }
  }, []);

  return (
    <div className={"overflow-auto"}>
      <style>
        {`
          @keyframes suggestionPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          .ProseMirror .grammar-error {
            background-color: #fecaca;
            border-bottom: 2px wavy #dc2626;
            cursor: pointer;
            padding: 1px 2px;
            border-radius: 2px;
          }
          
          .ProseMirror .custom-highlight {
            background-color: #fef3c7;
            padding: 2px 4px;
            border-radius: 3px;
          }
          
          .ProseMirror .suggestion-highlight {
            background-color: #dbeafe;
            border: 1px solid #60a5fa;
            border-radius: 2px;
            padding: 1px 2px;
            animation: suggestionPulse 1.5s ease-in-out infinite;
          }
        `}
      </style>

      <RichTextEditor
        styles={{
          root: {
            border: "none",
            height: "100%",
          },
          toolbar: {
            top: "0px",
          },
        }}
        editor={editor}
      >
        <RichTextEditor.Toolbar sticky stickyOffset={60} pt={0}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            {/*<RichTextEditor.Strikethrough />*/}
            {/*<RichTextEditor.Highlight />*/}
          </RichTextEditor.ControlsGroup>

          {/*<RichTextEditor.ControlsGroup>*/}
          {/*<RichTextEditor.H1 />*/}
          {/*<RichTextEditor.H2 />*/}
          {/*<RichTextEditor.H3 />*/}
          {/*<RichTextEditor.H4 />*/}
          {/*</RichTextEditor.ControlsGroup>*/}

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            {/*<RichTextEditor.Subscript />*/}
            {/*<RichTextEditor.Superscript />*/}
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          {/*<RichTextEditor.ControlsGroup>*/}
          {/*  <button*/}
          {/*    type="button"*/}
          {/*    onClick={clearAllHighlights}*/}
          {/*    style={{*/}
          {/*      padding: '6px 12px',*/}
          {/*      border: '1px solid #ccc',*/}
          {/*      borderRadius: '4px',*/}
          {/*      background: 'white',*/}
          {/*      cursor: 'pointer',*/}
          {/*      fontSize: '12px'*/}
          {/*    }}*/}
          {/*    title="Clear all highlights"*/}
          {/*  >*/}
          {/*    Clear Highlights*/}
          {/*  </button>*/}
          {/*</RichTextEditor.ControlsGroup>*/}
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>
    </div>
  );
};
