/** @format */

const content = `
# Live demo

Changes are automatically rendered as you type.

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## Table of Contents

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?

\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

Use [\`remark-gfm\`](https://github.com/remarkjs/react-markdown#use) to support tables, strikethrough, tasklists, and literal URLs.
These features **do not work by default**.

| Feature   | Support |
| :-------: | ------- |
| tables    | \`remark-gfm\` |

~~strikethrough~~

- [ ] task list

https://example.com

## More info?

Read usage information and more on [GitHub](https://github.com/remarkjs/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
`;

export default content;
// export default `aaa\nbbb\nccc`
