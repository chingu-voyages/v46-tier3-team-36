import Link from 'next/link';
import Logo from "@/components/Logo";
import Buyhouse from "@/components/landing/BuyhouseSvg";
import HomeSvg from "@/components/landing/HomeSvg";
import Testimonial from "@/components/landing/Testimonial";
import {testimonials, text} from '../components/landing/content';

export default function Home() {
  return (
    <main className="h-screen">
      <nav className="flex justify-between bg-lime-500 border-b-2 border-lime-600 w-full fixed">
        <Logo/>
        <div className="flex justify-end w-1/2 m-1 md:w-1/6 md:m-4">
          <Link className="m-2" href="/login">Login</Link>
          <Link className="m-2" href="/login">Get started</Link>
        </div>
      </nav>
      <section className="flex items-end justify-between bg-lime-500 h-4/5">
        <p className="p-5 h-1/2 w-1/2 mb-44 text-darkblue text-sm md:text-4xl">
          {text[0]}
        </p>
        <HomeSvg />
      </section>      
      <section className="flex items-center bg-green-800 h-4/5  ">
        <Buyhouse />
        <p className="p-5 h-full w-1/2 text-white text-sm md:text-4xl">
          {text[1]}
        </p>
      </section>
      <section className="flex justify-center items-center bg-lime-500 min-h-4/5 md:min-h-1/2 ">
        <div className="md:flex md:w-1/2 w-full h-1/2">
          <Testimonial testimonial={testimonials[0]} />
          <Testimonial testimonial={testimonials[1]} />
          <Testimonial testimonial={testimonials[2]} />
        </div>
      </section>
    </main>
  )
}
