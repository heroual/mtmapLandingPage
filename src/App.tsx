/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { Differentiators } from './components/Differentiators';
import { Impact } from './components/Impact';
import { Target } from './components/Target';
import { Architecture } from './components/Architecture';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-brand selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Differentiators />
        <Impact />
        <Target />
        <Architecture />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
