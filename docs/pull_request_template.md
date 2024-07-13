# Please make sure all these checklist bellow are checked:

- [ ] My code follows the [style guidelines](convention.md)
- [ ] Make sure avoid [Redux's pitfalls](checkList.md)

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

- [ ] I have performed a self-review of my own code
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings

# Reviewer:

- [ ] I've confirmed this pull request follow [style guidelines](docs/convention.md)
- [ ] I've confired this pull doesn't have [Redux's pitfalls](docs/checkList.md)
