import { ComponentPropsWithoutRef } from "react";
import CodeBlock from "@/components/blog/code-block";
import CloudComparisonTable from "@/components/blog/cloud-comparison-table";
import cloudData from "@/content/data/cloud-services.json";

export const mdxComponents = {
  h1: (p: ComponentPropsWithoutRef<"h1">) => (
    <h1 {...p} className="mt-10 mb-4 text-3xl font-extrabold leading-tight" />
  ),
  h2: (p: ComponentPropsWithoutRef<"h2">) => (
    <h2 {...p} className="mt-8 mb-3 text-2xl font-bold leading-snug" />
  ),
  h3: (p: ComponentPropsWithoutRef<"h3">) => (
    <h3 {...p} className="mt-6 mb-2 text-xl font-semibold" />
  ),
  code: (p: ComponentPropsWithoutRef<"code">) => <code {...p} />,
  pre: (
    p: ComponentPropsWithoutRef<"pre"> & {
      children?: React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
      }>;
    }
  ) => {
    const child = p?.children?.props ?? {};
    const rawLang = child.className || "";
    const lang = rawLang.startsWith("language-")
      ? rawLang.replace("language-", "")
      : "plaintext";

    const rawCode = child.children;
    const code =
      typeof rawCode === "string"
        ? rawCode
        : Array.isArray(rawCode)
          ? rawCode.join("")
          : typeof rawCode === "number"
            ? String(rawCode)
            : "";

    return (
      <CodeBlock
        key={lang + code.slice(0, 20)}
        language={lang}
        value={code || ""}
      />
    );
  },
  CloudComparisonTable: () => <CloudComparisonTable data={cloudData} />,
};
