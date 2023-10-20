import Logo from "@/components/Logo";
import Buyhouse from "@/components/landing/BuyhouseSvg";
import ComingHome from "@/components/landing/Cominghome";
import HomeSvg from "@/components/landing/HomeSvg";
import Testimonial from "@/components/landing/Testimonial";


export default function Home() {
  return (
    <main className="h-screen">
      <nav className="flex justify-between bg-lime-500">
        <Logo/>
        <div className="flex justify-end w-1/2 m-1 md:w-1/6 md:m-4">
          <button className="m-1">Login</button>
          <button className="m-1">Sign up</button>
        </div>
      </nav>
      <section className="flex items-center justify-between bg-lime-500 h-4/5">
          <p className="p-5 h-1/2 w-1/2 text-darkblue text-sm md:text-4xl">
          Property Pulse streamlines all aspects of managing rental properties and fosters 
          a harmonious relationship between landlord and tenant.
          </p>
        <HomeSvg />
      </section>
      
      <section className="flex items-center bg-green-800 h-4/5 md:h-1/2 ">
        <Buyhouse />
        <p className="p-5 h-full w-1/2 text-white text-sm md:text-4xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </section>
      
      <section className="flex justify-center items-center bg-lime-500 min-h-4/5 md:min-h-1/2 ">
        <div className="md:flex md:w-1/2 w-full h-1/2">
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </div>
      </section>
    </main>
  )
}
