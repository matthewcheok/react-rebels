rebels
======

Flux simplified. 

Finding action creators and dispatchers too confusing? `rebels` takes away that complexity by exposing a minimal API surface area for you and abstracting away the details.

### Store

Expose your actions via constants, subclass `Store` to add your application logic and listen for actions via `listenForAction(type, (payload) => {})`:

```
import {Store} from 'rebels';

export const INCREMENT_THE_COUNT = Symbol('INCREMENT_THE_COUNT');

class TheStore extends Store {
    constructor() {
        super();
        this._count = 0;

        this.listenForAction(INCREMENT_THE_COUNT, (payload)=>{
            console.log(payload);
            let {amount} = payload;
            this._count += amount;
            this.emitChange();
        });
    }

    get count() {
        return this._count;
    }
}

export default TheStore.defaultStore;
```


### Components

Subclass `Component`, then register your store updates with `updateFromStore(store, callback)`:

```
import React from 'react';
import {Component} from 'rebels';

import store, {INCREMENT_THE_COUNT} from './../stores/TheStore';

export default class TheButton extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        };

        this.updateFromStore(store, () => {
            this.setState({
                count: store.count
            });
        });
    }

    render() {
        return <button onClick={()=>{
            this.dispatchAction(INCREMENT_THE_COUNT, {amount:1});
        }}>Hello {this.state.count}</button>
    }
}
```

### Actions

Simply use `dispatchAction(type, payload)` from either your `Store` or `Component`. We recommend having a single store listening for your action, but you can place action type `constants` in a centralized location if you have multiple stores.

### Handling API requests

We recommend triggering your network request from the store responsible for storing that data. You can dispatch an action when your requests completes.

## License

`rebels` is under the MIT license.
