import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Projects from './components/Projects';

function App() {
  return (
    <Container className='page-content my-5'>
      <div className='mb-5'>
        <h1>Web Projects</h1>
        <p>Keep track of all your ongoing web projects in this handy app!</p>
      </div>
      <Projects />
    </Container>
  );
}

export default App;
