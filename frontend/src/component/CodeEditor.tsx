"use client";

import {
  DiffEditor,
  Editor,
} from "@monaco-editor/react";

import { useEffect, useRef, useState } from "react";

export function CodeEditor({
  selectedFile,
  fixedFiles,
  selectedLine,
}: any) {

  const [activeTab, setActiveTab] = useState("diff");
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const selectedData =
    fixedFiles.find(
      (f: any) =>
        f.file === selectedFile
    );

    useEffect(() => {

  if (
    !editorRef.current ||
    !selectedLine
  ) {
    return;
  }

  const editor =
    editorRef.current;

  // Delay required for Monaco render

  setTimeout(() => {

    editor.revealLineInCenter(
      selectedLine
    );

    editor.setPosition({
      lineNumber: selectedLine,
      column: 1,
    });

    editor.focus();

  }, 150);

}, [selectedLine, selectedFile]);

  const handleCopy = async () => {

    await navigator.clipboard.writeText(
      selectedData?.fixedCode ?? ""
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden flex flex-col">

      {/* HEADER */}

      <div className="p-5 border-b border-white/10 flex items-center justify-between">

        <div>
          <h2 className="font-semibold text-lg">
            Code Preview
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Accessibility auto-fix preview
          </p>
        </div>

        {/* TABS */}

        {selectedFile && (
          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                setActiveTab("diff")
              }
              className={`px-4 py-2 rounded-xl text-sm transition cursor-pointer ${activeTab === "diff"
                ? "bg-blue-600 text-white"
                : "bg-[#0b1020] text-gray-400 hover:bg-[#172036]"
                }`}
            >
              Diff Preview
            </button>

            <button
              onClick={() =>
                setActiveTab("fixed")
              }
              className={`px-4 py-2 rounded-xl text-sm transition cursor-pointer ${activeTab === "fixed"
                ? "bg-blue-600 text-white"
                : "bg-[#0b1020] text-gray-400 hover:bg-[#172036]"
                }`}
            >
              Fixed File
            </button>

          </div>
        )}
      </div>

      {/* EMPTY STATE */}

      {!selectedFile && (
        <div className="flex-1 flex items-center justify-center text-center text-gray-400 px-10">
          Select an accessibility issue to preview fixes.
        </div>
      )}

      {/* EDITORS */}

      {selectedFile && (
        <div className="flex-1 overflow-hidden">

          {/* DIFF TAB */}

          {activeTab === "diff" && (
            <DiffEditor
              height="100%"
              original={
                selectedData?.originalCode ??
                ""
              }
              modified={
                selectedData?.fixedCode ?? ""
              }
              language="typescript"
              theme="vs-dark"
              beforeMount={(
                monaco: any
              ) => {
                monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                  {
                    noSemanticValidation:
                      true,
                    noSyntaxValidation:
                      true,
                  }
                );
              }}
              onMount={(editor: any, monaco: any) => {
  editorRef.current =
    editor.getModifiedEditor();

  monacoRef.current = monaco;
}}
              options={{
                readOnly: true,
                minimap: {
                  enabled: false,
                },
                fontSize: 14,
                renderSideBySide: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          )}

          {/* FIXED FILE TAB */}

          {activeTab === "fixed" && (
            <div className="h-full relative">

              {/* COPY BUTTON */}

              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 z-50 cursor-pointer bg-blue-600 hover:bg-blue-500 transition px-3 py-1.5 rounded-lg text-xs font-medium"
              >
                {copied
                  ? "Copied ✓"
                  : "Copy Code"}
              </button>

              <Editor
                height="100%"
                value={
                  selectedData?.fixedCode ??
                  ""
                }
                language="typescript"
                theme="vs-dark"
                beforeMount={(
                  monaco: any
                ) => {
                  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                    {
                      noSemanticValidation:
                        true,
                      noSyntaxValidation:
                        true,
                    }
                  );
                }}
                options={{
                  readOnly: true,
                  minimap: {
                    enabled: false,
                  },
                  fontSize: 14,
                  scrollBeyondLastLine:
                    false,
                  automaticLayout: true,
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}