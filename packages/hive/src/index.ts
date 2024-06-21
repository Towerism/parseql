import HiveParser from "../lib/HiveParser";
import HiveLexer from "../lib/HiveLexer";
import antlr4 from "antlr4";
import type ErrorListener from "antlr4/error/ErrorListener";
import type { ParserRuleContext } from "antlr4";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const AntlrErrorListener: typeof ErrorListener = (antlr4 as any).error
  .ErrorListener;

class HiveErrorListener extends AntlrErrorListener {
  override syntaxError(_recognizer, offendingSymbol, line, column, msg) {
    throw new Error(`${offendingSymbol} line ${line}, col ${column}: ${msg}`);
  }
}

interface Parser {
  buildParseTrees: boolean;
  removeErrorListeners(): void;
  addErrorListener(listener: ErrorListener): void;
  parse(): ParserRuleContext;
}

interface Options {
  allowMultiStatement: boolean;
}

export function parse(
  input: string,
  options: Options = { allowMultiStatement: true }
) {
  const chars = new antlr4.InputStream(input);
  const lexer = new HiveLexer(chars);
  const tokenStream = new antlr4.CommonTokenStream(lexer);

  tokenStream.fill();

  if (!options.allowMultiStatement) {
    const numSemicolons = tokenStream.tokens.filter(
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      (t) => (t as any).type === HiveLexer.SEMICOLON
    ).length;
    if (numSemicolons > 1) {
      throw new Error(
        "Query with multiple statements is not supported at this time."
      );
    }
  }

  const parser = new HiveParser(tokenStream) as Parser;
  parser.buildParseTrees = true;
  parser.removeErrorListeners();
  parser.addErrorListener(new HiveErrorListener());
  const tree = parser.parse();

  return tree;
}
