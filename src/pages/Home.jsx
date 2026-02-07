import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import Ministries from '../components/Ministries';
import Sermons from '../components/Sermons';
import Events from '../components/Events';
import Donation from '../components/Donation';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div id="hero"><Hero /></div>
      <div id="about"><AboutSection /></div>
      <div id="ministries"><Ministries /></div>
      <div id="sermons"><Sermons /></div>
      <Events />
      <Donation />
      <div id="footer"><Footer /></div>
    </div>
  );
};

export default Home;
