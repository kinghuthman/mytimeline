// App.js
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/store";

export default function App() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
