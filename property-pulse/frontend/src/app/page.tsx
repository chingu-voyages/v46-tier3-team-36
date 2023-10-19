import Logo from "@/components/Logo";


export default function Home() {
  return (
    <main className="h-screen">
      <section className="bg-green-800 h-4/5">
      <div className="bg-white w-80">
        <Logo />
      </div>
      </section>
      
      <section className="bg-slate-200 h-4/5 md:h-1/2">
        <h1>Information section</h1>
      </section>
      
      <section className="bg-green-800 h-4/5 md:h-1/2">
        <h1>Testimonials section</h1>
      </section>

    </main>
  )
}
