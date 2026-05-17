"use client";

import { useRef, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import {
  ShieldCheck,
  Upload,
  FolderOpen,
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  Search,
  Download,
  Moon,
  Settings,
  LayoutDashboard,
  FileText,
  PanelLeft,
  Bug,
  Clock3,
} from "lucide-react";

import { SidebarItem } from "@/src/component/SidebarItem";
import { SummaryCard } from "@/src/component/SummaryCard";
import { DetailsPanel } from "@/src/component/DetailsPanel";
import { CodeEditor } from "@/src/component/CodeEditor";

import { scanWCAG } from "@/src/lib/parser";
import { autoFixCode } from "@/src/lib/autoFix";

export default function Home() {
  const [issues, setIssues] = useState<any[]>([]);
  const [fixedFiles, setFixedFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedLine, setSelectedLine] =
    useState<number>(1);

  const [loading, setLoading] = useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const folderInputRef =
    useRef<HTMLInputElement>(null);

  // -----------------------------
  // HANDLE UPLOADS
  // -----------------------------

  const handleFolder = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);

    setSelectedFile("");
    setSelectedLine(1);

    const files = Array.from(
      e.target.files || []
    );

    const allIssues: any[] = [];
    const fixedResults: any[] = [];

    for (const file of files) {
      const isCodeFile =
        file.name.endsWith(".tsx") ||
        file.name.endsWith(".jsx") ||
        file.name.endsWith(".js") ||
        file.name.endsWith(".ts");

      if (!isCodeFile) continue;

      const text = await file.text();

      const detectedIssues =
        scanWCAG(text);

      const fixedCode =
        autoFixCode(text);

      detectedIssues.forEach((issue) => {
        allIssues.push({
  ...issue,
  file: file.name,

  originalSnippet:
    getLineSnippet(
      text,
      issue.line
    ),

  fixedSnippet:
    getLineSnippet(
      fixedCode,
      issue.line
    ),
});
      });

      fixedResults.push({
        file: file.name,
        fixedCode,
        originalCode: text,
      });
    }

    setIssues(allIssues);
    setFixedFiles(fixedResults);

    setLoading(false);
  };

  // -----------------------------
  // DOWNLOAD ZIP
  // -----------------------------

  const downloadFixedProject =
    async () => {
      const zip = new JSZip();

      fixedFiles.forEach((file) => {
        zip.file(
          file.file,
          file.fixedCode
        );
      });

      const content =
        await zip.generateAsync({
          type: "blob",
        });

      saveAs(
        content,
        "accessible-project.zip"
      );
    };

  // -----------------------------
  // COUNTS
  // -----------------------------

  const criticalIssues = issues.filter(
    (i) =>
      i.severity?.toLowerCase() === "critical"
  ).length;

  const seriousIssues = issues.filter(
    (i) =>
      i.severity?.toLowerCase() === "serious"
  ).length;

  const passedChecks = Math.max(
    0,
    fixedFiles.length * 4 -
    issues.length
  );

  function getLineSnippet(
  code: string,
  lineNumber: number
) {

  const lines =
    code.split("\n");

  const start =
    Math.max(0, lineNumber - 2);

  const end =
    Math.min(
      lines.length,
      lineNumber + 1
    );

  return lines
    .slice(start, end)
    .join("\n");
}

  return (
    <main className="min-h-screen bg-[#0b1020] text-white flex overflow-hidden">
      {/* SIDEBAR */}

      <aside className="w-[270px] border-r border-white/10 bg-[#0f172a] flex flex-col justify-between">
        <div>
          {/* LOGO */}

          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <div className="bg-blue-500/20 p-3 rounded-2xl">
              <ShieldCheck className="text-blue-400" />
            </div>

            <div>
              <h1 className="font-bold text-xl">
                WCAG AI Agent
              </h1>

              <p className="text-sm text-gray-400">
                Accessibility Scanner
              </p>
            </div>
          </div>

          {/* MENU */}

          <div className="p-4 space-y-2">
            <SidebarItem
              icon={
                <LayoutDashboard size={18} />
              }
              label="Dashboard"
              active
            />

            <SidebarItem
              icon={<Upload size={18} />}
              label="Uploads"
            />

            <SidebarItem
              icon={<Bug size={18} />}
              label="Issues"
            />

            <SidebarItem
              icon={<Clock3 size={18} />}
              label="History"
            />

            <SidebarItem
              icon={<FileText size={18} />}
              label="Reports"
            />

            <SidebarItem
              icon={<Settings size={18} />}
              label="Settings"
            />
          </div>
        </div>

        {/* WCAG CARD */}

        <div className="p-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="text-green-400" />

              <div>
                <h3 className="font-semibold">
                  WCAG 2.1 AA
                </h3>

                <p className="text-xs text-gray-400">
                  Accessibility Standard
                </p>
              </div>
            </div>

            <button className="text-sm text-blue-400 hover:text-blue-300 transition">
              View Documentation
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}

      <section className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}

        <header className="border-b border-white/10 bg-[#0b1020]/90 backdrop-blur sticky top-0 z-50 px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PanelLeft className="text-gray-400" />

            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-3 text-gray-500"
              />

              <input
                placeholder="Search issues..."
                className="bg-[#111827] border border-white/10 rounded-xl pl-10 pr-4 py-2 outline-none w-[320px] text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* FILE BUTTON */}

            <button
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="bg-[#111827] hover:bg-[#1f2937] border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 transition"
            >
              <Upload size={16} />
              Upload Files
            </button>

            {/* FOLDER BUTTON */}

            <button
              onClick={() =>
                folderInputRef.current?.click()
              }
              className="bg-[#111827] hover:bg-[#1f2937] border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 transition"
            >
              <FolderOpen size={16} />
              Upload Folder
            </button>

            {/* DOWNLOAD */}

            {fixedFiles.length > 0 && (
              <button
                onClick={
                  downloadFixedProject
                }
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl flex items-center gap-2 transition"
              >
                <Download size={16} />
                Download Accessible Project
              </button>
            )}

            {/* THEME */}

            <button className="bg-[#111827] border border-white/10 p-2 rounded-xl">
              <Moon size={18} />
            </button>
          </div>
        </header>

        {/* HIDDEN INPUTS */}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFolder}
        />

        <input
          ref={folderInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFolder}
          //@ts-ignore
          webkitdirectory=""
          directory=""
        />

        {/* BODY */}

        <div className="flex-1 overflow-auto p-5 space-y-6">
          {/* SUMMARY */}

          <div className="grid grid-cols-4 gap-4">
            <SummaryCard
              title="Total Issues"
              value={issues.length}
              icon={
                <FileWarning className="text-blue-400" />
              }
              subtitle="Across scanned files"
            />

            <SummaryCard
              title="Critical"
              value={criticalIssues}
              icon={
                <AlertTriangle className="text-red-400" />
              }
              subtitle="Needs immediate fix"
            />

            <SummaryCard
              title="Serious"
              value={seriousIssues}
              icon={
                <AlertTriangle className="text-orange-400" />
              }
              subtitle="Should be fixed"
            />

            <SummaryCard
              title="Passed Checks"
              value={passedChecks}
              icon={
                <CheckCircle2 className="text-green-400" />
              }
              subtitle="Accessibility passed"
            />
          </div>

          {/* MAIN LAYOUT */}

          <div className="space-y-6">

            {/* TOP GRID */}

            <div className="grid grid-cols-[350px_1fr] gap-6 h-[650px]">

              {/* ISSUES PANEL */}

              <div className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden flex flex-col">
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-lg">
                      Accessibility Issues
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                      Click issue to preview fix
                    </p>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {!loading &&
                    issues.length === 0 && (
                      <div className="h-full flex items-center justify-center text-center text-gray-400 px-10">
                        Upload files or folders to begin accessibility scanning.
                      </div>
                    )}

                  {loading && (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      Scanning files...
                    </div>
                  )}

                  {issues.map(
                    (issue, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedFile(
                            issue.file
                          );

                          setSelectedLine(
                            issue.line || 1
                          );
                        }}
                        className={`cursor-pointer transition border rounded-2xl p-4 group
${selectedFile === issue.file &&
                            selectedLine === issue.line
                            ? "bg-blue-600/15 border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.4)]"
                            : "bg-[#0b1020] border-white/10 hover:bg-[#172036]"
                          }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div
                              className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium mb-3 ${issue.severity ===
                                "Critical"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-orange-500/20 text-orange-300"
                                }`}
                            >
                              {
                                issue.severity
                              }
                            </div>

                            <h3 className="font-semibold mb-2">
                              {
                                issue.message
                              }
                            </h3>

                            <p className="text-sm text-gray-400">
                              {
                                issue.file
                              }
                            </p>
                          </div>

                          <span className="text-sm text-gray-500">
                            Line{" "}
                            {issue.line}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* CODE EDITOR */}

              <CodeEditor
                selectedFile={selectedFile}
                selectedLine={selectedLine}
                fixedFiles={fixedFiles}
              />
            </div>

            {/* DETAILS PANEL BELOW */}

            <DetailsPanel 
            selectedIssue={
              issues.find(
                (i) =>
                  i.file === selectedFile &&
                  i.line === selectedLine
              )
            } 
            fixedFiles={fixedFiles}
            />
          </div>
        </div>
      </section>
    </main>
  );
}