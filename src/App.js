import logo from './logo.svg';
// import './App.css';
import TransactionCard from "./components/TransactionCard";
import TransactionContainer from "./components/TransactionContainer";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <TransactionContainer />
            </header>
        </div>
    );
}

export default App;
