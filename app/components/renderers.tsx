import type { DocumentRendererProps } from "@keystone-6/document-renderer";
import { Text } from "./ui/text";
import clsx from "clsx";
import { cn, separateFirstLine } from "~/lib/utils";
import { Button } from "./ui/button";
import { themes } from "prism-react-renderer";
import { CustomCodeBlock } from "./custom-codeblock";
import { type InferRenderersForComponentBlocks } from "@keystone-6/fields-document/component-blocks";
import type { componentBlocks } from "./keystone/component-blocks";

export const renderers: DocumentRendererProps["renderers"] = {
  // use your editor's autocomplete to see what other renderers you can override
  inline: {
    bold: ({ children }) => {
      return <strong>{children}</strong>;
    },
    link: ({ children, href }) => {
      return (
        <Button asChild variant="link">
          <a href={href}>{children}</a>
        </Button>
      );
    },
    code: ({ children }) => {
      return <code className="bg-border rounded-sm py-2 px-4">{children}</code>;
    },
  },
  block: {
    paragraph: ({ children, textAlign }) => {
      return (
        <p style={{ textAlign }} className={clsx(textAlign || "text-justify")}>
          {children}
        </p>
      );
    },
    heading: ({ level, children, textAlign }) => {
      const hLevel = `h${level}` as const;
      const baseClassName = "whitespace-pre-wrap";
      const className = clsx(
        hLevel === "h1" && "text-4xl py-22",
        hLevel === "h2" && "text-3xl py-18",
        hLevel === "h3" && "text-2xl py-14",
        hLevel === "h4" && "text-xl py-8",
        hLevel === "h5" && "text-lg",
        hLevel === "h6" && "text-base",
      );

      return (
        <Text
          as={hLevel}
          style={{ textAlign }}
          className={cn(baseClassName, className)}
        >
          <span className="text-foreground/50">
            {hLevel === "h1" && "# "}
            {hLevel === "h2" && "## "}
            {hLevel === "h3" && "### "}
          </span>
          {children}
        </Text>
      );
    },
    divider: () => {
      return <hr className="my-4" />;
    },
    list: ({ type, children }) => {
      if (type === "unordered")
        return (
          <ul className="list-disc list-inside">
            {children.map((C, i) => (
              <li key={i}>{C}</li>
            ))}
          </ul>
        );
      else
        return (
          <ol className="list-decimal list-inside">
            {children.map((C, i) => (
              <li key={i}>{C}</li>
            ))}
          </ol>
        );
    },
    blockquote: ({ children }) => {
      return (
        <blockquote className="border-s-6 ps-10 py-4">{children}</blockquote>
      );
    },
    code: ({ children }) => {
      const { firstLine: language, rest: codeString } =
        separateFirstLine(children);

      return (
        <CustomCodeBlock
          theme={themes.nightOwl}
          code={codeString}
          language={language}
        />
      );
    },
  },
};

export const componentBlocksRenderer: InferRenderersForComponentBlocks<
  typeof componentBlocks
> = {
  image: (props) => {
    const url = props.url;
    const alt = props.alt;
    const caption = props.caption;

    return (
      <figure>
        <img
          src={url}
          alt={alt}
          className="rounded-md w-full m-auto max-h-[300px] max-w-full object-cover"
        />
        <figcaption className="text-center">{caption}</figcaption>
      </figure>
    );
  },
};
