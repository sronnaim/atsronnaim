import { Highlight, type PrismTheme } from "prism-react-renderer";
import { cn } from "~/lib/utils";

export function CustomCodeBlock({
  theme,
  code,
  language,
}: {
  theme: PrismTheme;
  code: string;
  language: string;
}) {
  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          className={cn(
            className,
            "p-20 rounded-sm my-40 overflow-scroll text-sm",
          )}
        >
          <div className="mb-20">{language}</div>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="mx-8">{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
