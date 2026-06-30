import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import Culture from '../components/Culture';
import Client from '../components/Client';
import Testmonials from '../components/Testmonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Services />
      <Blog />
      <Culture />
      <Client />
      <Testmonials />
      <Contact />
    </div>
  );
}