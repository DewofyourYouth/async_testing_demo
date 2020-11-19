# Testing React Async Components (Part One)


## Using act()
I have been asked to give guidance as to how one can test a component with an asynchronous hook (meaning: promises, the most common example of a component with an asynchronous hook  would be a component that makes a call to an API to fetch data and display it). Here I will attempt to give such guidance.

The problem is pretty straightforward. When the component is mounted, it doesn’t yet know what will be returned, so how do you get your test to wait until it does? For example: let's say I have a simple React component (Greeting). The component returns a greeting via an asynchronous state change like an API call. Like this:

```
import { useState, useEffect } from "react";

// a promise that fetches a greeting
export const getGreeting = async () => {
  const greeting = await {greeting: "Hi there"}
  return greeting

function Greeting() {
  const [greeting, setGreeting] = useState("Hello")
  useEffect(() => {
    getGreeting().then(res => setGreeting(res))
  }, [greeting])

  return (
    <div>
      <h1>{greeting}!</h1>
    </div>
  );
}

export default Greeting;
```

If we were to run a test like this in Greeting.test.js  - to see if the greeting “Hi There!” is in the document  like this…

```
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';


describe("Greeting", () => {
  it("Greets you with 'Hi There!'", () => {
    render(<Greeting />)
    // test if the words "Hi There!" are in the document.
   expect(screen.getByText(/Hi There!/i)).toBeInTheDocument()
  })
})
```

…it would fail, because, when the component loads, the component still has “Hello!” as the greeting and will not have a “Hi there!” until after the promise is returned. Something like this would be returned.

```
FAIL src/Greeting.test.js
Greeting
    ✕ loads a greeting message (46 ms)

  ● Greeting › Greets you with 'Hi There!'
  
    TestingLibraryElementError: Unable to find an element with the text: /Hi There!/i. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    <body>
      <div>
        <h1>
          Hello
          !
        </h1>
      </div>
    </body>

      13 |     render(<Greeting />)
      14 |   //  await act(async () => render(<Greeting />));
    > 15 |    expect(screen.getByText(/Hi There!/i)).toBeInTheDocument()
         |                  ^
      16 |   })
      17 | })
```

The simplest solution is to use the “act” function from the react testing library. React describes the act function as follows: 

> act()

> When writing UI tests, tasks like rendering, user events, or data fetching can be considered as “units” of interaction with a user interface. react-dom/test-utils provides a helper called act() that makes sure all updates related to these “units” have been processed and applied to the DOM before you make any assertions.

```
act(() => {
  // render components
});
// make assertions
```

Source: [react testing recipes](https://reactjs.org/docs/testing-recipes.html#act)
BTW, this link with testing recipes is your “go to” for… well… basic testing recipes. 

If we apply that to our example. We will get something like this.

```
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Greeting from './Greeting';


describe("Greeting", () => {
  it("Greets you with 'Hi There!'", async () => {
   await act(async () => render(<Greeting />));
   expect(screen.getByText(/Hi There!/i)).toBeInTheDocument()
  })
})

```

This will pass:

```
 PASS  src/Greeting.test.js
  Greeting
    ✓ Greets you with 'Hi There!' (36 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.27 s
Ran all test suites related to changed files.
```

LMK if this clears things up.

