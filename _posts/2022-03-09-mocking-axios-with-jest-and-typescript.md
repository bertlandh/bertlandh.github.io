---
title: Mocking axios in Jest tests with Typescript
description: How to mock axios in Jest tests when using Typescript
layout: post
date: 2022-03-09 18:00:07
hero_image: /img/jest-react-typescript.jpg
hero_height: is-large
hero_darken: true
image: /img/jest-react-typescript.jpg
tags: JavaScript Testing Jest
---

Recently I wanted to write a test for a React component that uses axios to retrieve information from an API. To do this I had to mock jest, but I ran into some issues with the types as I was using typescript. This article explains how I managed to get it to work. 

## Mocking axios

I started out by Googling and found this great article, [3 Ways To Mock Axios In Jest](https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/) by Volodymyr Hudyma. In the article it provides three ways of mocking axios, two of which use additional packages, but I wanted to try the first option which was to mock axios using Jest and not have any additional dependencies. 

## The example app

I have created an example app using create-react-app that uses axios to retrieve a list of users and display them on the page. 

[View the full code repository on GitHub](https://github.com/chrisrhymes/react-axios-test-example)

```
npx create-react-app my-app --template typescript
```

The app already had @testing-library/react all set up and ready to go, I just had to add axios.

```
npm install -S axios
```

As we are using typescript, I have defined my User type as the id and the name as follows. 

```javascript
// App.tsx

type User = {
  id: number;
  name: string;
}
```

I used useState to store and update the users and then a getData method goes and gets the users and updates the state.

```javascript
// App.tsx

  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const getData = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        let responseUsers: User[] = response.data.map((responseUser: any) => {
          return {
            id: responseUser.id,
            name: responseUser.name
          }
        })
        setUsers(responseUsers);
      })
      .catch((error) => {
        console.log(error);
      })
  }
```

The component has a 'Get users' button that calls the getData method and then renders the list of returned users.

```react
// App.tsx

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => getData()}>Get users</button>
        <ul>
          {users?.map((user: User) => {
            return (<li key={user.id}>{user.name}</li>)
          })}
        </ul>
      </header>
    </div>
  );
```

## Writing the test

I started out by writing a test that called the real API to ensure that it successfully called the API and returned some data. Here we use waitFor to wait for the response from the API before running the assertions. To use [waitFor](https://testing-library.com/docs/dom-testing-library/api-async/#waitfor) we need to make the test an async function. 

```javascript
// App.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  const renderComponent = () => (render(<App />));

  test('renders learn react link', async () => {

    const { getByText, getAllByRole } = renderComponent();

    fireEvent.click(getByText('Get users'));

    await waitFor(() => {
      const userList = getAllByRole('listitem');
      expect(userList).toHaveLength(10);
      expect(userList[0]).toHaveTextContent('Leanne Graham');
      expect(userList[1]).toHaveTextContent('Ervin Howell');
    });
  });
})
```

This test uses `fireEvent.click()` to simulate clicking on the 'Get users' button, which triggers the `getData()` method. We then get the list items and assert that there are 10 items and then check the names of the users are displayed correctly.

This works but what happens if the API endpoint goes down, or the sample data is updated, then the tests will fail. Also, I don't want to be calling a real API when tests are running in GitHub actions, an environment out of my control.

## The test with Mock

I started by following the example in the article and added `jest.mock('axios');` after the imports. Then as per the example, I added the `axios.get.mockResolvedValue({});` but straight away I got a type error.

![Screenshot of the type error message](/img/jest-typescript-error.jpg)

After a bit of Googling again I came across this [stack overflow](https://stackoverflow.com/a/55351900) post which provided the solution.

```javascript
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
```

This removed the type error for the `mockedAxios.get.mockResolvedValue({})` line and I was good to go. I then provided an example data return from the mocked axios with two users and updated the test so the length would be 2 and the names would be the names from my mocked data. 

I have called this test `AppMock.test.tsx` so you can see both examples in the [code repository](https://github.com/chrisrhymes/react-axios-test-example). 

```javascript
// AppMock.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

// Mock jest and set the type
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  const renderComponent = () => (render(<App />));

  test('renders learn react link', async () => {

    const { getByText, getAllByRole } = renderComponent();

    // Provide the data object to be returned
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Joe Doe'
        },
        {
          id: 2,
          name: 'Jane Doe'
        }
      ],
    });

    fireEvent.click(getByText('Get users'));

    await waitFor(() => {
      const userList = getAllByRole('listitem');
      expect(userList).toHaveLength(2);
      expect(userList[0]).toHaveTextContent('Joe Doe');
      expect(userList[1]).toHaveTextContent('Jane Doe');
    });
  });
})
```

## TypeError: Cannot read properties of undefined (reading 'then')

Once I had got this example React app working, I tried to apply the same changes to another React project. This had a different set up and had a different Jest configuration. For some reason the above didn't work with the other app. I got an error message, `TypeError: Cannot read properties of undefined (reading 'then')`.

I don't know the reasoning for this and unfortunately I can't find the link to the forum that had the resolution for this, but I had to change `jest.Mocked<typeof axios>` to `jest.MockedFunction<typeof axios>`. 

I also had to change `mockedAxios.get.mockResolvedValue()` to `mockedAxios.mockResolvedValue()`, removing the get. 

Typescript then warned me that I also needed to provide status, statusText, headers and config, as well as the data object. Once I had done this the test now passed.

```javascript
    mockedAxios.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: 'Joe Doe'
        },
        {
          id: 2,
          name: 'Jane Doe'
        }
      ],
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });
```

I am still a beginner when it comes to Jest so if you know why this is then please leave a comment as it would be good to know the reason why. 

<a href="https://stocksnap.io/photo/city-skyline-PY308MCEZQ">Photo</a> by <a href="https://stocksnap.io/author/tgray">Tricia Gray</a> on <a href="https://stocksnap.io">StockSnap</a>