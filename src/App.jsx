import Hero from './components/Hero';
import Demo from './components/Demo';
import './App.css';
import Extract from './components/Extract';
import SummarizeText from './components/SummarizeText';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <main>
            <div className="main">
                <div className="gradient" />
            </div>
            <div className="app">
                <Hero />
                <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/summarize-article" element={<Demo />} />
                    <Route path="/summarize-text" element={<SummarizeText />} />
                    <Route path="/extract-article" element={<Extract />} />
                </Routes>
                </Router>
            </div>
        </main>
    )
}

export default App
