# @parseql/trino

> Trino SQL parser for javascript built with antlr4

## Installation

Install with npm

```bash
npm install @parseql/trino
```

## Usage

```javascript
import { parse } from "@parseql/trino";

const sql = "...";

try {
  parse(sql);
} catch (e) {
  console.error("parse error occurred");
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

Please make sure to update tests as appropriate.

## Development

You must have antlr4 installed on your machine.

Install dependencies

```
$ yarn
```

Build the package

```
$ yarn build
```

Then run tests

```
$ yarn test
```

## About the grammar

The grammar and examples are taken from https://github.com/antlr/grammars-v4/tree/master/sql/trino

## License

[MIT](https://choosealicense.com/licenses/mit/)
