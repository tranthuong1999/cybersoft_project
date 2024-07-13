<h1 align="center">React/Redux: pitfalls</h1>

**1: Avoid having only one reducer**

- We will have many reducers in project
- Each container will have one reducer and will combine in the root reducer

````ts
      const rootReducer = combineReducers({
          router: connectRouter(history),
        globalStore,
        loginSlice,
    });
      ```
````

**2: Dont use Redux for absolutely everything**

- Some state use for controlling the minor UI interaction
- We don't need to use on Redux
- So we use in Local state with useState

````ts
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

      ```
````

**3: UI and Entities should be stored separately**

- You should not do:

````ts
      const state = {
        header: {
            userBar: {
            isLoading: false,
            users: [
                { first: "Alexandre", last: "Santos", id: 1 },
                { first: "Pedro", last: "Santos", id: 2 },
            ],
            },
        },
        }
      ```
````

- You should do:

````ts
      const state = {
        header: {
            userBar: {
            isLoading: false,
            },
        },
        users: {
            byId: {
            1: { first: "Alexandre", last: "Santos", id: 1 },
            2: { first: "Pedro", last: "Santos", id: 2 },
            },
            allIds: [1, 2],
        },
        }
      ```
````

**4: Be careful when update state in reducer**

- You should not do -> because it's will render i times (i is length of response.data)

````ts
      export const slice = createSlice({
        name: 'corporate',
        initialState: {
          indicators: []
        }
      for (let i = 0; i < response.data; i++) {
        const item = response.data[i];
        // do some thing to update item
        state.indicators.push(item);
      }
      ```
````

- You should do

````ts
      export const slice = createSlice({
        name: 'corporate',
        initialState: {
          indicators: []
        }
      newIndicators = []
      for (let i = 0; i < response.data; i++) {
        const item = response.data[i];
        // do some thing to update item
        newIndicators.push(item);
      }
      state.indicators = newIndicators;
      ```
````

**5: Do not use the default case**

- You should not do -> because any other action will change this state to a default state

````ts
      const initialState = {
        value: 'bar',
        index: 0,
      }

      function reducer(initialState, action) {
        switch (action.type) {
          case 'FOO':
            return {
              value: 'foo',
            }
          default:
            return {
              value: 'bar',
            }
        }
      }
      ```
````

- You should do

````ts
      const initialState = {
        value: 'bar',
        index: 0,
      }

      function reducer(initialState, action) {
        switch (action.type) {
          case 'FOO':
            return {
              value: 'foo',
            }
          default:
            return state
        }
      }
      ```
````

**5: Do not transform your data in the components**

- You should not do

````ts
      const MyComponent = () => {
        const user = useSelector(getUser)

        return (
          <div>
            <h1>{user.name}</h1>
            <img src={`https://profil-pic.com/${user.id}`} />
          </div>
        )
      }
      ```
````

- You should do: because this information is then calculated once per action and not every time it is rendered.

````ts
      switch (action.type) {
        case `user/SET_USER`:
          return {
            ...state,
            user: {
              ...action.user,
              profilUrl: `https://profil-pic.com/${action.user.id}`,
            },
          }
      }
      ```
````

**6: No need to create additional actions if not in use**

- You should not do

```ts
export const slice = createSlice({
  name: 'defaultLayoutStore',
  initialState: {
    checkLastUpdatedStatus: REQUEST_STATUS.IDLE,
  },
  reducers: {
    checkLastUpdatedRequest: (state) => {
      state.checkLastUpdatedStatus = REQUEST_STATUS.REQUESTING;
    },
    checkLastUpdatedSuccess: (state) => {
      state.checkLastUpdatedStatus = REQUEST_STATUS.SUCCESS;
    },
    checkLastUpdatedFail: (state) => {
      state.checkLastUpdatedStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const {
  checkLastUpdatedRequest,
  checkLastUpdatedSuccess,
  checkLastUpdatedFail,
} = slice.actions;
```

- You should do because this makes the code easy to understand, and doesn't save to initial State unused actions.

```ts
export const slice = createSlice({
  name: 'defaultLayoutStore',
  initialState: {},
  reducers: {
    checkLastUpdatedRequest: () => {},
  },
});

export const { checkLastUpdatedRequest } = slice.actions;
```

- If there is no where else to handle the data transformation but the TSX components, consider to memoize data properly using React hooks... E.g:

```ts
const listOfRankingCompanies = React.useMemo(() => {
  // ... logic to return the computed list
}, [signals, to, trigger, list, recomputing]);
```

**7: Remember to put on React.memo**

- Put on React.memo for every container and large component or component which has complicated computation. E.g: table, modal, dashboard menu... E.g:

````ts
      React.memo(HomePage)
      ```
````

<h1 align="center">Advices that you might need</h1>

**1: Think before coding**

- Spend 10 ~ 30 minutes to make a checklist/mindmap of problems, risks, pitfalls... that we may encounter from the beginning to the time before we submit the pull request.
- Visualize the flow of data (even draw out on a paper). This could prevent the code to become a tangled mass (hard to debug), and functionality duplication. There were some cases in our team that members have duplicated states which already existed the same time, have the same functionality... in the container and Redux/the state of forms.

**2: Pay attention to code spliting**

- Divide and conquer is always one of the best practices to follow... It will be faster to debug, and easier to apply lazy loading, optimization...
- This should also be added into the list of thinkings before coding that whether the component we are going to develop could be splitted into smaller parts (even draw out on a paper if it's needed).

**3: Using React devtool to benchmark the component rerendering performance**

- Often playaround the containers and benchmark to audit whether there is any expensive redundant re-rendering component.
- Below is an example of profling a table of many inputs while coding, one input receives the action but the other 60 inputs re-render:
  ![React Devtool Profling Example](./img/example-profiling.png?raw=true)
