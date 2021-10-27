import TransactionContainer from "./components/TransactionContainer";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {Container} from "./components/Container";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <Container />
                </header>
            </div>
        </Provider>

    );
}

export default App;
