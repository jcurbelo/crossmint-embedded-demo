import { Card, CardContent } from "@/components/ui/card";
import { Highlight, themes } from "prism-react-renderer";

interface CodePreviewProps {
  code: string;
}

export const CodePreview = ({ code }: CodePreviewProps) => (
  <Card>
    <CardContent className="pt-6">
      <Highlight theme={themes.nightOwl} code={code} language="jsx">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 rounded-lg overflow-auto" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </CardContent>
  </Card>
);
