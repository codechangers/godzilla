## 1. Making a barrier

To create a barrier you have to decided which characters will be affected by the barrier and then you use the `useBarrier` _function_ in the **room.js** file inside of the `onInit` _method_. 
```javascript
onInit() {
	g.useBarrier('players', 'trees');
}
```  
This example will make it so that players can't go through trees because the trees become barriers.

