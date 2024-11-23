import Hero from './components/Hero';
import Demo from './components/Demo';
import './App.css';
import Extract from './components/Extract';
import SummarizeText from './components/SummarizeText';

const App = () => {
    return (
        <main>
            <div className="main">
                <div className="gradient" />
            </div>
            <div className="app">
                <Hero />
                {/* <Demo/> */}
                <Extract componentKey="extract"/>
                {/* <SummarizeText/> */}
            </div>
        </main>
    )
}

export default App
