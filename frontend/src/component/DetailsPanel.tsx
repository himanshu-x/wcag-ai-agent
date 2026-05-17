"use client";

import { useState } from "react";
import { ruleDefinitions } from "@/src/lib/metadata/ruleDefinitions";

export function DetailsPanel({
  selectedIssue,
  fixedFiles,
}: any) {

  const [activeTab, setActiveTab] =
    useState("overview");

  if (!selectedIssue) {
    return (
      <div className="bg-[#111827] border border-white/10 rounded-3xl h-full flex items-center justify-center text-gray-400 text-center p-10">
        Select an accessibility issue to view details.
      </div>
    );
  }

  const ruleData =
    ruleDefinitions[
    selectedIssue?.rule
    ];

  const fixedFileData =
    fixedFiles?.find(
      (f: any) =>
        f.file === selectedIssue?.file
    );

  const tabs = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "wcag",
      label: "WCAG Rule",
    },
    {
      id: "fix",
      label: "AI Fix",
    },
  ];

  return (
    <div className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden flex flex-col h-full">

      {/* HEADER */}

      <div className="p-5 border-b border-white/10">
        <h2 className="font-semibold text-lg">
          Issue Details
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          AI accessibility analysis
        </p>
      </div>

      {/* TABS */}

      <div className="flex border-b border-white/10 px-4 py-2 gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`px-4 py-2 rounded-xl text-sm transition cursor-pointer whitespace-nowrap ${activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-[#0b1020] text-gray-400 hover:bg-[#172036]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}

      <div className="flex-1 overflow-auto p-6">

        {/* OVERVIEW */}

        {activeTab === "overview" && (
          <div className="space-y-6">

            {/* SEVERITY */}

            <div className="flex items-center gap-3 flex-wrap">

              <span
                className={`inline-flex px-3 py-1 rounded-xl text-sm font-medium ${selectedIssue.severity ===
                    "Critical"
                    ? "bg-red-500/20 text-red-300"
                    : "bg-orange-500/20 text-orange-300"
                  }`}
              >
                {selectedIssue.severity}
              </span>

              <span className="bg-blue-500/20 text-blue-300 text-sm px-3 py-1 rounded-xl">
                {ruleData?.wcag}
              </span>

            </div>

            {/* TITLE */}

            <div>
              <h3 className="text-2xl font-bold leading-snug">
                {ruleData?.title}
              </h3>

              <p className="text-gray-400 mt-3 leading-7">
                {ruleData?.why}
              </p>
            </div>

            {/* META */}

            <div className="space-y-5 text-gray-300">

              <div>
                <span className="text-gray-500 text-sm">
                  File
                </span>
                <p className="mt-1 break-all">
                  {selectedIssue.file}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">
                  Line
                </span>
                <p className="mt-1">
                  {selectedIssue.line}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">
                  Rule ID
                </span>
                <p className="mt-1">
                  {selectedIssue.rule}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* WCAG TAB */}

        {activeTab === "wcag" && (
          <div className="space-y-6">

            {/* IMPACT */}

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Accessibility Impact
              </h3>
              {ruleData?.impact ? (
                <p className="text-gray-300 leading-8">
                  {ruleData.impact}
                </p>
              ) : (
                <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 rounded-2xl p-4 text-sm">
                  Accessibility impact information is not available for this rule.
                </div>
              )}
            </div>

            {/* WCAG REFERENCE */}

            <div>
              <h3 className="text-xl font-semibold mb-3">
                WCAG Reference
              </h3>
              {ruleData?.wcag ||
                ruleData?.why ? (
                <div className="bg-[#0b1020] border border-white/10 rounded-2xl p-5">
                  {ruleData?.wcag && (
                    <p className="text-blue-300 font-medium">
                      {ruleData.wcag}
                    </p>
                  )}
                  {ruleData?.why && (
                    <p className="text-gray-400 mt-3 leading-7">
                      {ruleData.why}
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 rounded-2xl p-4 text-sm">
                  WCAG reference details are not available for this rule.
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI FIX TAB */}

        {activeTab === "fix" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Suggested AI Fix
              </h3>

              <p className="text-gray-300 leading-8">
                {ruleData?.fix}
              </p>
            </div>

            {/* EXAMPLE */}

            <div className="bg-[#0b1020] border border-white/10 rounded-2xl p-5">
              <h4 className="font-semibold mb-4">
                Accessible Example
              </h4>

              <pre className="text-sm text-green-300 overflow-auto whitespace-pre-wrap break-words leading-7 max-h-[300px]">
                <div className="space-y-5">

                  {/* BEFORE */}

                  <div>
                    <h4 className="font-semibold mb-3 text-red-300">
                      Before
                    </h4>
                    <pre className="bg-[#0b1020] border border-red-500/20 rounded-2xl p-5 text-sm text-red-200 overflow-auto whitespace-pre-wrap break-words leading-7">
                      {selectedIssue?.originalSnippet}
                    </pre>
                  </div>

                  {/* AFTER */}

                  <div>
                    <h4 className="font-semibold mb-3 text-green-300">
                      After AI Fix
                    </h4>
                    <pre className="bg-[#0b1020] border border-green-500/20 rounded-2xl p-5 text-sm text-green-200 overflow-auto whitespace-pre-wrap break-words leading-7">
                      {selectedIssue?.fixedSnippet}
                    </pre>
                  </div>
                </div>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}