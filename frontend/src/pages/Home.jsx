import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import Builder from '../components/Builder';
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
      <Builder />
      <Culture />
      {/* <Client /> */}
      <Testmonials />
      <Blog />
      <Contact />

    </div>
  );
}